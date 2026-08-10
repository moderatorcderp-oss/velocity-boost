/**
 * WhyChooseSection — "Why Choose Connecting Dots ERP?"
 *
 * ZERO client-side JavaScript: React Server Component (no "use client",
 * no hooks, no styled-jsx). One inline SVG + plain CSS. Nothing hydrates
 * → no TBT / INP cost; fixed aspect ratio → no CLS.
 */

const ITEMS = [
    {
        id: "years",
        title: "10+ Years Experience",
        desc: "Over a decade of experience, our training institute has been a trusted name in delivering high-quality, industry-relevant education.",
        accent: "#ff5ee0",
    },
    {
        id: "trainers",
        title: "Working Professional Trainers",
        desc: "Learn from working professional trainers! Gain real-world insights, expert guidance, and industry-ready skills to help you succeed in today's job market.",
        accent: "#b18cff",
    },
    {
        id: "corporate",
        title: "Corporate Style Training",
        desc: "Multiple batches & support systems to make sure you can learn according to your convenience.",
        accent: "#5cb2ff",
    },
    {
        id: "alteration",
        title: "Experience Alteration",
        desc: "Our unique offering helps you apply for jobs with relevant experience, enhancing your resume and boosting hiring chances.",
        accent: "#8f8bff",
    },
    {
        id: "realtime",
        title: "Real Time Training & Scenario",
        desc: "Get hands-on experience with real-time training & real-time scenarios designed to build practical skills and boost your job readiness from day one!",
        accent: "#c45eff",
    },
    {
        id: "job",
        title: "100% Job Assistance",
        desc: "Get 100% job assistance with expert training, resume building, mock interviews & placement support at our top-rated training institute.",
        accent: "#ff5ecf",
    },
];

/* ---- inline icons (stroke-based, inherit currentColor) ---- */
const Icons = {
    years: (
        <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
            <circle cx="32" cy="32" r="22" strokeDasharray="120 30" />
            <text x="32" y="39" textAnchor="middle" fontSize="19" fontWeight="800" fill="currentColor" stroke="none" fontFamily="inherit">10+</text>
        </g>
    ),
    trainers: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="26" y="12" width="28" height="20" rx="2.5" />
            <path d="M33 19h14M33 25h9" strokeWidth="3" />
            <circle cx="19" cy="26" r="6" />
            <path d="M9 50c0-8 4.5-13 10-13s10 5 10 13M19 37v9M14 52l5-6 5 6" strokeWidth="3.5" />
        </g>
    ),
    corporate: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="32" cy="18" r="7" />
            <circle cx="14" cy="24" r="6" />
            <circle cx="50" cy="24" r="6" />
            <path d="M20 52c0-9 5-15 12-15s12 6 12 15M4 50c0-8 4-13 10-13M60 50c0-8-4-13-10-13" />
        </g>
    ),
    alteration: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="14" y="8" width="30" height="40" rx="4" />
            <path d="M22 18h14M22 26h14M22 34h8" strokeWidth="3.5" />
            <circle cx="41" cy="41" r="9" />
            <path d="M48 48l7 7" />
        </g>
    ),
    realtime: (
        <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="32" cy="32" r="22" />
            <path d="M32 18v14l10 6" />
        </g>
    ),
    job: (
        <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
            <circle cx="32" cy="32" r="22" strokeDasharray="118 32" />
            <text x="32" y="39" textAnchor="middle" fontSize="16.5" fontWeight="800" fill="currentColor" stroke="none" fontFamily="inherit">100%</text>
        </g>
    ),
    briefcase: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="10" y="20" width="44" height="32" rx="5" />
            <path d="M24 20v-5a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v5M10 33h44" />
        </g>
    ),
    tie: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M25 8h14l-4 10h-6zM29 18h6l5 26-8 12-8-12z" />
        </g>
    ),
    refresh: (
        <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 26a20 20 0 0 0-34-9M14 38a20 20 0 0 0 34 9" />
            <path d="M15 8v10h10M49 56V46H39" />
        </g>
    ),
};

