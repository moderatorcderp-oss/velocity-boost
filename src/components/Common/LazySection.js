"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders children only once the wrapper approaches the viewport.
 * Use for below-the-fold, non SEO-critical blocks (keeps JS off the main
 * thread until it is actually needed).
 */
export default function LazySection({
  children,
  fallback = null,
  rootMargin = "350px",
  intrinsicSize,
  className,
}) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        intrinsicSize
          ? { contentVisibility: "auto", containIntrinsicSize: intrinsicSize }
          : undefined
      }
    >
      {shouldRender ? children : fallback}
    </div>
  );
}

/**
 * Keeps children in the server-rendered HTML (SEO safe) but lets the browser
 * skip style/layout/paint work for them until they are scrolled near.
 */
export function DeferPaint({ children, intrinsicSize = "auto 700px", className }) {
  return (
    <div
      className={className}
      style={{ contentVisibility: "auto", containIntrinsicSize: intrinsicSize }}
    >
      {children}
    </div>
  );
}
