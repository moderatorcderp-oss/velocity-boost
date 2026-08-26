import { Code2, Lightbulb, Users, Rocket, BarChart3, Award } from "lucide-react";

const OUTCOMES= [
  {
    icon: Code2,
    title: "Build real-world projects",
    description:
      "Apply every concept to projects that mirror what you'll actually ship on the job, not toy exercises.",
  },
  {
    icon: Lightbulb,
    title: "Think like a problem-solver",
    description:
      "Break down ambiguous problems into clear steps, the habit that separates juniors from seniors.",
  },
  {
    icon: BarChart3,
    title: "Make decisions with data",
    description:
      "Read the numbers that matter, spot what's working, and back your choices with evidence.",
  },
  {
    icon: Users,
    title: "Collaborate like a pro",
    description:
      "Give feedback, take feedback, and work inside a team workflow from day one.",
  },
  {
    icon: Rocket,
    title: "Ship with confidence",
    description:
      "Go from idea to a live, working result, and know exactly what to check before you hit publish.",
  },
  {
    icon: Award,
    title: "Walk away job-ready",
    description:
      "Finish with a portfolio and a skill set you can point to in an interview, not just a certificate.",
  },
];

export default function WhatYouWillLearn() {
  return (
    <section className="relative bg-white py-10 max-w-[1800px] mx-auto">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-14 md:mb-16">
          <div className="relative z-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-950 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-2">
              What You'll Learn
            </h2>
            <div className="w-20 h-1 mx-auto bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4"></div>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
              No filler modules. Every lesson here is built to land one of these six outcomes.
            </p>
          </div>
        </div>

        {/* Grid: 2 rows of 3 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="outcome-card group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes outcomeFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .outcome-card {
          animation: outcomeFadeIn 0.5s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .outcome-card { animation: none; }
        }
      `}</style>
    </section>
  );
}