/* ---- wheel sector paths (precomputed, 900x900 viewBox; ring 200→406) ---- */
const SECTORS = [
    { // top — Real Time Training & Scenario
        d: "M 283.0 99.8 A 18 18 0 0 1 292.4 75.8 A 406 406 0 0 1 607.6 75.8 A 18 18 0 0 1 617.0 99.8 L 543.9 253.2 A 18 18 0 0 1 520.9 263.0 A 200 200 0 0 0 379.1 263.0 A 18 18 0 0 1 356.1 253.2 Z",
        cx: 450, iconX: 427, iconY: 80, textY: 152, color: "#c45eff", label: ["Real Time", "Training &", "Scenario"], icon: "realtime",
    },
    { // upper-right — 100% Job Assistance
        d: "M 669.8 130.2 A 18 18 0 0 1 695.2 126.4 A 406 406 0 0 1 852.8 399.4 A 18 18 0 0 1 836.8 419.6 L 667.3 432.9 A 18 18 0 0 1 647.4 417.9 A 200 200 0 0 0 576.5 295.1 A 18 18 0 0 1 573.5 270.3 Z",
        cx: 712, iconX: 689, iconY: 246, textY: 317, color: "#ff5ecf", label: ["100% Job", "Assistance"], icon: "briefcase",
    },
    { // lower-right — 10+ Years Experience
        d: "M 836.8 480.4 A 18 18 0 0 1 852.8 500.6 A 406 406 0 0 1 695.2 773.6 A 18 18 0 0 1 669.8 769.8 L 573.5 629.7 A 18 18 0 0 1 576.5 604.9 A 200 200 0 0 0 647.4 482.1 A 18 18 0 0 1 667.3 467.1 Z",
        cx: 712, iconX: 689, iconY: 548, textY: 620, color: "#ff5ee0", label: ["10+ Years", "Experience"], icon: "years",
    },
    { // bottom — Working professional trainers
        d: "M 617.0 800.2 A 18 18 0 0 1 607.6 824.2 A 406 406 0 0 1 292.4 824.2 A 18 18 0 0 1 283.0 800.2 L 356.1 646.8 A 18 18 0 0 1 379.1 637.0 A 200 200 0 0 0 520.9 637.0 A 18 18 0 0 1 543.9 646.8 Z",
        cx: 450, iconX: 427, iconY: 686, textY: 758, color: "#b18cff", label: ["Working", "Professional", "Trainers"], icon: "corporate",
    },
    { // lower-left — Corporate Style Training
        d: "M 230.2 769.8 A 18 18 0 0 1 204.8 773.6 A 406 406 0 0 1 47.2 500.6 A 18 18 0 0 1 63.2 480.4 L 232.7 467.1 A 18 18 0 0 1 252.6 482.1 A 200 200 0 0 0 323.5 604.9 A 18 18 0 0 1 326.5 629.7 Z",
        cx: 188, iconX: 165, iconY: 535, textY: 606, color: "#5cb2ff", label: ["Corporate", "Style", "Training"], icon: "tie",
    },
    { // upper-left — Experience Alteration
        d: "M 63.2 419.6 A 18 18 0 0 1 47.2 399.4 A 406 406 0 0 1 204.8 126.4 A 18 18 0 0 1 230.2 130.2 L 326.5 270.3 A 18 18 0 0 1 323.5 295.1 A 200 200 0 0 0 252.6 417.9 A 18 18 0 0 1 232.7 432.9 Z",
        cx: 188, iconX: 165, iconY: 246, textY: 317, color: "#8f8bff", label: ["Experience", "Alteration"], icon: "refresh",
    },
];

