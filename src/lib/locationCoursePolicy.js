import locationCourseIndex from "../data/locationCourseIndex.json" with { type: "json" };

const entries = Array.isArray(locationCourseIndex.entries)
  ? locationCourseIndex.entries
  : [];

export function isIndexableLocationCourse(entry) {
  return Boolean(
    entry &&
      entry.isActuallyOffered === true &&
      entry.hasUniqueLocalContent === true &&
      entry.indexable === true
  );
}

export function getLocationCoursePolicy(courseSlug, citySlug) {
  const entry = entries.find(
    (item) => item.courseSlug === courseSlug && item.citySlug === citySlug
  );

  return {
    isActuallyOffered: entry?.isActuallyOffered === true,
    hasLocalCenter: entry?.hasLocalCenter === true,
    hasUniqueLocalContent: entry?.hasUniqueLocalContent === true,
    indexable: isIndexableLocationCourse(entry),
  };
}

export function getIndexableLocationCourseEntries(coursesData, citiesData) {
  return entries.filter(
    (entry) =>
      isIndexableLocationCourse(entry) &&
      Object.prototype.hasOwnProperty.call(coursesData, entry.courseSlug) &&
      Object.prototype.hasOwnProperty.call(citiesData, entry.citySlug)
  );
}
