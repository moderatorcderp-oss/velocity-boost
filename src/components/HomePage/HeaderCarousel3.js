"use client";
import React from 'react';
import Link from 'next/link';
import { Brain } from 'lucide-react';

const HeaderCarousel3 = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4">
          <Brain className="w-10 h-10 text-blue-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Learn with Connecting Dots</h2>
            <p className="text-gray-600 mt-1">Hands-on courses, projects, and expert-led training.</p>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/all-course-links" className="inline-block bg-blue-600 text-white px-5 py-3 rounded-full shadow hover:bg-blue-700 transition">Explore Courses</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderCarousel3;
