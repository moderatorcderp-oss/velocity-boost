"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Container from "./Container";

const AnimatedLogo = dynamic(() => import("../AnimatedLogo"), {
    ssr: false,
    loading: () => <div className="h-[26px] w-[26px] shrink-0 rounded-full bg-blue-50" />,
});

const sapMenu = {
    promo: {
        title: "SAP S/4 HANA",
        description:
            "Learn SAP S/4HANA from basic to advanced and build in-demand skills for a successful career.",
        features: [
            "Industry-Relevant Curriculum",
            "Expert-Led Training",
            "Real-time Projects",
            "Certification Guidance",
            "Placement Assistance",
        ],
        ctaLabel: "View All SAP Courses",
        ctaHref: "/sap-courses",
    },
    columns: [
        {
            title: "SAP Functional",
            subtitle: "Business & Process Oriented Solutions",
            icon: "user",
            layout: "double",
            links: [
                { label: "SAP FICO", href: "/sap-fico-course-in-pune" },
                { label: "SAP Ariba", href: "/sap-ariba-course-in-pune" },
                { label: "SAP MM", href: "/sap-mm-course-in-pune" },
                { label: "SAP SD", href: "/sap-sd-course-in-pune" },
                { label: "SAP HR/HCM", href: "/sap-hr-hcm-course-in-pune" },
                { label: "SAP PP", href: "/sap-pp-course-in-pune" },
                { label: "SAP QM", href: "/sap-qm-course-in-pune" },
                { label: "SAP PM", href: "/sap-pm-course-in-pune" },
                { label: "SAP PS", href: "/sap-ps-course-in-pune" },
                { label: "SAP EWM", href: "/sap-ewm-course-in-pune" },
                { label: "SAP SCM", href: "/sap-scm-course-in-pune" },
                { label: "SAP BTP", href: "/sap-btp-course-in-pune" },
                { label: "SAP EHS", href: "/sap-ehs-course-in-pune" },
                { label: "SAP GRC", href: "/sap-grc-course-in-pune" },
                { label: "SAP IBP", href: "/sap-ibp-course-in-pune" },
                { label: "SAP SuccessFactors", href: "/sap-successfactors-course-in-pune" },
            ],
        },
        {
            title: "SAP Technical",
            subtitle: "Technology & Development Focused",
            icon: "code",
            layout: "single",
            links: [
                { label: "SAP ABAP", href: "/sap-abap-course-in-pune" },
                { label: "SAP S/4 HANA", href: "/sap-s4-hana-course-in-pune" },
                { label: "SAP BW/BI", href: "/sap-bwbi-course-in-pune" },
                { label: "SAP Basis", href: "/sap-basis-course-in-pune" },
            ],
        },
    ],
    banner: {
        title: "Not sure which SAP course is right for you?",
        subtitle: "Our experts can help you choose the best path for your career.",
        ctaLabel: "Talk to an Expert",
        ctaHref: "/contactus",
    },
};

const itMenu = {
    promo: {
        title: "IT Courses with AI",
        description:
            "Master future-ready IT skills powered by AI and build a career in tech that keeps up with the industry.",
        features: [
            "Industry-Relevant Curriculum",
            "Expert-Led Training",
            "Real-time Projects",
            "Certification Guidance",
            "Placement Assistance",
        ],
        ctaLabel: "View All IT Courses",
        ctaHref: "/it-courses",
    },
    columns: [
        {
            title: "AI & Data Programs",
            icon: "chart",
            links: [
                { label: "Data Science with AI", href: "/data-science-with-ai-course-in-pune" },
                { label: "Generative AI", href: "/generative-ai-course-in-pune" },
                { label: "Agentic AI", href: "/agentic-ai-course-in-pune" },
                { label: "Python with AI", href: "/python-with-ai-course-in-pune" },
                { label: "AIML", href: "/ai-ml-course-in-pune" },
            ],
        },
        {
            title: "Data & Analytics",
            icon: "doc",
            links: [
                { label: "Advanced Data Analytics", href: "advanced-data-analytics-with-generative-ai-course-in-pune" },
                { label: "Data Visualization with AI", href: "/data-visualization-with-ai-course-in-pune" },
                { label: "Power BI", href: "/power-bi-course-in-pune" },
                { label: "Tableau", href: "/tableau-course-in-pune" },
            ],
        },
        {
            title: "Development & Cloud",
            icon: "code",
            links: [
                { label: "Full-Stack with AI", href: "/full-stack-with-ai-course-in-pune" },
                { label: "JAVA", href: "/java-course-in-pune" },
                { label: "AWS", href: "/aws-course-in-pune" },
                { label: "DevOps", href: "/devops-course-in-pune" },
                { label: "Salesforce", href: "/salesforce-course-in-pune" },
            ],
        },
    ],
    banner: {
        title: "Not sure which IT course is right for you?",
        subtitle: "Our experts can help you choose the best path for your career.",
        ctaLabel: "Talk to an Expert",
        ctaHref: "/contactus",
    },
};

