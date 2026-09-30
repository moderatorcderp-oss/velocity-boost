// lib/cityContent.js
//
// Single place that decides WHICH city-authored copy a course/city page may use.
//
// Background: the "Pune" JSON files (public/Jsonfolder/cities/pune/*) contain
// copy that is written *about Pune* ("Pune's IT corridor", "hiring partners
// across Pune"). Previously every city without its own file silently received
// that copy, so /chatgpt-course-in-chennai rendered "Generative AI Course in
// Pune". The rule now is:
//
//   1. Only cities listed in CONTENT_FAMILIES may use a city-authored file set.
//   2. Every other city (including unknown / newly added ones) uses the
//      course's city-neutral `{city}` templates.
//   3. For small blocks that only exist as Pune copy (who-this-is-for,
//      certificate, CTA banner) we reuse them ONLY after stripping anything
//      that makes a Pune-specific claim (see neutralizeCityCopy).
//
// This file must stay free of JSON imports so scripts/tests can load it alone.

/**
 * Cities that have their own authored copy files.
 * To give another city its own copy: add its JSON files in masterData.js and
 * add its slug here. Do NOT list neighbourhoods (baner, powai, ...) unless they
 * genuinely have their own copy — they should render as "<course> in Baner",
 * not as a re-skinned Pune page.
 */
export const CONTENT_FAMILIES = Object.freeze({
  pune: "Pune",
  mumbai: "Mumbai",
  raipur: "Raipur",
});

/**
 * Neighbourhoods / satellite towns and the city they belong to. Used for
 * validation (a Pune page may legitimately mention Baner) — NOT to borrow the
 * parent city's copy.
 */
export const LOCALITY_PARENT = Object.freeze({
  katraj: "pune", "pimpri-chinchwad": "pune", "shivaji-nagar": "pune",
  "koregaon-park": "pune", "viman-nagar": "pune", "pimple-saudagar": "pune",
  baner: "pune", hinjewadi: "pune", wakad: "pune", kothrud: "pune",
  hadapsar: "pune", aundh: "pune",
  "navi-mumbai": "mumbai", thane: "mumbai", kalyan: "mumbai", bandra: "mumbai",
  andheri: "mumbai", powai: "mumbai", worli: "mumbai", chembur: "mumbai",
  malad: "mumbai", "vile-parle": "mumbai", matunga: "mumbai",
});

/** Returns "pune" | "mumbai" | "raipur" | null (null => use generic templates). */
export function resolveContentFamily(citySlug) {
  return Object.prototype.hasOwnProperty.call(CONTENT_FAMILIES, citySlug)
    ? citySlug
    : null;
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const DROP = Symbol("drop");

/**
 * Re-targets a block of copy written for `sourceName` (default "Pune") to
 * another city WITHOUT inventing local claims.
 *
 *  - "<course|training|classes|...> in Pune"  -> "... in <cityName>"
 *    (same claim the page H1 already makes)
 *  - any other mention (e.g. "Pune's IT corridor", "hiring partners across
 *    Pune") is a local-market claim we cannot verify for another city:
 *      * in a multi-sentence string -> only the offending sentence(s) are removed
 *      * in a single sentence       -> the string is rejected
 *      * a rejected string inside an array  -> that array item is removed
 *      * a rejected string inside an object -> the whole object is rejected
 *        (propagates up to the nearest array item, or to the root => null)
 *
 * `options.fallbacks` ({ key: replacementString }) applies to string
 * properties of the ROOT object only: instead of rejecting the whole block, a
 * rejected root property is replaced by its fallback (used for hero headers).
 *
 * Returns the cleaned copy, or null if nothing safe remains.
 */
export function neutralizeCityCopy(block, cityName, sourceName = "Pune", options = {}) {
  if (block === null || block === undefined) return null;
  const { fallbacks = {} } = options;

  const src = escapeRe(sourceName);
  const mention = new RegExp(`\\b(?:${src}|${src.toUpperCase()})\\b`);
  const safeOffered = new RegExp(
    `\\b((?:course|courses|training|program|programme|classes|class|certification)\\s+in\\s+)${src}\\b(?!['\u2019]s)`,
    "gi"
  );

  const cleanString = (text) => {
    if (!mention.test(text)) return text;
    const replaced = text.replace(safeOffered, `$1${cityName}`);
    if (!mention.test(replaced)) return replaced;

    // Multi-sentence copy: keep the sentences that make no other-city claim.
    const sentences = replaced.split(/(?<=[.!?])\s+/);
    if (sentences.length > 1) {
      const kept = sentences.filter((sentence) => !mention.test(sentence));
      if (kept.length) return kept.join(" ");
    }
    return DROP;
  };

  const walk = (node, depth) => {
    if (typeof node === "string") return cleanString(node);
    if (Array.isArray(node)) {
      return node.map((item) => walk(item, depth + 1)).filter((item) => item !== DROP);
    }
    if (node && typeof node === "object") {
      const out = {};
      for (const [key, value] of Object.entries(node)) {
        let result = walk(value, depth + 1);
        if (result === DROP && depth === 0 && typeof fallbacks[key] === "string") {
          result = fallbacks[key];
        }
        if (result === DROP) return DROP;
        out[key] = result;
      }
      return out;
    }
    return node;
  };

  const result = walk(block, 0);
  return result === DROP ? null : result;
}
