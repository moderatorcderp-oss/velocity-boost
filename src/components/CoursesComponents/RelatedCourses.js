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
    return { label: "AI / Data" };
  if (
    n.includes("python") ||
    n.includes("java") ||
    n.includes("reactjs") ||
    n.includes("devops")
  )
    return { label: "Development" };
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
    return { label: "Cloud" };
  return { label: "Career" };
};

const courseNameToUrlMapping = {
  "Generative AI": "generative-ai-course",
  "Masters in Data Science": "data-science-course",
  "Master in Data Science": "data-science-course",
  "Masters in Data Analytics": "data-analytics-course",
  "Full-Stack Python": "python-course",
  "Full-Stack Java": "java-course",
  "Tableau": "tableau-course",
  "PowerBI": "power-bi-course",
  "Power BI": "power-bi-course",
  "AgenticAi": "agentic-ai-course",
  "Agentic AI": "agentic-ai-course",
  "Agentic Ai": "agentic-ai-course",
  "Salesforce": "salesforce-training",
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
  "AWS": "aws-course",
  "DevOps": "devops-course",
  "AIML": "ai-ml-course",
  "Data Visualization": "data-visualization-course",
};

/* ───────────────── icons ───────────────── */
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);
const LevelIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 20V13" />
    <path d="M12 20V8" />
    <path d="M20 20V4" />
  </svg>
);
const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="5" />
    <path d="M9 12.5 7 22l5-3 5 3-2-9.5" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      style={{ width: 40, height: 40, objectFit: "contain", borderRadius: 10 }}
    />
  ) : (
    <Image
      src={course.icon || "/placeholder-course.png"}
      alt={course.alt || "related course"}
      width={40}
      height={40}
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
          --rc-blue: #2563eb;
          --rc-blue-deep: #1e40af;
          --rc-blue-soft: #eff6ff;
          --rc-blue-line: #dbeafe;
          --rc-ink: #0f172a;
          --rc-muted: #64748b;

          font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
          padding: 56px 20px 72px;
          background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
        }

        .rc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 24px;
          max-width: 1140px;
          margin: 40px auto 0;
        }

        /* ── card ── */
        .rc-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 24px 22px 20px;
          background: #ffffff;
          border: 1.5px solid var(--rc-blue-line);
          border-radius: 20px;
          cursor: pointer;
          outline: none;
          box-shadow: 0 6px 18px -10px rgba(37, 99, 235, 0.25);
          transition:
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.4s ease,
            border-color 0.4s ease;
        }

        /* blue circle: rests as a corner accent, floods the card on hover */
        .rc-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(135deg, var(--rc-blue) 0%, var(--rc-blue-deep) 100%);
          clip-path: circle(46px at 100% 0);
          transition: clip-path 0.65s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .rc-card:hover,
        .rc-card:focus-visible {
          transform: translateY(-6px);
          border-color: var(--rc-blue);
          box-shadow: 0 22px 40px -16px rgba(37, 99, 235, 0.55);
        }
        .rc-card:hover::before,
        .rc-card:focus-visible::before {
          clip-path: circle(150% at 100% 0);
        }
        .rc-card:focus-visible {
          outline: 3px solid #93c5fd;
          outline-offset: 3px;
        }
        .rc-card:active {
          transform: translateY(-2px) scale(0.99);
        }

        /* ── corner arrow (sits inside the resting circle) ── */
        .rc-arrow {
          position: absolute;
          top: 12px;
          right: 12px;
          display: inline-flex;
          color: #ffffff;
          transform: rotate(-45deg);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
        }
        .rc-card:hover .rc-arrow,
        .rc-card:focus-visible .rc-arrow {
          transform: rotate(0deg) translateX(2px);
        }

        /* ── top row ── */
        .rc-top {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .rc-icon-wrap {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--rc-blue-soft);
          border: 1px solid var(--rc-blue-line);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
        }
        .rc-card:hover .rc-icon-wrap,
        .rc-card:focus-visible .rc-icon-wrap {
          background: #ffffff;
          border-color: #ffffff;
          transform: scale(1.06) rotate(-4deg);
        }

        .rc-title-block {
          flex: 1;
          min-width: 0;
          padding-right: 28px; /* keeps text clear of the corner arrow */
        }
        .rc-tag {
          display: inline-block;
          margin-bottom: 6px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--rc-blue);
          background: var(--rc-blue-soft);
          border-radius: 999px;
          transition: color 0.4s ease, background 0.4s ease;
        }
        .rc-card:hover .rc-tag,
        .rc-card:focus-visible .rc-tag {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.2);
        }
        .rc-title {
          margin: 0;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.35;
          color: var(--rc-ink);
          transition: color 0.4s ease;
        }
        .rc-card:hover .rc-title,
        .rc-card:focus-visible .rc-title {
          color: #ffffff;
        }

        /* ── description ── */
        .rc-desc {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--rc-muted);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.4s ease;
        }
        .rc-card:hover .rc-desc,
        .rc-card:focus-visible .rc-desc {
          color: rgba(255, 255, 255, 0.88);
        }

        /* ── meta ── */
        .rc-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 14px;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--rc-blue-line);
          font-size: 12px;
          font-weight: 500;
          color: var(--rc-muted);
          transition: color 0.4s ease, border-color 0.4s ease;
        }
        .rc-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .rc-meta-item svg {
          color: var(--rc-blue);
          transition: color 0.4s ease;
        }
        .rc-card:hover .rc-meta,
        .rc-card:focus-visible .rc-meta {
          color: rgba(255, 255, 255, 0.92);
          border-color: rgba(255, 255, 255, 0.28);
        }
        .rc-card:hover .rc-meta-item svg,
        .rc-card:focus-visible .rc-meta-item svg {
          color: #bfdbfe;
        }

        /* ── responsive ── */
        @media (max-width: 600px) {
          .rc-section {
            padding: 44px 16px 56px;
          }
          .rc-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rc-card,
          .rc-card::before,
          .rc-arrow,
          .rc-icon-wrap {
            transition: none;
          }
          .rc-card:hover,
          .rc-card:focus-visible {
            transform: none;
          }
        }
      `}</style>

      <div className="rc-section">
        <SectionHeading title={data.title} description={introText} />

        <div className="rc-grid">
          {items.map((course, index) => {
            const meta = getCourseMeta(course.name);

            return (
              <div
                key={index}
                className="rc-card"
                role="button"
                tabIndex={0}
                onClick={() => handleCourseClick(course.name)}
                onKeyDown={(e) => handleCardKeyDown(e, course.name)}
                title={`View ${course.name}${
                  currentCityName ? ` in ${currentCityName}` : ""
                }`}
              >
                <span className="rc-arrow">
                  <ArrowIcon />
                </span>

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