const hrMenu = {
    promo: {
        title: "HR Courses",
        description:
            "Build core HR expertise and advance your career with practical, industry-aligned HR training.",
        features: [
            "Industry-Relevant Curriculum",
            "Expert-Led Training",
            "Real-time Projects",
            "Certification Guidance",
            "Placement Assistance",
        ],
        ctaLabel: "View All HR Courses",
        ctaHref: "/hr-courses",
    },
    columns: [
        {
            title: "HR Programs",
            icon: "user",
            links: [
                { label: "HR Training", href: "/hr-training-course-in-pune" },
                { label: "Core HR", href: "/core-hr-course-in-pune" },
                { label: "HR Payroll", href: "/hr-payroll-course-in-pune" },
                { label: "HR Management", href: "/hr-management-course-in-pune" },
                { label: "HR Generalist", href: "/hr-generalist-course-in-pune" },
                { label: "HR Analytics", href: "/hr-analytics-course-in-pune" },
            ],
        },
    ],
    banner: {
        title: "Not sure which HR course is right for you?",
        subtitle: "Our experts can help you choose the best path for your career.",
        ctaLabel: "Talk to an Expert",
        ctaHref: "/contactus",
    },
};

const NAV_ITEMS = [
    { label: "SAP S/4 HANA", href: "/sap-course-in-pune", menu: sapMenu },
    { label: "IT Courses with AI", href: "/it-course-with-ai-in-pune", menu: itMenu },
    { label: "HR Courses", href: "/hr-training-course-in-pune", menu: hrMenu },
    { label: "Placements", href: "/placements" },
    { label: "About us", href: "/aboutus" },
];

const ENQUIRE_HREF = "/contactus";

const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.50,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

function ColIcon({ name }) {
    const size = 21;
    switch (name) {
        case "chart":
            return (
                <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
                    <g fill="currentColor">
                        <rect x="3.6" y="12.4" width="3.5" height="7.6" rx="1.1" />
                        <rect x="10.2" y="8.2" width="3.5" height="11.8" rx="1.1" />
                        <rect x="16.8" y="4" width="3.5" height="16" rx="1.1" />
                    </g>
                    <path d="M4 9.4 9.4 5.6l3.6 2.3L20 3" {...stroke} strokeWidth={1.7} />
                </svg>
            );
        case "doc":
            return (
                <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...stroke}>
                    <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8z" />
                    <path d="M14 3v5h5M9 12.5h6M9 16.5h4" />
                </svg>
            );
        case "user":
            return (
                <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...stroke}>
                    <circle cx="12" cy="8.2" r="3.4" />
                    <path d="M5.4 20c0-3.7 3-5.6 6.6-5.6s6.6 1.9 6.6 5.6" />
                </svg>
            );
        case "code":
            return (
                <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...stroke}>
                    <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
                </svg>
            );
        case "chat":
        default:
            return (
                <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...stroke}>
                    <path d="M4 6.6A2.6 2.6 0 0 1 6.6 4h10.8A2.6 2.6 0 0 1 20 6.6v6.8a2.6 2.6 0 0 1-2.6 2.6H9l-5 3.9z" />
                    <path d="M8.6 10h.01M12 10h.01M15.4 10h.01" />
                </svg>
            );
    }
}

const FEATURE_ICONS = [
    <svg key="cap" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...stroke}>
        <path d="M12 3.6 2.8 7.6 12 11.6l9.2-4z" />
        <path d="M6.2 9.4v4.2c0 1.9 2.6 3.2 5.8 3.2s5.8-1.3 5.8-3.2V9.4" />
    </svg>,
    <svg key="person" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...stroke}>
        <circle cx="12" cy="8" r="3.3" />
        <path d="M5.6 19.6c0-3.5 2.9-5.3 6.4-5.3s6.4 1.8 6.4 5.3" />
    </svg>,
    <svg key="code" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...stroke}>
        <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>,
    <svg key="award" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...stroke}>
        <circle cx="12" cy="9" r="4.6" />
        <path d="m9.2 13.6-1.4 6.2 4.2-2.3 4.2 2.3-1.4-6.2" />
    </svg>,
    <svg key="case" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...stroke}>
        <rect x="3.4" y="7.4" width="17.2" height="12.2" rx="2.4" />
        <path d="M9 7.4V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.4M3.4 12.4h17.2" />
    </svg>,
];

