// lib/orgFacts.js
//
// Single source of truth for public-facing business figures. Every component
// that shows a headline number should import from here so the homepage,
// placements page, about page and structured data can never disagree.
//
// >>> CONFIRM THESE VALUES. They were set to the figures used by the majority
// >>> of the site (homepage stats, trust bar, popular-courses bar, placements
// >>> counters). Change them here, once, and every page follows.

export const ORG_FACTS = Object.freeze({
  studentsTrained: "5,000+",
  hiringPartners: "200+",
  googleRating: "4.8",
  placementRate: "98%",
  averagePackage: "\u20b96 LPA",
  highestPackage: "\u20b924 LPA",
});
