import { neon } from '@neondatabase/serverless';

// The database is optional until Tony connects one in Vercel (it sets DATABASE_URL).
// Without it, leads are forwarded to Formspree so nothing is lost.
export const hasDb = () => Boolean(process.env.DATABASE_URL);

let sqlClient = null;
export function sql() {
  if (!hasDb()) throw new Error('DATABASE_URL is not set');
  if (!sqlClient) sqlClient = neon(process.env.DATABASE_URL);
  return sqlClient;
}

let schemaReady = false;
// Creates the tables the first time they're needed. Safe to run again.
export async function ensureSchema() {
  if (schemaReady || !hasDb()) return;
  const q = sql();
  await q`CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    brand TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    area TEXT,
    goal TEXT,
    interests JSONB NOT NULL DEFAULT '{}'::jsonb,
    contact_pref TEXT,
    consent_text TEXT NOT NULL,
    consent_version TEXT NOT NULL,
    consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip_hash TEXT,
    user_agent TEXT,
    source TEXT,
    status TEXT NOT NULL DEFAULT 'New',
    notes TEXT,
    matched_to TEXT,
    wwrea_sent_at TIMESTAMPTZ,
    wwrea_reviewed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
  await q`CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at DESC)`;
  await q`CREATE TABLE IF NOT EXISTS rate_hits (
    key TEXT NOT NULL,
    at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
  await q`CREATE INDEX IF NOT EXISTS rate_hits_idx ON rate_hits (key, at)`;
  await q`CREATE TABLE IF NOT EXISTS admin_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
  await q`CREATE TABLE IF NOT EXISTS audit_log (
    id BIGSERIAL PRIMARY KEY,
    at TIMESTAMPTZ NOT NULL DEFAULT now(),
    action TEXT NOT NULL,
    lead_id BIGINT,
    detail TEXT
  )`;
  schemaReady = true;
}

export async function audit(action, leadId = null, detail = null) {
  if (!hasDb()) return;
  try {
    await sql()`INSERT INTO audit_log (action, lead_id, detail) VALUES (${action}, ${leadId}, ${detail})`;
  } catch (e) {
    console.error('audit failed', e.message);
  }
}

// Allows `limit` hits per `windowMinutes` for a key. Returns true when the caller is over the limit.
export async function overLimit(key, limit, windowMinutes) {
  if (!hasDb()) return false;
  const q = sql();
  const rows = await q`SELECT count(*)::int AS n FROM rate_hits WHERE key = ${key} AND at > now() - make_interval(mins => ${windowMinutes})`;
  if (rows[0].n >= limit) return true;
  await q`INSERT INTO rate_hits (key) VALUES (${key})`;
  if (Math.random() < 0.05) await q`DELETE FROM rate_hits WHERE at < now() - interval '1 day'`;
  return false;
}
