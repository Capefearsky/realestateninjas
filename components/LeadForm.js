'use client';
import { useEffect, useRef, useState } from 'react';
import { CONSENT_TEXT, WWREA_URL } from '@/lib/brands';

// One form component for both brands. The questions come from lib/questions.js.
export default function LeadForm({ brand, base, questions, siteKey, title }) {
  const Q = questions;
  const steps = brand === 'ninjas' ? ['Your move', 'Your style', 'Common ground', 'Your details'] : ['Your details'];
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    goal: Q.goal[0],
    area: '',
    lifestyle: [],
    hobbies: [],
    hobbies_other: '',
    teams: '',
    work: '',
    match_priority: Q.match_priority ? Q.match_priority[0] : '',
    pace: Q.pace ? Q.pace[0] : '',
    contact_pref: Q.contact_pref[0],
    property_type: Q.property_type ? Q.property_type[0] : '',
    best_time: Q.best_time ? Q.best_time[0] : '',
    name: '',
    email: '',
    phone: '',
    consent: false,
    _gotcha: '',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [token, setToken] = useState('');
  const formRef = useRef(null);
  const tsRef = useRef(null);
  const started = useRef(false);

  const set = (k, v) => {
    if (!started.current) {
      started.current = true;
      if (window.gtag) window.gtag('event', 'quiz_start', { lead_brand: brand });
    }
    setData((d) => ({ ...d, [k]: v }));
  };
  const toggle = (k, v) => set(k, data[k].includes(v) ? data[k].filter((x) => x !== v) : [...data[k], v]);

  // Cloudflare Turnstile bot check, only when a site key is configured.
  useEffect(() => {
    if (!siteKey) return;
    const render = () => {
      if (window.turnstile && tsRef.current && !tsRef.current.dataset.done) {
        tsRef.current.dataset.done = '1';
        window.turnstile.render(tsRef.current, { sitekey: siteKey, callback: setToken, 'expired-callback': () => setToken('') });
      }
    };
    if (window.turnstile) render();
    else {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = render;
      document.head.appendChild(s);
    }
  }, [siteKey, step]);

  const stepValid = () => {
    const fields = formRef.current?.querySelectorAll(`[data-step="${step}"] [required]`) || [];
    for (const f of fields) {
      if (!f.checkValidity()) {
        f.reportValidity();
        return false;
      }
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!stepValid()) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    if (siteKey && !token) {
      setError('Please complete the "I am human" check.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, brand, turnstile: token, source: document.referrer || '' }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) {
        try {
          sessionStorage.setItem('ren_lead', JSON.stringify({ brand, goal: data.goal }));
        } catch {}
        window.location.href = `${base}/thank-you`;
        return;
      }
      setError(d.error || 'That didn’t send. Please try again.');
    } catch {
      setError('That didn’t send. Check your connection and try again.');
    }
    setBusy(false);
  };

  const chips = (name, options, multi) => (
    <div className="opts">
      {options.map((o) => (
        <label className="opt" key={o}>
          <input
            type={multi ? 'checkbox' : 'radio'}
            name={name}
            checked={multi ? data[name].includes(o) : data[name] === o}
            onChange={() => (multi ? toggle(name, o) : set(name, o))}
          />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );

  const select = (name, label, options) => (
    <label className="lbl">
      {label}
      <select className="fld" value={data[name]} onChange={(e) => set(name, e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );

  const contactFields = (
    <>
      <label className="lbl">
        Your name
        <input className="fld" required autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} />
      </label>
      <div className="row2">
        <label className="lbl">
          Email
          <input className="fld" type="email" required autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} />
        </label>
        <label className="lbl">
          Phone
          <input className="fld" type="tel" required autoComplete="tel" pattern="[0-9()+\-. ]{10,20}" value={data.phone} onChange={(e) => set('phone', e.target.value)} />
        </label>
      </div>
    </>
  );

  const finalBits = (
    <>
      <label className="consent">
        <input type="checkbox" required checked={data.consent} onChange={(e) => set('consent', e.target.checked)} />
        <span>{CONSENT_TEXT} See our <a href={`${base}/privacy`}>privacy policy</a>.</span>
      </label>
      <p className="wwrea">
        <strong>About your privacy:</strong> please don’t share price, finances or personal reasons here. North Carolina
        requires us to review the <em>Working With Real Estate Agents</em> disclosure with you first, and we’ll do that on
        our first call. You can read it now at <a href={WWREA_URL} target="_blank" rel="noopener noreferrer">ncrec.gov</a>{' '}
        (Publications &gt; Disclosure Forms).
      </p>
      {siteKey ? <div ref={tsRef} className="ts" /> : null}
    </>
  );

  return (
    <form ref={formRef} className="card" onSubmit={submit} noValidate>
      <div className="formhead">
        <h2>{title}</h2>
        {steps.length > 1 && (
          <>
            <div className="progress" aria-hidden="true">
              {steps.map((s, i) => (
                <i key={s} className={i <= step ? 'on' : ''} />
              ))}
            </div>
            <p className="steplbl">
              Step {step + 1} of {steps.length} · {steps[step]}
            </p>
          </>
        )}
      </div>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="trap" value={data._gotcha} onChange={(e) => set('_gotcha', e.target.value)} />

      {brand === 'ninjas' ? (
        <>
          <div data-step="0" hidden={step !== 0} className="stepbox">
            <fieldset className="q">
              <legend>I'm looking to</legend>
              <div className="seg">
                {chips('goal', Q.goal)}
              </div>
            </fieldset>
            <label className="lbl">
              City or ZIP in North Carolina
              <input className="fld" required placeholder="e.g. Wilmington" value={data.area} onChange={(e) => set('area', e.target.value)} />
            </label>
          </div>
          <div data-step="1" hidden={step !== 1} className="stepbox">
            <fieldset className="q">
              <legend>What’s your kind of place? <small>Pick any</small></legend>
              {chips('lifestyle', Q.lifestyle, true)}
            </fieldset>
            <fieldset className="q">
              <legend>What do you love to do? <small>Pick any. This is how we find your common ground.</small></legend>
              {(Q.hobbyGroups || [['', Q.hobbies]]).map(([label, list]) => (
                <div key={label || 'all'} className="ggroup">
                  {label ? <p className="glbl">{label}</p> : null}
                  {chips('hobbies', list, true)}
                </div>
              ))}
            </fieldset>
          </div>
          <div data-step="2" hidden={step !== 2} className="stepbox">
            <p className="hint">Optional, but this is where the magic happens. The more we know, the better the match.</p>
            <label className="lbl">
              Favorite teams <small>(college or pro)</small>
              <input className="fld" placeholder="e.g. UNC Tar Heels, Carolina Panthers, Hurricanes" maxLength={120} value={data.teams} onChange={(e) => set('teams', e.target.value)} />
            </label>
            <label className="lbl">
              Your line of work <small>(or what you did before retiring)</small>
              <input className="fld" placeholder="e.g. nurse, contractor, teacher, military, small-business owner" maxLength={120} value={data.work} onChange={(e) => set('work', e.target.value)} />
            </label>
            <label className="lbl">
              Anything else you’d love to have in common with your agent?
              <input className="fld" placeholder="e.g. offshore fishing, restoring old trucks, a good BBQ joint" aria-label="Other common ground" maxLength={160} value={data.hobbies_other} onChange={(e) => set('hobbies_other', e.target.value)} />
            </label>
            <div className="row2">
              {select('match_priority', 'How much does common ground matter?', Q.match_priority)}
              {select('contact_pref', 'Best way to reach you', Q.contact_pref)}
            </div>
            {select('pace', 'How do you like to see homes or offers?', Q.pace)}
          </div>
          <div data-step="3" hidden={step !== 3} className="stepbox">
            {contactFields}
            {finalBits}
          </div>
        </>
      ) : (
        <div data-step="0" className="stepbox">
          <fieldset className="q">
            <legend>I need help with</legend>
            {chips('goal', Q.goal)}
          </fieldset>
          <div className="row2">
            <label className="lbl">
              City or ZIP of the property
              <input className="fld" required placeholder="e.g. Wilmington" value={data.area} onChange={(e) => set('area', e.target.value)} />
            </label>
            {select('property_type', 'Property type', Q.property_type)}
          </div>
          {contactFields}
          <div className="row2">
            {select('contact_pref', 'Best way to reach you', Q.contact_pref)}
            {select('best_time', 'Best time', Q.best_time)}
          </div>
          {finalBits}
        </div>
      )}

      {error ? <p className="status" role="status">{error}</p> : null}
      <div className="btnrow">
        {step > 0 && (
          <button type="button" className="btn back" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        <button type="submit" className="btn main" disabled={busy}>
          {busy ? 'Sending…' : step < steps.length - 1 ? 'Next' : brand === 'ninjas' ? 'Match me with an agent' : 'Request a call back'}
        </button>
      </div>
    </form>
  );
}
