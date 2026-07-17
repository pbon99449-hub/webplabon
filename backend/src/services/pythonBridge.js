/**
 * Python Service Bridge
 * ======================
 * Manages Python subprocesses for SMS and Email sending.
 * Provides automatic fallback between providers and permanent reliability.
 * 
 * Features:
 * - SMS: Twilio → BD Gateway → Webhook → GSM Modem (4 provider fallback)
 * - Email: Resend → SMTP → Sendmail (3 provider fallback)
 * - Automatic retry with exponential backoff
 * - Health monitoring
 * - Queue-based processing for reliability
 */

import { execSync, execFile } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PYTHON_SERVICES_DIR = path.resolve(__dirname, '..', '..', 'python_services');

// Cache for Python path
let pythonPath = null;

/**
 * Find the Python executable path
 */
function findPython() {
  if (pythonPath) return pythonPath;
  
  // On Windows, try 'python' first (python3 doesn't exist)
  const isWindows = process.platform === 'win32';
  const candidates = isWindows ? ['python', 'python3'] : ['python3', 'python'];
  
  for (const cmd of candidates) {
    try {
      const result = execSync(`"${cmd}" --version 2>&1`, { encoding: 'utf8', timeout: 5000, shell: true });
      if (result.toLowerCase().includes('python')) {
        pythonPath = cmd;
        console.log(`[python-bridge] Found Python: "${cmd}" -> ${result.trim()}`);
        return pythonPath;
      }
    } catch {
      continue;
    }
  }
  
  // If not found via execSync, check common Windows paths
  const winPaths = [
    'C:\\Python312\\python.exe',
    'C:\\Python311\\python.exe',
    'C:\\Python310\\python.exe',
    'C:\\Users\\SILICON TECH\\AppData\\Local\\Programs\\Python\\Python312\\python.exe',
    'C:\\Users\\SILICON TECH\\AppData\\Local\\Programs\\Python\\Python311\\python.exe',
    `${process.env.LOCALAPPDATA}\\Programs\\Python\\Python312\\python.exe`,
    `${process.env.LOCALAPPDATA}\\Programs\\Python\\Python311\\python.exe`,
  ];
  
  for (const p of winPaths) {
    if (fs.existsSync(p)) {
      pythonPath = `"${p}"`;
      console.log(`[python-bridge] Found Python at: ${p}`);
      return pythonPath;
    }
  }
  
  pythonPath = 'python'; // fallback
  console.log('[python-bridge] Using fallback Python path: python');
  return pythonPath;
}

/**
 * Execute a Python script and get the result
 */
function runPythonScript(scriptName, action, payload = {}) {
  return new Promise((resolve, reject) => {
    const py = findPython();
    const scriptPath = path.join(PYTHON_SERVICES_DIR, scriptName);
    
    if (!fs.existsSync(scriptPath)) {
      reject(new Error(`Python script not found: ${scriptPath}`));
      return;
    }
    
    const payloadJson = JSON.stringify(payload);
    
    execFile(py, [scriptPath, action, payloadJson], {
      timeout: 30000,
      maxBuffer: 1024 * 1024,
      env: { ...process.env },
    }, (error, stdout, stderr) => {
      if (stderr && stderr.trim()) {
        console.error(`[python-bridge] ${scriptName} stderr:`, stderr.trim());
      }
      
      if (error) {
        // Try to parse stdout for result even on error
        try {
          const result = JSON.parse(stdout);
          if (result && typeof result === 'object') {
            resolve(result);
            return;
          }
        } catch {
          // stdout not JSON, use error
        }
        
        reject(new Error(`Python ${scriptName} failed: ${error.message}`));
        return;
      }
      
      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (parseError) {
        reject(new Error(`Failed to parse Python output: ${stdout?.substring(0, 200)}`));
      }
    });
  });
}

/**
 * Health check for all Python services
 */
export async function checkPythonServices() {
  try {
    const [smsHealth, emailHealth] = await Promise.allSettled([
      runPythonScript('sms_sender.py', 'health'),
      runPythonScript('email_sender.py', 'health'),
    ]);
    
    return {
      sms: smsHealth.status === 'fulfilled' ? smsHealth.value : { error: smsHealth.reason?.message },
      email: emailHealth.status === 'fulfilled' ? emailHealth.value : { error: emailHealth.reason?.message },
    };
  } catch (error) {
    console.error('[python-bridge] Health check failed:', error.message);
    return { error: error.message };
  }
}

