import fs from "node:fs";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const source = execFileSync("git", ["show", "HEAD:src/lib/metaSEO.js"], {
  encoding: "utf8",
});
const objectBlock = source.slice(
  0,
  source.indexOf("// ---------- Internal flattened overrides map")
);
const objectStart = objectBlock.indexOf("{");
const objectEnd = objectBlock.lastIndexOf("};");
const previousMetadata = vm.runInNewContext(
  `(${objectBlock.slice(objectStart, objectEnd + 1)})`
);
const cities = JSON.parse(
  fs.readFileSync("public/Jsonfolder/cities.json", "utf8")
);
const knownCourseSlugs = new Set();

for (const file of [
  "courses-sap.json",
  "courses-it.json",
  "courses-hr.json",
]) {
  Object.keys(
    JSON.parse(fs.readFileSync(`public/Jsonfolder/${file}`, "utf8"))
  ).forEach((slug) => knownCourseSlugs.add(slug));
}
for (const course of JSON.parse(
  fs.readFileSync("public/Jsonfolder/generatedCourseSpecs.json", "utf8")
)) {
  knownCourseSlugs.add(course.slug);
}
const masterDataSource = fs.readFileSync("src/lib/masterData.js", "utf8");
for (const match of masterDataSource.matchAll(/coursesData\["([^"]+)"\]\s*=/g)) {
  knownCourseSlugs.add(match[1]);
}
const aliasSource = fs.readFileSync("src/lib/courseAliases.js", "utf8");
const aliasBlock = aliasSource.slice(aliasSource.indexOf("{"), aliasSource.lastIndexOf("};") + 1);
const aliases = vm.runInNewContext(`(${aliasBlock})`);
Object.entries(aliases).forEach(([alias, target]) => {
  knownCourseSlugs.add(alias);
  knownCourseSlugs.add(target);
});

const cityNames = Object.values(cities).map((city) => city.name);
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const mentionsCity = (text, name) =>
  new RegExp(`\\b${escapeRegExp(name)}\\b`, "i").test(text);
const cleanCopy = (text, cityName) =>
  text
    .replace(/\{city\}/gi, cityName)
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;|])/g, "$1")
    .trim();

const args = process.argv.slice(2);
const writeIndex = args.indexOf("--write");
const outputPath = writeIndex >= 0 ? args[writeIndex + 1] : null;
const selectedCities = args.filter(
  (arg, index) => arg !== "--write" && index !== writeIndex + 1
);
const registry = { version: 1, cities: {} };

for (const [citySlug, city] of Object.entries(cities)) {
  if (selectedCities.length && !selectedCities.includes(citySlug)) continue;
  const reviewedCourses = {};

  for (const [courseSlug, byCity] of Object.entries(previousMetadata)) {
    if (!knownCourseSlugs.has(courseSlug)) continue;
    const entry = byCity?.[citySlug];
    if (!entry) continue;
    const safeEntry = {};

    for (const [field, keys] of [
      ["title", ["title", "metaTitle"]],
      ["description", ["description", "metaDescription"]],
    ]) {
      const original = keys
        .map((key) => entry[key])
        .find((value) => typeof value === "string" && value.trim());
      if (!original) continue;

      const value = cleanCopy(original, city.name);
      const unsafeClaim =
        /\b(?:guarantee\w*|certif(?:ied|ication)\w*|discount\w*|best|top[- ]rated|trending)\b|\b\d+\s*%|\b20\d{2}\b/i.test(value);
      const foreignCity = cityNames.some(
        (otherCity) =>
          otherCity.toLowerCase() !== city.name.toLowerCase() &&
          !city.name.toLowerCase().includes(otherCity.toLowerCase()) &&
          mentionsCity(value, otherCity)
      );

      if (
        !knownCourseSlugs.has(courseSlug) ||
        !mentionsCity(value, city.name) ||
        unsafeClaim ||
        foreignCity ||
        value.length > (field === "title" ? 100 : 240)
      ) {
        continue;
      }
      safeEntry[field] = value;
    }

    if (Object.keys(safeEntry).length) reviewedCourses[courseSlug] = safeEntry;
  }
  registry.cities[citySlug] = reviewedCourses;
}

const json = `${JSON.stringify(registry, null, 2)}\n`;
if (outputPath) {
  fs.writeFileSync(outputPath, json);
} else {
  process.stdout.write(json);
}
