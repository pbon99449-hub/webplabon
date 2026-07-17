function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '\x26\x61\x6d\x70\x3b')
    .replace(/</g, '\x26\x6c\x74\x3b')
    .replace(/>/g, '\x26\x67\x74\x3b')
    .replace(/"/g, '\x26\x71\x75\x6f\x74\x3b')
    .replace(/'/g, '\x26\x23\x30\x33\x39\x3b');
}

function formatMoneyBDT(amount) {
  const n = typeof amount === 'string' ? Number(amount) : amount;
  if (!Number.isFinite(n)) return `\u09F3 ${amount}`;
  return `\u09F3 ${Number(n).toLocaleString("en-BD")}`;
}

/* ==================== Customer Confirmation Email ==================== */
export function orderConfirmationHtml({
  websiteName,
  websiteLogoUrl,
  order,
}) {
  const safeLogo = websiteLogoUrl ? escapeHtml(websiteLogoUrl) : '';
  const orderRef = order.orderReference || order._id || '';
  const items = order.items || [];

  const itemsRows = items
    .map((it) => {
      const img = it.image
        ? `<img src="${escapeHtml(it.image)}" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:12px;border:1px solid #e5e7eb;"/>`
        : '<div style="width:56px;height:56px;border-radius:12px;background:#f3f4f6;border:1px solid #e5e7eb;"></div>';
      return `
<tr>
  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;">${img}</td>
  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;">
    <div style="font-size:14px;font-weight:500;color:#111827;">${escapeHtml(it.name)}</div>
    ${it.size ? `<div style="font-size:12px;color:#6b7280;margin-top:2px;">Size: ${escapeHtml(it.size)}</div>` : ''}
    <div style="font-size:12px;color:#9ca3af;">Qty: ${escapeHtml(it.quantity)}</div>
  </td>
  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;text-align:right;font-size:14px;font-weight:600;color:#111827;">${formatMoneyBDT(it.unitPrice)}</td>
</tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:linear-gradient(135deg,#f9fafb,#ffffff,#f9fafb);">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#f9fafb,#ffffff,#f9fafb);">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;box-shadow:0 20px 50px -12px rgba(0,0,0,0.15);border:1px solid #f3f4f6;">

          <tr>
            <td style="height:8px;background:linear-gradient(90deg,#f59e0b,#fb923c,#f59e0b);border-radius:24px 24px 0 0;"></td>
          </tr>

          <tr>
            <td style="padding:32px 40px 24px 40px;text-align:center;">
              ${safeLogo ? `<img src="${safeLogo}" alt="${escapeHtml(websiteName)}" style="height:48px;width:auto;margin-bottom:20px;" />` : ''}

              <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px auto;">
                <tr>
                  <td align="center" style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#34d399,#10b981);box-shadow:0 8px 24px rgba(16,185,129,0.3);">
                    <span style="font-size:36px;color:#ffffff;line-height:72px;">&#10003;</span>
                  </td>
                </tr>
              </table>

              <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:700;color:#111827;">Order Placed Successfully!</h1>
              <p style="margin:0;font-size:15px;color:#6b7280;line-height:1.5;">
                Thank you for shopping with <strong style="color:#374151;">${escapeHtml(websiteName)}</strong>. Your order has been confirmed and is being processed.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fffbeb,#fff7ed);border-radius:16px;border:1px solid rgba(251,191,36,0.3);padding:20px;">
                <tr>
                  <td style="vertical-align:middle;width:44px;">
                    <table cellpadding="0" cellspacing="0" style="width:44px;height:44px;border-radius:50%;background:#fef3c7;">
                      <tr><td align="center" style="font-size:22px;color:#d97706;line-height:44px;">&#128230;</td></tr>
                    </table>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <div style="font-size:11px;color:#b45309;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Order Reference</div>
                    <div style="font-size:18px;font-weight:700;color:#111827;letter-spacing:0.02em;">${escapeHtml(orderRef)}</div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <div style="font-size:11px;color:#6b7280;font-weight:500;">Total Amount</div>
                    <div style="font-size:24px;font-weight:700;color:#111827;">${formatMoneyBDT(order.totalPrice || 0)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:50%;vertical-align:top;padding-right:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #f3f4f6;box-shadow:0 4px 12px rgba(0,0,0,0.04);padding:16px;">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:32px;height:32px;border-radius:50%;background:#dbeafe;text-align:center;font-size:16px;color:#2563eb;line-height:32px;">&#128666;</td>
                              <td style="padding-left:10px;font-size:15px;font-weight:600;color:#1f2937;">Delivery Info</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr><td style="font-size:13px;color:#6b7280;padding-bottom:4px;">&#128338; Estimated delivery: <strong style="color:#374151;">${escapeHtml(order.estimatedDeliveryDate || '')}</strong></td></tr>
                      <tr><td style="font-size:13px;color:#6b7280;padding-bottom:4px;">&#127968; Shipping to: <strong style="color:#374151;">${escapeHtml(order.customerName)}</strong></td></tr>
                      <tr><td style="font-size:13px;color:#6b7280;">&#128205; ${escapeHtml(order.shippingAddress?.fullAddress || '')}${order.shippingAddress?.city ? `, ${escapeHtml(order.shippingAddress.city)}` : ''}</td></tr>
                    </table>
                  </td>
                  <td style="width:50%;vertical-align:top;padding-left:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #f3f4f6;box-shadow:0 4px 12px rgba(0,0,0,0.04);padding:16px;">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:32px;height:32px;border-radius:50%;background:#f3e8ff;text-align:center;font-size:16px;color:#9333ea;line-height:32px;">&#128179;</td>
                              <td style="padding-left:10px;font-size:15px;font-weight:600;color:#1f2937;">Payment Details</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr><td style="font-size:13px;color:#6b7280;padding-bottom:4px;">&#10003; Method: <strong style="color:#374151;">${escapeHtml(order.paymentMethod || 'Cash On Delivery')}</strong></td></tr>
                      <tr><td style="font-size:13px;color:#6b7280;padding-bottom:4px;">&#128722; Items: <strong style="color:#374151;">${items.length} product(s)</strong></td></tr>
                      <tr><td style="font-size:13px;color:#6b7280;">&#128230; Status: <span style="display:inline-block;padding:2px 10px;border-radius:20px;background:#d1fae5;color:#065f46;font-size:12px;font-weight:600;">&#9679; Confirmed</span></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #f3f4f6;box-shadow:0 4px 12px rgba(0,0,0,0.04);padding:16px;">
                <tr>
                  <td style="padding-bottom:12px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;height:32px;border-radius:50%;background:#fef3c7;text-align:center;font-size:16px;color:#d97706;line-height:32px;">&#128100;</td>
                        <td style="padding-left:10px;font-size:15px;font-weight:600;color:#1f2937;">Customer Information</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:50%;vertical-align:top;padding-right:8px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr><td style="font-size:13px;color:#6b7280;padding-bottom:6px;">&#128100; <span style="color:#9ca3af;">Name</span><br><strong style="color:#374151;">${escapeHtml(order.customerName)}</strong></td></tr>
                            <tr><td style="font-size:13px;color:#6b7280;padding-bottom:6px;">&#128222; <span style="color:#9ca3af;">Phone</span><br><strong style="color:#374151;">${escapeHtml(order.customerPhone)}</strong></td></tr>
                          </table>
                        </td>
                        <td style="width:50%;vertical-align:top;padding-left:8px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr><td style="font-size:13px;color:#6b7280;padding-bottom:6px;">&#9993; <span style="color:#9ca3af;">Email</span><br><strong style="color:#374151;">${escapeHtml(order.customerEmail || 'Not provided')}</strong></td></tr>
                            <tr><td style="font-size:13px;color:#6b7280;padding-bottom:6px;">&#9998; <span style="color:#9ca3af;">Delivery Note</span><br><strong style="color:#374151;">${escapeHtml(order.shippingAddress?.note || 'No note provided')}</strong></td></tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #f3f4f6;box-shadow:0 4px 12px rgba(0,0,0,0.04);padding:16px;">
                <tr>
                  <td style="padding-bottom:4px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;height:32px;border-radius:50%;background:#e0e7ff;text-align:center;font-size:16px;color:#4f46e5;line-height:32px;">&#128722;</td>
                        <td style="padding-left:10px;font-size:15px;font-weight:600;color:#1f2937;">Ordered Items</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="padding-top:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <thead>
                      <tr style="background:#f9fafb;">
                        <th style="padding:10px 12px;font-size:11px;color:#6b7280;font-weight:600;text-align:left;border-radius:8px 0 0 8px;">Product</th>
                        <th style="padding:10px 12px;font-size:11px;color:#6b7280;font-weight:600;text-align:left;">Details</th>
                        <th style="padding:10px 12px;font-size:11px;color:#6b7280;font-weight:600;text-align:right;border-radius:0 8px 8px 0;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsRows || '<tr><td colspan="3" style="padding:16px;text-align:center;color:#9ca3af;font-size:13px;">No items</td></tr>'}
                    </tbody>
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:14px;padding:14px 18px;">
                <tr>
                  <td style="font-size:13px;color:#6b7280;padding-bottom:6px;">Subtotal</td>
                  <td style="font-size:13px;color:#374151;font-weight:600;text-align:right;padding-bottom:6px;">${formatMoneyBDT(order.subtotal || order.totalPrice || 0)}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#6b7280;padding-bottom:6px;">Shipping</td>
                  <td style="font-size:13px;color:#374151;font-weight:600;text-align:right;padding-bottom:6px;">${formatMoneyBDT(order.shippingCost || 0)}</td>
                </tr>
                <tr><td colspan="2" style="border-top:1px solid #e5e7eb;padding:0;"></td></tr>
                <tr>
                  <td style="font-size:16px;font-weight:700;color:#111827;padding-top:8px;">Total</td>
                  <td style="font-size:18px;font-weight:700;color:#111827;text-align:right;padding-top:8px;">${formatMoneyBDT(order.totalPrice || 0)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fffbeb,#fefce8);border-radius:16px;border:1px solid rgba(251,191,36,0.3);padding:16px;">
                <tr>
                  <td style="width:36px;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0" style="width:32px;height:32px;border-radius:50%;background:#fef3c7;">
                      <tr><td align="center" style="font-size:16px;color:#d97706;line-height:32px;">&#9888;</td></tr>
                    </table>
                  </td>
                  <td style="padding-left:12px;vertical-align:top;">
                    <div style="font-size:14px;font-weight:600;color:#92400e;">Please save this information</div>
                    <div style="font-size:12px;color:#b45309;margin-top:4px;line-height:1.5;">
                      Keep your order reference number for any future inquiries regarding your order. You will receive an SMS notification once your order is dispatched.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 32px 40px;text-align:center;">
              <div style="font-size:12px;color:#9ca3af;line-height:1.6;">
                Need help? Contact us at <a href="mailto:${escapeHtml(order.contactEmail || '')}" style="color:#6b7280;text-decoration:underline;">${escapeHtml(order.contactEmail || '')}</a> or call ${escapeHtml(order.contactPhone || '')}
              </div>
            </td>
          </tr>
        </table>

        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin-top:16px;">
          <tr>
            <td align="center" style="font-size:11px;color:#d1d5db;padding:8px;">
              &copy; ${new Date().getFullYear()} ${escapeHtml(websiteName)}. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ==================== Admin Notification Email ====================== */
export function adminNewOrderHtml({ websiteName, websiteLogoUrl, order }) {
  const safeLogo = websiteLogoUrl ? escapeHtml(websiteLogoUrl) : '';
  const orderRef = order.orderReference || order._id || '';
  const items = order.items || [];

  const itemsRows = items
    .map((it) => {
      const img = it.image
        ? `<img src="${escapeHtml(it.image)}" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:12px;border:1px solid #e5e7eb;"/>`
        : '<div style="width:56px;height:56px;border-radius:12px;background:#f3f4f6;border:1px solid #e5e7eb;"></div>';
      return `
<tr>
  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;">${img}</td>
  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;">
    <div style="font-size:14px;font-weight:500;color:#111827;">${escapeHtml(it.name)}</div>
    ${it.size ? `<div style="font-size:12px;color:#6b7280;">Size: ${escapeHtml(it.size)}</div>` : ''}
    <div style="font-size:12px;color:#9ca3af;">Qty: ${escapeHtml(it.quantity)}</div>
  </td>
  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;text-align:right;font-size:14px;font-weight:600;color:#111827;">${formatMoneyBDT(it.unitPrice)}</td>
</tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;box-shadow:0 20px 50px -12px rgba(0,0,0,0.15);border:1px solid #f3f4f6;">

          <tr>
            <td style="height:8px;background:linear-gradient(90deg,#f59e0b,#fb923c,#f59e0b);border-radius:24px 24px 0 0;"></td>
          </tr>

          <tr>
            <td style="padding:32px 40px 24px 40px;text-align:center;">
              ${safeLogo ? `<img src="${safeLogo}" alt="${escapeHtml(websiteName)}" style="height:48px;width:auto;margin-bottom:16px;" />` : ''}
              <h1 style="margin:0 0 6px 0;font-size:24px;font-weight:700;color:#111827;">&#128276; New Order Received</h1>
              <p style="margin:0;font-size:14px;color:#6b7280;">A new order has been placed on ${escapeHtml(websiteName)}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fffbeb,#fff7ed);border-radius:16px;border:1px solid rgba(251,191,36,0.3);padding:18px 20px;">
                <tr>
                  <td style="vertical-align:middle;width:40px;">
                    <table cellpadding="0" cellspacing="0" style="width:40px;height:40px;border-radius:50%;background:#fef3c7;">
                      <tr><td align="center" style="font-size:20px;color:#d97706;line-height:40px;">&#128230;</td></tr>
                    </table>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <div style="font-size:11px;color:#b45309;font-weight:600;text-transform:uppercase;">Order Reference</div>
                    <div style="font-size:16px;font-weight:700;color:#111827;">${escapeHtml(orderRef)}</div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <div style="font-size:11px;color:#6b7280;font-weight:500;">Total</div>
                    <div style="font-size:22px;font-weight:700;color:#111827;">${formatMoneyBDT(order.totalPrice || 0)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #f3f4f6;box-shadow:0 4px 12px rgba(0,0,0,0.04);padding:16px;">
                <tr>
                  <td style="padding-bottom:10px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;height:32px;border-radius:50%;background:#fef3c7;text-align:center;font-size:16px;color:#d97706;line-height:32px;">&#128100;</td>
                        <td style="padding-left:10px;font-size:15px;font-weight:600;color:#1f2937;">Customer Details</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="font-size:14px;font-weight:600;color:#111827;">${escapeHtml(order.customerName)}</div>
                    <div style="font-size:13px;color:#6b7280;margin-top:4px;">${escapeHtml(order.customerEmail || '')}</div>
                    <div style="font-size:13px;color:#6b7280;">${escapeHtml(order.customerPhone)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:50%;vertical-align:top;padding-right:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #f3f4f6;box-shadow:0 4px 12px rgba(0,0,0,0.04);padding:16px;">
                      <tr><td style="font-size:13px;font-weight:600;color:#1f2937;padding-bottom:8px;">&#128205; Shipping Address</td></tr>
                      <tr><td style="font-size:13px;color:#6b7280;line-height:1.5;">${escapeHtml(order.shippingAddress?.fullAddress || '')}${order.shippingAddress?.city ? `<br>${escapeHtml(order.shippingAddress.city)}` : ''}${order.shippingAddress?.altPhone ? `<br>Alt: ${escapeHtml(order.shippingAddress.altPhone)}` : ''}</td></tr>
                    </table>
                  </td>
                  <td style="width:50%;vertical-align:top;padding-left:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #f3f4f6;box-shadow:0 4px 12px rgba(0,0,0,0.04);padding:16px;">
                      <tr><td style="font-size:13px;font-weight:600;color:#1f2937;padding-bottom:8px;">&#128179; Payment</td></tr>
                      <tr><td style="font-size:13px;color:#6b7280;">Method: <strong style="color:#374151;">${escapeHtml(order.paymentMethod || 'Cash On Delivery')}</strong></td></tr>
                      <tr><td style="font-size:13px;color:#6b7280;">Status: <strong style="color:#374151;">${escapeHtml(order.paymentStatus || 'Pending')}</strong></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #f3f4f6;box-shadow:0 4px 12px rgba(0,0,0,0.04);padding:16px;">
                <tr>
                  <td style="padding-bottom:4px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;height:32px;border-radius:50%;background:#e0e7ff;text-align:center;font-size:16px;color:#4f46e5;line-height:32px;">&#128722;</td>
                        <td style="padding-left:10px;font-size:15px;font-weight:600;color:#1f2937;">Ordered Items</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="padding-top:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <thead>
                      <tr style="background:#f9fafb;">
                        <th style="padding:10px 12px;font-size:11px;color:#6b7280;font-weight:600;text-align:left;border-radius:8px 0 0 8px;">Product</th>
                        <th style="padding:10px 12px;font-size:11px;color:#6b7280;font-weight:600;text-align:left;">Details</th>
                        <th style="padding:10px 12px;font-size:11px;color:#6b7280;font-weight:600;text-align:right;border-radius:0 8px 8px 0;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsRows || '<tr><td colspan="3" style="padding:16px;text-align:center;color:#9ca3af;font-size:13px;">No items</td></tr>'}
                    </tbody>
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:14px;padding:14px 18px;">
                <tr>
                  <td style="font-size:13px;color:#6b7280;padding-bottom:4px;">Order Date</td>
                  <td style="font-size:13px;color:#374151;font-weight:600;text-align:right;padding-bottom:4px;">${escapeHtml(order.orderDate || '')}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#6b7280;padding-bottom:4px;">Estimated Delivery</td>
                  <td style="font-size:13px;color:#374151;font-weight:600;text-align:right;padding-bottom:4px;">${escapeHtml(order.estimatedDeliveryDate || '')}</td>
                </tr>
                <tr><td colspan="2" style="border-top:1px solid #e5e7eb;padding:0;"></td></tr>
                <tr>
                  <td style="font-size:16px;font-weight:700;color:#111827;padding-top:8px;">Total</td>
                  <td style="font-size:18px;font-weight:700;color:#111827;text-align:right;padding-top:8px;">${formatMoneyBDT(order.totalPrice || 0)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:14px;padding:16px;">
                <tr>
                  <td style="font-size:14px;font-weight:700;color:#ffffff;padding-bottom:4px;">&#128064; Please review this order</td>
                </tr>
                <tr>
                  <td style="font-size:12px;color:#9ca3af;">Customer: ${escapeHtml(order.customerName)} | Phone: ${escapeHtml(order.customerPhone)}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin-top:16px;">
          <tr><td align="center" style="font-size:11px;color:#d1d5db;padding:8px;">&copy; ${new Date().getFullYear()} ${escapeHtml(websiteName)}. All rights reserved.</td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}