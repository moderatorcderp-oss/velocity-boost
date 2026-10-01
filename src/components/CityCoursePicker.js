"use client";

import Link from "next/link";
import { useState } from "react";

export default function CityCoursePicker({ courseSlug, currentCitySlug, cities }) {
  const [selectedCitySlug, setSelectedCitySlug] = useState("");
  const selectedCity = cities.find((city) => city.slug === selectedCitySlug);
  const courseHref = selectedCity
    ? `/${courseSlug}-course-in-${selectedCity.slug}`
    : "";

  return (
    <section className="mx-auto w-full max-w-6xl border-t border-gray-200 px-4 py-8">
      <h2 className="mb-2 text-xl font-semibold">Explore this course by location</h2>
      <p className="mb-4 max-w-3xl text-sm text-gray-600">
        Choose a city to view course details. Confirm current schedules and local
        delivery options with our team.
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid min-w-64 gap-1 text-sm font-medium">
          Location
          <select
            value={selectedCitySlug}
            onChange={(event) => setSelectedCitySlug(event.target.value)}
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
        {courseHref && selectedCitySlug !== currentCitySlug && (
          <Link
            href={courseHref}
            className="inline-flex min-h-11 items-center rounded bg-blue-800 px-4 py-2 font-semibold text-white hover:bg-blue-900"
          >
            View course details in {selectedCity.name}
          </Link>
        )}
      </div>
      {selectedCity && (
        <p className="mt-3 text-sm text-gray-600" aria-live="polite">
          {selectedCity.hasOffice
            ? "A training center is listed here; confirm this course's schedule and delivery format."
            : "No center is listed for this location; contact us to confirm delivery options."}
        </p>
      )}
    </section>
  );
}
