#!/usr/bin/env python3
"""
Permanent SMS Sending Service - Multi-Provider Fallback System
==============================================================
This service runs as a subprocess managed by the Node.js backend.
It provides reliable SMS delivery with automatic fallback between providers.

Providers (in order of priority):
1. Twilio (primary - international capable)
2. Local SMS Gateway (for Bangladesh numbers)
3. Web-based SMS API fallback

Usage: python sms_sender.py <action> <json_payload>
  action: send_sms | send_admin_sms | health
  json_payload: JSON string with {to, message, type}
"""

import sys
import json
import os
import logging
import time
import subprocess
from pathlib import Path

# Load environment from backend .env
env_path = Path(__file__).resolve().parent.parent / '.env'
if env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(env_path)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[python-sms] %(asctime)s %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger('sms_service')

# ============================================================
# PROVIDER 1: Twilio
# ============================================================
def send_via_twilio(to, message):
    """Send SMS via Twilio. Returns (success: bool, error_msg: str)"""
    account_sid = os.getenv('TWILIO_ACCOUNT_SID', '')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN', '')
    from_number = os.getenv('TWILIO_PHONE_NUMBER', '')

    if not all([account_sid, auth_token, from_number]):
        logger.warning('Twilio not configured, skipping')
        return False, 'Twilio not configured'

    try:
        from twilio.rest import Client
        from twilio.base.exceptions import TwilioRestException

        client = Client(account_sid, auth_token)
        
        # Normalize phone number
        normalized = normalize_phone(to)
        
        logger.info(f'Attempting Twilio SMS to {normalized}')
        msg = client.messages.create(
            body=message,
            from_=from_number,
            to=normalized
        )
        logger.info(f'Twilio SMS sent successfully! SID: {msg.sid}')
        return True, None
    except TwilioRestException as e:
        error_msg = f'Twilio error {e.code}: {e.msg}'
        logger.error(error_msg)
        return False, error_msg
    except Exception as e:
        error_msg = f'Twilio unexpected error: {str(e)}'
        logger.error(error_msg)
        return False, error_msg


# ============================================================
# PROVIDER 2: Bangladesh SMS Gateway (SMS.net.bd / BulkSMSBD)
# ============================================================
def send_via_bd_gateway(to, message):
    """Send SMS via Bangladesh local SMS gateway.
    Supports multiple BD SMS providers with automatic fallback.
    Returns (success: bool, error_msg: str)
    """
    bd_api_key = os.getenv('BD_SMS_API_KEY', '')
    bd_sender_id = os.getenv('BD_SMS_SENDER_ID', 'WearNest')

    if not bd_api_key:
        logger.warning('BD_SMS_API_KEY not configured, skipping BD gateway')
        return False, 'BD SMS gateway not configured'

    # Normalize to BD format (remove +880, keep 01XXXXXXXXX)
    digits = ''.join(filter(str.isdigit, to))
    if digits.startswith('880'):
        digits = '0' + digits[3:]
    elif digits.startswith('+880'):
        digits = '0' + digits[4:]
    
    bd_number = digits if digits.startswith('01') and len(digits) == 11 else to

    # Try multiple BD SMS providers
    providers = [
        {
            'name': 'SMS.net.bd',
            'url': 'https://sms.net.bd/v1/send-sms',
            'params': {
                'api_key': bd_api_key,
                'msg': message,
                'to': bd_number,
                'sender_id': bd_sender_id,
            }
        },
        {
            'name': 'BulkSMSBD',
            'url': 'https://bulksmsbd.net/api/smsapi',
            'params': {
                'api_key': bd_api_key,
                'type': 'text',
                'number': bd_number,
                'message': message,
                'senderid': bd_sender_id,
            }
        },
        {
            'name': 'ElitBuzz',
            'url': 'https://api.elitbuzz.com/smsapi',
            'params': {
                'api_key': bd_api_key,
                'type': 'text',
                'contacts': bd_number,
                'msg': message,
                'senderid': bd_sender_id,
            }
        }
    ]

    import requests
    
    for provider in providers:
        try:
            logger.info(f'Attempting BD SMS via {provider["name"]} to {bd_number}')
            resp = requests.get(
                provider['url'],
                params=provider['params'],
                timeout=15
            )
            result = resp.text
            logger.info(f'{provider["name"]} response: {result[:200]}')
            
            # Check for success indicators
            success_indicators = ['success', 'ok', 'true', '1001', 'sent', 'SMS sent']
            if any(ind in result.lower() for ind in success_indicators):
                logger.info(f'SMS sent successfully via {provider["name"]}')
                return True, None
            else:
                logger.warning(f'{provider["name"]} returned: {result[:100]}')
        except requests.exceptions.Timeout:
            logger.warning(f'{provider["name"]} timeout')
        except requests.exceptions.ConnectionError:
            logger.warning(f'{provider["name"]} connection failed')
        except Exception as e:
            logger.warning(f'{provider["name"]} error: {str(e)}')
    
    return False, 'All BD SMS providers failed'


