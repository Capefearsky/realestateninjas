import { requireStage } from '@/lib/adminGuard';
import { hasDb, sql, ensureSchema } from '@/lib/db';
import { BRANDS } from '@/lib/brands';

const STATUSES = ['New', 'Contacted', 'Disclosure reviewed', 'Matched', 'Referral agreement signed', 'Under contract', 'Closed - fee due', 'Closed - paid', 'Not a fit', 'No response'];
const fmt = (d) => (d ? new Date(d).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' }) : '');

export default async function Dashboard({ searchParams }) {
  await requireStage('full');
  const sp = await searchParams;
  const brand = BRANDS[sp.brand] ? sp.brand : '';

  if (!hasDb()) {
    return <p className="note">The database isn’t connected yet, so leads are still going to Formspree. Connect Neon in Vercel to see them here.</p>;
  }
  await ensureSchema();
  const q = sql();
  const leads = brand
    ? await q`SELECT * FROM leads WHERE brand = ${brand} ORDER BY created_at DESC LIMIT 200`
    : await q`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`;

  return (
    <>
      <div className="tabs">
        <a className={!brand ? 'on' : ''} href="/admin">All</a>
        <a className={brand === 'ninjas' ? 'on' : ''} href="/admin?brand=ninjas">Real Estate Ninjas</a>
        <a className={brand === 'hl' ? 'on' : ''} href="/admin?brand=hl">Home Liquidation</a>
      </div>
      {sp.saved ? <p className="note">Saved.</p> : null}
      {leads.length === 0 ? <p>No leads yet.</p> : null}
      {leads.map((l) => {
        const i = l.interests || {};
        const extras = Object.entries(i)
          .filter(([, v]) => v && (!Array.isArray(v) || v.length))
          .map(([k, v]) => `${k.replace('_', ' ')}: ${Array.isArray(v) ? v.join(', ') : v}`);
        return (
          <div className="lead" key={l.id}>
            <div>
              <h3>{l.name}</h3>
              <div className="meta">
                <span className="badge">{BRANDS[l.brand]?.name || l.brand}</span>
                {l.wwrea_reviewed_at ? <span className="badge ok">Disclosure reviewed</span> : <span className="badge warn">Review disclosure first</span>}
                <br />
                {fmt(l.created_at)}
                <br />
                <a href={`mailto:${l.email}`}>{l.email}</a> · <a href={`tel:${l.phone}`}>{l.phone}</a>
                <br />
                Prefers: {l.contact_pref}
              </div>
            </div>
            <div className="meta">
              <strong>{l.goal}</strong> · {l.area}
              <br />
              {extras.map((e) => <span key={e}>{e}<br /></span>)}
              Consent: {fmt(l.consent_at)} (v{l.consent_version})
              <br />
              Disclosure link emailed: {l.wwrea_sent_at ? fmt(l.wwrea_sent_at) : 'not yet'}
              {l.wwrea_reviewed_at ? <><br />Disclosure reviewed: {fmt(l.wwrea_reviewed_at)}</> : null}
            </div>
            <form action="/api/admin/lead" method="post">
              <input type="hidden" name="id" value={String(l.id)} />
              <div className="row">
                <select name="status" defaultValue={l.status}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
                <input name="matched_to" placeholder="Matched agent or partner" defaultValue={l.matched_to || ''} />
              </div>
              <textarea name="notes" rows={2} placeholder="Notes (price, timeline and motivation only after the disclosure is reviewed)" defaultValue={l.notes || ''} />
              <div className="row">
                {!l.wwrea_reviewed_at ? <label style={{ flexDirection: 'row', fontWeight: 400 }}><input type="checkbox" name="wwrea_reviewed" value="1" /> I reviewed the Working With Real Estate Agents disclosure</label> : null}
                <button className="go" type="submit">Save</button>
              </div>
            </form>
          </div>
        );
      })}
    </>
  );
}
