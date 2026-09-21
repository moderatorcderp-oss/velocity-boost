// app/aboutus/AboutClient.jsx
'use client';

import ApplyBanner from '@/components/TestingAbout/ApplyBanner';
// import Achievements from '@/components/HomePage/Achievements';
import dynamic from 'next/dynamic';
import React from 'react';
import LazySection from '@/components/Common/LazySection';

// dynamic imports with ssr: false are allowed inside this client component
const Hero = dynamic(() => import("@/components/TestingAbout/Hero"));

const Achievements = dynamic(() => import("@/components/HomePage/Achievements"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 flex items-center justify-center">Loading achievements...</div>,
});

const SAPCompassDial = dynamic(() => import("@/components/TestingAbout/Placement"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 flex items-center justify-center">Loading placements...</div>,
});

const SAPAdoptionRings = dynamic(() => import("@/components/TestingAbout/SapComp"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 flex items-center justify-center">Loading SAP content...</div>,
});


const AboutClient = ({ branches = [] }) => {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="sr-only">Connecting Dots ERP</h1>

      <Hero />
      <LazySection fallback={<div className="h-[300px]" />} intrinsicSize="auto 300px">
        <Achievements />
      </LazySection>
      <LazySection fallback={<div className="h-[300px]" />} intrinsicSize="auto 300px">
        <SAPCompassDial />
      </LazySection>
      <LazySection fallback={<div className="h-[300px]" />} intrinsicSize="auto 300px">
        <SAPAdoptionRings />
      </LazySection>
      <ApplyBanner />
    </div>
  );
};

export default AboutClient;
