import Link from "next/link";
import AmbientBlueBackground from "../BackgroundCss/AnimatedBlueBg";

export default function ApplyBanner() {
  return (
    <section className="w-full bg-white px-6 py-10 text-center shadow-sm sm:px-12 sm:py-14">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium tracking-wide text-emerald-600">
        <span className="relative flex h-2 w-2">
          <span className="hiring-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        We&apos;re Hiring
      </span>

      <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
        Your next opportunity starts here.
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
        Join a team shaping the future of ed-tech. We&apos;re looking for
        curious, driven people to grow with us — apply today and let&apos;s
        build something great together.
      </p>

      <div className="mt-7">
        <Link
          href="/career"
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-800 px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-opacity hover:opacity-90"
        >
          APPLY NOW
        </Link>
      </div>

      <style jsx>{`
        @keyframes hiringPing {
          0% {
            transform: scale(1);
            opacity: 0.75;
          }
          75%,
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .hiring-ping {
          animation: hiringPing 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hiring-ping {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}