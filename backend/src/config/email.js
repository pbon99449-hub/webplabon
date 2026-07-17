import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

import { optionalEnv, requireEnv } from './env.js';

export function createEmailTransport() {
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Currently nodemailer only (per requirement: Gmail SMTP dev)
  const smtpHost = optionalEnv('SMTP_HOST', 'smtp.gmail.com');
  const smtpPort = optionalEnv('SMTP_PORT', '587');
  const smtpUser = requireEnv('SMTP_USER');
  const smtpPass = requireEnv('SMTP_PASS');

  return nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: false, // STARTTLS for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

export function getEmailDefaults() {
  return {
    websiteName: optionalEnv('WEBSITE_NAME', 'WearNest'),
    // Default logo fallback (use env if provided)
    // Your provided URL: https://ibb.co.com/Q789G1Fs
    websiteLogoUrl: optionalEnv('WEBSITE_LOGO_URL', 'https://ibb.co.com/Q789G1Fs'),
    contactEmail: optionalEnv('WEBSITE_CONTACT_EMAIL', ''),
    contactPhone: optionalEnv('WEBSITE_CONTACT_PHONE', ''),
  };
}

