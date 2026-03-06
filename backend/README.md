# Backend Setup (SQL + Python + PHP)

This project includes backend templates in `backend/`.

## 1) Python API
Path: `backend/python-api`

### Requirements
- Python 3.10+
- pip
- MySQL 8+ (recommended)

### Install
```bash
cd backend/python-api
python -m pip install -r requirements.txt
copy .env.example .env
```

### Run
```bash
python -m uvicorn main:app --reload --port 8000
```

API:
- `GET /api/health`
- `GET /api/projects`
- `GET /api/contacts`
- `POST /api/contacts`

### MySQL config in `.env`
```env
DATABASE_URL=mysql+pymysql://root:password@127.0.0.1:3306/portfolio_db
CORS_ORIGINS=*
```

### Email notification on form submit
```env
SMTP_ENABLED=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=true
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=your_email@gmail.com
```

### SMS notification on form submit (Twilio)
```env
SMS_ENABLED=true
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+1xxxxxxxxxx
SMS_TO_NUMBER=+8801xxxxxxxxx
```

Notes:
- Contact form submit will still succeed even if email/SMS notification fails.
- For Gmail, use App Password in `EMAIL_PASS`.

## 2) PHP API (MySQL)
Path: `backend/php-api`

### Requirements
- PHP 8+
- MySQL 8+

### Setup
1. Create DB and tables using `backend/schema.mysql.sql`.
2. Copy `config.example.php` -> `config.php` and fill credentials.
3. Serve folder:
```bash
cd backend/php-api
php -S 127.0.0.1:8080
```

Endpoint:
- `GET /contacts.php`
- `POST /contacts.php`

## 3) SQL files
- SQLite schema: `backend/schema.sql`
- MySQL schema: `backend/schema.mysql.sql`

## 4) Frontend integration
Contact page uses:
- `NEXT_PUBLIC_BACKEND_URL` (default `http://127.0.0.1:8000`)
- `POST {BACKEND_URL}/api/contacts`

Create `.env.local` in project root:
```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```
