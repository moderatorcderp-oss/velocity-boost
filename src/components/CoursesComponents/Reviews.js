// components/CoursesComponents/Reviews.js

"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import styles from "@/styles/CoursesComponents/Reviews.module.css";
import SectionHeading from "./SectionHeading";
import { useInView } from "react-intersection-observer";
import { Star, Pin, BadgeCheck, Quote } from "lucide-react";

/*
  Expected `data` shape:
  {
    title: "<html string>",
    subtitle: "optional plain text",
    reviews: [
      {
        id: "r1",
        name: "Aditi Sharma",
        course: "Full-Stack Web Development",
        batch: "Morning batch, Aug 2026",
        rating: 5,                 // 1–5, drives the star row + aggregate stats
        quote: "The plain-text review copy...",
        date: "2 weeks ago",
        verified: true,
        avatarInitials: "AS"       // used instead of a photo
      },
      ...
    ]
  }

  Everything under "AGGREGATE STATS" below is computed live from `reviews`
  — average rating, total count, and the per-star distribution — rather
  than being passed in as static numbers, so it always reflects whatever
  review data the page is given.
*/

const PIN_TILTS = [-4, 3, -2, 5, -3, 2];

const defaultData = {
  title: "What Our Students Say",
  subtitle: "Real experiences from learners who built practical skills with us.",
  reviews: [
    {
      id: "demo-review-1",
      name: "Aditi Sharma",
      course: "Full-Stack Web Development",
      batch: "Morning batch, Aug 2026",
      rating: 5,
      quote: "The sessions were practical and easy to follow. I built projects during the course and felt confident applying for developer roles.",
      date: "2 weeks ago",
      verified: true,
      avatarInitials: "AS",
    },
    {
      id: "demo-review-2",
      name: "Rahul Mehta",
      course: "SAP FICO Training",
      batch: "Weekend batch, Jul 2026",
      rating: 5,
      quote: "The trainer explained each business process with clear examples and answered every question patiently. The placement guidance was useful too.",
      date: "1 month ago",
      verified: true,
      avatarInitials: "RM",
    },
    {
      id: "demo-review-3",
      name: "Neha Verma",
      course: "Digital Marketing",
      batch: "Evening batch, Jun 2026",
      rating: 4,
      quote: "I liked the balance between strategy and hands-on campaign work. The projects gave me something concrete to show prospective employers.",
      date: "2 months ago",
      verified: true,
      avatarInitials: "NV",
    },
     {
      id: "demo-review-3",
      name: "Neha Verma",
      course: "Digital Marketing",
      batch: "Evening batch, Jun 2026",
      rating: 4,
      quote: "I liked the balance between strategy and hands-on campaign work. The projects gave me something concrete to show prospective employers.",
      date: "2 months ago",
      verified: true,
      avatarInitials: "NV",
    },
  ],
};

const Reviews = ({ data }) => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  data = data || defaultData;

  const reviews = data.reviews || [];

  return (
    <div
      ref={sectionRef}
      className={`${styles.containerYds} ${
        sectionInView ? styles.fadeIn : styles.hidden
      }`}
    >
      <SectionHeading titleHtml={data.title} description={data.subtitle} />

      {reviews.length > 0 ? (
        <ReviewsBody reviews={reviews} sectionInView={sectionInView} />
      ) : (
        <p className={styles.noReviews}>No reviews yet — be the first to leave one.</p>
      )}
    </div>
  );
};

