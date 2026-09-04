// components/CoursesComponents/RelatedCourses.jsx
"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SectionHeading from "./SectionHeading";
import ContactForm from "@/components/HomePage/Btnform";

/* ───────────────── helpers ───────────────── */
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

/* Soft accent colors for cards */
const ACCENTS = [
  { bg: "#F5F3FF", border: "#C4B5FD", tag: "#7C3AED" },
  { bg: "#ECFDF5", border: "#6EE7B7", tag: "#059669" },
  { bg: "#FDF2F8", border: "#F9A8D4", tag: "#DB2777" },
  { bg: "#FFF7ED", border: "#FDBA74", tag: "#EA580C" },
  { bg: "#EFF6FF", border: "#93C5FD", tag: "#2563EB" },
  { bg: "#F0FDFA", border: "#5EEAD4", tag: "#0D9488" },
];

/* ───────────────── icons ───────────────── */
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);
const LevelIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 20V13" />
    <path d="M12 20V8" />
    <path d="M20 20V4" />
  </svg>
);
const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5" />
    <path d="M9 12.5 7 22l5-3 5 3-2-9.5" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const CourseMedia = ({ course }) =>
  course.icon?.endsWith(".mp4") ? (
    <video
      src={course.icon}
      aria-label={course.alt}
      loop
      autoPlay
      muted
      playsInline
      style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 10 }}
    />
  ) : (
    <Image
      src={course.icon || "/placeholder-course.png"}
      alt={course.alt || "related course"}
      width={44}
      height={44}
      style={{ objectFit: "contain", borderRadius: 10 }}
    />
  );

/* ───────────────── main component ───────────────── */
const RelatedCourses = ({ data, currentCityName }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const router = useRouter();

  const items = useMemo(() => data?.items || [], [data]);

  const normalizeCityForUrl = (cityName) =>
    cityName?.toLowerCase().replace(/\s+/g, "-") || "";

  const handleCourseClick = useCallback(
    (courseName) => {
      const courseBaseSlug = courseNameToUrlMapping[courseName];

      if (courseBaseSlug && currentCityName) {
        const normalizedCity = normalizeCityForUrl(currentCityName);
        router.push(`/${courseBaseSlug}-in-${normalizedCity}`);
      } else {
        console.warn(
          `No URL mapping found for course: ${courseName} or city: ${currentCityName}`
        );
        setSelectedCourse(courseName);
        setShowModal(true);
      }
    },
    [currentCityName, router]
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
      <div style={{ padding: 40, textAlign: "center", color: "#666" }}>
        No related courses data available (check masterData.js or prop passing).
      </div>
    );
  }

  const introText = currentCityName
    ? `Courses learners often explore next, based in ${currentCityName}.`
    : "Courses learners often explore next.";

  return (
    <>
      <style>{`
        .rc-section {
          font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
          padding: 48px 20px 64px;
          background: #f8fafc;
        }
        .rc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 22px;
          max-width: 1140px;
          margin: 36px auto 0;
        }
        .rc-card {
          position: relative;
          background: #fff;
          border-radius: 18px;
          border: 1.5px solid #e2e8f0;
          padding: 22px 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          cursor: pointer;
          transition: all 0.28s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 14px -6px rgba(15, 23, 42, 0.08);
        }
        .rc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 32px -12px rgba(15, 23, 42, 0.16);
          border-color: var(--accent-border);
        }
        .rc-card:hover .rc-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .rc-top {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .rc-icon-wrap {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--accent-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .rc-title-block {
          flex: 1;
          min-width: 0;
        }
        .rc-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--accent-tag);
          background: var(--accent-bg);
          padding: 3px 8px;
          border-radius: 999px;
          margin-bottom: 6px;
        }
        .rc-title {
          margin: 0;
          font-size: 16.5px;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.35;
        }
        .rc-desc {
          margin: 0;
          font-size: 13px;
          line-height: 1.55;
          color: #64748b;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rc-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
          font-size: 12px;
          color: #64748b;
        }
        .rc-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .rc-arrow {
          margin-left: auto;
          color: var(--accent-tag);
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.25s ease;
        }
        @media (max-width: 600px) {
          .rc-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>

      <div className="rc-section">
        <SectionHeading title={data.title} description={introText} />

        <div className="rc-grid">
          {items.map((course, index) => {
            const accent = ACCENTS[index % ACCENTS.length];
            const meta = getCourseMeta(course.name);

            return (
              <div
                key={index}
                className="rc-card"
                style={{
                  "--accent-bg": accent.bg,
                  "--accent-border": accent.border,
                  "--accent-tag": accent.tag,
                }}
                role="button"
                tabIndex={0}
                onClick={() => handleCourseClick(course.name)}
                onKeyDown={(e) => handleCardKeyDown(e, course.name)}
                title={`View ${course.name}${
                  currentCityName ? ` in ${currentCityName}` : ""
                }`}
              >
                <div className="rc-top">
                  <div className="rc-icon-wrap">
                    <CourseMedia course={course} />
                  </div>

                  <div className="rc-title-block">
                    <span className="rc-tag">{meta.label}</span>
                    <h3 className="rc-title">{course.name}</h3>
                  </div>
                </div>

                <p className="rc-desc">
                  {course.description ||
                    "Hands-on training with real projects and career support."}
                </p>

                <div className="rc-meta">
                  <span className="rc-meta-item">
                    <ClockIcon /> {course.duration || "Self-paced"}
                  </span>
                  <span className="rc-meta-item">
                    <LevelIcon /> {course.level || "All levels"}
                  </span>
                  <span className="rc-meta-item">
                    <BadgeIcon /> Certificate
                  </span>
                  <span className="rc-arrow">
                    <ArrowIcon />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <ContactForm onClose={handleCloseModal} course={selectedCourse} />
      )}
    </>
  );
};

export default RelatedCourses;