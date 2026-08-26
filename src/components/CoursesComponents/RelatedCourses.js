"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "@/styles/CoursesComponents/RelatedCourses.module.css";
import ContactForm from "@/components/HomePage/Btnform";

const AUTOPLAY_MS = 4500;

// Single shared blue theme (from the HTML mockup's --navy / --teal tokens).
// Every category uses the same accent pair now — only the label/code
// still differs so users can tell categories apart by text, not color.
const BLUE_ACCENT = "#010162"; // --navy
const BLUE_ACCENT_2 = "#036f85"; // --teal

// Maps a course name to a category label + short code.
// Color is intentionally uniform (shared blue theme) across all categories.
const getCourseMeta = (name = "") => {
  const n = name.toLowerCase();

  if (n.includes("sap"))
    return { key: "sap", code: "SAP", label: "SAP", accent: BLUE_ACCENT, accent2: BLUE_ACCENT_2 };
  if (
    n.includes("data science") ||
    n.includes("data analytics") ||
    n.includes("generative ai") ||
    n.includes("agentic") ||
    n.includes("aiml")
  )
    return { key: "data", code: "AI", label: "AI / Data", accent: BLUE_ACCENT, accent2: BLUE_ACCENT_2 };
  if (
    n.includes("python") ||
    n.includes("java") ||
    n.includes("reactjs") ||
    n.includes("devops")
  )
    return { key: "dev", code: "DEV", label: "Development", accent: BLUE_ACCENT, accent2: BLUE_ACCENT_2 };
  if (
    n.includes("tableau") ||
    n.includes("power bi") ||
    n.includes("powerbi") ||
    n.includes("data visualization")
  )
    return { key: "bi", code: "BI", label: "BI", accent: BLUE_ACCENT, accent2: BLUE_ACCENT_2 };
  if (n.includes("salesforce"))
    return { key: "crm", code: "CRM", label: "CRM", accent: BLUE_ACCENT, accent2: BLUE_ACCENT_2 };
  if (n.includes("hr"))
    return { key: "hr", code: "HR", label: "HR", accent: BLUE_ACCENT, accent2: BLUE_ACCENT_2 };
  if (n.includes("aws") || n.includes("azure") || n.includes("it course"))
    return { key: "it", code: "IT", label: "Cloud / IT", accent: BLUE_ACCENT, accent2: BLUE_ACCENT_2 };

  return { key: "general", code: "PRO", label: "Career", accent: BLUE_ACCENT, accent2: BLUE_ACCENT_2 };
};

