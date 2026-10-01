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
const courseDirectorySrc = fs
  .readFileSync(path.join(libDir, "courseDirectory.js"), "utf8")
  .replace('"./courseAliases.js"', '"./courseAliases.mjs"');
fs.writeFileSync(path.join(tmp, "courseDirectory.mjs"), courseDirectorySrc);

const indexPath = path.join(root, "src", "data", "locationCourseIndex.json");
const locationPolicySrc = fs
  .readFileSync(path.join(libDir, "locationCoursePolicy.js"), "utf8")
  .replace(
    '"../data/locationCourseIndex.json"',
    `"${pathToFileURL(indexPath).href}"`
  );
fs.writeFileSync(path.join(tmp, "locationCoursePolicy.mjs"), locationPolicySrc);
const reviewedMetadataPath = path.join(
  root,
  "src",
  "data",
  "reviewedLocationMetadata.json"
);
const metaSeoSrc = fs
  .readFileSync(path.join(libDir, "metaSEO.js"), "utf8")
  .replace(
    '"../data/reviewedLocationMetadata.json"',
    `"${pathToFileURL(reviewedMetadataPath).href}"`
  );
fs.writeFileSync(path.join(tmp, "metaSEO.mjs"), metaSeoSrc);

let master = fs.readFileSync(path.join(libDir, "masterData.js"), "utf8");
master = master
  .replace(/from "\.\.\/\.\.\/public\/Jsonfolder\/([^"]+\.json)";/g,
    (_, f) => `from "${jsonDirUrl}/${f}" with { type: "json" };`)
  .replace('from "./cityContent.js"', 'from "./cityContent.mjs"');
fs.writeFileSync(path.join(tmp, "masterData.mjs"), master);

const dynamicSeo = fs
  .readFileSync(path.join(libDir, "dynamicSEO.js"), "utf8")
  .replace('"./masterData.js"', '"./masterData.mjs"')
  .replace('"./locationCoursePolicy.js"', '"./locationCoursePolicy.mjs"')
  .replace('"./metaSEO.js"', '"./metaSEO.mjs"');
