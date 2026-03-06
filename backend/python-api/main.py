import logging
import os
import smtplib
from datetime import datetime
from email.message import EmailMessage
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import DateTime, Integer, String, Text, create_engine, desc
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column
from twilio.base.exceptions import TwilioException
from twilio.rest import Client

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("portfolio-backend")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./portfolio.db")
raw_origins = os.getenv("CORS_ORIGINS", "*").strip()
CORS_ORIGINS = ["*"] if raw_origins == "*" else [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

SMTP_ENABLED = os.getenv("SMTP_ENABLED", "false").lower() == "true"
EMAIL_HOST = os.getenv("EMAIL_HOST", "")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "true").lower() == "true"
EMAIL_USER = os.getenv("EMAIL_USER", "")
EMAIL_PASS = os.getenv("EMAIL_PASS", "")
EMAIL_FROM = os.getenv("EMAIL_FROM", EMAIL_USER)
EMAIL_TO = os.getenv("EMAIL_TO", "")

SMS_ENABLED = os.getenv("SMS_ENABLED", "false").lower() == "true"
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "")
SMS_TO_NUMBER = os.getenv("SMS_TO_NUMBER", "")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)


class Base(DeclarativeBase):
    pass


class Contact(Base):
    __tablename__ = "contacts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(190), nullable=False, index=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(190), nullable=False)
    category: Mapped[str] = mapped_column(String(120), nullable=False)
    image_url: Mapped[str | None] = mapped_column(String(255), nullable=True)
    project_url: Mapped[str | None] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    message: str = Field(min_length=5, max_length=4000)


class ContactOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    message: str
    created_at: datetime


class ProjectOut(BaseModel):
    id: int
    title: str
    category: str
    image_url: str | None
    project_url: str | None


app = FastAPI(title="Portfolio Backend API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)


def send_contact_notification(name: str, email: str, message: str) -> bool:
    if not SMTP_ENABLED:
        return False

    required = [EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_FROM, EMAIL_TO]
    if any(not item for item in required):
        logger.warning("SMTP enabled but configuration is incomplete. Skipping email notification.")
        return False

    email_message = EmailMessage()
    email_message["Subject"] = "New Contact Form Submission"
    email_message["From"] = EMAIL_FROM
    email_message["To"] = EMAIL_TO
    email_message.set_content(
        f"New message received from your portfolio form.\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Message:\n{message}\n"
    )

    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=20) as smtp:
            if EMAIL_USE_TLS:
                smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(email_message)
        return True
    except Exception:
        logger.exception("Email notification failed for contact submission.")
        return False


def send_contact_sms(name: str, email: str, message: str) -> bool:
    if not SMS_ENABLED:
        return False

    required = [TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, SMS_TO_NUMBER]
    if any(not item for item in required):
        logger.warning("SMS enabled but Twilio configuration is incomplete. Skipping SMS notification.")
        return False

    sms_body = (
        "New contact form message\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Message: {message[:1200]}"
    )

    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(
            body=sms_body,
            from_=TWILIO_FROM_NUMBER,
            to=SMS_TO_NUMBER,
        )
        return True
    except TwilioException:
        logger.exception("Twilio SMS notification failed.")
        return False


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "service": "portfolio-backend"}


@app.get("/api/projects", response_model=List[ProjectOut])
def get_projects() -> list[ProjectOut]:
    with Session(engine) as session:
        rows = session.query(Project).order_by(desc(Project.created_at)).all()
        return [
            ProjectOut(
                id=row.id,
                title=row.title,
                category=row.category,
                image_url=row.image_url,
                project_url=row.project_url,
            )
            for row in rows
        ]


@app.post("/api/contacts", response_model=ContactOut, status_code=201)
def create_contact(payload: ContactCreate) -> ContactOut:
    with Session(engine) as session:
        contact = Contact(name=payload.name.strip(), email=payload.email.lower(), message=payload.message.strip())
        session.add(contact)
        session.commit()
        session.refresh(contact)

        # Never block contact creation if notification fails.
        email_sent = send_contact_notification(contact.name, contact.email, contact.message)
        sms_sent = send_contact_sms(contact.name, contact.email, contact.message)
        logger.info("Notification result for contact id=%s email_sent=%s sms_sent=%s", contact.id, email_sent, sms_sent)

        return ContactOut(
            id=contact.id,
            name=contact.name,
            email=contact.email,
            message=contact.message,
            created_at=contact.created_at,
        )


@app.post("/api/notifications/test")
def test_notifications() -> dict:
    email_sent = send_contact_notification("Notification Test", "noreply@example.com", "Test email from portfolio backend.")
    sms_sent = send_contact_sms("Notification Test", "noreply@example.com", "Test SMS from portfolio backend.")
    return {"email_sent": email_sent, "sms_sent": sms_sent}


@app.get("/api/contacts", response_model=List[ContactOut])
def get_contacts(limit: int = 20) -> list[ContactOut]:
    if limit < 1 or limit > 200:
        raise HTTPException(status_code=400, detail="limit must be between 1 and 200")

    with Session(engine) as session:
        rows = session.query(Contact).order_by(desc(Contact.created_at)).limit(limit).all()
        return [
            ContactOut(
                id=row.id,
                name=row.name,
                email=row.email,
                message=row.message,
                created_at=row.created_at,
            )
            for row in rows
        ]
