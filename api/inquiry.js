// api/inquiry.js
// Simply Sexy Cigars — inquiry endpoint
// POST /api/inquiry
// Saves to Supabase, emails the concierge team + the customer via Resend.

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const STARTING_SEQUENCE = 137; // first inquiry number: SSC-<year>-00137

// ---------- helpers ----------

const MAX = { short: 200, message: 5000 };

function clean(value, max = MAX.short) {
  if (value === undefined || value === null) return null;
  const s = String(value).trim().slice(0, max);
  return s.length ? s : null;
}

function cleanBool(value) {
  return value === true || value === 'true' || value === 'on' || value === 1;
}

function isEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 320;
}

// Escape user-supplied strings before interpolating into HTML emails.
function esc(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function firstName(name) {
  return (name || '').split(/\s+/)[0] || 'there';
}

// ---------- email templates ----------

const GOLD = '#C9A961';
const BLACK = '#0A0A0B';
const PAPER = '#EBE6D9';
const ASH = '#8B8478';
const IVORY = '#F5F1E8';
const INK = '#1A1A1C';

// Optional hosted logo for the header. Leave unset until a publicly reachable HTTPS
// URL is available — when empty, the header falls back to styled text branding so no
// broken image is ever shown. (Base64-embedded images are blocked by Outlook/Gmail.)
const LOGO_URL = (process.env.INQUIRY_LOGO_URL || '').trim();

function customerEmailHtml({ name, inquiryNumber, eventType, eventDate }) {
  // Header branding: hosted logo image if a public URL is configured, otherwise
  // elegant text wordmark (never a broken image). Text version mirrors the mockup:
  // serif name with "SEXY" accented, flanked-rule "CONCIERGE" line beneath.
  const brandmark = LOGO_URL
    ? `<img src="${LOGO_URL}" width="210" alt="Simply Sexy Cigars" style="display:block;width:210px;max-width:68%;height:auto;border:0;outline:none;text-decoration:none;">`
    : `<div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;letter-spacing:5px;color:${GOLD};">SIMPLY&nbsp;SEXY&nbsp;CIGARS</div>
       <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:12px auto 0;">
         <tr>
           <td style="width:40px;height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td>
           <td style="padding:0 14px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:${GOLD};white-space:nowrap;">Concierge</td>
           <td style="width:40px;height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td>
         </tr>
       </table>`;

  // Inquiry stationery card — Inquiry Number always shown; Event Type / Date only when present.
  const detailCells = [];
  if (eventType) {
    detailCells.push(`<td width="50%" align="center" valign="top" style="padding:20px 16px;border-top:1px solid ${GOLD};${eventDate ? `border-right:1px solid ${GOLD};` : ''}">
                        <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};padding-bottom:8px;">Event Type</div>
                        <div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;color:${INK};">${esc(eventType)}</div>
                      </td>`);
  }
  if (eventDate) {
    detailCells.push(`<td width="50%" align="center" valign="top" style="padding:20px 16px;border-top:1px solid ${GOLD};">
                        <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};padding-bottom:8px;">Event Date</div>
                        <div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;color:${INK};">${esc(eventDate)}</div>
                      </td>`);
  }
  const detailRow = detailCells.length
    ? `<tr><td style="padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${detailCells.join('')}</tr></table></td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Your Simply Sexy Cigars Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:${BLACK};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <span style="display:none;font-size:1px;color:${BLACK};max-height:0;max-width:0;opacity:0;overflow:hidden;">Your inquiry has been received — a concierge specialist will be in touch shortly.</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BLACK};">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- HEADER (black) -->
        <tr><td align="center" style="background-color:${BLACK};padding:38px 24px 30px;">
          ${brandmark}
        </td></tr>

        <!-- FRAMED BODY: thin gold frame wrapping the ivory content -->
        <tr><td style="background-color:${BLACK};padding:0 20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${GOLD};background-color:${IVORY};">
            <tr><td style="padding:46px 40px 42px;">

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td align="center" style="font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.35;color:${INK};padding-bottom:18px;">
                  Your Simply Sexy Cigars<br>Inquiry Has Been Received
                </td></tr>
                <tr><td align="center" style="padding-bottom:34px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                    <tr>
                      <td style="width:46px;height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td>
                      <td style="padding:0 10px;font-family:Georgia,serif;color:${GOLD};font-size:13px;line-height:1;">&#9670;</td>
                      <td style="width:46px;height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td>
                    </tr>
                  </table>
                </td></tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.85;color:#3A3A3C;padding-bottom:16px;">
                  Dear <span style="color:${GOLD};">${esc(name)}</span>,
                </td></tr>
                <tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.85;color:#3A3A3C;padding-bottom:16px;">
                  Thank you for allowing Simply Sexy Cigars Concierge to be a part of your upcoming celebration.
                </td></tr>
                <tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.85;color:#3A3A3C;padding-bottom:34px;">
                  We have received the details of your inquiry, and one of our concierge specialists will be in touch with you shortly.
                </td></tr>
              </table>

              <!-- Inquiry stationery card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${IVORY};border:1px solid ${GOLD};">
                <tr><td style="padding:30px 24px 26px;" align="center">
                  <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};padding-bottom:12px;">Your Inquiry Number</div>
                  <div style="font-family:Georgia,'Times New Roman',serif;font-size:25px;letter-spacing:2px;color:${INK};">${esc(inquiryNumber)}</div>
                </td></tr>
                ${detailRow}
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.85;color:#3A3A3C;padding:34px 0 0;">
                  In the meantime, should you have any additional details or questions, please don&#39;t hesitate to reach out.
                </td></tr>
              </table>

              <!-- Quote (dark ink on ivory, generous spacing) -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td align="center" style="padding:36px 0 24px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px;"><tr><td style="width:50px;height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr></table>
                  <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:18px;line-height:1.75;color:${INK};padding:0 16px;">
                    &#8220;Luxury is not measured by what is purchased.<br>It is measured by what is remembered.&#8221;
                  </div>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px auto 0;"><tr><td style="width:50px;height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr></table>
                </td></tr>
              </table>

              <!-- Signature: understated styled script for "Lola" (no image, no flourish) -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#3A3A3C;padding-top:16px;">
                  Warm regards,
                </td></tr>
                <tr><td style="padding:6px 0 4px;">
                  <span style="font-family:'Snell Roundhand','Apple Chancery','Segoe Script',Georgia,serif;font-style:italic;font-size:34px;line-height:1;color:${INK};">Lola</span>
                </td></tr>
                <tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};padding-top:6px;">
                  Simply Sexy Cigars Concierge
                </td></tr>
              </table>

            </td></tr>
          </table>
        </td></tr>

        <!-- FOOTER (black): three balanced gold-symbol contact items -->
        <tr><td align="center" style="background-color:${BLACK};padding:8px 24px 34px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 20px;"><tr><td style="width:50px;height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr></table>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
            <tr>
              <td align="center" width="180" style="padding:0 6px;font-family:Helvetica,Arial,sans-serif;">
                <div style="color:${GOLD};font-size:16px;line-height:1.4;">&#9993;</div>
                <a href="mailto:lola@simplysexycigars.com" style="color:${PAPER};text-decoration:none;font-size:12px;">lola@simplysexycigars.com</a>
              </td>
              <td align="center" width="150" style="padding:0 6px;font-family:Helvetica,Arial,sans-serif;">
                <div style="color:${GOLD};font-size:16px;line-height:1.4;">&#9788;</div>
                <a href="https://simplysexycigars.com" style="color:${PAPER};text-decoration:none;font-size:12px;">simplysexycigars.com</a>
              </td>
              <td align="center" width="150" style="padding:0 6px;font-family:Helvetica,Arial,sans-serif;">
                <div style="color:${GOLD};font-size:16px;line-height:1.4;">&#9673;</div>
                <a href="https://www.instagram.com/simplysexycigars/" style="color:${PAPER};text-decoration:none;font-size:12px;">@simplysexycigars</a>
              </td>
            </tr>
          </table>
          <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:12px;color:${GOLD};padding-top:26px;">Experience First. Cigars Always.</div>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;color:${ASH};padding-top:10px;">SERVING NORTHERN CALIFORNIA</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function internalEmailHtml(d, inquiryNumber, submittedAt) {
  const row = (label, value) =>
    `<tr>
       <td style="padding:8px 16px 8px 0;color:${ASH};font-size:11px;letter-spacing:2px;text-transform:uppercase;vertical-align:top;white-space:nowrap;">${label}</td>
       <td style="padding:8px 0;color:${PAPER};font-size:14px;line-height:1.6;">${esc(value) || '<span style="color:#555;">—</span>'}</td>
     </tr>`;

  const marketing = [
    d.journal_opt_in ? 'Journal' : null,
    d.email_marketing_opt_in ? 'Email offers' : null,
    d.sms_marketing_opt_in ? 'SMS' : null,
  ].filter(Boolean).join(', ') || 'None';

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:${BLACK};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BLACK};">
    <tr><td align="center" style="padding:40px 24px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="font-family:Georgia,serif;font-size:20px;color:${GOLD};padding-bottom:6px;">New Inquiry · ${esc(inquiryNumber)}</td></tr>
        <tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;color:${ASH};text-transform:uppercase;padding-bottom:24px;">Received ${esc(submittedAt)}</td></tr>
        <tr><td style="border-top:1px solid rgba(201,169,97,0.25);padding-top:18px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family:Helvetica,Arial,sans-serif;">
            ${row('Name', d.name)}
            ${row('Email', d.email)}
            ${row('Phone', d.phone)}
            ${row('Preferred Contact', d.preferred_contact_method)}
            ${row('Event Type', d.event_type)}
            ${row('Guest Count', d.guest_count)}
            ${row('Event Date', d.event_date)}
            ${row('Location', d.location)}
            ${row('Budget Range', d.budget_range)}
            ${row('Marketing', marketing)}
          </table>
        </td></tr>
        <tr><td style="border-top:1px solid rgba(201,169,97,0.25);margin-top:18px;padding-top:18px;">
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;color:${ASH};text-transform:uppercase;padding-bottom:10px;">Message</div>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:${PAPER};white-space:pre-wrap;">${esc(d.message) || '—'}</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ---------- environment validation ----------

const REQUIRED_ENV = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY',
  'INQUIRY_TO_EMAIL',
  'INQUIRY_FROM_EMAIL',
  'INQUIRY_REPLY_TO_EMAIL',
];

// Returns an array of missing variable names (never their values).
function missingEnvVars() {
  return REQUIRED_ENV.filter((key) => {
    const v = process.env[key];
    return typeof v !== 'string' || v.trim().length === 0;
  });
}

// ---------- handler ----------

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  try {
    // --- environment validation (fail fast, never leak secret values) ---
    const missing = missingEnvVars();
    if (missing.length > 0) {
      console.error('Inquiry endpoint misconfigured. Missing env vars:', missing.join(', '));
      return res.status(500).json({ ok: false, error: 'Our inquiry service is temporarily unavailable. Please email us directly.' });
    }

    const body = typeof req.body === 'object' && req.body !== null ? req.body : {};

    // --- validate + sanitize ---
    const data = {
      name: clean(body.name),
      email: clean(body.email, 320),
      phone: clean(body.phone, 40),
      preferred_contact_method: clean(body.preferred_contact_method, 40),
      event_type: clean(body.event_type, 100),
      guest_count: body.guest_count ? parseInt(body.guest_count, 10) || null : null,
      event_date: clean(body.event_date, 40),
      location: clean(body.location, 300),
      budget_range: clean(body.budget_range, 100),
      message: clean(body.message, MAX.message),
      email_marketing_opt_in: cleanBool(body.email_marketing_opt_in),
      sms_marketing_opt_in: cleanBool(body.sms_marketing_opt_in),
      journal_opt_in: cleanBool(body.journal_opt_in),
      source: 'website',
      status: 'new',
    };

    if (!data.name) {
      return res.status(400).json({ ok: false, error: 'Please share your name.' });
    }
    if (!isEmail(data.email)) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );

    // --- generate inquiry number: SSC-<year>-00137 onward ---
    const year = new Date().getFullYear();
    const { data: latest, error: seqError } = await supabase
      .from('inquiries')
      .select('inquiry_number')
      .order('id', { ascending: false })
      .limit(1);

    if (seqError) {
      console.error('Sequence lookup failed:', seqError);
      return res.status(500).json({ ok: false, error: 'We could not save your inquiry. Please try again or email us directly.' });
    }

    let sequence = STARTING_SEQUENCE;
    if (latest && latest.length > 0 && latest[0].inquiry_number) {
      const match = String(latest[0].inquiry_number).match(/(\d+)$/);
      if (match) sequence = parseInt(match[1], 10) + 1;
    }
    const inquiryNumber = `SSC-${year}-${String(sequence).padStart(5, '0')}`;

    // --- save ---
    const { error: insertError } = await supabase
      .from('inquiries')
      .insert([{ inquiry_number: inquiryNumber, ...data }]);

    if (insertError) {
      console.error('Supabase insert failed:', insertError);
      return res.status(500).json({ ok: false, error: 'We could not save your inquiry. Please try again or email us directly.' });
    }

    // --- emails (failure here should not fail the request; the inquiry is saved) ---
    const resend = new Resend(process.env.RESEND_API_KEY);
    const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'long', timeStyle: 'short' }) + ' PT';

    // INQUIRY_TO_EMAIL may be a comma-separated list; Resend expects an array for multiple recipients.
    const notificationRecipients = process.env.INQUIRY_TO_EMAIL
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean);

    const emailJobs = [
      resend.emails.send({
        from: `Simply Sexy Cigars Concierge <${process.env.INQUIRY_FROM_EMAIL}>`,
        to: notificationRecipients,
        replyTo: data.email,
        subject: `🔥 New Inquiry #${inquiryNumber}`,
        html: internalEmailHtml(data, inquiryNumber, submittedAt),
      }),
      resend.emails.send({
        from: `Simply Sexy Cigars Concierge <${process.env.INQUIRY_FROM_EMAIL}>`,
        to: data.email,
        replyTo: process.env.INQUIRY_REPLY_TO_EMAIL,
        subject: 'Your Simply Sexy Cigars Inquiry Has Been Received',
        html: customerEmailHtml({
          name: firstName(data.name),
          inquiryNumber,
          eventType: data.event_type,
          eventDate: data.event_date,
        }),
      }),
    ];

    const results = await Promise.allSettled(emailJobs);
    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`Email ${i === 0 ? 'internal' : 'customer'} failed:`, r.reason);
      else if (r.value && r.value.error) console.error(`Email ${i === 0 ? 'internal' : 'customer'} error:`, r.value.error);
    });

    return res.status(200).json({ ok: true, inquiryNumber });
  } catch (err) {
    console.error('Inquiry handler error:', err);
    return res.status(500).json({ ok: false, error: 'Something went wrong on our end. Please try again or email us directly.' });
  }
}