fs.writeFileSync(path.join(tmp, "dynamicSEO.mjs"), dynamicSeo);

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
const { getCourseDirectoryEntries, COURSE_DIRECTORY_COUNT } = await import(
  pathToFileURL(path.join(tmp, "courseDirectory.mjs")).href
);
const { generateDynamicMetadata, generateDynamicJsonLd } = await import(
  pathToFileURL(path.join(tmp, "dynamicSEO.mjs")).href
);
const { getMeta } = await import(pathToFileURL(path.join(tmp, "metaSEO.mjs")).href);
const locationCourseIndex = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const reviewedLocationMetadata = JSON.parse(
  fs.readFileSync(reviewedMetadataPath, "utf8")
);
const { isIndexableLocationCourse } = await import(
  pathToFileURL(path.join(tmp, "locationCoursePolicy.mjs")).href
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
const directoryCourses = getCourseDirectoryEntries(coursesData);
const directoryCanonicalSlugs = directoryCourses
  .map(({ slug }) => COURSE_SLUG_ALIASES[slug] || slug)
  .filter((slug) => coursesData[slug]);
if (
  directoryCanonicalSlugs.length !== courseSlugs.length ||
  new Set(directoryCanonicalSlugs).size !== courseSlugs.length ||
  directoryCourses.length !== COURSE_DIRECTORY_COUNT
) {
  const missingDirectorySlugs = courseSlugs.filter(
    (slug) => !directoryCanonicalSlugs.includes(slug)
  );
  violations.push({
    kind: "course-directory-coverage",
    page: "/all-course-links",
    detail: `Finder has ${directoryCourses.length} entries; expected ${courseSlugs.length} unique courses. Missing: ${missingDirectorySlugs.join(", ")}.`,
  });
}

const indexedEntries = new Set();
for (const entry of locationCourseIndex.entries || []) {
  const key = `${entry.courseSlug}__${entry.citySlug}`;
  if (indexedEntries.has(key)) {
    violations.push({ kind: "duplicate-index-policy", page: key, detail: "Duplicate course-city entry." });
  }
  indexedEntries.add(key);
  if (
    typeof entry.courseSlug !== "string" ||
    typeof entry.citySlug !== "string" ||
    typeof entry.isActuallyOffered !== "boolean" ||
    typeof entry.hasLocalCenter !== "boolean" ||
    typeof entry.hasUniqueLocalContent !== "boolean" ||
    typeof entry.indexable !== "boolean"
  ) {
    violations.push({ kind: "invalid-index-policy", page: key, detail: "Every policy entry needs explicit fields." });
  }
  if (isIndexableLocationCourse(entry)) {
    if (!coursesData[entry.courseSlug] || !citiesData[entry.citySlug]) {
      violations.push({ kind: "unknown-index-policy-target", page: key, detail: "Course or city slug does not exist." });
    }
  }
}

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

for (const [citySlug, courseEntries] of Object.entries(
  reviewedLocationMetadata.cities || {}
)) {
  for (const [courseSlug, entry] of Object.entries(courseEntries)) {
    if (!coursesData[courseSlug] || !citiesData[citySlug]) {
      violations.push({
        kind: "invalid-reviewed-metadata-target",
        page: `${courseSlug}__${citySlug}`,
        detail: "Reviewed overrides must reference a known course and city.",
      });
      continue;
    }
    const meta = getMeta(
      courseSlug,
      citySlug,
      coursesData[courseSlug],
      citiesData[citySlug],
      cityNames,
      true
    );
    const metadataCopy = `${meta.metaTitle} ${meta.metaDescription}`;
    const foreignCities = matchers
      .filter(
        (matcher) =>
          matcher.name !== citiesData[citySlug].name &&
          !citiesData[citySlug].name
            .toLowerCase()
            .includes(matcher.name.toLowerCase()) &&
          matcher.re.test(metadataCopy)
      )
      .map((matcher) => matcher.name);
    matchers.forEach((matcher) => (matcher.re.lastIndex = 0));
    if (
      !metadataCopy.includes(citiesData[citySlug].name) ||
      foreignCities.length
    ) {
      violations.push({
        kind: "unsafe-reviewed-metadata",
        page: `${courseSlug}__${citySlug}`,
        detail: foreignCities.join(", ") || "Metadata does not include the page city.",
      });
    }
  }
}

let pages = 0;
for (const courseSlug of courseSlugs) {
  const course = coursesData[courseSlug];

  for (const citySlug of citySlugs) {
    pages++;
    const cityName = citiesData[citySlug].name;
    const related = allowedRelated(citySlug);
    const expectedUrl = `https://connectingdotserp.com/${courseSlug}-course-in-${citySlug}`;
    const metadata = generateDynamicMetadata(courseSlug, citySlug);
    if (metadata?.alternates?.[0]?.href !== expectedUrl) {
      add("canonical-city-mismatch", courseSlug, citySlug, metadata?.alternates?.[0]?.href || "missing canonical");
    }
    const routeIsIndexable =
      typeof metadata?.robots === "string"
        ? !/\bnoindex\b/i.test(metadata.robots)
        : metadata?.robots?.index === true &&
          metadata?.robots?.googleBot?.index === true;
    if (!routeIsIndexable) {
      add("robots-policy-mismatch", courseSlug, citySlug, "Course-city pages must remain indexable until business availability is confirmed.");
    }
    const metadataText = `${metadata?.title || ""} ${metadata?.description || ""}`;
    const allowedMetadataNames = new Set([cityName, ...related]);
    const metadataWithoutLocalNames = [...allowedMetadataNames].reduce(
      (text, name) => text.replace(new RegExp(`\\b${escapeRe(name)}\\b`, "gi"), " "),
      metadataText
    );
    const metadataForeign = matchers
      .filter((matcher) => matcher.name !== cityName && !related.has(matcher.name) && matcher.re.test(metadataWithoutLocalNames))
      .map((matcher) => matcher.name);
    matchers.forEach((matcher) => (matcher.re.lastIndex = 0));
    if (metadataForeign.length) {
      add("foreign-city-metadata", courseSlug, citySlug, metadataForeign.join(", "));
    }

    const jsonLd = generateDynamicJsonLd(courseSlug, citySlug);
    const graph = jsonLd?.["@graph"] || [];
    const webPage = graph.find((node) => node["@type"] === "WebPage");
    const courseSchema = graph.find((node) => node["@type"] === "Course");
    const serializedSchema = JSON.stringify(jsonLd);
    if (jsonLd?.["@context"] !== "https://schema.org" || webPage?.url !== expectedUrl || courseSchema?.url !== expectedUrl) {
      add("invalid-jsonld-location", courseSlug, citySlug, "WebPage and Course URLs must match the canonical URL.");
    }
    const malformedSchemaUrl = /connectingdotserp\.comhttps?:\/\//i.test(serializedSchema);
    const forbiddenSchemaTypes = graph
      .flatMap((node) => (Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]]))
      .filter((type) => ["Review", "JobPosting", "SpecialAnnouncement"].includes(type));
    const placeholderImage = /\/images\/(?:course-banner|video-thumbnail|location-)/i.test(serializedSchema);
    if (malformedSchemaUrl || forbiddenSchemaTypes.length || placeholderImage) {
      add("unsupported-jsonld", courseSlug, citySlug, `Malformed URL=${malformedSchemaUrl}; placeholder image=${placeholderImage}; unsupported types=${forbiddenSchemaTypes.join(", ") || "none"}.`);
    }

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

for (const [aliasSlug, targetSlug] of Object.entries(COURSE_SLUG_ALIASES)) {
  for (const citySlug of citySlugs) {
    const expectedAliasUrl = `https://connectingdotserp.com/${aliasSlug}-course-in-${citySlug}`;
    const metadata = generateDynamicMetadata(targetSlug, citySlug, aliasSlug);
    const jsonLd = generateDynamicJsonLd(targetSlug, citySlug, aliasSlug);
    const graph = jsonLd?.["@graph"] || [];
    const webPage = graph.find((node) => node["@type"] === "WebPage");
    const courseSchema = graph.find((node) => node["@type"] === "Course");
    if (
      metadata?.canonical !== expectedAliasUrl ||
      metadata?.openGraph?.url !== expectedAliasUrl ||
      webPage?.url !== expectedAliasUrl ||
      courseSchema?.url !== expectedAliasUrl
    ) {
      add("alias-url-mismatch", aliasSlug, citySlug, "Metadata and structured data must use the public alias URL.");
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