function CapIcon({ size = 28 }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...stroke} strokeWidth={1.7}>
            <path d="M12 3.4 2 7.8 12 12.2l10-4.4z" />
            <path d="M5.6 10v4.6c0 2.1 2.9 3.6 6.4 3.6s6.4-1.5 6.4-3.6V10" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
            <path d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l2-2a1.2 1.2 0 0 1 1.3-.3c1 .35 2 .55 3.1.6a1.2 1.2 0 0 1 1.1 1.2v2.7a1.2 1.2 0 0 1-1.3 1.2A17.6 17.6 0 0 1 2.4 5.7 1.2 1.2 0 0 1 3.6 4.4h2.7A1.2 1.2 0 0 1 7.5 5.5c.05 1.05.25 2.1.6 3.1a1.2 1.2 0 0 1-.3 1.3l-1.2 1z" />
        </svg>
    );
}

function ChevronDown({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke} strokeWidth={2.4}>
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

function ChevronRight({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke} strokeWidth={2.3}>
            <path d="m9 6 6 6-6 6" />
        </svg>
    );
}

function ArrowRight() {
    return (
        <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" {...stroke} strokeWidth={2.2}>
            <path d="M4 12h14" />
            <path d="m12 6 6 6-6 6" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...stroke} strokeWidth={2.2}>
            <path d="M6 6l12 12M18 6 6 18" />
        </svg>
    );
}

const TONE = {
    chart: "bg-blue-100 text-blue-700",
    doc: "bg-violet-100 text-violet-700",
    user: "bg-emerald-100 text-emerald-700",
    chat: "bg-amber-100 text-amber-700",
    code: "bg-violet-100 text-violet-700",
};

const NAVBAR_EXTRA_CSS = `

.cdErpNavbarRoot{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
}

  .cdErpNavbarRoot .caret {
    left: var(--caret, 220px);
  }

  .cdErpNavbarRoot .desktop-nav {
    display: none;
  }

  .cdErpNavbarRoot .desktop-cta {
    display: none;
  }

  .cdErpNavbarRoot .burger {
    display: grid;
  }

  /* ============================================================
     MOBILE DRAWER — SIZE / OVERFLOW CONTROL
     ============================================================ */
  .cdErpNavbarRoot .drawer {
    display: none;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    position: absolute;
  }

  .cdErpNavbarRoot .drawer[data-open="true"] {
    display: flex;
    flex-direction: column;
    position: fixed;
    inset: 0;
    width: 100%;
    max-width: 100%;
    z-index: 2147483000;
    overflow-y: auto;
    overflow-x: hidden;
    background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
    padding: 14px;
    box-sizing: border-box;
  }

  @media (min-width: 1280px) {
    .cdErpNavbarRoot .desktop-nav {
      display: flex;
    }

    .cdErpNavbarRoot .desktop-cta {
      display: inline-flex;
    }

    .cdErpNavbarRoot .burger {
      display: none;
    }
  }
`;

const CLOSE_DELAY = 500;

