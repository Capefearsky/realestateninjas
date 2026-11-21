import LeadTracked from '@/components/LeadTracked';
import { WWREA_URL } from '@/lib/brands';

export const metadata = { title: 'Thanks, we’re on it | Real Estate Ninjas', robots: { index: false } };

export default function ThankYou() {
  return (
    <main className="doc">
      <LeadTracked />
      <h1>Thanks, we’re on it.</h1>
      <p>We got your questionnaire. Here’s what happens next:</p>
      <ol>
        <li><strong>A quick first call</strong> within one business day, the way you told us you like to be reached.</li>
        <li><strong>We review North Carolina’s Working With Real Estate Agents disclosure</strong> with you, then talk about your plans. You can read it now at <a href={WWREA_URL} target="_blank" rel="noopener noreferrer">ncrec.gov</a> (Publications &gt; Disclosure Forms).</li>
        <li><strong>We introduce your matched agent.</strong> If it’s not the right fit, tell us and we’ll find someone else.</li>
      </ol>
      <p><a className="btnlink" href="/">Back to home</a></p>
    </main>
  );
}
