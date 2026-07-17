#!/usr/bin/env python3
"""
Permanent Email Sending Service - Multi-Provider Fallback System
===============================================================
This service runs as a subprocess managed by the Node.js backend.
It provides reliable email delivery with automatic fallback between providers.

Providers (in order of priority):
1. Resend.com (primary - most reliable for transactional emails)
2. Nodemailer via SMTP (fallback - Gmail/any SMTP)
3. Local sendmail (last resort)

Usage: python email_sender.py <action> <json_payload>
  action: send_email | health
  json_payload: JSON string with {to, subject, html, type, orderId}
"""

import sys
import json
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path

# Load environment from backend .env
env_path = Path(__file__).resolve().parent.parent / '.env'
if env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(env_path)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[python-email] %(asctime)s %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger('email_service')


# ============================================================
# PROVIDER 1: Resend.com (Primary)
# ============================================================
def send_via_resend(to, subject, html):
    """Send email via Resend.com API.
    Resend is more reliable than Gmail SMTP for transactional emails.
    """
    api_key = os.getenv('RESEND_API_KEY', '')
    from_email = os.getenv('RESEND_FROM_EMAIL', '')

    if not api_key or not from_email:
        logger.warning('Resend not configured, skipping')
        return False, 'Resend not configured'

    try:
        import requests
        
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        }
        
        payload = {
            'from': from_email,
            'to': [to],
            'subject': subject,
            'html': html,
        }
        
        logger.info(f'Attempting Resend email to {to}')
        resp = requests.post(
            'https://api.resend.com/emails',
            json=payload,
            headers=headers,
            timeout=30
        )
        
        if resp.status_code in (200, 201):
            result = resp.json()
            logger.info(f'Resend email sent successfully! ID: {result.get("id", "unknown")}')
            return True, None
        else:
            error_msg = f'Resend error {resp.status_code}: {resp.text[:200]}'
            logger.error(error_msg)
            return False, error_msg
            
    except requests.exceptions.Timeout:
        return False, 'Resend timeout'
    except requests.exceptions.ConnectionError:
        return False, 'Resend connection failed'
    except Exception as e:
        return False, f'Resend error: {str(e)}'


# ============================================================
# PROVIDER 2: SMTP (Nodemailer-style - Gmail, etc.)
# ============================================================
def send_via_smtp(to, subject, html):
    """Send email via SMTP (Gmail, Outlook, etc.)"""
    smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.getenv('SMTP_PORT', '587'))
    smtp_user = os.getenv('SMTP_USER', '')
    smtp_pass = os.getenv('SMTP_PASS', '')

    if not smtp_user or not smtp_pass:
        logger.warning('SMTP not configured, skipping')
        return False, 'SMTP not configured'

    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = smtp_user
        msg['To'] = to
        msg['Subject'] = subject
        
        # Attach HTML content
        msg.attach(MIMEText(html, 'html'))
        
        logger.info(f'Attempting SMTP email to {to} via {smtp_host}:{smtp_port}')
        
        # Connect and send
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, [to], msg.as_string())
        server.quit()
        
        logger.info(f'SMTP email sent successfully to {to}')
        return True, None
        
    except smtplib.SMTPAuthenticationError:
        return False, 'SMTP authentication failed - check credentials'
    except smtplib.SMTPRecipientsRefused:
        return False, f'SMTP recipient refused: {to}'
    except smtplib.SMTPServerDisconnected:
        return False, 'SMTP server disconnected'
    except smtplib.SMTPException as e:
        return False, f'SMTP error: {str(e)}'
    except Exception as e:
        return False, f'SMTP unexpected error: {str(e)}'


