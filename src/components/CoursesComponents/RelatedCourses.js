// components/CoursesComponents/RelatedCourses.jsx
"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SectionHeading from "./SectionHeading";
import styles from "@/styles/CoursesComponents/RelatedCourses.module.css";
import ContactForm from "@/components/HomePage/Btnform";

const getCourseMeta = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("sap")) return { label: "SAP" };
  if (
    n.includes("data science") ||
    n.includes("data analytics") ||
    n.includes("generative ai") ||
    n.includes("agentic") ||
    n.includes("aiml")
  )
    return { label: "AI / DATA" };
  if (
    n.includes("python") ||
    n.includes("java") ||
    n.includes("reactjs") ||
    n.includes("devops")
  )
    return { label: "DEV" };
  if (
    n.includes("tableau") ||
    n.includes("power bi") ||
    n.includes("powerbi") ||
    n.includes("data visualization")
  )
    return { label: "BI" };
  if (n.includes("salesforce")) return { label: "CRM" };
  if (n.includes("hr")) return { label: "HR" };
  if (n.includes("aws") || n.includes("azure") || n.includes("it course"))
    return { label: "CLOUD" };
  return { label: "CAREER" };
};

// 6 pastel schemes: index 0 is reserved for the overview tile, 1-5 cycle
// across course cards so colors don't repeat back-to-back on small sets.
const PALETTES = [
  { bg: "#EDE9FB", ink: "#2E2270", sub: "#5B4FA0", chipBg: "rgba(255,255,255,0.6)" },
  { bg: "#DFF3EA", ink: "#0F6B4A", sub: "#3C8B6D", chipBg: "rgba(255,255,255,0.6)" },
  { bg: "#FCE3EC", ink: "#9C1857", sub: "#B85480", chipBg: "rgba(255,255,255,0.6)" },
  { bg: "#FDECCF", ink: "#8A5A12", sub: "#A97D3C", chipBg: "rgba(255,255,255,0.6)" },
  { bg: "#FCE1CE", ink: "#9A4416", sub: "#B8703F", chipBg: "rgba(255,255,255,0.6)" },
  { bg: "#DCEAFB", ink: "#1E4E8C", sub: "#4A72A8", chipBg: "rgba(255,255,255,0.6)" },
];

// Bento rhythm: repeats every 7 so any list length still tiles cleanly.
const SPAN_PATTERN = ["wide", "normal", "tall", "normal", "wide", "normal", "tall"];

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
);
const LevelIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 20V13" /><path d="M12 20V8" /><path d="M20 20V4" /></svg>
);
const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M9 12.5 7 22l5-3 5 3-2-9.5" /></svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h6" /></svg>
);
const TrendIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);

const CourseMedia = ({ course, className }) =>
  course.icon?.endsWith(".mp4") ? (
    <video
      src={course.icon}
      className={className}
      aria-label={course.alt}
      loop
      autoPlay
      muted
      playsInline
    />
  ) : (
    <Image
      src={course.icon}
      alt={course.alt || "related course"}
      width={40}
      height={40}
      className={className}
    />
  );

const CoursesRelated = ({ data, currentCityName }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
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

  const normalizeCityForUrl = (cityName) =>
    cityName.toLowerCase().replace(/\s+/g, "-");

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

  const handleCardKeyDown = useCallback(
    (e, courseName) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCourseClick(courseName);
      }
    },
    [handleCourseClick]
  );

  if (!data || !items.length) {
    return (
      <div className={styles.loadingContainer}>
        No related courses data available (check masterData.js or prop passing).
      </div>
    );
  }

  const introText = currentCityName
    ? `Courses learners often explore next, based in ${currentCityName}.`
    : "Courses learners often explore next.";

  return (
    <div className={styles.relatedCoursesContainer}>
      <SectionHeading title={data.title} description={introText} />

      <div className={styles.bentoGrid}>
        {/* Overview tile */}
        <div
          className={styles.overviewCard}
          style={{ background: PALETTES[0].bg, color: PALETTES[0].ink }}
        >
          <span className={styles.overviewEyebrow} style={{ color: PALETTES[0].sub }}>
            What you get
          </span>
          <h3 className={styles.overviewTitle}>Certified. Practical. Career-ready.</h3>
          <p className={styles.overviewDesc} style={{ color: PALETTES[0].sub }}>
            Every course pairs hands-on projects with instructor support so
            you can apply new skills immediately.
          </p>

          <div className={styles.overviewMockup} aria-hidden="true">
            <div className={styles.mockBlob} />
            <div className={styles.mockCard}>
              <TrendIcon />
            </div>
          </div>

          <div
            className={styles.metaBar}
            style={{ background: PALETTES[0].chipBg }}
          >
            <span className={styles.metaItem}>
              <DocIcon /> {items.length} Courses
            </span>
            <span className={styles.metaItem}>
              <BadgeIcon /> Certificate Included
            </span>
            <span className={styles.metaItem}>
              <ClockIcon /> Flexible Schedule
            </span>
            <span className={styles.metaItem}>
              <TrendIcon /> Career Growth
            </span>
          </div>
        </div>

        {/* Course tiles */}
        {items.map((course, index) => {
          const palette = PALETTES[(index % 5) + 1];
          const isLast = index === items.length - 1;
          const span = isLast ? "wide" : SPAN_PATTERN[index % SPAN_PATTERN.length];
          const meta = getCourseMeta(course.name);

          return (
            <div
              key={index}
              className={`${styles.courseCard} ${styles[span]}`}
              style={{ background: palette.bg, color: palette.ink }}
              role="button"
              tabIndex={0}
              onClick={() => handleCourseClick(course.name)}
              onKeyDown={(e) => handleCardKeyDown(e, course.name)}
              title={`Click to view ${course.name} course in ${currentCityName}`}
            >
              <span className={styles.courseTag}>{meta.label}</span>

              <div className={styles.courseTop}>
                <h3 className={styles.courseTitle}>{course.name}</h3>
                <p className={styles.courseDesc} style={{ color: palette.sub }}>
                  {course.description}
                </p>
              </div>

              <div className={styles.courseMockup} aria-hidden="true">
                <div className={styles.mockBlob} />
                <div className={styles.mockCard}>
                  <CourseMedia course={course} className={styles.mockIcon} />
                </div>
                <div className={styles.mockChip}>
                  <CheckIcon />
                </div>
              </div>

              <div
                className={styles.metaBar}
                style={{ background: palette.chipBg }}
              >
                <span className={styles.metaItem}>
                  <ClockIcon /> {course.duration || "Self-paced"}
                </span>
                <span className={styles.metaItem}>
                  <LevelIcon /> {course.level || "All levels"}
                </span>
                <span className={styles.metaItem}>
                  <BadgeIcon /> Certificate
                </span>
                <span className={styles.metaArrow}>
                  <ArrowIcon />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <ContactForm onClose={handleCloseModal} course={selectedCourse} />
      )}
    </div>
  );
};

export default CoursesRelated;