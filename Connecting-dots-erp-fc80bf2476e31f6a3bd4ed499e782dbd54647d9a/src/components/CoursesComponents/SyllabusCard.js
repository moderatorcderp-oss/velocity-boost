"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Package,
  Code2,
  Database,
  BarChart3,
  LayoutPanelLeft,
  Layers,
  Gauge,
  PuzzleIcon,
  Clock,
  Users,
  Calendar,
  ChevronDown,
  Download,
  Info,
} from "lucide-react";
import Btnform from "../HomePage/Btnform";

const stats = [
  { icon: Code2, value: "10+", label: "Languages & Tools", color: "#9333EA" },
  { icon: Clock, value: "280+", label: "Live Sessions Hours", color: "#2563EB" },
  { icon: Users, value: "Expert", label: "Mentor Guidance", color: "#0D9488" },
  { icon: Calendar, value: "Certification", label: "Industry Recognized", color: "#EA580C" },
];

const defaultModules = [
  {
    id: "01",
    title: "ABAP Programming Fundamentals",
    icon: Code2,
    color: "#9333EA",
    duration: "1 - 2 weeks",
    topics: [
      "ABAP Editor & Workbench",
      "Data Types & Variables",
      "Control Structures",
      "String & Date Operations",
      "Internal Tables Basics",
      "Debugging Fundamentals",
    ],
  },
  {
    id: "02",
    title: "Data Dictionary & Database Access",
    icon: Database,
    color: "#0891B2",
    duration: "1 - 2 weeks",
    topics: [
      "Tables & Structures",
      "Data Elements & Domains",
      "Views & Search Helps",
      "Open SQL Statements",
      "Foreign Keys & Relations",
      "Table Maintenance Generator",
    ],
  },
  {
    id: "03",
    title: "Reports & List Generation",
    icon: BarChart3,
    color: "#EA580C",
    duration: "1 - 2 weeks",
    expanded: true,
    columns: [
      ["Classical Reports", "ALV Reports (List Viewer)", "Report Selection Screens"],
      ["Nested Loops in Reports", "Interactive Reports", "Events in Reporting"],
      ["User Interaction in Reports", "Performance in Large Reports"],
    ],
  },
  {
    id: "04",
    title: "Forms & Interfaces",
    icon: LayoutPanelLeft,
    color: "#7C3AED",
    duration: "1 - 2 weeks",
    topics: [
      "SmartForms Basics",
      "Adobe Forms",
      "BAPI & RFC Interfaces",
      "IDocs & File Interfaces",
      "Print Programs",
      "Form Layout Design",
    ],
  },
  {
    id: "05",
    title: "Modularization Techniques",
    icon: Layers,
    color: "#16A34A",
    duration: "1 - 2 weeks",
    topics: [
      "Subroutines",
      "Function Modules",
      "Method & Class Basics",
      "Include Programs",
      "Macros",
      "Reusable Components",
    ],
  },
  {
    id: "06",
    title: "Performance Analysis & Optimization",
    icon: Gauge,
    color: "#2563EB",
    duration: "1 - 2 weeks",
    topics: [
      "Runtime Analysis (SE30)",
      "SQL Trace (ST05)",
      "Buffering Strategies",
      "Efficient Internal Tables",
      "Avoiding Nested Loops",
      "Code Inspector",
    ],
  },
  {
    id: "07",
    title: "Open SQL & Advanced Topics",
    icon: Database,
    color: "#DB2777",
    duration: "1 - 2 weeks",
    topics: [
      "Joins & Subqueries",
      "CDS Views",
      "AMDP Basics",
      "Native SQL",
      "Locking Mechanisms",
      "Advanced Selects",
    ],
  },
  {
    id: "08",
    title: "SAP Module Integration",
    icon: PuzzleIcon,
    color: "#0D9488",
    duration: "1 - 2 weeks",
    topics: [
      "SD & MM Integration",
      "User Exits & BAdIs",
      "Enhancement Framework",
      "Cross-Module Reporting",
      "Workflow Basics",
      "Real-time Project Practices",
    ],
  },
];