/**
 * Send SMS via Python service with multi-provider fallback
 */
export async function sendSmsViaPython({ to, message, type = 'customer' }) {
  if (!to || !message) {
    return { success: false, error: 'Missing to or message' };
  }
  
  try {
    const result = await runPythonScript('sms_sender.py', 'send_sms', { to, message, type });
    
    if (result.success) {
      console.log(`[python-bridge] SMS sent via ${result.provider} to ${to}`);
    } else {
      console.error(`[python-bridge] SMS failed to ${to}: ${result.error}`);
    }
    
    return result;
  } catch (error) {
    console.error(`[python-bridge] SMS error for ${to}:`, error.message);
    
    // Fallback to direct Twilio call if Python fails
    try {
      console.log('[python-bridge] Falling back to direct Node.js Twilio call...');
      const { default: twilio } = await import('twilio');
      
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_PHONE_NUMBER;
      
      if (accountSid && authToken && fromNumber) {
        const client = twilio(accountSid, authToken);
        
        // Normalize phone
        let digits = to.replace(/\D/g, '');
        if (digits.startsWith('0')) digits = digits.replace(/^0+/, '');
        if (digits.length >= 10 && digits.length <= 11 && !digits.startsWith('880')) {
          digits = `+880${digits}`;
        } else if (digits.startsWith('880')) {
          digits = `+${digits}`;
        } else {
          digits = `+${digits}`;
        }
        
        await client.messages.create({
          body: message,
          from: fromNumber,
          to: digits,
        });
        
        console.log(`[python-bridge] Fallback Twilio SMS sent to ${digits}`);
        return { success: true, provider: 'twilio-fallback' };
      }
    } catch (fallbackError) {
      console.error('[python-bridge] Fallback also failed:', fallbackError.message);
    }
    
    return { success: false, error: error.message, provider: 'none' };
  }
}

/**
 * Send admin SMS via Python service
 */
export async function sendAdminSmsViaPython({ message }) {
  const adminPhone = process.env.ADMIN_PHONE;
  if (!adminPhone) {
    return { success: false, error: 'ADMIN_PHONE not configured' };
  }
  
  try {
    const result = await runPythonScript('sms_sender.py', 'send_admin_sms', { message });
    
    if (result.success) {
      console.log(`[python-bridge] Admin SMS sent via ${result.provider}`);
    }
    
    return result;
  } catch (error) {
    console.error('[python-bridge] Admin SMS error:', error.message);
    
    // Fallback: use regular SMS function
    return sendSmsViaPython({ to: adminPhone, message, type: 'admin' });
  }
}

/**
 * Send email via Python service with multi-provider fallback
 */
export async function sendEmailViaPython({ to, subject, html, type = 'customer', orderId = '' }) {
  if (!to || !subject || !html) {
    return { success: false, error: 'Missing required fields' };
  }
  
  try {
    const result = await runPythonScript('email_sender.py', 'send_email', {
      to,
      subject,
      html,
      type,
      orderId,
    });
    
    if (result.success) {
      console.log(`[python-bridge] Email sent via ${result.provider} to ${to}`);
    } else {
      console.error(`[python-bridge] Email failed to ${to}: ${result.error}`);
    }
    
    return result;
  } catch (error) {
    console.error(`[python-bridge] Email error for ${to}:`, error.message);
    
    // Fallback to direct nodemailer if Python fails
    try {
      console.log('[python-bridge] Falling back to direct Node.js nodemailer call...');
      const { default: nodemailer } = await import('nodemailer');
      
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
      await transport.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
      });
      
      console.log(`[python-bridge] Fallback nodemailer email sent to ${to}`);
      return { success: true, provider: 'nodemailer-fallback' };
    } catch (fallbackError) {
      console.error('[python-bridge] Fallback email also failed:', fallbackError.message);
    }
    
    return { success: false, error: error.message, provider: 'none' };
  }
}