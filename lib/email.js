import { BRANDS, WWREA_URL, BROKER_NAME } from './brands';

// Email goes through Resend once RESEND_API_KEY and the from-addresses are set in Vercel.
export const hasEmail = (brand) => Boolean(process.env.RESEND_API_KEY && process.env[BRANDS[brand].emailFromVar]);

async function send({ from, to, subject, text, replyTo }) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, text, reply_to: replyTo }),
  });
  if (!r.ok) throw new Error(`Email failed: ${r.status} ${await r.text().catch(() => '')}`);
}

const esc = (s) => String(s ?? '').replace(/[\r\n]+/g, ' ').slice(0, 300);

export async function sendLeadEmails(brandKey, lead) {
  const b = BRANDS[brandKey];
  const from = process.env[b.emailFromVar];
  const notify = process.env.NOTIFY_EMAIL;

  const firstName = esc(lead.name).split(' ')[0];
  const clientText = [
    `Hi ${firstName},`,
    '',
    `Thanks for reaching out to ${b.name}. We got your request and will be in touch within one business day, the way you asked us to reach you.`,
    '',
    'Before we talk about your plans, North Carolina requires us to go over a short disclosure called "Working With Real Estate Agents." It explains the ways a real estate agent can work with you. We will review it together on our first call. You can read it ahead of time on the NC Real Estate Commission website:',
    `${WWREA_URL} (Publications > Disclosure Forms)`,
    '',
    'Talk soon,',
    `Tony`,
    `${b.firmLine}`,
    `Broker: ${BROKER_NAME}`,
    '',
    `You are receiving this because you submitted a request at ${b.domain}. Reply STOP to any text to opt out.`,
  ].join('\n');

  await send({
    from,
    to: lead.email,
    subject: `We got your request - ${b.name}`,
    text: clientText,
    replyTo: notify || undefined,
  });

  if (notify) {
    const lines = Object.entries(lead.interests || {})
      .filter(([, v]) => v && (Array.isArray(v) ? v.length : true))
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
    await send({
      from,
      to: notify,
      subject: `New ${b.name} lead: ${esc(lead.goal || 'request')} in ${esc(lead.area)}`,
      text: [
        `Name: ${esc(lead.name)}`,
        `Email: ${esc(lead.email)}`,
        `Phone: ${esc(lead.phone)}`,
        `Area: ${esc(lead.area)}`,
        `Goal: ${esc(lead.goal)}`,
        `Contact by: ${esc(lead.contact_pref)}`,
        ...lines,
        '',
        'Reminder: review the Working With Real Estate Agents disclosure on the first call, before asking about price, timeline or motivation, then mark it reviewed in the admin.',
      ].join('\n'),
      replyTo: lead.email,
    });
  }
}
