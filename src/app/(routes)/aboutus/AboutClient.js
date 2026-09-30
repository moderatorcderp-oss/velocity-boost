// app/aboutus/AboutClient.jsx
'use client';

import ApplyBanner from '@/components/TestingAbout/ApplyBanner';
// import Achievements from '@/components/HomePage/Achievements';
import dynamic from 'next/dynamic';
import React from 'react';
import { DeferPaint } from '@/components/Common/LazySection';

// dynamic imports with ssr: false are allowed inside this client component
const Hero = dynamic(() => import("@/components/TestingAbout/Hero"));

const Achievements = dynamic(() => import("@/components/HomePage/Achievements"), {
  loading: () => <div className="h-[300px] bg-gray-100" aria-hidden="true" />,
});

const SAPCompassDial = dynamic(() => import("@/components/TestingAbout/Placement"), {
  loading: () => <div className="h-[300px] bg-gray-100" aria-hidden="true" />,
});

const SAPAdoptionRings = dynamic(() => import("@/components/TestingAbout/SapComp"), {
  loading: () => <div className="h-[300px] bg-gray-100" aria-hidden="true" />,
});


const AboutClient = ({ branches = [] }) => {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="sr-only">Connecting Dots ERP</h1>

      <Hero />
      <DeferPaint intrinsicSize="auto 300px">
        <Achievements />
      </DeferPaint>
      <DeferPaint intrinsicSize="auto 300px">
        <SAPCompassDial />
      </DeferPaint>
      <DeferPaint intrinsicSize="auto 300px">
        <SAPAdoptionRings />
      </DeferPaint>
      <ApplyBanner />
    </div>
  );
};

export default AboutClient;
