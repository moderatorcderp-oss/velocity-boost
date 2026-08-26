"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import CoursesRelated from "./RelatedCourses";
import TrustBar from "../HomePage/TrustBar";
import CoursesTrustBar from "./CoursesTrustBar";
import WhatYouWillLearn from "./WhatYouWillLearn";
import SkillsAndTools from "./SkillsAndTools";
import WhoThisIsFor from "./WhoThisIsFor";
// import {CityLinks} from "@/components/CityLinks";
// === Above the fold (SSR enabled for SEO-critical content) ===
const DSHeader = dynamic(() => import("./Header"));
const UpcomingBatches=dynamic(()=> import("./UpcomingBatches"))
const Reviews = dynamic(() => import("./Reviews"));
const Why = dynamic(() => import("./Why"));
const SapModComponent = dynamic(() => import("./sapmod"), { ssr: false });
const Curriculum = dynamic(() => import("./Curriculam"), { ssr: false });
const Modules = dynamic(() => import("./Modules"), { ssr: false });
// === Below the fold (hydrated after initial paint) ===
const TrustUs = dynamic(() => import("./Trustus"), { ssr: false });
const Certificate = dynamic(() => import("../HomePage/Certificate"), { ssr: false });
const Program = dynamic(() => import("./ProgramHighlights"), { ssr: false });
const Description = dynamic(() => import("./Description"), { ssr: false });
const FAQ = dynamic(() => import("./FAQ"), { ssr: false });
const HrCard = dynamic(() => import("./HRCard"), { ssr: false });
// const CityLinks = dynamic(()=>import("@/components/CityLinks"),{ssr : false});

export default function ClientCourseSections(props) {
  const {
    layoutType, // 'digital' | 'default'
    headerData,
    whyData,
    sapModData,
    course,
    modulesData,
    descriptionContentData,
    certificateData,
    faqData,
    upcomingBatchesData,
    reviewsData,
    cityLinks,
    relatedCoursesData,
    currentCityName,
    courseCategory,
    shouldUseNewCurriculum,
    shouldUseLegacyModules,
  } = props;

  // === Digital Marketing layout (multi-section courses) ===
  if (layoutType === "digital") {
    return (
      <>
        {/* --- Above-the-fold content --- */}
        <DSHeader data={headerData} />
        <Why data={whyData} />
        {sapModData && <SapModComponent data={sapModData} />}

        {shouldUseNewCurriculum && (
          <Suspense fallback={null}>
            <Curriculum data={course} />
          </Suspense>
        )}

        {shouldUseLegacyModules && (
          <Suspense fallback={null}>
            <Modules data={modulesData} />
          </Suspense>
        )}


        <Suspense fallback={null}>
          <Description data={descriptionContentData.main} />
        </Suspense>

        <div id="pay-per-click" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            {descriptionContentData.ppc && (
              <Description data={descriptionContentData.ppc} sectionIndex={0} />
            )}
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <TrustUs />
        </Suspense>

        <div id="search-engine-optimization" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            {descriptionContentData.seo && (
              <Description data={descriptionContentData.seo} sectionIndex={1} />
            )}
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <Certificate data={certificateData} />
        </Suspense>

        <Suspense fallback={null}>
          <UpcomingBatches data={upcomingBatchesData} />
        </Suspense>

        <Suspense fallback={null}>
          <Reviews data={reviewsData} />
        </Suspense>

        <Suspense fallback={null}>
          <Program />
        </Suspense>

        <div id="social-media-marketing" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            {descriptionContentData.smm && (
              <Description data={descriptionContentData.smm} sectionIndex={0} />
            )}
          </Suspense>
        </div>

        <div id="advance-analytics" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            {descriptionContentData.analytics && (
              <Description data={descriptionContentData.analytics} sectionIndex={1} />
            )}
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <FAQ data={faqData} />
        </Suspense>

        <div

        >
          {cityLinks}
        </div>

        <Suspense fallback={null}>
          <CoursesRelated data={relatedCoursesData} currentCityName={currentCityName} />
        </Suspense>
      </>
    );
  }

  // === Default layout (e.g. SAP, HR, Data Analytics) ===
  return (
    <>
      {/* --- Above-the-fold --- */}
      <DSHeader data={headerData} />
      <CoursesTrustBar rating="4.9" />
      <Why data={whyData} />

      {/* what section  */}
      <WhatYouWillLearn />
      {sapModData && <SapModComponent data={sapModData} />}

      {shouldUseNewCurriculum && (
        <div id="curriculum" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            <Curriculum data={course} />
          </Suspense>
        </div>
      )}

      <SkillsAndTools />

      <WhoThisIsFor />

      <Suspense fallback={null}>
        <Certificate data={certificateData} />
      </Suspense>

      <Suspense fallback={null}>
        <UpcomingBatches data={upcomingBatchesData} />
      </Suspense>

      <Suspense fallback={null}>
        <Reviews data={reviewsData} />
      </Suspense>

      <Suspense fallback={null}>
        <CoursesRelated
          data={relatedCoursesData}
          currentCityName={currentCityName}
        />
      </Suspense>

      <Suspense fallback={null}>
        <FAQ data={faqData} />
      </Suspense>

      {shouldUseLegacyModules && (
        <div id="modules" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            <Modules data={modulesData} />
          </Suspense>
        </div>
      )}
      
      <div>
        {cityLinks}
      </div>

      {courseCategory === "hr" && (
        <Suspense fallback={null}>
          <HrCard />
        </Suspense>
      )}

    </>
  );
}
