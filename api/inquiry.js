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

function customerEmailHtml({ name, inquiryNumber, eventType, eventDate }) {
  const rows = [];
  rows.push(`<tr><td style="padding:6px 0;color:${ASH};font-size:11px;letter-spacing:3px;text-transform:uppercase;">Inquiry Number</td></tr>
             <tr><td style="padding:0 0 18px;color:${GOLD};font-size:16px;letter-spacing:2px;">${esc(inquiryNumber)}</td></tr>`);
  if (eventType) {
    rows.push(`<tr><td style="padding:6px 0;color:${ASH};font-size:11px;letter-spacing:3px;text-transform:uppercase;">Event</td></tr>
               <tr><td style="padding:0 0 18px;color:${PAPER};font-size:15px;">${esc(eventType)}</td></tr>`);
  }
  if (eventDate) {
    rows.push(`<tr><td style="padding:6px 0;color:${ASH};font-size:11px;letter-spacing:3px;text-transform:uppercase;">Date</td></tr>
               <tr><td style="padding:0 0 18px;color:${PAPER};font-size:15px;">${esc(eventDate)}</td></tr>`);
  }

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:${BLACK};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BLACK};">
    <tr><td align="center" style="padding:48px 24px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr><td align="center" style="padding-bottom:36px;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:4px;color:${PAPER};">SIMPLY <span style="color:${GOLD};font-style:italic;">SEXY</span> CIGARS</div>
          <div style="height:1px;width:64px;background-color:${GOLD};opacity:0.5;margin:20px auto 0;"></div>
        </td></tr>

        <tr><td style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:22px;line-height:1.5;color:${PAPER};text-align:center;padding-bottom:32px;">
          Your inquiry has been received.
        </td></tr>

        <tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:${PAPER};padding-bottom:28px;">
          Dear ${esc(name)},<br><br>
          Thank you for considering Simply Sexy Cigars for your celebration. Your inquiry is in hand, and Lola will personally review your event details and be in touch shortly to begin the conversation.
        </td></tr>

        <tr><td style="border-top:1px solid rgba(201,169,97,0.25);border-bottom:1px solid rgba(201,169,97,0.25);padding:24px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Helvetica,Arial,sans-serif;">${rows.join('')}</table>
        </td></tr>

        <tr><td align="center" style="padding:40px 20px;">
          <div style="height:1px;width:48px;background-color:${GOLD};opacity:0.5;margin:0 auto 24px;"></div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:18px;line-height:1.6;color:${PAPER};">
            Luxury is not measured by what is purchased.<br>It is measured by what is remembered.
          </div>
        </td></tr>

        <tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.8;color:${PAPER};padding-bottom:36px;">
          If any detail of your event changes, or if you simply wish to talk it through, reply to this email and it will reach Lola directly.<br><br>
          Warm regards,<br>
          <span style="color:${GOLD};">The Simply Sexy Cigars Concierge</span>
        </td></tr>

        <tr><td align="center" style="border-top:1px solid rgba(201,169,97,0.2);padding-top:28px;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:13px;color:${GOLD};">Experience First. Cigars Always.</div>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;color:${ASH};margin-top:14px;">SERVING NORTHERN CALIFORNIA</div>
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
        from: `Simply Sexy Cigars <${process.env.INQUIRY_FROM_EMAIL}>`,
        to: notificationRecipients,
        replyTo: data.email,
        subject: `🔥 New Inquiry #${inquiryNumber}`,
        html: internalEmailHtml(data, inquiryNumber, submittedAt),
      }),
      resend.emails.send({
        from: `Simply Sexy Cigars <${process.env.INQUIRY_FROM_EMAIL}>`,
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