function darkenColor(hex, amount = 0.7) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.floor(((num >> 16) & 255) * (1 - amount)));
  const g = Math.max(0, Math.floor(((num >> 8) & 255) * (1 - amount)));
  const b = Math.max(0, Math.floor((num & 255) * (1 - amount)));
  return `rgb(${r}, ${g}, ${b})`;
}

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div
      className="rounded-xl p-2.5 sm:p-3 flex flex-col gap-1.5 sm:gap-2"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(99,102,241,0.12)",
        boxShadow: "0 1px 3px rgba(30,27,75,0.06)",
      }}
    >
      <div
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
        style={{ background: `${color}15`, color }}
      >
        <Icon size={15} />
      </div>
      <div>
        <div className="text-slate-800 font-bold text-xs sm:text-sm leading-tight">{value}</div>
        <div className="text-slate-500 text-[10px] sm:text-[11px] leading-tight">{label}</div>
      </div>
    </div>
  );
}

function TimelineCard({ mod, isOpen, onOpen, onToggle, isLast, mounted }) {
  const Icon = mod.icon;
  return (
    <div
      className={`relative pl-0 sm:pl-16 transition-all duration-500 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
    >
      {!isLast && (
        <div
          className="hidden sm:block absolute left-[11px] sm:left-[19px] top-8 sm:top-9 bottom-[-20px] sm:bottom-[-24px] w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgba(37,99,235,0.35), rgba(147,51,234,0.35))",
          }}
        />
      )}
      <div
        className="hidden sm:flex absolute left-0 sm:left-2.5 top-2.5 sm:top-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full items-center justify-center"
        style={{
          background: "#ffffff",
          border: `2px solid ${mod.color}`,
          boxShadow: `0 0 0 3px ${mod.color}14`,
        }}
      >
        <div
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
          style={{ background: mod.color }}
        />
      </div>

      <div
        onMouseEnter={onOpen}
        onClick={onToggle}
        className="w-full text-left rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 group mb-4 sm:mb-6 relative"
        style={{
          background: "#ffffff",
          border: isOpen
            ? `1px solid ${mod.color}55`
            : "1px solid rgba(30,27,75,0.08)",
          boxShadow: isOpen
            ? `0 8px 24px -8px ${mod.color}33`
            : "0 1px 3px rgba(30,27,75,0.05)",
        }}
      >
        {/* header row */}
        <div className="relative z-0 transition-all duration-300 flex items-center gap-2 sm:gap-3 pl-12 sm:pl-20 pr-2.5 sm:pr-4 py-2.5 sm:py-4 min-h-[52px] sm:min-h-[60px]">
          {/* full-height gradient icon block — always on top, clearly visible */}
          <div
            className="absolute z-20 left-0 top-0 bottom-0 w-9 sm:w-16 flex items-center justify-center"
            style={{
              background: `linear-gradient(180deg, ${mod.color} 0%, ${darkenColor(
                mod.color,
                0.82
              )} 100%)`,
            }}
          >
            <Icon size={16} className="text-white drop-shadow-sm sm:w-5 sm:h-5" />
          </div>

          <span
            className="font-bold text-sm sm:text-lg w-5 sm:w-7 shrink-0"
            style={{ color: mod.color }}
          >
            {mod.id}
          </span>
          <span className="text-slate-800 font-semibold text-[13px] sm:text-base flex-1 truncate">
            {mod.title}
          </span>
          <span
            className="hidden sm:flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0"
            style={{
              background: `${mod.color}12`,
              color: mod.color,
              border: `1px solid ${mod.color}35`,
            }}
          >
            <Clock size={11} />
            {mod.duration}
          </span>
          <ChevronDown
            size={15}
            className="text-slate-400 shrink-0 transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>

        {/* expanded content */}
        {isOpen && mod.columns && (
          <div
            className="mx-2.5 transition-all duration-300 relative z-10 sm:mx-4 mb-3 sm:mb-4 rounded-lg sm:rounded-xl p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            style={{
              background: "#F8F7FC",
              border: "1px solid rgba(30,27,75,0.06)",
            }}
          >
            {mod.columns.map((col, ci) => (
              <div
                key={ci}
                className={`flex flex-col gap-2 sm:gap-2.5 ${ci > 0 ? "sm:pl-4 sm:border-l sm:border-slate-200" : ""
                  }`}
              >
                {col.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: mod.color }}
                    />
                    <span className="text-slate-600 text-[12.5px] sm:text-[13px] leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {isOpen && !mod.columns && mod.topics && (
          <div
            className="mx-2.5 sm:mx-4 mb-3 sm:mb-4 relative z-10 rounded-lg sm:rounded-xl p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2"
            style={{
              background: "#F8F7FC",
              border: "1px solid rgba(30,27,75,0.06)",
            }}
          >
            {mod.topics.map((item, ii) => (
              <div key={ii} className="flex items-start gap-2">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: mod.color }}
                />
                <span className="text-slate-600 text-[12.5px] sm:text-[13px] leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SapAbapSyllabus(props) {
  // support both calling conventions: <SyllabusCard data={...} /> or <SyllabusCard {...data} />
  const data = (props && props.data) || props || {};
  const [openId, setOpenId] = useState(null);
  const [mountedIds, setMountedIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Prefer incoming data's modules/curriculum when available, otherwise use defaults
  const displayedModules = useMemo(() => {
    try {
      const src =
        (props && props.curriculum) ||
        (data && data.modules) ||
        (data && data.overview && data.overview.modules) ||
        (data && data.curriculum);

      if (!Array.isArray(src) || src.length === 0) return defaultModules;

      return src.map((m, idx) => ({
        id: m.id || m.slug || String(idx + 1).padStart(2, "0"),
        title: m.title || m.name || `Module ${idx + 1}`,
        topics: m.topics || m.subtopics || m.items || m.content || [],
        duration: m.duration || m.time || "1 - 2 weeks",
        icon: m.icon || defaultModules[idx]?.icon || Code2,
        color: m.color || defaultModules[idx]?.color || "#9333EA",
        columns: m.columns,
      }));
    } catch (err) {
      return defaultModules;
    }
  }, [data, props && props.curriculum]);

  // ensure openId defaults to first available module id from displayedModules
  useEffect(() => {
    if (!displayedModules.length) {
      setOpenId(null);
      setMountedIds([]);
      return;
    }

    setOpenId((prev) =>
      prev && displayedModules.some((m) => m.id === prev)
        ? prev
        : displayedModules[0].id
    );
  }, [displayedModules]);

  useEffect(() => {
    if (!displayedModules.length) {
      setMountedIds([]);
      return;
    }

    const timeouts = displayedModules.map((mod, i) =>
      window.setTimeout(() => {
        setMountedIds((prev) => (prev.includes(mod.id) ? prev : [...prev, mod.id]));
      }, i * 80)
    );

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [displayedModules]);

  const handleDownloadBrochureClick = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleFormSubmit = useCallback(() => {
    setFormSubmitted(true);
    setShowForm(false);

    window.setTimeout(() => {
      if (data && data.downloadLink) {
        const link = document.createElement("a");
        link.href = data.downloadLink;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Download link is not available.");
      }
    }, 1000);
  }, [data]);

  // fallback
  if (!data) {
    return (
      <div className="w-full bg-white rounded-2xl mb-16 sm:mb-20 lg:mb-24">
        <div className="flex items-center justify-center py-16">
          <div className="text-slate-500 text-xl text-center">
            No SAP Modules data available (check masterData.js or prop passing).
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="relative w-full py-6 px-3 sm:py-10 sm:px-6 rounded-2xl sm:rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #FFFFFF 0%, #FAF9FF 45%, #F3F6FF 100%)",
        boxShadow:
          "0 25px 70px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Soft ambient tint, kept very light so it stays a light theme */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 500px 320px at 8% 0%, rgba(147,51,234,0.06), transparent 60%),
            radial-gradient(ellipse 600px 400px at 95% 15%, rgba(37,99,235,0.05), transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* LEFT CARD */}
        <div className="w-full lg:w-[32%] shrink-0">
          <div
            className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 lg:sticky lg:top-6"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(99,102,241,0.15)",
              boxShadow: "0 10px 30px -10px rgba(79,70,229,0.12)",
            }}
          >
            <div
              className="inline-flex items-center gap-1.5 w-fit px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full"
              style={{
                background: "rgba(147,51,234,0.08)",
                border: "1px solid rgba(147,51,234,0.25)",
              }}
            >
              <Package size={11} className="text-purple-600" />
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-purple-700 uppercase">
                Course Syllabus
              </span>
            </div>

            {/* Header */}
            <div className="text-start">
              <h3 className="text-base font-extrabold sm:text-2xl lg:text-3xl bg-gradient-to-r bg-clip-text text-transparent from-purple-600 to-blue-600 capitalize">
                {(data.title2 || data.title || "Course Title").replace(
                  /<[^>]+>/g,
                  ""
                )}
              </h3>
              <div className="mt-2 sm:mt-3 h-1 w-12 sm:w-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
            </div>

            <p className="text-slate-500 text-[12.5px] sm:text-[13px] leading-relaxed">
              {data.description || "Course description"}
              <br className="hidden sm:block" />
              {data.summary || "Course summary"}
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {stats.map((s, i) => (
                <StatCard key={i} {...s} />
              ))}
            </div>

            <button
              onClick={handleDownloadBrochureClick}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 sm:py-3.5 font-semibold text-white text-[13px] sm:text-sm transition-all duration-300 hover:brightness-110 hover:shadow-lg uppercase"
              style={{
                background: "linear-gradient(90deg, #9333EA, #3B82F6)",
                boxShadow: "0 8px 20px -6px rgba(147,51,234,0.35)",
              }}
            >
              DOWNLOAD Syllabus
              <Download size={14} />
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-[68%] flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-8">
            <div>
              <h3 className="text-slate-800 font-bold text-lg sm:text-2xl lg:text-[26px]">
                <span>Curriculum </span>
                <span className="bg-gradient-to-b font-bold from-purple-600 to-blue-500 bg-clip-text text-transparent capitalize">Overview</span>
              </h3>
              <div
                className="h-[3px] w-8 sm:w-10 rounded-full mt-1.5 sm:mt-2"
                style={{ background: "#9333EA" }}
              />
            </div>
            <div className="flex sm:flex-wrap gap-2 sm:gap-3">
              <div
                className="flex items-center gap-2 sm:gap-2.5 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(99,102,241,0.15)",
                  boxShadow: "0 1px 3px rgba(30,27,75,0.05)",
                }}
              >
                <Calendar size={14} className="text-purple-600" />
                <div>
                  <div className="text-slate-400 text-[10px] sm:text-[11px] leading-tight">
                    Duration per Module
                  </div>
                  <div className="text-purple-700 font-semibold text-xs sm:text-sm leading-tight">
                    1 - 2 weeks
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 sm:gap-2.5 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(99,102,241,0.15)",
                  boxShadow: "0 1px 3px rgba(30,27,75,0.05)",
                }}
              >
                <Users size={14} className="text-blue-600" />
                <div>
                  <div className="text-slate-400 text-[10px] sm:text-[11px] leading-tight">
                    Learning Mode
                  </div>
                  <div className="text-blue-700 font-semibold text-xs sm:text-sm leading-tight">
                    Live + Recorded
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {displayedModules.map((mod, i) => (
              <TimelineCard
                key={mod.id}
                mod={mod}
                isOpen={openId === mod.id}
                onOpen={() => setOpenId(mod.id)}
                onToggle={() =>
                  setOpenId(openId === mod.id ? null : mod.id)
                }
                isLast={i === displayedModules.length - 1}
                mounted={mountedIds.includes(mod.id)}
              />
            ))}
          </div>

          <div
            className="flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 mt-1 sm:mt-2"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(99,102,241,0.15)",
              boxShadow: "0 1px 3px rgba(30,27,75,0.05)",
            }}
          >
            <Info size={13} className="text-purple-600 shrink-0" />
            <span className="text-slate-500 text-[12px] sm:text-[13px]">
              <span className="text-slate-700 font-medium">Note:</span> To see
              the complete Modules Click on <span className="text-blue-600 underline font-semibold cursor-pointer" onClick={handleDownloadBrochureClick}>'Download Syllabus'</span> button
            </span>
          </div>
        </div>
      </div>

      {showForm && (
        <Btnform onClose={handleCloseForm} onSubmit={handleFormSubmit} />
      )}

      {/* Success Message */}
      {formSubmitted && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Thank you! Download will start shortly.
          </div>
        </div>
      )}
    </section>
  );
}