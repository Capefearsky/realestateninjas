import { hasSessionSecret, readSession } from '@/lib/security';

export default async function Login({ searchParams }) {
  const sp = await searchParams;
  const s = await readSession();
  const codeStep = sp.step === 'code' && s?.stage === 'code';
  const errors = { bad: 'That didn’t match. Try again.', limit: 'Too many tries. Wait 15 minutes and try again.', code: 'That code didn’t work. Try the newest one.' };

  if (!hasSessionSecret() || !process.env.ADMIN_PASSWORD) {
    return (
      <div className="box">
        <h2>Admin not set up yet</h2>
        <p className="note">Add SESSION_SECRET and ADMIN_PASSWORD in the Vercel project’s environment variables, then redeploy.</p>
      </div>
    );
  }

  return codeStep ? (
    <form className="box" action="/api/admin/verify" method="post">
      <h2>Two-step login</h2>
      {sp.e ? <p className="err">{errors[sp.e] || errors.code}</p> : null}
      <label>6-digit code from your authenticator app<input name="code" inputMode="numeric" autoComplete="one-time-code" required maxLength={6} autoFocus /></label>
      <button className="go" type="submit">Verify</button>
    </form>
  ) : (
    <form className="box" action="/api/admin/login" method="post">
      <h2>Sign in</h2>
      {sp.e ? <p className="err">{errors[sp.e] || errors.bad}</p> : null}
      <label>Password<input name="password" type="password" autoComplete="current-password" required autoFocus /></label>
      <button className="go" type="submit">Continue</button>
    </form>
  );
}
