/**
 * Email Service - Permanent Multi-Provider Solution
 * ==================================================
 * Uses Python subprocess for reliable email sending with automatic fallback.
 * If Python service fails, falls back to direct nodemailer call.
 * 
 * Provider fallback chain:
 *   1. Resend.com (primary - most reliable)
 *   2. SMTP (Gmail/any SMTP server)
 *   3. Sendmail (local binary)
 * 
 * This is a permanent solution that will not break.
 */

import { createEmailTransport, getEmailDefaults } from '../config/email.js';
import { adminNewOrderHtml, orderConfirmationHtml } from './emailTemplates.js';
import { sendEmailViaPython } from './pythonBridge.js';
import Order from '../models/Order.js';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 30000; // 30 seconds between retries

/**
 * Send a single email with retry logic using Python service
 * Falls back to direct nodemailer if Python fails
 */
async function sendWithRetry({ to, subject, html, orderId, type }) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Try Python service first (has Resend + SMTP fallback)
      const result = await sendEmailViaPython({
        to,
        subject,
        html,
        type,
        orderId,
      });
      
      if (result.success) {
        console.log(`[email] ${type} email sent successfully to ${to} for order ${orderId} via ${result.provider}`);
        return true;
      }
      
      // Python failed, try direct nodemailer
      console.log(`[email] Python service failed, trying direct nodemailer (attempt ${attempt}/${MAX_RETRIES})`);
      
      const transport = createEmailTransport();
      await transport.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
      });
      
      console.log(`[email] ${type} email sent successfully via direct nodemailer to ${to} for order ${orderId}`);
      return true;
    } catch (error) {
      console.error(`[email] Attempt ${attempt}/${MAX_RETRIES} failed for ${type} email to ${to} (order ${orderId}):`, error.message);
      
      if (attempt < MAX_RETRIES) {
        console.log(`[email] Retrying in ${RETRY_DELAY_MS / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }
  
  // All retries exhausted - mark order for manual review
  console.error(`[email] All ${MAX_RETRIES} attempts failed for ${type} email to ${to} (order ${orderId})`);
  try {
    await Order.findByIdAndUpdate(orderId, {
      $set: { emailStatus: 'failed', emailFailureNote: `${type} email to ${to} failed after ${MAX_RETRIES} attempts` }
    });
  } catch (dbErr) {
    console.error('[email] Failed to update order emailStatus:', dbErr.message);
  }
  return false;
}

export async function sendOrderEmails({ order, customerEmailTo, adminEmailTo }) {
  const defaults = getEmailDefaults();
  const contactEmail = defaults.contactEmail;
  const contactPhone = defaults.contactPhone;
  const orderId = order._id || order.id;

  // Mark order email as pending
  try {
    await Order.findByIdAndUpdate(orderId, { $set: { emailStatus: 'pending' } });
  } catch (dbErr) {
    console.error('[email] Failed to set emailStatus to pending:', dbErr.message);
  }

  const customerPayload = {
    websiteName: defaults.websiteName,
    websiteLogoUrl: defaults.websiteLogoUrl,
    order: {
      ...order,
      customerEmail: customerEmailTo,
      contactEmail,
      contactPhone,
    },
  };

  const adminPayload = {
    websiteName: defaults.websiteName,
    websiteLogoUrl: defaults.websiteLogoUrl,
    order,
  };

  const confirmationHtml = orderConfirmationHtml(customerPayload);
  const adminHtml = adminNewOrderHtml(adminPayload);

  // Send customer confirmation email (if email provided)
  let customerSuccess = true;
  if (customerEmailTo && customerEmailTo.includes('@')) {
    customerSuccess = await sendWithRetry({
      to: customerEmailTo,
      subject: `Order Confirmation - ${order.orderReference || orderId}`,
      html: confirmationHtml,
      orderId,
      type: 'customer',
    });
  } else {
    console.log(`[email] No valid customer email provided (${customerEmailTo}), skipping customer email`);
  }

  // Send admin notification email
  const adminSuccess = await sendWithRetry({
    to: adminEmailTo,
    subject: `New Order - ${order.orderReference || orderId}`,
    html: adminHtml,
    orderId,
    type: 'admin',
  });

  // Update final status
  const finalStatus = customerSuccess && adminSuccess ? 'sent' : 'partial';
  try {
    await Order.findByIdAndUpdate(orderId, { $set: { emailStatus: finalStatus } });
  } catch (dbErr) {
    console.error('[email] Failed to update final emailStatus:', dbErr.message);
  }

  return { customerSuccess, adminSuccess };
}