# ============================================================
# PROVIDER 3: Webhook / Custom API Fallback
# ============================================================
def send_via_webhook(to, message):
    """Send SMS via a custom webhook URL (configurable).
    This can be any HTTP endpoint that accepts SMS requests.
    """
    webhook_url = os.getenv('SMS_WEBHOOK_URL', '')
    webhook_token = os.getenv('SMS_WEBHOOK_TOKEN', '')

    if not webhook_url:
        return False, 'SMS webhook not configured'

    try:
        import requests
        headers = {'Content-Type': 'application/json'}
        if webhook_token:
            headers['Authorization'] = f'Bearer {webhook_token}'

        payload = {
            'to': to,
            'message': message,
            'source': 'wearnest-backend'
        }

        logger.info(f'Attempting SMS via webhook to {to}')
        resp = requests.post(
            webhook_url,
            json=payload,
            headers=headers,
            timeout=15
        )
        
        if resp.status_code < 500:
            logger.info(f'Webhook SMS sent, status: {resp.status_code}')
            return True, None
        else:
            return False, f'Webhook returned {resp.status_code}'
    except Exception as e:
        return False, f'Webhook error: {str(e)}'


# ============================================================
# PROVIDER 4: Local GSM Modem (for future use)
# ============================================================
def send_via_gsm_modem(to, message):
    """Send SMS via a locally connected GSM modem/phone.
    This is the most reliable method for Bangladesh as it uses
    local mobile networks directly.
    
    Requires: A USB GSM modem (Huawei E303, etc.) connected to the server.
    Uses: AT commands via serial port or a helper tool like gammu.
    """
    gsm_enabled = os.getenv('GSM_MODEM_ENABLED', 'false').lower() == 'true'
    if not gsm_enabled:
        return False, 'GSM modem not enabled'

    try:
        # Normalize to BD local format
        digits = ''.join(filter(str.isdigit, to))
        if digits.startswith('880'):
            digits = '0' + digits[3:]
        elif digits.startswith('+880'):
            digits = '0' + digits[4:]
        
        bd_number = digits if digits.startswith('01') and len(digits) == 11 else to
        
        # Method 1: Try using gammu (if installed)
        try:
            result = subprocess.run(
                ['gammu', 'sendsms', 'TEXT', bd_number, '-text', message],
                capture_output=True, text=True, timeout=30
            )
            if result.returncode == 0:
                logger.info(f'GSM modem SMS sent via gammu to {bd_number}')
                return True, None
        except (FileNotFoundError, subprocess.TimeoutExpired):
            pass

        # Method 2: Try using AT commands via serial
        gsm_port = os.getenv('GSM_MODEM_PORT', 'COM3')
        try:
            import serial
            with serial.Serial(gsm_port, 9600, timeout=5) as ser:
                ser.write(b'AT\r\n')
                time.sleep(0.5)
                ser.write(f'AT+CMGF=1\r\n'.encode())
                time.sleep(0.5)
                ser.write(f'AT+CMGS="{bd_number}"\r\n'.encode())
                time.sleep(0.5)
                ser.write(f'{message}\x1a'.encode())
                time.sleep(1)
                logger.info(f'GSM modem SMS sent via AT commands to {bd_number}')
                return True, None
        except Exception as e:
            logger.warning(f'GSM modem AT command failed: {e}')

        return False, 'GSM modem not available'
    except Exception as e:
        return False, f'GSM modem error: {str(e)}'