function MegaPanel({ menu, id, onNavigate, onEnter, onLeave }) {
    return (
        <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <span className="caret pointer-events-none absolute top-1.5 h-3.5 w-5 overflow-hidden" style={{ left: "var(--caret, 220px)" }} aria-hidden="true" />
            <div className="mx-auto w-full max-w-[900px] rounded-[22px] border border-white/80 bg-gradient-to-b from-white to-slate-50 p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_30px_70px_-34px_rgba(30,64,175,0.32),_0_2px_10px_rgba(30,64,175,0.07)]">
                <div
                    className="grid gap-2"
                    style={{
                        gridTemplateColumns: `0.9fr ${menu.columns.map((c) => (c.layout === "double" ? "2fr" : "1fr")).join(" ")}`,
                    }}
                >
                    <div className="flex flex-col rounded-[16px] border border-slate-200 bg-gradient-to-b from-slate-50 to-blue-50/60 p-3 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]">
                        <div className="flex items-center gap-2.5">
                            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white bg-gradient-to-b from-white to-blue-50 text-blue-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]">
                                <CapIcon size={22} />
                            </span>
                            <h3 className="m-0 text-[15px] font-bold leading-tight text-blue-950" id={`${id}-t`}>
                                {menu.promo.title}
                            </h3>
                        </div>

                        <p className="mt-2 text-[11.5px] leading-5 text-slate-600">{menu.promo.description}</p>

                        <hr className="my-2 border-t border-slate-200" />

                        <ul className="flex flex-col gap-1.5 p-0">
                            {menu.promo.features.map((f, i) => (
                                <li key={f} className="flex items-center gap-2">
                                    <span className="grid h-[21px] w-[21px] place-items-center rounded-lg bg-blue-100 text-blue-700">
                                        {FEATURE_ICONS[i % FEATURE_ICONS.length]}
                                    </span>
                                    <span className="text-[11.5px] font-medium text-slate-700">{f}</span>
                                </li>
                            ))}
                        </ul>

                        <Link href={menu.promo.ctaHref} className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-blue-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2 text-[12px] font-semibold text-blue-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)] transition-transform duration-150 hover:-translate-y-0.5" onClick={onNavigate}>
                            {menu.promo.ctaLabel}
                            <ArrowRight />
                        </Link>
                    </div>

                    {menu.columns.map((col) => (
                        <div className="flex flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]" key={col.title}>
                            <div className="flex items-center gap-2 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 px-2.5 py-2">
                                <span className={`grid h-[27px] w-[27px] place-items-center rounded-[9px] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)] ${TONE[col.icon]}`}>
                                    <ColIcon name={col.icon} />
                                </span>
                                <span className="flex flex-col gap-0.5">
                                    <span className="text-[12px] font-bold text-slate-800">{col.title}</span>
                                    {col.subtitle ? <span className="text-[9.5px] font-medium text-slate-600">{col.subtitle}</span> : null}
                                </span>
                            </div>

                            <ul className={`flex flex-col gap-1.5 p-2 ${col.layout === "double" ? "grid grid-cols-2 gap-2" : ""}`}>
                                {col.links.map((l) => (
                                    <li key={l.label}>
                                        <Link href={l.href} className="flex items-center justify-between gap-2 rounded-[11px] border border-slate-200 bg-white px-2.5 py-2 text-[11.5px] font-semibold text-slate-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)] transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700" onClick={onNavigate}>
                                            <span>{l.label}</span>
                                            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-500 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-blue-700" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-2 flex flex-col items-center justify-between gap-3 rounded-[13px] border border-slate-200 bg-gradient-to-b from-slate-50 to-blue-50/70 px-3 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)] md:flex-row">
                    <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-[10px] border border-white bg-gradient-to-b from-white to-blue-50 text-blue-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]">
                            <CapIcon size={18} />
                        </span>
                        <div>
                            <p className="m-0 text-[12.5px] font-bold text-blue-950">{menu.banner.title}</p>
                            <p className="m-0 text-[10.5px] text-slate-600">{menu.banner.subtitle}</p>
                        </div>
                    </div>

                    <Link href={menu.banner.ctaHref} className="inline-flex items-center gap-2 rounded-[13px] bg-gradient-to-b from-blue-600 to-blue-700 px-3.5 py-2 text-[13px] font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,_0_-2px_0_rgba(23,54,140,0.5)_inset,_0_12px_22px_-10px_rgba(37,99,235,0.6)] transition-transform duration-150 hover:-translate-y-0.5" onClick={onNavigate}>
                        <PhoneIcon />
                        {menu.banner.ctaLabel}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Navbar2() {
    const [open, setOpen] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [section, setSection] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    const fullBarRef = useRef(null);
    const pillBarRef = useRef(null);
    const closeTimer = useRef(null);

    const activeBarRef = scrolled ? pillBarRef : fullBarRef;

    const placeCaret = useCallback(() => {
        if (open === null || !activeBarRef.current) return;
        const btn = activeBarRef.current.querySelector(`[data-tab="${open}"]`);
        const panel = activeBarRef.current.querySelector(`[data-panel="${open}"]`);
        if (!btn || !panel) return;
        const b = btn.getBoundingClientRect();
        const o = activeBarRef.current.getBoundingClientRect();
        panel.style.setProperty("--caret", `${b.left - o.left + b.width / 2}px`);
    }, [open, scrolled]);

    useLayoutEffect(placeCaret, [placeCaret]);

    useEffect(() => {
        const onResize = () => placeCaret();
        const onKey = (e) => {
            if (e.key === "Escape") {
                setOpen(null);
                setMobileOpen(false);
            }
        };
        const onDown = (e) => {
            const inFull = fullBarRef.current && fullBarRef.current.contains(e.target);
            const inPill = pillBarRef.current && pillBarRef.current.contains(e.target);
            const inDrawer = e.target instanceof Node && document.getElementById("nav-drawer")?.contains(e.target);
            if (!inFull && !inPill && !inDrawer) {
                setOpen(null);
            }
        };
        window.addEventListener("resize", onResize, { passive: true });
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onDown);
        return () => {
            window.removeEventListener("resize", onResize);
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onDown);
        };
    }, [placeCaret]);

    useEffect(() => {
        setOpen(null);
    }, [scrolled]);

    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    // ================================================================
    // SCROLL STATE — with hysteresis to stop flicker
    // ================================================================
    // CHANGED: previously both directions flipped at the same scrollY
    // (80px), so scrolling slowly near that boundary made `scrolled`
    // toggle back and forth rapidly (each toggle re-triggers the
    // full-bar/pill-bar transition, which read as a "glitch"). Now the
    // bar only switches to the pill once scrolled past 80px, and only
    // switches back once scrolled back up past 40px — a dead zone in
    // between that a normal slow scroll can pass through only once.
    useEffect(() => {
        let ticking = false;
        const SCROLL_DOWN_THRESHOLD = 80;
        const SCROLL_UP_THRESHOLD = 40;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled((prev) => {
                        const y = window.scrollY;
                        if (prev) return y > SCROLL_UP_THRESHOLD;
                        return y > SCROLL_DOWN_THRESHOLD;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const handleChange = (e) => {
            if (e.matches) {
                setMobileOpen(false);
                setSection(null);
            }
        };
        mq.addEventListener("change", handleChange);
        return () => mq.removeEventListener("change", handleChange);
    }, []);

    const hoverOpen = useCallback((i) => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setOpen(i);
    }, []);

    const hoverClose = useCallback(() => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            setOpen(null);
            closeTimer.current = null;
        }, CLOSE_DELAY);
    }, []);

    useEffect(() => {
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
        };
    }, []);

    useEffect(() => {
    const updateNavbarBottom = () => {
        const el = scrolled ? pillBarRef.current : fullBarRef.current;
        if (el) {
            const bottom = el.getBoundingClientRect().bottom;
            document.documentElement.style.setProperty(
                "--navbar-bottom",
                `${Math.max(bottom, 0)}px`
            );
        }
    };

    updateNavbarBottom();
    window.addEventListener("resize", updateNavbarBottom);
    window.addEventListener("scroll", updateNavbarBottom, { passive: true });
    return () => {
        window.removeEventListener("resize", updateNavbarBottom);
        window.removeEventListener("scroll", updateNavbarBottom);
    };
}, [scrolled]);

    // ================================================================
    // FULL (non-scrolled) BAR
    // ================================================================
    const renderFullBar = () => (
        <div className="relative w-full max-w-full" ref={fullBarRef}>
            <nav
                className="flex items-center justify-evenly overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-blue-50/80 px-3 py-px sm:px-4 sm:py-0.5 lg:px-5"
                aria-label="Main"
            >
                <Link href="/" className="flex shrink-0 items-center box-border px-2 py-0.5 text-decoration-none">
                    <AnimatedLogo className="h-4 w-4 shrink-0 transition-all duration-300 sm:h-5 sm:w-5 lg:h-7 lg:w-7" />
                    <Image
                        src="https://res.cloudinary.com/bropujss/image/upload/v1783687070/logo_rju9sa_scdui4.webp"
                        alt="Connecting Dots ERP Logo"
                        width={150}
                        height={120}
                        loading="lazy"
                        sizes="(max-width: 640px) 90px, 70px"
                        className="h-7 w-auto shrink-0 object-contain sm:h-10 sm:w-20 lg:h-14 lg:w-28"
                    />
                </Link>

                <ul className="desktop-nav flex items-center justify-center gap-4">
                    {NAV_ITEMS.map((item, i) =>
                        item.menu ? (
                            <li
                                key={item.label}
                                className="relative flex items-center"
                                onMouseEnter={() => hoverOpen(i)}
                                onMouseLeave={hoverClose}
                            >
                                <Link
                                    href={item.href}
                                    className="relative mx-1 flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-2.5 py-1 text-[14.5px] font-semibold text-slate-700 transition-colors duration-200 hover:text-blue-700"
                                    data-tab={i}
                                    data-open={open === i}
                                    aria-expanded={open === i}
                                    aria-controls={`mega-full-${i}`}
                                    onClick={() => setOpen(null)}
                                >
                                    {item.label}
                                    <ChevronDown className={`h-[14px] w-[14px] shrink-0 text-slate-400 transition-transform duration-300 ${open === i ? "rotate-180 text-blue-700" : ""}`} />
                                    <span className={`absolute bottom-[-6px] left-2 right-2 h-1 rounded-b-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 transition-opacity duration-200 ${open === i ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
                                </Link>
                            </li>
                        ) : (
                            <li key={item.label} className="relative flex items-center" onMouseEnter={() => hoverOpen(null)}>
                                <Link href={item.href || "/"} className="relative mx-1 flex items-center whitespace-nowrap rounded-[10px] px-2.5 py-1 text-[14.5px] font-semibold text-slate-700 transition-colors duration-200 hover:text-blue-700">
                                    {item.label}
                                </Link>
                            </li>
                        ),
                    )}
                </ul>

                <Link href={ENQUIRE_HREF} className="desktop-cta ml-4 inline-flex shrink-0 items-center gap-1.5 rounded-[11px] bg-gradient-to-b from-blue-600 to-blue-700 px-3.5 py-2 box-border text-[13px] font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,_0_-2px_0_rgba(23,54,140,0.5)_inset,_0_12px_22px_-10px_rgba(37,99,235,0.6)] transition-transform duration-150 hover:-translate-y-0.5">
                    <PhoneIcon />
                    Enquire Now
                </Link>

                <button
                    type="button"
                    className="burger ml-auto grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[12px] border border-slate-200 bg-gradient-to-b from-white to-blue-50 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]"
                    data-open={mobileOpen}
                    aria-expanded={mobileOpen}
                    aria-controls="nav-drawer"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMobileOpen((v) => !v)}
                >
                    <span className="relative block h-[14px] w-[18px]">
                        <i className="absolute left-0 top-0 h-[2px] w-full rounded-full bg-blue-900 transition-all duration-300" />
                        <i className="absolute left-0 top-[6px] h-[2px] w-full rounded-full bg-blue-900 transition-all duration-300" />
                        <i className="absolute left-0 top-[12px] h-[2px] w-full rounded-full bg-blue-900 transition-all duration-300" />
                    </span>
                </button>
            </nav>

            {NAV_ITEMS.map((item, i) =>
                item.menu ? (
                    <div
                        key={item.label}
                        id={`mega-full-${i}`}
                        className={`absolute left-0 right-0 top-full z-[2147483000] pt-1 transition-all duration-200 ${open === i && !scrolled
                            ? "pointer-events-auto visible opacity-100 translate-y-0"
                            : "pointer-events-none invisible opacity-0 -translate-y-2"
                            }`}
                        data-panel={i}
                        data-open={open === i}
                        aria-labelledby={`mega-full-${i}-t`}
                    >
                        <MegaPanel
                            menu={item.menu}
                            id={`mega-full-${i}`}
                            onNavigate={() => setOpen(null)}
                            onEnter={() => hoverOpen(i)}
                            onLeave={hoverClose}
                        />
                    </div>
                ) : null,
            )}
        </div>
    );

    // ================================================================
    // PILL / SHRUNK BAR (shows once the page is scrolled)
    // ================================================================
    const renderPillBar = () => (
        <div className="relative mx-auto w-full max-w-[1000px] px-3 sm:px-6 rounded-8xl" ref={pillBarRef}>
            <nav
                className="flex items-center justify-evenly overflow-hidden rounded-[26px] border border-white/90 bg-gradient-to-b from-white via-slate-50 to-blue-50/90 px-3 py-px shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,_0_20px_40px_-20px_rgba(30,64,175,0.26),_0_2px_6px_rgba(30,64,175,0.07)] sm:px-2 sm:py-0.5"
                aria-label="Main"
            >
                <Link href="/" className="flex md:hidden lg:hidden xl:hidden shrink-0 items-center box-border py-0.5 text-decoration-none">
                    <AnimatedLogo className="h-4 w-4 shrink-0 transition-all duration-300" />
                    <Image
                        src="https://res.cloudinary.com/bropujss/image/upload/v1783687070/logo_rju9sa_scdui4.webp"
                        alt="Connecting Dots ERP Logo"
                        width={80}
                        height={80}
                        loading="lazy"
                        sizes="(max-width: 500px) 100px, 130px"
                        className="h-7 w-auto shrink-0 object-contain sm:h-10 sm:w-16"
                    />
                </Link>
                <Link href="/" className="hidden md:flex lg:flex xl:flex shrink-0 items-center box-border py-0.5 text-decoration-none">
                    <AnimatedLogo className="h-4 w-4 shrink-0 transition-all duration-300 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    <Image
                        src="https://res.cloudinary.com/bropujss/image/upload/v1783687070/logo_rju9sa_scdui4.webp"
                        alt="Connecting Dots ERP Logo"
                        width={150}
                        height={120}
                        loading="lazy"
                        sizes="(max-width: 500px) 100px, 130px"
                        className="h-7 w-auto shrink-0 object-contain sm:h-10 sm:w-16 lg:h-12 lg:w-20"
                    />
                </Link>

                <ul className="desktop-nav flex items-center justify-center gap-2 shrink-0">
                    {NAV_ITEMS.map((item, i) =>
                        item.menu ? (
                            <li
                                key={item.label}
                                className="relative flex items-center shrink-0"
                                onMouseEnter={() => hoverOpen(i)}
                                onMouseLeave={hoverClose}
                            >
                                <Link
                                    href={item.href}
                                    className="relative mx-0.5 flex items-center gap-1 whitespace-nowrap rounded-[10px] px-2 py-1 text-[13px] font-semibold text-slate-700 transition-colors duration-200 hover:text-blue-700"
                                    data-tab={i}
                                    data-open={open === i}
                                    aria-expanded={open === i}
                                    aria-controls={`mega-pill-${i}`}
                                    onClick={() => setOpen(null)}
                                >
                                    {item.label}
                                    <ChevronDown className={`h-[12px] w-[12px] shrink-0 text-slate-400 transition-transform duration-300 ${open === i ? "rotate-180 text-blue-700" : ""}`} />
                                    <span className={`absolute bottom-[-6px] left-2 right-2 h-1 rounded-b-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 transition-opacity duration-200 ${open === i ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
                                </Link>
                            </li>
                        ) : (
                            <li key={item.label} className="relative flex items-center shrink-0" onMouseEnter={() => hoverOpen(null)}>
                                <Link
                                    href={item.href || "/"}
                                    className="relative mx-0.5 flex items-center whitespace-nowrap rounded-[10px] px-2 py-1 text-[13px] font-semibold text-slate-700 transition-colors duration-200 hover:text-blue-700"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ),
                    )}
                </ul>
                <Link href={ENQUIRE_HREF} className="desktop-cta ml-3 inline-flex shrink-0 items-center gap-1 rounded-[10px] bg-gradient-to-b from-blue-600 to-blue-700 px-3 py-1 text-[12px] font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,_0_-2px_0_rgba(23,54,140,0.5)_inset,_0_12px_22px_-10px_rgba(37,99,235,0.6)] transition-transform duration-150 hover:-translate-y-0.5">
                    <PhoneIcon />
                    Enquire Now
                </Link>

                <button
                    type="button"
                    className="burger ml-auto grid h-[30px] w-[30px] shrink-0 place-items-center rounded-md border border-slate-200 bg-gradient-to-b from-white to-blue-50 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]"
                    data-open={mobileOpen}
                    aria-expanded={mobileOpen}
                    aria-controls="nav-drawer"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMobileOpen((v) => !v)}
                >
                    <span className="relative block h-[12px] w-[16px]">
                        <i className="absolute left-0 top-0 h-[2px] w-full rounded-full bg-blue-900 transition-all duration-300" />
                        <i className="absolute left-0 top-[5px] h-[2px] w-full rounded-full bg-blue-900 transition-all duration-300" />
                        <i className="absolute left-0 top-[10px] h-[2px] w-full rounded-full bg-blue-900 transition-all duration-300" />
                    </span>
                </button>
            </nav>

            {NAV_ITEMS.map((item, i) =>
                item.menu ? (
                    <div
                        key={item.label}
                        id={`mega-pill-${i}`}
                        className={`absolute left-0 right-0 top-full z-[2147483000] pt-1 transition-all duration-200 ${open === i && scrolled
                            ? "pointer-events-auto visible opacity-100 translate-y-0"
                            : "pointer-events-none invisible opacity-0 -translate-y-2"
                            }`}
                        data-panel={i}
                        data-open={open === i}
                        aria-labelledby={`mega-pill-${i}-t`}
                    >
                        <MegaPanel
                            menu={item.menu}
                            id={`mega-pill-${i}`}
                            onNavigate={() => setOpen(null)}
                            onEnter={() => hoverOpen(i)}
                            onLeave={hoverClose}
                        />
                    </div>
                ) : null,
            )}
        </div>
    );

    return (
        <Container className="sticky top-0 z-[2147483000]">
            <div className="cdErpNavbarRoot box-border ">
                <style>{NAVBAR_EXTRA_CSS}</style>

                {/*
                  CHANGED: this used to be `${scrolled ? "hidden" : ""}`, which
                  is a `display:none` toggle — instant, no transition. That
                  collapsed this bar's reserved height in the document the
                  moment `scrolled` flipped, shifting the page/scroll position
                  out from under the still-animating pill bar below — that
                  shift is what read as a "glitch".

                  Now this bar is NEVER removed from layout. It always stays
                  in the document flow (so its height is always reserved,
                  and nothing shifts), and only its opacity/interactivity
                  crossfades with the pill bar. `pointer-events-none` when
                  scrolled keeps it from intercepting clicks/hovers while
                  it's invisible underneath the pill bar.
                */}
                <Container
                    className={`isolate relative z-[60] transition-opacity duration-300 ease-out ${
                        scrolled ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                    }`}
                >
                    {renderFullBar()}
                </Container>

                <Container
                    className={`isolate fixed inset-x-0 top-0 z-[2147483000] pt-2 transition-[opacity,transform] duration-300 ease-out ${
                        scrolled
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                    {renderPillBar()}
                </Container>

                <div id="nav-drawer" className="drawer pointer-events-auto w-full max-w-full" data-open={mobileOpen}>
                    <div className="mb-2 flex items-center justify-between rounded-[16px] p-2.5">
                        <Link href="/" className="flex items-center gap-2 text-decoration-none" onClick={() => setMobileOpen(false)}>
                            <AnimatedLogo className="h-7 w-7 shrink-0 sm:h-[36px] sm:w-[36px]" />
                            <Image
                                src="https://res.cloudinary.com/bropujss/image/upload/v1783687070/logo_rju9sa_scdui4.webp"
                                alt="Connecting Dots ERP Logo"
                                width={130}
                                height={100}
                                loading="lazy"
                                sizes="130px"
                                className="h-7 w-auto shrink-0 object-contain sm:h-[36px]"
                            />
                        </Link>

                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() => setMobileOpen(false)}
                            className="grid h-[32px] w-[32px] shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    <ul className="flex flex-col gap-1.5 p-0">
                        {NAV_ITEMS.map((item, i) => (
                            <li key={item.label}>
                                {item.menu ? (
                                    <>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between rounded-[12px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3.5 py-3 text-[14.5px] font-semibold text-slate-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]"
                                            data-open={section === i}
                                            aria-expanded={section === i}
                                            onClick={() => setSection(section === i ? null : i)}
                                        >
                                            {item.label}
                                            <ChevronDown className={`h-[14px] w-[14px] text-slate-400 transition-transform duration-300 ${section === i ? "rotate-180 text-blue-700" : ""}`} />
                                        </button>

                                        {section === i && (
                                            <div className="mt-1.5 max-w-full overflow-hidden rounded-[14px] border border-slate-200 bg-slate-50 p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]">
                                                {item.menu.columns.map((col) => (
                                                    <div key={col.title} className="mb-2.5 last:mb-0">
                                                        <div className="mb-1.5 flex items-center gap-2">
                                                            <span className={`grid h-[30px] w-[30px] place-items-center rounded-[10px] ${TONE[col.icon]}`}>
                                                                <ColIcon name={col.icon} />
                                                            </span>
                                                            <span className="text-[13.5px] font-bold text-slate-800">{col.title}</span>
                                                        </div>

                                                        <ul className="flex flex-col gap-1.5 p-0">
                                                            {col.links.map((l) => (
                                                                <li key={l.label}>
                                                                    <Link href={l.href} className="flex items-center justify-between rounded-[10px] border border-slate-200 bg-white px-2.5 py-2 text-[13.5px] font-semibold text-slate-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]" onClick={() => setMobileOpen(false)}>
                                                                        <span className="truncate">{l.label}</span>
                                                                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}

                                                <Link href={item.menu.promo.ctaHref} className="mt-1.5 inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-blue-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2 text-[12px] font-semibold text-blue-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]" onClick={() => setMobileOpen(false)}>
                                                    {item.menu.promo.ctaLabel}
                                                    <ArrowRight />
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link href={item.href || "/"} className="flex w-full items-center rounded-[12px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3.5 py-3 text-[14.5px] font-semibold text-slate-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,_0_1px_2px_rgba(30,64,175,0.09)]" onClick={() => setMobileOpen(false)}>
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    <Link href={ENQUIRE_HREF} className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-b from-blue-600 to-blue-700 px-3.5 py-3 text-[13.5px] font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,_0_-2px_0_rgba(23,54,140,0.5)_inset,_0_12px_22px_-10px_rgba(37,99,235,0.6)]" onClick={() => setMobileOpen(false)}>
                        <PhoneIcon />
                        Enquire Now
                    </Link>
                </div>
            </div>
        </Container>
    );
}