// Guide content for both sites. Facts only from Tony or from linked sources.
// Fair housing: describe places and activities, never who lives there or who an area "suits".

export const AUTHOR = {
  name: 'Tony Brooks Ward Jr',
  short: 'Wilmington-area local for 50+ years, NC general contractor since 2006, NC real estate broker since 2019',
};

export const GUIDES = [
  {
    brand: 'ninjas',
    slug: 'living-in-wilmington-nc',
    area: 'Wilmington, NC',
    title: 'Living in Wilmington, NC: a lifelong local’s guide',
    description:
      'What it is really like to live in Wilmington, NC: the main areas, the beaches, getting around, hurricane season and how to pick the right part of town.',
    lede:
      'Wilmington is a river city with three beach towns next door. Where you land depends on how you want to spend a Saturday: on the water, on a golf course, downtown or out in the country.',
    updated: '2026-11-26',
    updatedText: 'November 2026',
    sections: [
      {
        h: 'Wilmington at a glance',
        p: [
          'Wilmington sits on the Cape Fear River in New Hanover County, with the Atlantic beaches about 15 to 30 minutes east and south depending on where you live. Downtown has a historic district and a Riverwalk along the water. I-40 starts here and runs west to Raleigh, and Wilmington International Airport (ILM) is a few minutes from downtown.',
          'The University of North Carolina Wilmington, the port and a busy film and medical scene keep the city active year-round, not just in beach season.',
        ],
        tip: 'Add one or two things only a lifelong local would say about Wilmington today versus 20 years ago.',
      },
      {
        h: 'The main parts of town',
        list: [
          'Downtown and the historic district: walkable streets, the Riverwalk, restaurants and older homes with character.',
          'Midtown and central Wilmington: close to everything, a mix of established neighborhoods and shopping.',
          'Ogden, Porters Neck and the north end: closer to the Intracoastal Waterway and Figure Eight Island, with easy access to Wrightsville Beach and Hampstead.',
          'Masonboro and Myrtle Grove: south-central, near the sound and boat ramps.',
          'Monkey Junction and the south end: toward Carolina Beach and Kure Beach on Pleasure Island.',
          'Across the river in Brunswick County: Leland, known for golf communities and newer construction, a short drive over the bridge into downtown.',
          'North into Pender County: Hampstead and the Topsail area for sound-side living.',
        ],
        tip: 'Correct or add to these areas from your own experience. Which ones would you steer a boater, a golfer or a downtown lover toward?',
      },
      {
        h: 'The beaches',
        p: [
          'Wrightsville Beach is the closest to the city and the busiest, with surfing, paddleboarding and a lot of boat traffic on the sound side. Carolina Beach has a boardwalk and a more laid-back town feel. Kure Beach, just south of it, is quieter and known for its fishing pier.',
          'Masonboro Island, between Wrightsville and Carolina Beach, is undeveloped and reachable only by boat, which makes it a favorite weekend spot for people who live on the water.',
        ],
      },
      {
        h: 'Living on the water',
        p: [
          'Boaters should pay close attention to water depth, bridge clearances and how far a home is from an inlet. A dock that looks great at high tide can sit in mud at low tide. Masonboro Inlet and Carolina Beach Inlet are the main routes to the ocean from the Wilmington side.',
          'Ask any agent you work with to check dock permits, HOA rules on boats and lifts, and the flood zone before you fall in love with a waterfront house.',
        ],
        tip: 'This is a good spot for your contractor eye: what should buyers check on docks, bulkheads and lifts?',
      },
      {
        h: 'Hurricane season and flood insurance',
        p: [
          'Atlantic hurricane season runs June 1 to November 30. Most years bring nothing worse than a few windy, rainy days, but storms do hit this coast, so a home’s elevation, flood zone and roof matter more here than inland.',
          'Standard homeowners insurance does not cover flood damage. Get flood and wind insurance quotes before you make an offer, not after, because they can change what a house really costs each month.',
        ],
        tip: 'Add what you look for as a general contractor when you walk a coastal house: roof, elevation, windows, crawl space.',
      },
      {
        h: 'How to pick the right area',
        list: [
          'Start with your weekends: water, golf, downtown, or space and quiet.',
          'Drive your real commute at rush hour, including the bridges if you are looking in Brunswick County.',
          'Check the flood zone and get insurance quotes early.',
          'Check school assignments directly with the school district, since attendance lines change.',
          'Visit at different times of year. Beach towns feel very different in July and January.',
        ],
      },
    ],
    sources: [
      ['NOAA: Atlantic hurricane season dates', 'https://www.noaa.gov/hurricane-prep'],
      ['FloodSmart (National Flood Insurance Program)', 'https://www.floodsmart.gov/'],
    ],
  },
  {
    brand: 'hl',
    slug: 'sell-inherited-house-north-carolina',
    area: 'North Carolina',
    title: 'How to sell an inherited house in North Carolina',
    description:
      'A plain-English guide to selling an inherited house in North Carolina: probate, the two-year rule for heirs, clearing out the contents and choosing how to sell.',
    lede:
      'Selling a parent’s or relative’s house is part paperwork, part logistics and part family decision. Here is the order things usually happen in North Carolina, and the one timing rule heirs most often miss.',
    updated: '2026-11-26',
    updatedText: 'November 2026',
    sections: [
      {
        h: '1. Find out whether there is a will and open the estate',
        p: [
          'In North Carolina, estates are handled by the Clerk of Superior Court in the county where the person lived. If there is a will, the named executor takes it to the clerk. If there is no will, a family member can apply to serve as administrator.',
          'Once appointed, that person (the personal representative) receives letters from the clerk that let them act for the estate, including dealing with the house.',
        ],
      },
      {
        h: '2. Know the two-year rule before heirs sign a deed',
        p: [
          'In North Carolina, title to real estate often passes to the heirs or the people named in the will at death, so heirs can sometimes sell directly. But timing matters.',
          'Under N.C. Gen. Stat. § 28A-17-12, if the estate publishes its notice to creditors within two years after the death, a sale by the heirs made after that notice and before the final account is approved is void as to creditors and the personal representative, unless the personal representative joins in the sale. If no creditor notice is published within two years, a sale by the heirs is valid as to creditors and the personal representative.',
          'In practice, most sales within the first two years have the personal representative sign the deed too. Your estate attorney and closing attorney will tell you exactly who needs to sign.',
        ],
      },
      {
        h: '3. Secure and insure the house',
        list: [
          'Change the locks or collect every key.',
          'Call the homeowners insurance company: many policies change or lapse when a house sits empty, so ask about vacancy coverage.',
          'Keep the utilities on so the house can be shown and does not get damaged by heat, cold or moisture.',
          'Forward the mail and watch for tax bills, mortgage statements and HOA notices.',
        ],
      },
      {
        h: '4. Deal with the contents',
        p: [
          'Most inherited houses are still full. The usual order is: family takes keepsakes first, then valuable items are sold through an estate sale or auction, then what is left is donated, and a cleanout crew handles the rest.',
          'Take photos and keep a simple list of what was sold, donated or kept. The personal representative may need it for the estate accounting.',
        ],
        tip: 'Add your own experience here: how long a typical cleanout takes and what families most often regret throwing away or keeping.',
      },
      {
        h: '5. Decide how to sell',
        list: [
          'List it on the market: usually the highest price, but it takes longer and may need cleaning, repairs and showings.',
          'Sell as-is: fewer repairs and a faster timeline, with a lower price in exchange.',
          'Take a cash offer: the fastest and simplest, usually the lowest price. Compare at least two offers against a market valuation before you accept one.',
        ],
        tip: 'As a contractor, add which repairs usually pay for themselves before listing and which don’t.',
      },
      {
        h: '6. Taxes',
        p: [
          'Inherited property usually gets a stepped-up tax basis, generally the value on the date of death, which can reduce or eliminate capital gains when it sells soon afterward. Rules depend on the estate, so confirm with a CPA before you sell.',
        ],
      },
      {
        h: 'If you live out of state',
        p: [
          'Much of this can be done remotely: walk-throughs by video, estate sale and cleanout crews working with a lockbox, and remote or mail-away closings. You will still need someone local you trust to coordinate it.',
        ],
      },
    ],
    sources: [
      ['N.C. Gen. Stat. § 28A-17-12 (NC General Assembly)', 'https://ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_28A/GS_28A-17-12.html'],
      ['Pierce Law Group: can heirs sell inherited property directly in NC?', 'https://piercelaw.com/news/probate-question-and-answer/can-the-heirs-sell-the-property-directly-or-does-the-estate-have-to-be-involved-in-signing-the-sale-documents-nc/'],
    ],
    disclaimer:
      'This guide is general information, not legal or tax advice. Every estate is different: talk with a North Carolina estate attorney and a CPA before you sell.',
  },
];

export const guidesFor = (brand) => GUIDES.filter((g) => g.brand === brand);
export const getGuide = (brand, slug) => GUIDES.find((g) => g.brand === brand && g.slug === slug);