# ============================================================
# Phone Number Normalization
# ============================================================
def normalize_phone(phone):
    """
    Normalize phone number to E.164 format
    Handles Bangladesh numbers: 01XXXXXXXXX (11 digits) or 016XXXXXXXX (12 digits with leading 0)
    """
    if not phone:
        return ''
    
    digits = ''.join(filter(str.isdigit, phone))
    
    if not digits:
        return ''
    
    # Remove leading zeros
    while digits.startswith('0'):
        digits = digits[1:]
    
    # Now digits should be without leading zeros
    # Bangladesh: 1XXXXXXXXX (10 digits) or 16XXXXXXXX (11 digits) after removing leading 0
    if len(digits) == 10 and digits.startswith('1'):
        # 1XXXXXXXXX (after removing leading 0) -> +8801XXXXXXXXX (13 chars total)
        return '+880' + digits
    elif len(digits) == 11 and digits.startswith('1'):
        # 16XXXXXXXXX (after removing leading 0) -> +88016XXXXXXXXX (14 chars total)
        return '+880' + digits
    elif digits.startswith('880') and len(digits) in (12, 13):
        # Already has BD code without + (8801XXXXXXXXX or 88016XXXXXXXXX)
        return '+' + digits
    elif digits.startswith('1') and len(digits) == 11:
        # US/Canada with country code: +1XXXXXXXXXX
        return '+' + digits
    elif len(digits) >= 10 and len(digits) <= 15:
        # Any other valid international number
        return '+' + digits
    else:
        return '+' + digits


# ============================================================
# Main SMS Sending Function with Multi-Provider Fallback
# ============================================================
def send_sms(to, message, sms_type='customer'):
    """
    Send SMS with automatic multi-provider fallback.
    Tries each provider in order until one succeeds.
    
    Returns: dict with {success, provider, error}
    """
    if not to or not message:
        return {'success': False, 'provider': 'none', 'error': 'Missing to or message'}

    logger.info(f'=== Sending {sms_type} SMS to {to} ===')
    logger.info(f'Message: {message[:100]}...')

    # List of providers to try in order
    providers = [
        ('twilio', send_via_twilio),
        ('bd_gateway', send_via_bd_gateway),
        ('webhook', send_via_webhook),
        ('gsm_modem', send_via_gsm_modem),
    ]

    errors = []
    for provider_name, provider_func in providers:
        try:
            success, error = provider_func(to, message)
            if success:
                logger.info(f'SMS sent successfully via {provider_name}')
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
    logger.error(f'All SMS providers failed: {error_msg}')
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
        # Health check
        providers_status = {
            'twilio': bool(os.getenv('TWILIO_ACCOUNT_SID')),
            'bd_gateway': bool(os.getenv('BD_SMS_API_KEY')),
            'webhook': bool(os.getenv('SMS_WEBHOOK_URL')),
            'gsm_modem': os.getenv('GSM_MODEM_ENABLED', 'false').lower() == 'true',
        }
        print(json.dumps({
            'success': True,
            'service': 'python-sms-service',
            'python_version': sys.version,
            'providers': providers_status,
            'active_providers': sum(1 for v in providers_status.values() if v)
        }))
        sys.exit(0)

    elif action == 'send_sms':
        if len(sys.argv) < 3:
            print(json.dumps({'success': False, 'error': 'Missing payload'}))
            sys.exit(1)
        
        try:
            payload = json.loads(sys.argv[2])
            to = payload.get('to', '')
            message = payload.get('message', '')
            sms_type = payload.get('type', 'customer')
            
            result = send_sms(to, message, sms_type)
            print(json.dumps(result))
            
            if result['success']:
                sys.exit(0)
            else:
                sys.exit(1)
        except json.JSONDecodeError as e:
            print(json.dumps({'success': False, 'error': f'Invalid JSON: {str(e)}'}))
            sys.exit(1)

    elif action == 'send_admin_sms':
        if len(sys.argv) < 3:
            print(json.dumps({'success': False, 'error': 'Missing payload'}))
            sys.exit(1)
        
        try:
            payload = json.loads(sys.argv[2])
            admin_phone = os.getenv('ADMIN_PHONE', '')
            if not admin_phone:
                print(json.dumps({'success': False, 'error': 'ADMIN_PHONE not configured'}))
                sys.exit(1)
            
            message = payload.get('message', '')
            result = send_sms(admin_phone, message, 'admin')
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