function WheelSVG() {
    return (
        <svg
            className="wc-wheel"
            viewBox="0 0 900 900"
            role="img"
            aria-label="Keypoints wheel: Real Time Training & Scenario, 100% Job Assistance, 10+ Years Experience, Working Professional Trainers, Corporate Style Training, Experience Alteration"
        >
            <defs>
                {/* rim-lit fills: dark near hub, colored glow toward the outer rim */}
                {SECTORS.map((s, i) => (
                    <radialGradient key={i} id={`wcg${i}`} gradientUnits="userSpaceOnUse" cx="450" cy="450" r="406">
                        <stop offset="49%" stopColor={s.color} stopOpacity="0.05" />
                        <stop offset="80%" stopColor={s.color} stopOpacity="0.16" />
                        <stop offset="100%" stopColor={s.color} stopOpacity="0.44" />
                    </radialGradient>
                ))}
                <radialGradient id="wcHub" cx="35%" cy="28%" r="95%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="#f1edfb" />
                    <stop offset="100%" stopColor="#ddd4f2" />
                </radialGradient>
                <linearGradient id="wcHubRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a06bff" />
                    <stop offset="100%" stopColor="#ff5ecf" />
                </linearGradient>
            </defs>

            {/* dashed orbit ring + faint solid ring */}
            <circle cx="450" cy="450" r="438" fill="none" stroke="#8a6cff" strokeOpacity="0.38" strokeWidth="1.5" strokeDasharray="3 9" />
            <circle cx="450" cy="450" r="418" fill="none" stroke="#8a6cff" strokeOpacity="0.10" strokeWidth="1" />
            {/* orbit dots at the gaps between sectors */}
            {[[669, 71], [888, 450], [669, 829], [231, 829], [12, 450], [231, 71]].map(([x, y], i) => (
                <g key={i}>
                    <circle cx={x} cy={y} r="9" fill="#b18cff" opacity="0.25" />
                    <circle cx={x} cy={y} r="4.5" fill="#efe8ff" className="wc-dot" style={{ animationDelay: `${i * 0.5}s` }} />
                </g>
            ))}

            {SECTORS.map((s, i) => (
                <g key={i} className="wc-sector">
                    {/* hover glow layer (fades in smoothly) */}
                    <path d={s.d} fill="none" stroke={s.color} strokeWidth="7" className="wc-neon" />
                    <path d={s.d} fill={`url(#wcg${i})`} stroke={s.color} strokeWidth="2.5" style={{ filter: `drop-shadow(0 0 9px ${s.color}77)` }} />
                    <svg x={s.iconX} y={s.iconY} width="46" height="46" viewBox="0 0 64 64" color="#ffffff" style={{ filter: `drop-shadow(0 0 6px ${s.color}aa)` }}>{Icons[s.icon]}</svg>
                    <text x={s.cx} y={s.textY} textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="700" letterSpacing="0.4" style={{ paintOrder: "stroke", stroke: "rgba(10,3,24,.45)", strokeWidth: 3 }}>
                        {s.label.map((line, li) => (
                            <tspan key={li} x={s.cx} dy={li === 0 ? 0 : 27}>{line}</tspan>
                        ))}
                    </text>
                </g>
            ))}

            {/* center hub: gradient ring + white disc */}
            <circle cx="450" cy="450" r="134" fill="none" stroke="url(#wcHubRing)" strokeWidth="2" opacity="0.7" />
            <circle cx="450" cy="450" r="118" fill="url(#wcHub)" style={{ filter: "drop-shadow(0 0 30px rgba(170,110,255,0.5)) drop-shadow(0 4px 14px rgba(0,0,0,0.4))" }} />
            <text x="450" y="450" textAnchor="middle" fill="#191033" fontSize="32" fontWeight="900" letterSpacing="2.5">KEYPOINTS</text>
            <circle cx="427" cy="481" r="6.5" fill="#c45eff" />
            <circle cx="450" cy="481" r="6.5" fill="#ff5ecf" />
            <circle cx="473" cy="481" r="6.5" fill="#5cb2ff" />
        </svg>
    );
}