const CoursesRelated = ({ data, currentCityName }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const courseNameToUrlMapping = {
    "Generative AI": "generative-ai-course",
    "Masters in Data Science": "data-science-course",
    "Master in Data Science": "data-science-course",
    "Masters in Data Analytics": "data-analytics-course",

    "Full-Stack Python": "python-course",
    "Full-Stack Java": "java-course",
    "Reactjs Framework": "reactjs-framework-course",

    Tableau: "tableau-course",
    PowerBI: "power-bi-course",
    "Power BI": "power-bi-course",

    AgenticAi: "agentic-ai-course",
    "Agentic AI": "agentic-ai-course",
    "Agentic Ai": "agentic-ai-course",

    Salesforce: "salesforce-training",

    "SAP HANA": "sap-s4-hana-course",
    "SAP BW/BI": "sap-bwbi-course",
    "SAP BASIS": "sap-basis-course",
    "SAP ABAP": "sap-abap-course",
    "SAP FICO": "sap-fico-course",
    "SAP MM": "sap-mm-course",
    "SAP SD": "sap-sd-course",
    "SAP HR/HCM": "sap-hr-hcm-course",
    "SAP PM": "sap-pm-course",
    "SAP PP": "sap-pp-course",
    "SAP PS": "sap-ps-course",
    "SAP QM": "sap-qm-course",
    "SAP SCM": "sap-scm-course",
    "SAP EWM": "sap-ewm-course",
    "SAP BTP": "sap-btp-course",
    "SAP EHS": "sap-ehs-course",
    "SAP GRC": "sap-grc-course",
    "SAP IBP": "sap-ibp-course",
    "SAP SUCCESSFACTOR": "sap-successfactors-course",
    "SAP ARIBA": "sap-ariba-course",

    "HR Training": "hr-training-course",
    "HR Analytics": "hr-analytics-course",
    "Core HR": "core-hr-course",
    "HR Management": "hr-management-course",
    "HR Payroll": "hr-payroll-course",
    "HR Generalist": "hr-generalist-course",

    "IT Course": "it-course",
    AWS: "aws-course",
    DevOps: "devops-course",
    AIML: "ai-ml-course",
    "Data Visualization": "data-visualization-course",
  };

  const items = useMemo(() => data?.items || [], [data]);

  const normalizeCityForUrl = (cityName) => {
    return cityName.toLowerCase().replace(/\s+/g, "-");
  };

  const handleCourseClick = useCallback(
    (courseName) => {
      const courseBaseSlug = courseNameToUrlMapping[courseName];

      if (courseBaseSlug && currentCityName) {
        const normalizedCity = normalizeCityForUrl(currentCityName);
        const redirectUrl = `/${courseBaseSlug}-in-${normalizedCity}`;
        router.push(redirectUrl);
      } else {
        console.warn(
          `No URL mapping found for course: ${courseName} or city: ${currentCityName}`
        );
        setSelectedCourse(courseName);
        setShowModal(true);
      }
    },
    [currentCityName, router, courseNameToUrlMapping]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedCourse(null);
  }, []);

  // Auto-advance the spotlight continuously (no pause on hover/focus).
  useEffect(() => {
    if (!items.length) return undefined;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [items.length]);

  // Keep activeIndex valid if the items list changes size.
  useEffect(() => {
    if (activeIndex >= items.length) {
      setActiveIndex(0);
    }
  }, [items.length, activeIndex]);

  const handleSelectRow = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleRowKeyDown = useCallback((e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveIndex(index);
    }
  }, []);

  if (!data || !items.length) {
    return (
      <div className={styles.loadingContainer}>
        No related courses data available (check masterData.js or prop passing).
      </div>
    );
  }

  const activeCourse = items[activeIndex];
  const activeMeta = getCourseMeta(activeCourse.name);

  const introText = currentCityName
    ? `Courses learners often explore next, based in ${currentCityName}.`
    : "Courses learners often explore next.";

  return (
    <div className={`my-2 ${styles.relatedCoursesContainer}`}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionEyebrow}>Your learning path</span>
        <h2 className={styles.relatedCoursesTitleh2}>{data.title}</h2>
        <p className={styles.sectionIntro}>{introText}</p>
      </div>

      <div className={styles.spotlight}>
        <div
          className={styles.stage}
          style={{
            "--accent": activeMeta.accent,
            "--accent2": activeMeta.accent2,
          }}
          onClick={() => handleCourseClick(activeCourse.name)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCourseClick(activeCourse.name);
            }
          }}
          title={`Click to view ${activeCourse.name} course in ${currentCityName}`}
        >
          <span className={styles.stageBlobTop} aria-hidden="true" />
          <span className={styles.stageBlobBottom} aria-hidden="true" />

          <span className={styles.stageTag}>{activeMeta.label}</span>

          <div className={styles.stageIcon}>
            {activeCourse.icon.endsWith(".mp4") ? (
              <video
                src={activeCourse.icon}
                className={styles.stageIconMedia}
                aria-label={activeCourse.alt}
                loop
                autoPlay
                muted
                playsInline
              />
            ) : (
              <Image
                src={activeCourse.icon}
                alt={activeCourse.alt}
                width={48}
                height={48}
                className={styles.stageIconMedia}
              />
            )}
          </div>

          <h3 className={styles.stageTitle}>{activeCourse.name}</h3>
          <p className={styles.stageDesc}>{activeCourse.description}</p>

          <span className={styles.stageCta}>
            View course <span className={styles.stageCtaArrow}>→</span>
          </span>

          <div className={styles.progressTrack} aria-hidden="true">
            <div
              key={activeIndex}
              className={styles.progressFill}
              style={{
                animationDuration: `${AUTOPLAY_MS}ms`,
              }}
            />
          </div>
        </div>

        <div className={styles.list} role="listbox" aria-label="All related courses">
          {items.map((course, index) => {
            const meta = getCourseMeta(course.name);
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className={`${styles.row} ${isActive ? styles.rowActive : ""}`}
                style={{ "--row-accent": meta.accent }}
                role="option"
                aria-selected={isActive}
                tabIndex={0}
                onClick={() => handleSelectRow(index)}
                onKeyDown={(e) => handleRowKeyDown(e, index)}
              >
                <span className={styles.rowDot}>{meta.code}</span>
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>{course.name}</span>
                  <span className={styles.rowCat}>{meta.label}</span>
                </span>
                <span className={styles.rowBar} aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <ContactForm onClose={handleCloseModal} course={selectedCourse} />
      )}
    </div>
  );
};

export default CoursesRelated;