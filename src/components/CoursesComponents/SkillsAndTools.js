const FRONTEND = [
  { name: "React", hex: "#61DAFB", tint: "#EFFBFF" },
  { name: "Next.js", hex: "#171717", tint: "#F4F4F5" },
  { name: "TypeScript", hex: "#3178C6", tint: "#EFF6FF" },
  { name: "Tailwind CSS", hex: "#06B6D4", tint: "#ECFEFF" },
  { name: "JavaScript", hex: "#CA8A04", tint: "#FEFCE8" },
];

const BACKEND = [
  { name: "Node.js", hex: "#339933", tint: "#F0FDF4" },
  { name: "Express", hex: "#171717", tint: "#F4F4F5" },
  { name: "MongoDB", hex: "#47A248", tint: "#F0FDF4" },
  { name: "PostgreSQL", hex: "#4169E1", tint: "#EFF6FF" },
  { name: "GraphQL", hex: "#D6249F", tint: "#FDF2F8" },
];

const WORKFLOW = [
  { name: "Git", hex: "#F05032", tint: "#FFF5F2" },
  { name: "GitHub", hex: "#171717", tint: "#F4F4F5" },
  { name: "Figma", hex: "#F24E1E", tint: "#FFF5F2" },
  { name: "Vercel", hex: "#171717", tint: "#F4F4F5" },
  { name: "Docker", hex: "#2496ED", tint: "#EFF6FF" },
];

const SKILL_CHIPS = [
  "Debugging",
  "REST APIs",
  "Responsive Design",
  "Code Reviews",
  "CI/CD",
  "Agile / Scrum",
  "Accessibility",
  "Performance Tuning",
  "Testing",
  "Version Control",
];

function ToolChips({ tools }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tools.map(({ name, hex, tint }) => (
        <span
          key={name}
          className="tool-chip inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-all duration-200"
          style={{
            "--brand": hex,
            "--brand-tint": tint,
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: hex }}
          />
          {name}
        </span>
      ))}
    </div>
  );
}

function CategoryIcon({ children }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-sm">
      {children}
    </div>
  );
}

export default function SkillsAndTools() {
  return (
    <section className="relative overflow-hidden bg-white py-10 max-w-[1800px] mx-auto">
      {/* Ambient depth, no assets */}
      <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-100">
            Tech Stack
          </span>

          <h2 className="mt-4 bg-gradient-to-r from-slate-950 via-blue-900 to-slate-900 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            Skills &amp; Tools You&apos;ll Master
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-700" />

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            A real, production-grade toolkit, not toy examples. Everything
            here is what you&apos;ll actually touch on the job.
          </p>
        </div>

        {/* Stat banner */}
        <div className="dot-grid relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-6 shadow-lg shadow-blue-200 sm:px-10">
          <div className="relative grid grid-cols-3 divide-x divide-white/20 text-center text-white">
            <div className="px-2">
              <p className="text-2xl font-bold sm:text-3xl">15+</p>
              <p className="mt-1 text-xs font-medium text-blue-100 sm:text-sm">
                Tools &amp; frameworks
              </p>
            </div>

            <div className="px-2">
              <p className="text-2xl font-bold sm:text-3xl">3</p>
              <p className="mt-1 text-xs font-medium text-blue-100 sm:text-sm">
                Skill tracks covered
              </p>
            </div>

            <div className="px-2">
              <p className="text-2xl font-bold sm:text-3xl">100%</p>
              <p className="mt-1 text-xs font-medium text-blue-100 sm:text-sm">
                Production-grade stack
              </p>
            </div>
          </div>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Frontend */}
          <div className="tile rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60">
            <div className="flex items-center gap-3">
              <CategoryIcon>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="8 6 2 12 8 18" />
                  <polyline points="16 6 22 12 16 18" />
                </svg>
              </CategoryIcon>

              <div>
                <p className="text-base font-semibold text-slate-900">
                  Frontend
                </p>
                <p className="text-xs text-slate-500">
                  Interfaces that feel instant
                </p>
              </div>
            </div>

            <ToolChips tools={FRONTEND} />
          </div>

          {/* Backend & Data */}
          <div className="tile rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60">
            <div className="flex items-center gap-3">
              <CategoryIcon>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <ellipse cx="12" cy="5" rx="8" ry="3" />
                  <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
                  <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                </svg>
              </CategoryIcon>

              <div>
                <p className="text-base font-semibold text-slate-900">
                  Backend &amp; Data
                </p>
                <p className="text-xs text-slate-500">APIs that scale</p>
              </div>
            </div>

            <ToolChips tools={BACKEND} />
          </div>

          {/* Workflow */}
          <div className="tile rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60">
            <div className="flex items-center gap-3">
              <CategoryIcon>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="6" y1="3" x2="6" y2="15" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 1-9 9" />
                </svg>
              </CategoryIcon>

              <div>
                <p className="text-base font-semibold text-slate-900">
                  Workflow
                </p>
                <p className="text-xs text-slate-500">
                  Habits that keep teams fast
                </p>
              </div>
            </div>

            <ToolChips tools={WORKFLOW} />
          </div>
        </div>

        {/* Skill chip cloud */}
        <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Also covered
          </span>

          <div className="mt-4 flex flex-wrap gap-2">
            {SKILL_CHIPS.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:text-blue-700 hover:ring-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .tool-chip:hover {
          border-color: var(--brand);
          background-color: var(--brand-tint);
        }

        .dot-grid::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.15) 1px,
            transparent 1px
          );
          background-size: 16px 16px;
          pointer-events: none;
        }

        @keyframes toolFadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tile {
          animation: toolFadeIn 0.5s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .tile {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}