const ReviewsBody = ({ reviews, sectionInView }) => {
  const [activeFilter, setActiveFilter] = useState(null); // null = show all

  // ---- AGGREGATE STATS: derived live from the reviews array ----
  const stats = useMemo(() => {
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    const average = total ? sum / total : 0;

    const distribution = [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((r) => Math.round(r.rating) === star).length;
      return {
        star,
        count,
        pct: total ? Math.round((count / total) * 100) : 0,
      };
    });

    return { total, average, distribution };
  }, [reviews]);

  const visibleReviews = activeFilter
    ? reviews.filter((r) => Math.round(r.rating) === activeFilter)
    : reviews;

  return (
    <>
      <StatsPanel
        stats={stats}
        activeFilter={activeFilter}
        onFilterToggle={(star) =>
          setActiveFilter((prev) => (prev === star ? null : star))
        }
        animate={sectionInView}
      />

      {activeFilter && (
        <div className={styles.filterNotice}>
          Showing {visibleReviews.length} review{visibleReviews.length !== 1 ? "s" : ""} rated{" "}
          {activeFilter} star{activeFilter !== 1 ? "s" : ""}
          <button
            className={styles.clearFilter}
            onClick={() => setActiveFilter(null)}
          >
            Clear filter
          </button>
        </div>
      )}

      <div className={styles.corkboard}>
        {visibleReviews.map((review, index) => (
          <ReviewPin key={index} review={review} index={index} />
        ))}
      </div>
    </>
  );
};

const StatsPanel = ({ stats, activeFilter, onFilterToggle, animate }) => {
  const [displayedAverage, setDisplayedAverage] = useState(0);
  const [displayedTotal, setDisplayedTotal] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplayedAverage(stats.average * progress);
      setDisplayedTotal(Math.round(stats.total * progress));
      if (progress < 1) requestAnimationFrame(tick);
      else {
        setDisplayedAverage(stats.average);
        setDisplayedTotal(stats.total);
      }
    };

    requestAnimationFrame(tick);
  }, [animate, stats.average, stats.total]);

  return (
    <div className={styles.statsPanel}>
      <div className={styles.statsSummary}>
        <div className={styles.averageNumber}>{displayedAverage.toFixed(1)}</div>
        <div className={styles.averageStars}>
          <StarRow rating={stats.average} size={16} />
        </div>
        <div className={styles.totalLabel}>
          Based on {displayedTotal} review{displayedTotal !== 1 ? "s" : ""}
        </div>
      </div>

      <div className={styles.distribution}>
        {stats.distribution.map(({ star, count, pct }) => (
          <button
            key={star}
            className={`${styles.distRow} ${
              activeFilter === star ? styles.distRowActive : ""
            }`}
            onClick={() => count > 0 && onFilterToggle(star)}
            disabled={count === 0}
            aria-pressed={activeFilter === star}
          >
            <span className={styles.distLabel}>{star}★</span>
            <span className={styles.distTrack}>
              <span
                className={styles.distFill}
                style={{ width: animate ? `${pct}%` : "0%" }}
              ></span>
            </span>
            <span className={styles.distCount}>{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const StarRow = ({ rating, size = 14 }) => {
  const rounded = Math.round(rating);
  return (
    <div className={styles.starRow} aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={2}
          className={i < rounded ? styles.starFilled : styles.starEmpty}
          fill={i < rounded ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

const ReviewPin = ({ review, index }) => {
  const [cardRef, cardInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  });

  const tilt = PIN_TILTS[index % PIN_TILTS.length];

  return (
    <div
      ref={cardRef}
      className={`${styles.noteCard} ${
        cardInView ? styles.noteVisible : styles.noteHidden
      }`}
      style={{ "--tilt": `${tilt}deg`, "--note-delay": `${index * 0.1}s` }}
    >
      <Pin className={styles.pinIcon} size={18} strokeWidth={2} />

      <Quote className={styles.quoteMark} size={22} strokeWidth={2} />

      <StarRow rating={review.rating || 0} />

      <p className={styles.quoteText}>{review.quote}</p>

      <div className={styles.reviewerRow}>
        <div className={styles.avatar}>{review.avatarInitials || "?"}</div>
        <div className={styles.reviewerInfo}>
          <div className={styles.reviewerName}>
            {review.name || "Anonymous"}
            {review.verified && (
              <BadgeCheck
                className={styles.verifiedIcon}
                size={15}
                strokeWidth={2.2}
              />
            )}
          </div>
          {review.course && (
            <div className={styles.reviewerCourse}>{review.course}</div>
          )}
        </div>
      </div>

      {(review.batch || review.date) && (
        <div className={styles.metaRow}>
          {review.batch && <span>{review.batch}</span>}
          {review.batch && review.date && <span className={styles.metaDot}>•</span>}
          {review.date && <span>{review.date}</span>}
        </div>
      )}
    </div>
  );
};

export default Reviews;