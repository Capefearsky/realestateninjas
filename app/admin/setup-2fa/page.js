import { requireStage } from '@/lib/adminGuard';
import { hasDb, sql, ensureSchema } from '@/lib/db';
import { newTotpSecret, encrypt, decrypt } from '@/lib/security';

export default async function Setup({ searchParams }) {
  await requireStage('enroll');
  const sp = await searchParams;
  if (!hasDb()) return <div className="box"><p className="note">Connect the database first.</p></div>;
  await ensureSchema();
  const q = sql();
  let rows = await q`SELECT value FROM admin_settings WHERE key = 'totp_pending'`;
  let secret;
  if (rows.length) secret = decrypt(rows[0].value);
  else {
    secret = newTotpSecret();
    await q`INSERT INTO admin_settings (key, value) VALUES ('totp_pending', ${encrypt(secret)})`;
  }
  const grouped = secret.match(/.{1,4}/g).join(' ');
  return (
    <form className="box" action="/api/admin/enroll" method="post">
      <h2>Turn on two-step login</h2>
      <p>Open Google Authenticator, Authy or 1Password, choose <strong>Add account → Enter a setup key</strong>, and enter:</p>
      <p>Account: <code>Ninjas HQ</code></p>
      <p>Key: <code>{grouped}</code></p>
      <p className="meta">Time-based, 6 digits. Keep this key private; it’s only shown here, once, while you’re signed in.</p>
      {sp.e ? <p className="err">That code didn’t work. Check the key and try the newest code.</p> : null}
      <label>Enter the 6-digit code it shows<input name="code" inputMode="numeric" autoComplete="one-time-code" required maxLength={6} /></label>
      <button className="go" type="submit">Turn it on</button>
    </form>
  );
}
