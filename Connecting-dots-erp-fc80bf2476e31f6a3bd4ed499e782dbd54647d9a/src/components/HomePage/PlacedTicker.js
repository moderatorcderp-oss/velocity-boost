"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "@/styles/HomePage/PlacedTicker.module.css";

// ── How many cards fit at each breakpoint ─────────────────────────────────────
function getVisibleCount() {
  if (typeof window === "undefined") return 5;
  const w = window.innerWidth;
  if (w < 420)  return 1;
  if (w < 600)  return 2;
  if (w < 768)  return 3;
  if (w < 1024) return 4;
  return 5;
}

const AVATAR_COLORS = [
  "#4f46e5", "#0891b2", "#059669", "#d97706",
  "#dc2626", "#7c3aed", "#0056d2", "#0e7490",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function PlacedTicker() {
  const [placements, setPlacements]     = useState([]);
  const [startIndex, setStartIndex]     = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading]       = useState(true);
  const [animDir, setAnimDir]           = useState(null); // "left" | "right" | null
  const animTimeout                     = useRef(null);

  // ── Load data from the shared JSON ───────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    fetch("/Jsonfolder/placementsData.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const list = data?.placedSection?.placements || [];
        setPlacements(list);
        // Random start → fresh set on every page visit
        if (list.length > 0) {
          setStartIndex(Math.floor(Math.random() * list.length));
        }
        setIsLoading(false);
      })
      .catch(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  // ── Keep visible count in sync with viewport ──────────────────────────────
  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Arrow navigation with brief animation lock ────────────────────────────
  const navigate = useCallback((direction) => {
    if (placements.length === 0 || animDir) return;
    setAnimDir(direction);
    animTimeout.current = setTimeout(() => {
      setStartIndex((prev) =>
        direction === "right"
          ? (prev + 1) % placements.length
          : (prev - 1 + placements.length) % placements.length
      );
      setAnimDir(null);
    }, 220);
  }, [placements.length, animDir]);

  useEffect(() => () => clearTimeout(animTimeout.current), []);

  // ── Derive the visible slice (wraps around the array) ────────────────────
  const visibleCards = placements.length > 0
    ? Array.from({ length: visibleCount }, (_, i) =>
        placements[(startIndex + i) % placements.length]
      )
    : [];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section className={styles.tickerSection}>
      <div className={styles.tickerInner}>

        {/* Header */}
        <div className={styles.tickerHeader}>
          <div className={styles.tickerTitleGroup}>
            <span className={styles.tickerBadge}>🎓 Recent Placements</span>
            <h2 className={styles.tickerTitle}>Our Students Are Getting Hired</h2>
            <p className={styles.tickerSubtitle}>
              Real results from our learners — placed at top companies across India.
            </p>
          </div>
          <a href="/placements" className={styles.tickerViewAll}>
            View All Placements →
          </a>
        </div>

        {/* Slider row */}
        <div className={styles.tickerRow}>

          {/* Left arrow */}
          <button
            className={styles.arrowBtn}
            onClick={() => navigate("left")}
            aria-label="Previous placements"
            disabled={isLoading || placements.length === 0}
          >
            ‹
          </button>

          {/* Cards viewport */}
          <div className={styles.cardsViewport}>
            {isLoading ? (
              // Skeleton grid — same column count as real cards
              <div
                className={styles.cardsTrack}
                style={{ "--cols": visibleCount }}
              >
                {Array.from({ length: visibleCount }).map((_, i) => (
                  <div key={i} className={`${styles.card} ${styles.cardSkeleton}`} />
                ))}
              </div>
            ) : (
              <div
                className={`${styles.cardsTrack} ${
                  animDir === "right"
                    ? styles.slideOutLeft
                    : animDir === "left"
                    ? styles.slideOutRight
                    : styles.slideIn
                }`}
                style={{ "--cols": visibleCount }}
              >
                {visibleCards.map((item, i) => {
                  const initials = item.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  const color = AVATAR_COLORS[(startIndex + i) % AVATAR_COLORS.length];

                  return (
                    <div
                      key={`${item.name}-${startIndex}-${i}`}
                      className={styles.card}
                    >
                      {/* Avatar + name + company */}
                      <div className={styles.cardTop}>
                        <div
                          className={styles.cardAvatar}
                          style={{ background: color }}
                        >
                          {initials}
                        </div>
                        <div className={styles.cardMeta}>
                          <p className={styles.cardName}>{item.name}</p>
                          <p className={styles.cardCompany}>{item.company}</p>
                        </div>
                      </div>

                      {/* Package badge */}
                      <span className={styles.cardPackage}>{item.package}</span>

                      {/* Position — bottom of card */}
                      <div className={styles.cardPosition}>{item.position}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right arrow */}
          <button
            className={styles.arrowBtn}
            onClick={() => navigate("right")}
            aria-label="Next placements"
            disabled={isLoading || placements.length === 0}
          >
            ›
          </button>
        </div>

        {/* Dot indicators */}
        {!isLoading && placements.length > 0 && (
          <div className={styles.dotsRow}>
            {Array.from({ length: Math.min(placements.length, 8) }).map((_, i) => {
              const groupSize = Math.floor(placements.length / 8);
              const isActive  = Math.floor(startIndex / Math.max(groupSize, 1)) === i;
              return (
                <button
                  key={i}
                  className={`${styles.dot} ${isActive ? styles.dotActive : ""}`}
                  onClick={() =>
                    setStartIndex(i * Math.max(groupSize, 1))
                  }
                  aria-label={`Jump to group ${i + 1}`}
                />
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
