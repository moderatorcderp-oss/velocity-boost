import { COURSE_SLUG_ALIASES } from "./courseAliases.js";

export const COURSE_DIRECTORY_COUNT = 46;

const preferredSlugs = {
  "data-science": "data-science-with-ai",
  python: "python-with-ai",
  "data-visualization": "data-visualization-with-ai",
};

const categoryOrder = { sap: 0, it: 1, hr: 2 };

export function getCourseDirectoryEntries(coursesData) {
  const entries = Object.entries(coursesData)
    .flatMap(([canonicalSlug, course]) => {
      if (
        !course ||
        (COURSE_SLUG_ALIASES[canonicalSlug] &&
          COURSE_SLUG_ALIASES[canonicalSlug] !== canonicalSlug)
      ) {
        return [];
      }

      return [
        {
          slug: preferredSlugs[canonicalSlug] || canonicalSlug,
          title: course.title || canonicalSlug,
          category:
            String(course.category || "").toLowerCase() === "sap"
              ? "sap"
              : String(course.category || "").toLowerCase() === "hr"
                ? "hr"
                : "it",
        },
      ];
    })
    .sort((a, b) => {
      const categoryDifference =
        (categoryOrder[a.category] ?? 9) - (categoryOrder[b.category] ?? 9);
      return categoryDifference || a.title.localeCompare(b.title);
    });

  const titleCounts = entries.reduce(
    (counts, entry) => counts.set(entry.title, (counts.get(entry.title) || 0) + 1),
    new Map()
  );
  const seenTitles = new Set();

  return entries.map((entry) => {
    if (titleCounts.get(entry.title) < 2 || !seenTitles.has(entry.title)) {
      seenTitles.add(entry.title);
      return entry;
    }
    return { ...entry, title: `${entry.title} (alternate URL)` };
  });
}
