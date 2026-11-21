// The only questions the public forms ask. Nothing here is confidential (no price, timeline,
// finances or motivation): those wait until Tony has reviewed the Working With Real Estate
// Agents disclosure on the first call. Fair housing: never add questions about religion, race,
// color, national origin, sex, disability, children or family status.

export const QUESTIONS = {
  ninjas: {
    goal: ['Sell', 'Buy', 'Buy and sell'],
    lifestyle: ['Beach', 'Lake or river', 'Downtown', 'Suburbs', 'Country or acreage', 'Mountains', 'Golf community'],
    hobbies: [
      'Fishing', 'Boating', 'Surfing', 'Golf', 'Hunting', 'Hiking', 'Biking', 'Gardening', 'Fitness',
      'Cooking and grilling', 'Pets', 'Music', 'Sports fan', 'DIY and projects', 'Travel',
    ],
    pace: ['Show me everything', 'Just the best few', 'Somewhere in between'],
    contact_pref: ['Text', 'Phone call', 'Email'],
  },
  hl: {
    goal: ['Clearing out the contents', 'Selling the home', 'Both'],
    property_type: ['House', 'Condo or townhome', 'Mobile home', 'Land', 'Other'],
    best_time: ['Morning', 'Afternoon', 'Evening', 'Any time'],
    contact_pref: ['Phone call', 'Text', 'Email'],
  },
};
