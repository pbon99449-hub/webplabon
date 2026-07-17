import { optionalEnv, requireEnv } from './env.js'

export function validateRequiredEnv() {
  // Server core
  requireEnv('MONGODB_URI')

  // Auth / JWT
  requireEnv('JWT_SECRET')
  optionalEnv('JWT_EXPIRES_IN', '7d')

  // CORS
  optionalEnv('CORS_ORIGIN', '*')

  // Cloudinary
  requireEnv('CLOUDINARY_CLOUD_NAME')
  requireEnv('CLOUDINARY_API_KEY')
  requireEnv('CLOUDINARY_API_SECRET')

  // Email / SMTP or email provider (example)
  optionalEnv('EMAIL_FROM', '')
  optionalEnv('SMTP_HOST', '')
  optionalEnv('SMTP_PORT', '')
  optionalEnv('SMTP_USER', '')
  optionalEnv('SMTP_PASS', '')

  // Payments
  optionalEnv('STRIPE_SECRET_KEY', '')
  optionalEnv('SSL_COMMERZ_STORE_ID', '')
  optionalEnv('SSL_COMMERZ_STORE_PASSWORD', '')

  return true
}

