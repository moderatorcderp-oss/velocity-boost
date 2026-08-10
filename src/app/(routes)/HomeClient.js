// app/HomeClient.jsx  (client component)
'use client';

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import HeaderCarousel from "@/components/HomePage/HeaderCarousel";
import faqdata from "../../../public/Jsonfolder/faqdata.json";
import WhyChooseSection from "@/components/HomePage/WhyChooseSection";
import WhatWeOffer from "../../components/HomePage/WhatWeOffer"
import SectionBackground from "@/components/BackgroundCss/SectionBackground";
import RegistrationForm from "@/components/PopupForm2";

const Marquee = dynamic(() => import("@/components/HomePage/Marquee2"), {
  ssr: false,
  loading: () => <div style={{ height: "60px" }} />,
});

// const Chevron = dynamic(() => import("@/components/HomePage/Chevron"), {
//   ssr: false,
//   loading: () => <div style={{ minHeight: "100px" }} />,
// });

const TrainingProcessSection = dynamic(() => import('@/components/HomePage/ProcessSection'), {
  ssr: false,
})

// const Keypoints = dynamic(() => import("@/components/HomePage/Keypoints"), {
//   ssr: false,
//   loading: () => <div style={{ minHeight: "300px" }} />,
// });

const OurClients = dynamic(() => import("@/components/HomePage/OurClients"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "250px" }} />,
});

// ── NEW: compact placed-students ticker ──────────────────────────────────────

const OurStats = dynamic(() => import("@/components/HomePage/OurStats"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "250px" }} />,
});

const FeedbackAndReviews = dynamic(
  () => import("@/components/HomePage/FeedbackandReviews"),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "400px" }} />,
  }
);

const Courses = dynamic(() => import("@/components/HomePage/PopCourses"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "520px", position: "absolute", top: '-105px' }} />,
});

const LatestBlogs = dynamic(() => import("@/components/HomePage/Blogs"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "400px" }} />,
});

const FAQAccordion = dynamic(() => import("@/components/CoursesComponents/FAQ"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '600px' }} />
})


const allowedFaqKeys = ["hrhcmfaq"];
const homeFaqData = allowedFaqKeys.flatMap((key) => {
  const sectionGroup = faqdata?.[key];
  if (!sectionGroup) return [];

  const firstSection = Object.values(sectionGroup)[0];
  return firstSection ? [firstSection] : [];
});

const LazySection = ({ children, fallback, rootMargin = "350px", intrinsicSize }) => {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div
      ref={ref}
      style={
        intrinsicSize
          ? {
            contentVisibility: "auto",
            containIntrinsicSize: intrinsicSize,
          }
          : undefined
      }
    >
      {shouldRender ? children : fallback}
    </div>
  );
};

export default function HomeClient() {
  return (
    <>
      <main className="flex-col justify-center overflow-y-hidden">
        <h1 className="visually-hidden">
          Job-Oriented Training That Gets You Hired
        </h1>

        {/* Above the fold */}
        <HeaderCarousel />

        {/* Below the fold — lazy loaded */}
        <LazySection fallback={<div style={{ height: "60px" }} />}>
          <Marquee />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "250px" }} />}>
          <SectionBackground>
            <OurClients />
          </SectionBackground>
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "200px" }} />}>
          <WhatWeOffer />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "520px" }} />} intrinsicSize="520px">
          <Courses />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "300px" }} />}>
          {/* <Keypoints /> */}
          <WhyChooseSection />
        </LazySection>
        <LazySection fallback={<div />}>
          <TrainingProcessSection />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "400px" }} />}>
          <FeedbackAndReviews />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "400px" }} />}>
          <LatestBlogs />
        </LazySection>
        {/* ── Placed students ticker (new) — sits right after PlacementSection ── */}
        <LazySection fallback={<div style={{ minHeight: "250px" }} />}>
          <OurStats />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "400px" }} />}>
          <FAQAccordion data={homeFaqData} />
        </LazySection>

      </main>
    </>
  );
}