# ============================================================
# PROVIDER 3: Local Sendmail (Last Resort)
# ============================================================
def send_via_sendmail(to, subject, html):
    """Send email via local sendmail binary (if available)"""
    import subprocess
    import tempfile
    
    sendmail_path = os.getenv('SENDMAIL_PATH', '/usr/sbin/sendmail')
    
    try:
        # Create a temporary file with the email content
        with tempfile.NamedTemporaryFile(mode='w', suffix='.eml', delete=False) as f:
            f.write(f'From: {os.getenv("SMTP_USER", "noreply@wearnest.com")}\n')
            f.write(f'To: {to}\n')
            f.write(f'Subject: {subject}\n')
            f.write('MIME-Version: 1.0\n')
            f.write('Content-Type: text/html; charset="utf-8"\n\n')
            f.write(html)
            temp_path = f.name
        
        result = subprocess.run(
            [sendmail_path, '-t'],
            input=open(temp_path, 'r').read(),
            capture_output=True,
            text=True,
            timeout=30
        )
        
        os.unlink(temp_path)
        
        if result.returncode == 0:
            logger.info(f'Sendmail email sent to {to}')
            return True, None
        else:
            return False, f'Sendmail failed: {result.stderr[:200]}'
            
    except FileNotFoundError:
        return False, 'sendmail not found'
    except Exception as e:
        return False, f'Sendmail error: {str(e)}'


# ============================================================
# Main Email Sending Function with Multi-Provider Fallback
# ============================================================
def send_email(to, subject, html, email_type='customer', order_id=''):
    """
    Send email with automatic multi-provider fallback.
    Tries each provider in order until one succeeds.
    
    Returns: dict with {success, provider, error}
    """
    if not to or not subject or not html:
        return {'success': False, 'provider': 'none', 'error': 'Missing required fields'}

    logger.info(f'=== Sending {email_type} email to {to} (order: {order_id}) ===')
    logger.info(f'Subject: {subject}')

    # List of providers to try in order
    providers = [
        ('resend', send_via_resend),
        ('smtp', send_via_smtp),
        ('sendmail', send_via_sendmail),
    ]

    errors = []
    for provider_name, provider_func in providers:
        try:
            success, error = provider_func(to, subject, html)
            if success:
                logger.info(f'Email sent successfully via {provider_name}')
                return {
                    'success': True,
                    'provider': provider_name,
                    'error': None
                }
            else:
                errors.append(f'{provider_name}: {error}')
                logger.warning(f'{provider_name} failed: {error}')
        except Exception as e:
            errors.append(f'{provider_name}: {str(e)}')
            logger.error(f'{provider_name} exception: {e}')

    # All providers failed
    error_msg = '; '.join(errors)
    logger.error(f'All email providers failed: {error_msg}')
    return {
        'success': False,
        'provider': 'none',
        'error': error_msg
    }


# ============================================================
# CLI Entry Point
# ============================================================
def main():
    if len(sys.argv) < 2:
        print(json.dumps({'success': False, 'error': 'No action specified'}))
        sys.exit(1)

    action = sys.argv[1]

    if action == 'health':
        providers_status = {
            'resend': bool(os.getenv('RESEND_API_KEY')),
            'smtp': bool(os.getenv('SMTP_USER')),
            'sendmail': bool(os.getenv('SENDMAIL_PATH')),
        }
        print(json.dumps({
            'success': True,
            'service': 'python-email-service',
            'python_version': sys.version,
            'providers': providers_status,
            'active_providers': sum(1 for v in providers_status.values() if v)
        }))
        sys.exit(0)

    elif action == 'send_email':
        if len(sys.argv) < 3:
            print(json.dumps({'success': False, 'error': 'Missing payload'}))
            sys.exit(1)
        
        try:
            payload = json.loads(sys.argv[2])
            to = payload.get('to', '')
            subject = payload.get('subject', '')
            html = payload.get('html', '')
            email_type = payload.get('type', 'customer')
            order_id = payload.get('orderId', '')
            
            result = send_email(to, subject, html, email_type, order_id)
            print(json.dumps(result))
            
            if result['success']:
                sys.exit(0)
            else:
                sys.exit(1)
        except json.JSONDecodeError as e:
            print(json.dumps({'success': False, 'error': f'Invalid JSON: {str(e)}'}))
            sys.exit(1)

    else:
        print(json.dumps({'success': False, 'error': f'Unknown action: {action}'}))
        sys.exit(1)


if __name__ == '__main__':
    main()