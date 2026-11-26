// Brand settings for the two sites served by this one app.
// The firm line is what NC advertising rules require on every page: the name of the licensed brokerage.

export const BROKER_NAME = 'Tony Brooks Ward Jr';

export const BRANDS = {
  ninjas: {
    key: 'ninjas',
    name: 'Real Estate Ninjas',
    domain: 'realestateninjas.com',
    base: '',
    gaId: 'G-3NCNG7GPJ8',
    formspree: 'https://formspree.io/f/mqpeybbv',
    firmLine: 'Real Estate Ninjas, a licensed North Carolina real estate brokerage',
    prelaunchLine: 'Real Estate Ninjas is launching soon in North and South Carolina',
    emailFromVar: 'EMAIL_FROM_NINJAS',
    contactEmail: 'match@realestateninjas.com',
  },
  hl: {
    key: 'hl',
    name: 'Home Liquidation',
    domain: 'homeliquidation.com',
    base: '/hl',
    gaId: 'G-1983EYHND6',
    formspree: 'https://formspree.io/f/meaerkyb',
    firmLine: 'Home Liquidation, a licensed North Carolina real estate brokerage',
    prelaunchLine: 'Home Liquidation is launching soon in North Carolina',
    emailFromVar: 'EMAIL_FROM_HL',
    contactEmail: 'help@homeliquidation.com',
  },
};

// Where the official NC Real Estate Commission disclosure lives (Publications > Disclosure Forms).
export const WWREA_URL = 'https://www.ncrec.gov';

// Bump this when the consent wording on the forms changes; it's saved with every lead.
export const CONSENT_VERSION = '2026-11-21';

export const CONSENT_TEXT =
  'I agree that the brokerage and the agent or partner it refers me to may contact me by phone, text or email about my request. Consent is not a condition of using the service. Message and data rates may apply. Reply STOP to opt out of texts.';

// Search engines stay out until Tony flips SITE_LIVE=true at launch.
export const isLive = () => process.env.SITE_LIVE === 'true';

// Until SITE_LIVE=true the brokerage isn't registered yet: show the pre-launch line and no broker name.
export const firmText = (b) => (isLive() ? b.firmLine : b.prelaunchLine);
export const brokerText = (sep = ' · ') => (isLive() ? `${sep}Broker: ${BROKER_NAME}` : '');
