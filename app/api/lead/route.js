import { NextResponse } from 'next/server';
import { BRANDS, CONSENT_TEXT, CONSENT_VERSION } from '@/lib/brands';
import { QUESTIONS } from '@/lib/questions';
import { hasDb, sql, ensureSchema, overLimit, audit } from '@/lib/db';
import { hasEmail, sendLeadEmails } from '@/lib/email';
import { clientIp, hashIp, sameOrigin, verifyTurnstile } from '@/lib/security';

export const runtime = 'nodejs';

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const pick = (v, allowed) => (allowed.includes(v) ? v : '');
const pickMany = (arr, allowed) => (Array.isArray(arr) ? [...new Set(arr.filter((x) => allowed.includes(x)))] : []);

function bad(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req) {
  if (!(await sameOrigin())) return bad('Please submit the form from our website.', 403);

  let body;
  try {
    body = await req.json();
  } catch {
    return bad('Something went wrong. Please try again.');
  }
  if (body._gotcha) return NextResponse.json({ ok: true }); // bot trap: pretend it worked

  const brand = BRANDS[body.brand] ? body.brand : null;
  if (!brand) return bad('Unknown site.');
  const Q = QUESTIONS[brand];

  const ip = await clientIp();
  if (!(await verifyTurnstile(body.turnstile, ip))) return bad('Please complete the "I am human" check and try again.');

  const name = clean(body.name, 100);
  const email = clean(body.email, 200).toLowerCase();
  const phoneDigits = String(body.phone ?? '').replace(/\D/g, '');
  const area = clean(body.area, 100);
  const goal = pick(body.goal, Q.goal);
  const contact_pref = pick(body.contact_pref, Q.contact_pref);

  if (name.length < 2) return bad('Please enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return bad('Please enter a valid email address.');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) return bad('Please enter a valid phone number.');
  if (area.length < 2) return bad('Please enter a city or ZIP code.');
  if (!goal) return bad('Please choose what you need help with.');
  if (body.consent !== true) return bad('Please check the box to agree to be contacted.');

  const interests =
    brand === 'ninjas'
      ? {
          lifestyle: pickMany(body.lifestyle, Q.lifestyle),
          hobbies: pickMany(body.hobbies, Q.hobbies),
          hobbies_other: clean(body.hobbies_other, 120),
          pace: pick(body.pace, Q.pace),
        }
      : {
          property_type: pick(body.property_type, Q.property_type),
          best_time: pick(body.best_time, Q.best_time),
        };

  const lead = { name, email, phone: phoneDigits, area, goal, contact_pref, interests };
  const ipHash = hashIp(ip);

  try {
    if (hasDb()) {
      await ensureSchema();
      if (await overLimit(`lead:${ipHash}`, 5, 60)) return bad('Too many requests. Please try again later.', 429);

      const ua = clean(req.headers.get('user-agent'), 300);
      const source = clean(body.source, 200);
      const rows = await sql()`
        INSERT INTO leads (brand, name, email, phone, area, goal, interests, contact_pref,
                           consent_text, consent_version, ip_hash, user_agent, source)
        VALUES (${brand}, ${name}, ${email}, ${phoneDigits}, ${area}, ${goal}, ${JSON.stringify(interests)}, ${contact_pref},
                ${CONSENT_TEXT}, ${CONSENT_VERSION}, ${ipHash}, ${ua}, ${source})
        RETURNING id`;
      const id = rows[0].id;
      await audit('lead_created', id, brand);

      if (hasEmail(brand)) {
        await sendLeadEmails(brand, lead);
        await sql()`UPDATE leads SET wwrea_sent_at = now() WHERE id = ${id}`;
      } else {
        await forwardToFormspree(brand, lead);
      }
    } else {
      await forwardToFormspree(brand, lead);
    }
  } catch (e) {
    console.error('lead error', e);
    return bad('We could not save your request. Please try again in a minute.', 500);
  }

  return NextResponse.json({ ok: true });
}

// Backup path until the database and email are connected: Formspree emails Tony.
async function forwardToFormspree(brand, lead) {
  const b = BRANDS[brand];
  const form = new URLSearchParams();
  form.set('_subject', `New ${b.name} lead: ${lead.goal} in ${lead.area}`);
  form.set('form', 'Platform questionnaire');
  form.set('name', lead.name);
  form.set('email', lead.email);
  form.set('phone', lead.phone);
  form.set('area', lead.area);
  form.set('goal', lead.goal);
  form.set('contact_pref', lead.contact_pref);
  for (const [k, v] of Object.entries(lead.interests)) form.set(k, Array.isArray(v) ? v.join(', ') : String(v || ''));
  form.set('consent', `Yes (${CONSENT_VERSION})`);
  const r = await fetch(b.formspree, { method: 'POST', body: form, headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`Formspree ${r.status}`);
}
