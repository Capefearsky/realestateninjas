import LeadForm from '@/components/LeadForm';
import { QUESTIONS } from '@/lib/questions';

const IMG = '/img';
const AREAS = ['Wilmington', 'Leland', 'Wrightsville Beach', 'Carolina Beach', 'Kure Beach', 'Hampstead', 'Southport', 'Oak Island', 'Jacksonville', 'Topsail Beach', 'Raleigh', 'Durham', 'Chapel Hill', 'Cary', 'Charlotte', 'Lake Norman', 'Greensboro', 'Winston-Salem', 'Fayetteville', 'Asheville', 'Boone', 'Outer Banks'];
const FAQ = [
  ['Does it cost anything to get matched?', 'No. Matching is free for buyers and sellers. The agent you’re matched with pays Real Estate Ninjas a referral fee only if your sale or purchase closes, and it doesn’t change what you pay.'],
  ['Why do you ask about my hobbies and lifestyle?', 'Buying or selling a home is personal. After matching on area and local experience, we look for an agent who shares your interests and works the way you like to communicate.'],
  ['Why don’t you ask about my budget or timeline?', 'Those are personal details. North Carolina requires us to review the Working With Real Estate Agents disclosure with you before we talk about them, so we do that on our first call.'],
  ['Will my information be sold to a bunch of agents?', 'No. We don’t sell or auction your information. A person on our team reads your answers and introduces you to one agent picked for fit, not for who pays the most. If it isn’t a good match, just tell us and we’ll find someone else.'],
  ['How fast will I hear from someone?', 'Within one business day, the way you told us you like to be reached.'],
  ['Am I obligated to work with the agent?', 'No. You’re free to say no, and you can ask for a different match before you sign anything with an agent.'],
  ['What areas do you cover?', 'All of North Carolina, from the coast to the mountains. South Carolina is coming later.'],
];

export default function Home() {
  return (
    <main>
      <section id="start" className="wrap hero">
        <div className="copy">
          <span className="pill">North Carolina · Free · No obligation</span>
          <h1>An agent who knows your market, and gets you.</h1>
          <p className="lead">Answer a few quick questions about where you’re moving and the way you live. We’ll match you with one licensed North Carolina agent who knows the area, and who you’ll actually enjoy working with.</p>
          <p className="promise"><b>A personal match, never a sale to the highest bidder.</b> Your answers go to one hand-picked agent, not a list of agents competing for your phone number.</p>
          <div className="stats">
            <div><b>2 min</b><span>questionnaire</span></div>
            <div><b>1 day</b><span>to meet your match</span></div>
            <div><b>$0</b><span>fee to you</span></div>
          </div>
        </div>
        <div className="formcol">
          <LeadForm brand="ninjas" base="" questions={QUESTIONS.ninjas} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''} title="Find your Ninja agent" />
        </div>
      </section>

      <section id="process" className="band">
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <h2 className="sec">From quiz to closing day, in three steps.</h2>
          <div className="grid3">
            <div className="tile"><b>Step 1</b><h3>Take the 2-minute quiz</h3><p>Tell us where you’re looking, the kind of place you love and how you like to work.</p></div>
            <div className="tile"><b>Step 2</b><h3>A quick first call</h3><p>We review North Carolina’s agency disclosure with you, then talk through your price range and timing.</p></div>
            <div className="tile"><b>Step 3</b><h3>Meet your agent</h3><p>We introduce one agent with local experience who fits your style, and check in until closing day.</p></div>
          </div>
        </div>
      </section>

      <section id="why" className="plain">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 56, alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}><img src={`${IMG}/sell-house.webp`} alt="Tan house with a red ninja mask beside a palm tree" width="900" height="703" loading="lazy" style={{ width: '100%', height: 'auto' }} /></div>
          <div style={{ flex: '1 1 400px' }}>
            <span className="eyebrow">Why Real Estate Ninjas</span>
            <h2 className="sec">Matched on more than a ZIP code.</h2>
            <p className="muted">We start with local experience in your area, then look for someone who shares your interests and talks the way you like to talk. The fisherman gets the agent who knows the boat ramps.</p>
            <p className="muted" style={{ marginTop: 16 }}><b>No bidding wars for your info.</b> Many lead sites sell your contact details to whichever agents pay the most, so your phone rings off the hook. We don’t. A real person reads your answers and picks one agent for you, based on fit.</p>
            <p style={{ marginTop: 24 }}><a className="btnlink" href="#start">Take the quiz</a></p>
          </div>
        </div>
      </section>

      <section id="areas" className="band">
        <div className="wrap">
          <span className="eyebrow">Where we match</span>
          <h2 className="sec">From the Outer Banks to the Blue Ridge.</h2>
          <div className="chips">{AREAS.map((a) => <span key={a}>{a}</span>)}</div>
        </div>
      </section>

      <section id="faq" className="plain">
        <div className="wrap faq" style={{ maxWidth: 880 }}>
          <h2 className="sec">Common questions</h2>
          {FAQ.map(([q, a]) => <div key={q}><h3>{q}</h3><p className="muted">{a}</p></div>)}
        </div>
      </section>
    </main>
  );
}
