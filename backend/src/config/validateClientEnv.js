import { requireEnv, optionalEnv } from './env.js'

/**
 * Validate only the variables that are safe/necessary for server startup.
 * Do not validate optional payment gateways that may be disabled.
 */
export function validateClientFacingEnv() {
  // API base
  optionalEnv('CORS_ORIGIN', '*')

  // Mongo
  requireEnv('MONGODB_URI')

  // JWT
  requireEnv('JWT_SECRET')

  // Cloudinary
  requireEnv('CLOUDINARY_CLOUD_NAME')
  requireEnv('CLOUDINARY_API_KEY')
  requireEnv('CLOUDINARY_API_SECRET')

  // Email (one of the following providers is expected)
  optionalEnv('EMAIL_FROM', '')
  optionalEnv('SMTP_HOST', '')
  optionalEnv('SMTP_PORT', '')
  optionalEnv('SMTP_USER', '')
  optionalEnv('SMTP_PASS', '')

  // Payments - allow disabling by leaving empty
  optionalEnv('STRIPE_SECRET_KEY', '')
  optionalEnv('SSL_COMMERZ_STORE_ID', '')
  optionalEnv('SSL_COMMERZ_STORE_PASSWORD', '')

  return true
}

