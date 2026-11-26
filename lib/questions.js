// The only questions the public forms ask. Nothing here is confidential (no price, timeline,
// finances or motivation): those wait until Tony has reviewed the Working With Real Estate
// Agents disclosure on the first call. Fair housing: never add questions about religion, race,
// color, national origin, sex, disability, children or family status.

const groups = (g) => g.flatMap(([, list]) => list);

export const QUESTIONS = {
  ninjas: {
    goal: ['Sell', 'Buy', 'Buy and sell'],
    lifestyle: ['Beach', 'Lake or river', 'Downtown', 'Suburbs', 'Country or acreage', 'Mountains', 'Golf community'],
    // Common ground: grouped so the form can show them in sections. The flat list is what the API accepts.
    hobbyGroups: [
      ['On the water and outdoors', ['Fishing', 'Boating', 'Surfing', 'Kayaking or paddleboarding', 'Hunting', 'Hiking', 'Camping', 'Beach days', 'Gardening', 'Horses']],
      ['Sports and fitness', ['Golf', 'Tennis', 'Pickleball', 'Running', 'Biking', 'Fitness', 'Yoga', 'College sports', 'Pro sports', 'NASCAR and racing']],
      ['Food, fun and lifestyle', ['Cooking and grilling', 'Wine and breweries', 'Food scene', 'Live music', 'Arts and theater', 'Cars and motorcycles', 'Pets', 'DIY and projects', 'Photography', 'Travel', 'Volunteering', 'Gaming']],
    ],
    match_priority: ['Very important to me', 'Nice to have', 'Doesn’t matter, just local know-how'],
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

QUESTIONS.ninjas.hobbies = groups(QUESTIONS.ninjas.hobbyGroups);
