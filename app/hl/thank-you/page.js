import LeadTracked from '@/components/LeadTracked';
import { WWREA_URL } from '@/lib/brands';
import { hlBase } from '@/lib/base';

export const metadata = { title: 'Thanks, we’ll call you soon | Home Liquidation', robots: { index: false } };

export default async function ThankYou() {
  const base = await hlBase();
  return (
    <main className="doc">
      <LeadTracked />
      <h1>Thanks, we’ll be in touch soon.</h1>
      <p>We got your request. Here’s what happens next:</p>
      <ol>
        <li><strong>We call you within one business day</strong>, at the time and in the way you picked.</li>
        <li><strong>We review North Carolina’s Working With Real Estate Agents disclosure</strong> with you first. You can read it now at <a href={WWREA_URL} target="_blank" rel="noopener noreferrer">ncrec.gov</a> (Publications &gt; Disclosure Forms).</li>
        <li><strong>We put together your written plan</strong>, with no obligation.</li>
      </ol>
      <p>Questions before then? Email <a href="mailto:help@homeliquidation.com">help@homeliquidation.com</a>.</p>
      <p><a className="btn" href={base || '/'}>Back to home</a></p>
    </main>
  );
}
