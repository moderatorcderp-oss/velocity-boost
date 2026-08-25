const POINTS = [
  {
    title: "Complete beginners welcome",
    description:
      "No prior coding experience needed. We start from the fundamentals and build up.",
  },
  {
    title: "Can commit a few hours a week",
    description:
      "5–7 focused hours weekly is enough to keep pace with the projects.",
  },
  {
    title: "Has a computer & internet",
    description:
      "Windows, Mac, or Linux — nothing special required to get started.",
  },
  {
    title: "Wants a real, lasting skill",
    description:
      "Looking to build a career-ready skill set, not a quick weekend hack.",
  },
];

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function WhoThisIsFor() {
  return (
    <section className="relative overflow-hidden bg-white py-10 mb-3">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-50 blur-3xl" />

      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-100">
            Eligibility
          </span>

          <h2 className="mt-4 bg-gradient-to-r from-slate-950 via-blue-900 to-slate-900 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            Who This Course Is For
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-700" />
        </div>

        {/* Ticket */}
        <div className="relative mx-auto flex max-w-4xl flex-col overflow-visible rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-100/60 md:flex-row">
          {/* Main content */}
          <div className="flex-1 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              You&apos;re a good fit if
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              {POINTS.map(({ title, description }) => (
                <div key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>

                  <div>
                    <p className="font-semibold text-slate-900">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Perforated divider — desktop */}
          <div className="relative hidden shrink-0 border-l-2 border-dashed border-slate-200 md:block">
            <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-slate-200 bg-white" />
            <span className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-slate-200 bg-white" />
          </div>

          {/* Divider — mobile */}
          <div className="border-t-2 border-dashed border-slate-200 md:hidden" />

          {/* Stub */}
          <div className="flex w-full shrink-0 flex-col items-center justify-center gap-3 rounded-b-3xl bg-blue-50/70 p-8 text-center md:w-52 md:rounded-b-none md:rounded-r-3xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-200">
              <CheckIcon className="h-6 w-6" />
            </div>

            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              You&apos;re Eligible
            </p>

            <p className="text-xs text-slate-500">
              No prerequisites required to enroll
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}