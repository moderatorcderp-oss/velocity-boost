"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const categories = [
  { value: "all", label: "All categories" },
  { value: "sap", label: "SAP" },
  { value: "it", label: "IT & Software" },
  { value: "hr", label: "Human Resources" },
];

export default function CourseLocationFinder({
  courses,
  cities,
  selectedCitySlug = "",
}) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [citySlug, setCitySlug] = useState(selectedCitySlug);
  const selectedCity = cities.find((city) => city.slug === citySlug);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory = category === "all" || course.category === category;
      const matchesQuery = !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, courses, query]);

  const selectedCourse = courses.find((course) => course.slug === courseSlug);
  const coursePath = selectedCourse && selectedCity
    ? `/${selectedCourse.slug}-course-in-${selectedCity.slug}`
    : "";

  return (
    <section className="w-full" aria-labelledby="course-location-heading">
      <h2 id="course-location-heading" className="mb-2 text-xl font-semibold">
        {selectedCity ? `Find a course in ${selectedCity.name}` : "Find a course by location"}
      </h2>
      <p className="mb-5 max-w-3xl text-sm text-gray-600">
        Choose a program and location to view course details. Confirm current
        schedules and local delivery options with our team before enrolling.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-gray-800">
          Search courses
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCourseSlug("");
            }}
            placeholder="Search SAP, analytics, HR..."
            className="min-h-11 rounded border border-gray-300 px-3 font-normal"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-gray-800">
          Category
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setCourseSlug("");
            }}
            className="min-h-11 rounded border border-gray-300 px-3 font-normal"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm font-medium text-gray-800">
          Course
          <select
            value={courseSlug}
            onChange={(event) => setCourseSlug(event.target.value)}
            className="min-h-11 rounded border border-gray-300 px-3 font-normal"
          >
            <option value="">Select a course</option>
            {filteredCourses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.title}
              </option>
            ))}
            {filteredCourses.length === 0 && (
              <option value="" disabled>
                No matching courses
              </option>
            )}
          </select>
        </label>

        {!selectedCitySlug && (
          <label className="grid gap-1 text-sm font-medium text-gray-800">
            Location
            <select
              value={citySlug}
              onChange={(event) => setCitySlug(event.target.value)}
              className="min-h-11 rounded border border-gray-300 px-3 font-normal"
            >
              <option value="">Select a location</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name}{city.hasOffice ? " - training center" : " - availability to confirm"}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {coursePath && (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link
            href={coursePath}
            className="inline-flex min-h-11 items-center rounded bg-blue-800 px-4 py-2 font-semibold text-white hover:bg-blue-900"
          >
            View {selectedCourse.title} details in {selectedCity.name}
          </Link>
          <span className="text-sm text-gray-600">
            {selectedCity.hasOffice
              ? "A training center is listed here; confirm this course's schedule and delivery format."
              : "No center is listed for this location; contact us to confirm delivery options."}
          </span>
        </div>
      )}
    </section>
  );
}
