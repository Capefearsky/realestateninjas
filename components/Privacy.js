import { BRANDS, firmText } from '@/lib/brands';

export default function Privacy({ brand, home }) {
  const b = BRANDS[brand];
  return (
    <main className="doc">
      <h1>Privacy policy</h1>
      <p><small>Last updated November 21, 2026</small></p>
      <p>{b.name} (“we,” “us”) runs {b.domain}. {firmText(b)}. This policy explains what we collect and what we do with it.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>What you give us:</strong> your name, email, phone number, the area you’re interested in, what you need help with, and the optional questionnaire answers you choose to give (such as lifestyle, hobbies and how you like to be contacted).</li>
        <li><strong>Consent record:</strong> the date, time and wording you agreed to when you asked us to contact you.</li>
        <li><strong>Usage data:</strong> Google Analytics helps us understand how visitors use the site (pages viewed, device type, general location). This uses cookies. We store a scrambled version of your IP address to prevent spam, not your actual address.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To contact you about your request and review North Carolina’s Working With Real Estate Agents disclosure with you.</li>
        <li>To introduce you to a licensed agent or independent partner company that fits your needs.</li>
        <li>To check in on how things are going and improve the service.</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>We share your details only with the agent or partner we introduce you to, and with service providers that help run the site: hosting (Vercel), our database, email delivery, spam protection (Cloudflare) and analytics (Google). <strong>We do not sell your personal information.</strong></p>
      <h2>Your choices</h2>
      <ul>
        <li>Unsubscribe from emails at any time, or reply STOP to any text.</li>
        <li>Ask us to see, correct or delete your information by emailing <a href={`mailto:${b.contactEmail}`}>{b.contactEmail}</a>.</li>
        <li>Block or delete cookies in your browser settings.</li>
      </ul>
      <h2>Keeping it safe</h2>
      <p>Your information is sent over encrypted connections, stored in a protected database, and only Tony can open it, using two-step login. We keep it only as long as we need it for the service and our legal record-keeping duties.</p>
      <p style={{ marginTop: 32 }}><a href={home || '/'}>← Back to {b.name}</a></p>
    </main>
  );
}
