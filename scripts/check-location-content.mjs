#!/usr/bin/env node
/**
 * Location-content regression check.
 *
 * For EVERY course x city combination this resolves the same city-aware blocks
 * that src/app/(routes)/[slug]/page.js renders and fails (exit 1) if:
 *   - any block mentions a DIFFERENT city than the page's own city
 *     (e.g. "Pune" on /chatgpt-course-in-chennai), or
 *   - the H1/header title does not contain the page's city name, or
 *   - developer/debug strings or a foreign brand ("Learnova") appear in data.
 *
 * Run:  node scripts/check-location-content.mjs          (also runs in `prebuild`)
 *
 * No dependencies: it builds a patched temp copy of masterData.js (JSON import
 * attributes + absolute paths) and imports that.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const libDir = path.join(root, "src", "lib");
const jsonDirUrl = pathToFileURL(path.join(root, "public", "Jsonfolder")).href;

// ---- build patched temp copies -------------------------------------------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "loc-check-"));
const cityContentSrc = fs.readFileSync(path.join(libDir, "cityContent.js"), "utf8");
fs.writeFileSync(path.join(tmp, "cityContent.mjs"), cityContentSrc);
fs.copyFileSync(path.join(libDir, "courseAliases.js"), path.join(tmp, "courseAliases.mjs"));

let master = fs.readFileSync(path.join(libDir, "masterData.js"), "utf8");
master = master
  .replace(/from "\.\.\/\.\.\/public\/Jsonfolder\/([^"]+\.json)";/g,
    (_, f) => `from "${jsonDirUrl}/${f}" with { type: "json" };`)
  .replace('from "./cityContent.js"', 'from "./cityContent.mjs"');
fs.writeFileSync(path.join(tmp, "masterData.mjs"), master);

let md;
try {
  md = await import(pathToFileURL(path.join(tmp, "masterData.mjs")).href);
} finally {
  // keep tmp until import finished; remove after
}
const { coursesData, citiesData } = md;
const { LOCALITY_PARENT, resolveContentFamily } = await import(
  pathToFileURL(path.join(tmp, "cityContent.mjs")).href
);
const { COURSE_SLUG_ALIASES } = await import(
  pathToFileURL(path.join(tmp, "courseAliases.mjs")).href
);

// ---- helpers ----------------------------------------------------------------
const processPlaceholders = (obj, city) => {
  if (typeof obj === "string") return obj.replace(/\{city\}/g, city);
  if (Array.isArray(obj)) return obj.map((i) => processPlaceholders(i, city));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const k in obj) out[k] = processPlaceholders(obj[k], city);
    return out;
  }
  return obj;
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const citySlugs = Object.keys(citiesData);
const cityNames = [...new Set(citySlugs.map((s) => citiesData[s].name))];
// Word-boundary matchers for every city name, longest first.
const matchers = cityNames
  .sort((a, b) => b.length - a.length)
  .map((n) => ({ name: n, re: new RegExp(`\\b${escapeRe(n)}\\b`, "g") }));

const FORBIDDEN_STRINGS = [
  /check masterData\.js/i,
  /prop passing/i,
  /Learnova/i,
  /Experience Alteration/i,
  /No related courses data available/i,
];

const violations = [];
const add = (kind, slug, citySlug, detail) =>
  violations.push({ kind, page: `${slug}-course-in-${citySlug}`, detail });

// ---- run ----------------------------------------------------------------------
// Mirror page.js: alias slugs (data-science-with-ai, ...) resolve to their target first.
const courseSlugs = [
  ...new Set(Object.keys(coursesData).map((k) => COURSE_SLUG_ALIASES[k] || k)),
].filter((k) => coursesData[k]);

// Names a page may legitimately mention besides its own city: the localities of
// its parent city (Pune page -> Baner) and, for a locality page, its parent.
const allowedRelated = (citySlug) => {
  const allowed = new Set();
  const family = resolveContentFamily(citySlug);
  const parent = LOCALITY_PARENT[citySlug];
  for (const root of [family, parent].filter(Boolean)) {
    if (citiesData[root]) allowed.add(citiesData[root].name);
    for (const [loc, p] of Object.entries(LOCALITY_PARENT)) {
      if (p === root && citiesData[loc]) allowed.add(citiesData[loc].name);
    }
  }
  return allowed;
};

let pages = 0;
for (const courseSlug of courseSlugs) {
  const course = coursesData[courseSlug];

  for (const citySlug of citySlugs) {
    pages++;
    const cityName = citiesData[citySlug].name;
    const related = allowedRelated(citySlug);
    const blocks = {
      header: md.getHeaderForCity(courseSlug, citySlug, cityName),
      why: md.getWhyForCity(courseSlug, citySlug, cityName),
      whatYouWillLearn: md.getWhatYouWillLearnForCity(courseSlug, citySlug, cityName) || course.whatYouWillLearn,
      skills: md.getSkillsForCity(courseSlug, citySlug, cityName) || course.skillsndtools,
      whothisisfor: md.getWhoThisIsForForCity(courseSlug, citySlug, cityName),
      certificate: md.getCertificateForCity(courseSlug, citySlug, cityName),
      demoBanner: md.getDemoBannerForCity(courseSlug, citySlug, cityName),
      faq: course.faq,
      upcomingBatches: course.upcomingBatches,
      reviews: course.reviews,
      relatedCourses: course.relatedCourses,
      descriptionContent: course.descriptionContent,
      modulesData: course.modulesData,
      sapMod: course.sapMod,
    };

    for (const [blockName, raw] of Object.entries(blocks)) {
      if (raw === undefined || raw === null) continue;
      let text = JSON.stringify(processPlaceholders(raw, cityName));

      for (const f of FORBIDDEN_STRINGS) {
        if (f.test(text)) add("forbidden-string", courseSlug, citySlug, `${blockName}: ${f}`);
      }

      // Blank out the page's own name first ("Navi Mumbai" must not trip "Mumbai").
      text = text.replace(new RegExp(`\\b${escapeRe(cityName)}\\b`, "g"), " ");
      const foreign = matchers
        .filter((m) => m.name !== cityName && !related.has(m.name) && m.re.test(text))
        .map((m) => m.name);
      matchers.forEach((m) => (m.re.lastIndex = 0));
      if (foreign.length) {
        add("foreign-city", courseSlug, citySlug, `${blockName} mentions ${foreign.join(", ")}`);
      }
    }

    const h1 = processPlaceholders(blocks.header?.title, cityName);
    if (typeof h1 !== "string" || !h1.includes(cityName)) {
      add("h1-missing-city", courseSlug, citySlug, `H1 = ${JSON.stringify(h1)}`);
    }
  }
}

fs.rmSync(tmp, { recursive: true, force: true });

// ---- report ---------------------------------------------------------------------
const byKind = violations.reduce((a, v) => ((a[v.kind] = (a[v.kind] || 0) + 1), a), {});
console.log(`Checked ${pages} course x city pages (${courseSlugs.length} courses x ${citySlugs.length} cities).`);

if (violations.length === 0) {
  console.log("PASS: no cross-city content leaks, every H1 contains its city name.");
  process.exit(0);
}

console.error(`FAIL: ${violations.length} violation(s): ${JSON.stringify(byKind)}`);
for (const v of violations.slice(0, 40)) {
  console.error(`  [${v.kind}] /${v.page} -> ${v.detail}`);
}
if (violations.length > 40) console.error(`  ... and ${violations.length - 40} more`);
process.exit(1);
