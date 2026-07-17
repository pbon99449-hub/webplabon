import { Router } from 'express';
import Order from '../models/Order.js';
import { sendOrderEmails } from '../services/emailService.js';
import { sendOrderSms, sendAdminSms } from '../services/smsService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/ping', (req, res) => {
  res.json({ ok: true, route: 'orders' });
});

// POST /api/orders — create a new order
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
      orderReference,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      subtotal,
      shippingCost,
      discount,
      totalPrice,
      paymentMethod,
    } = req.body;

    // Basic validation
    if (!customerName || !customerPhone || !shippingAddress?.fullAddress || !shippingAddress?.city) {
      return res.status(400).json({ ok: false, message: 'Missing required fields' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, message: 'No items in order' });
    }

    const now = new Date();
    const orderDate = now.toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const estimatedDelivery = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const order = await Order.create({
      orderReference,
      customerName,
      customerEmail: customerEmail || '',
      customerPhone,
      shippingAddress: {
        fullAddress: shippingAddress.fullAddress,
        city: shippingAddress.city,
        altPhone: shippingAddress.altPhone || '',
        note: shippingAddress.note || '',
      },
      items: items.map((it) => {
        // Ensure image is a usable absolute URL for email clients.
        // If frontend sends relative paths, try to convert using WEARNEST_ASSET_BASE_URL.
        const rawImage = it.image || '';
        let normalizedImage = rawImage;

        if (typeof rawImage === 'string') {
          // If it looks like a relative path: /something.png
          if (rawImage.startsWith('/')) {
            const base = process.env.WEARNEST_ASSET_BASE_URL || '';
            normalizedImage = base ? `${base.replace(/\/$/, '')}${rawImage}` : rawImage;
          }

          // If it starts with http(s) leave as-is; otherwise keep but avoid empty
          if (!normalizedImage.trim()) normalizedImage = '';
        } else {
          normalizedImage = '';
        }

        return {
          productId: it.productId || it.id || '',
          name: it.name || it.title || 'Product',
          image: normalizedImage,
          size: it.size || '',
          quantity: it.quantity || 1,
          unitPrice: it.unitPrice || Number(String(it.price || '690').replace(/[^\d.]/g, '')) || 690,
        };
      }),
      subtotal: subtotal || 0,
      shippingCost: shippingCost || 0,
      discount: discount || 0,
      totalPrice: totalPrice || subtotal || 0,
      paymentMethod: paymentMethod || 'Cash On Delivery',
      orderDate,
      estimatedDeliveryDate: estimatedDelivery,
      contactEmail: process.env.WEBSITE_CONTACT_EMAIL || '',
      contactPhone: process.env.WEBSITE_CONTACT_PHONE || '',
      emailStatus: 'pending',
      smsStatus: 'pending',
    });

    const adminEmail = process.env.ADMIN_EMAIL || 'pbon99449@gmail.com';
    const orderObj = order.toObject();

    // Fire email sending in background (non-blocking)
    sendOrderEmails({
      order: orderObj,
      customerEmailTo: customerEmail || '',
      adminEmailTo: adminEmail,
    }).catch(err => {
      console.error('[order] Background email send failed:', err.message);
    });

    // Fire SMS sending in background (non-blocking)
    sendNotificationsAsync(orderObj, customerPhone);

    // Send success response immediately - don't wait for email/SMS
    res.status(201).json({ ok: true, order });
  })
);

/**
 * Background async function to send SMS notifications
 */
async function sendNotificationsAsync(order, customerPhone) {
  const websiteName = process.env.WEBSITE_NAME || 'WearNest';
  const orderRef = order.orderReference || order._id || '';

  // Send SMS to customer
  const customerMessage = `Thank you for your order at ${websiteName}! Your order (${orderRef}) has been confirmed. Total: ৳${(order.totalPrice || 0).toLocaleString('en-BD')}. We will notify you when it ships.`;
  
  await sendOrderSms({
    customerPhone,
    message: customerMessage,
  });

  // Update customer SMS status
  try {
    await Order.findByIdAndUpdate(order._id, { $set: { smsStatus: 'sent' } });
  } catch (err) {
    console.error('[order] Failed to update customer smsStatus:', err.message);
    try {
      await Order.findByIdAndUpdate(order._id, { $set: { smsStatus: 'failed' } });
    } catch (_) {}
  }

  // Send SMS to admin
  const adminMessage = `New order on ${websiteName}! ${order.customerName} (${order.customerPhone}) placed order ${orderRef}. Total: ৳${(order.totalPrice || 0).toLocaleString('en-BD')}. Check dashboard for details.`;
  await sendAdminSms({ message: adminMessage });
}

export default router;