export default function WhyChooseSection() {
    return (
        <div className="relative left-1/2 -translate-x-1/2 w-screen">
            <section className="wc max-w-[1800px] w-full mx-auto" aria-labelledby="wc-heading">
                {/* background decorations: dotted grid (top-left) + waves (bottom-left) */}
                <svg className="wc-bg wc-bg-dots" width="340" height="300" viewBox="0 0 340 300" aria-hidden="true">
                    <defs>
                        <pattern id="wcDots" width="17" height="17" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.6" fill="#8a63ff" />
                        </pattern>
                        <radialGradient id="wcDotsFade" cx="0%" cy="0%" r="100%">
                            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                        </radialGradient>
                        <mask id="wcDotsMask"><rect width="340" height="300" fill="url(#wcDotsFade)" /></mask>
                    </defs>
                    <rect width="340" height="300" fill="url(#wcDots)" mask="url(#wcDotsMask)" />
                </svg>
                <svg className="wc-bg wc-bg-waves" width="760" height="320" viewBox="0 0 760 320" fill="none" aria-hidden="true">
                    <defs>
                        <linearGradient id="wcWave" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="#3b6cff" stopOpacity="0.55" />
                            <stop offset="55%" stopColor="#8a4dff" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#c44dff" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {[0, 14, 28, 42, 56].map((o) => (
                        <path key={o} d={`M -20 ${268 - o} C 160 ${318 - o} 300 ${168 - o} 470 ${208 - o} S 720 ${118 - o} 790 ${58 - o}`} stroke="url(#wcWave)" strokeWidth="1.4" />
                    ))}
                </svg>

                <h2 id="wc-heading" className="wc-h">
                    Why Choose <span className="wc-grad">Connecting Dots ERP?</span>
                </h2>
                <div className="wc-underline" aria-hidden="true" />

                <div className="wc-grid">
                    <div className="wc-wheelwrap">
                        <WheelSVG />
                    </div>

                    <ol className="wc-list">
                        {ITEMS.map((it) => (
                            <li key={it.id} className="wc-item" style={{ "--accent": it.accent }}>
                                <span className="wc-tile" aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 64 64" color="var(--accent)">{Icons[it.id]}</svg>
                                </span>
                                <div>
                                    <h3 className="wc-t">{it.title}</h3>
                                    <p className="wc-d">{it.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Plain <style> — server-rendered, zero JS. wc- prefix avoids collisions. */}
                <style>{`
                .wc{
                    position:relative;
                    isolation:isolate;
                    overflow:hidden;
                    background:radial-gradient(900px 600px at 12% -5%,rgba(88,36,180,.38) 0%,rgba(40,14,92,.18) 45%,transparent 70%),radial-gradient(700px 500px at 100% 100%,rgba(120,30,160,.16) 0%,transparent 65%),linear-gradient(160deg,#120629 0%,#0b0318 55%,#08020f 100%);
                    color:#fff;
                    padding:clamp(40px,6vw,84px) clamp(16px,5vw,72px);
                    font-family:inherit;
                }
                .wc-bg{position:absolute;z-index:-1;pointer-events:none}
                .wc-bg-dots{top:24px;left:18px}
                .wc-bg-waves{bottom:-30px;left:0;width:min(760px,60vw);max-width:60vw}
                .wc-h{text-align:center;font-size:clamp(20px,2.6vw,34px);font-weight:900;margin:0;letter-spacing:.3px;text-wrap:balance}
                .wc-grad{background:linear-gradient(90deg,#a06bff 0%,#d858f0 55%,#ff5ecf 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
                .wc-underline{width:80px;height:4px;border-radius:3px;margin:12px auto 0;background:linear-gradient(90deg,#a06bff,#ff5ecf);box-shadow:0 0 10px rgba(200,90,240,.7)}
                .wc-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.02fr);gap:clamp(18px,3.4vw,52px);align-items:center;max-width:960px;margin:clamp(22px,3.4vw,44px) auto 0}
                .wc-wheelwrap{aspect-ratio:1;max-width:440px;margin:0 auto;width:100%}
                .wc-wheel{display:block;width:100%;height:100%}
                .wc-sector{transition:transform .3s cubic-bezier(.3,1.4,.5,1);transform-origin:450px 450px;cursor:default}
                .wc-neon{filter:blur(7px);opacity:0;transition:opacity .35s ease}
                @media(hover:hover){.wc-sector:hover{transform:scale(1.035)}.wc-sector:hover .wc-neon{opacity:.9}}
                .wc-dot{animation:wcTwinkle 3.2s ease-in-out infinite}
                @keyframes wcTwinkle{0%,100%{opacity:.45}50%{opacity:1}}
                .wc-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;counter-reset:wc}
                .wc-item{position:relative;display:flex;gap:13px;align-items:flex-start;padding:12px 10px;border-radius:12px;transition:background .25s ease,transform .25s ease}
                .wc-item::after{content:"";position:absolute;left:10px;right:20px;bottom:0;border-bottom:1.5px dashed rgba(160,120,255,.32)}
                .wc-item::before{content:"";position:absolute;right:10px;bottom:-3.5px;width:6px;height:6px;border-radius:50%;background:var(--accent);opacity:.75;box-shadow:0 0 8px var(--accent)}
                .wc-item:last-child::after,.wc-item:last-child::before{display:none}
                @media(hover:hover){.wc-item:hover{background:rgba(146,104,255,.08);transform:translateX(3px)}}
                .wc-tile{flex:0 0 42px;height:42px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(150deg,#ffffff 0%,#efe8fd 60%,#e2d6fa 100%);box-shadow:inset 0 1px 0 #fff,0 0 0 1.5px color-mix(in srgb,var(--accent) 60%,transparent),0 0 14px color-mix(in srgb,var(--accent) 38%,transparent),0 3px 8px rgba(0,0,0,.35)}
                .wc-t{margin:0 0 4px;font-size:clamp(13px,1.1vw,15px);font-weight:800;letter-spacing:.2px;color:var(--accent);filter:brightness(1.18)}
                .wc-d{margin:0;font-size:clamp(11.5px,.95vw,13px);line-height:1.55;color:#c9bfe6;max-width:56ch}
                @media(max-width:900px){.wc-grid{grid-template-columns:1fr}.wc-wheelwrap{max-width:340px}.wc-item{padding:10px 6px}}
                @media(prefers-reduced-motion:reduce){.wc-sector,.wc-neon,.wc-item{transition:none}.wc-dot{animation:none}}
            `}</style>
            </section>
        </div>
    );
}