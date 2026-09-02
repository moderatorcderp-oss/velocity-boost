// components/CoursesComponents/Why.js (Redesigned — "Field Notes")

"use client";

import { useState, useEffect, useRef } from "react";
import styles from "@/styles/CoursesComponents/Why.module.css";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Rotates through a small palette of "subject tab" colors, one per card.
const TAB_COLORS = ["teal", "violet", "amber", "raspberry"];

const Why = ({ data }) => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!data) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>No data available for this section.</p>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={`${styles.containerYds} ${sectionInView ? styles.fadeIn : styles.hidden}`}
    >
      <SectionComponent section={data} />
    </div>
  );
};

const SectionComponent = ({ section }) => {
  const titleRef = useRef(null);
  // Each card expands independently - clicking one never affects the others
  const [expandedCards, setExpandedCards] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      const title = titleRef.current;
      title.classList.add(styles.titleAnimation);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleExpandToggle = (cardIndex) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  };

  const isCardExpanded = (cardIndex) => expandedCards[cardIndex] || false;

  return (
    <>
      <div ref={titleRef}>
        <div className="text-center mb-4 sm:mb-14 md:mb-16">
          <div className="relative z-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-950 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-2">
              Course Overview
            </h2>
            <div className="w-20 h-1 mx-auto bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4"></div>
          </div>
        </div>
      </div>

      <div className={styles.cardsContainerYds}>
        {section.cards && section.cards.length > 0 ? (
          section.cards.map((card, index) => (
            <DataCard
              key={index}
              title={card.title}
              content={card.content}
              listItems={card.listItems}
              index={index}
              tabColor={TAB_COLORS[index % TAB_COLORS.length]}
              expanded={isCardExpanded(index)}
              onExpandToggle={() => handleExpandToggle(index)}
              isMobile={isMobile}
            />
          ))
        ) : (
          <p className={styles.noCards}>No cards available for this section.</p>
        )}
      </div>
    </>
  );
};

const DataCard = ({
  title,
  content,
  listItems,
  index,
  tabColor,
  expanded,
  onExpandToggle,
  isMobile,
}) => {
  const [cardRef, cardInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);

  // Character limits for different screen sizes
  const DESKTOP_CHAR_LIMIT = 120;
  const MOBILE_CHAR_LIMIT = 100;

  // Calculate total content length
  const getTotalContentLength = () => {
    let totalLength = 0;

    if (Array.isArray(content)) {
      totalLength += content.join(" ").replace(/<[^>]*>/g, "").length;
    } else {
      totalLength += content.replace(/<[^>]*>/g, "").length;
    }

    if (listItems && listItems.length > 0) {
      totalLength += listItems.join(" ").length;
    }

    return totalLength;
  };

  // Check if content should be truncated
  useEffect(() => {
    const totalLength = getTotalContentLength();
    const charLimit = isMobile ? MOBILE_CHAR_LIMIT : DESKTOP_CHAR_LIMIT;
    setShowReadMore(totalLength > charLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, listItems, isMobile]);

  // Truncate content based on character limit
  const getTruncatedContent = () => {
    const charLimit = isMobile ? MOBILE_CHAR_LIMIT : DESKTOP_CHAR_LIMIT;
    let currentLength = 0;
    const truncatedContent = [];
    const truncatedListItems = [];

    // Process content paragraphs
    if (Array.isArray(content)) {
      for (let i = 0; i < content.length; i++) {
        const paragraph = content[i];
        const textLength = paragraph.replace(/<[^>]*>/g, "").length;

        if (currentLength + textLength <= charLimit) {
          truncatedContent.push(paragraph);
          currentLength += textLength;
        } else {
          const remainingChars = charLimit - currentLength;
          if (remainingChars > 50) {
            const truncatedParagraph =
              paragraph.replace(/<[^>]*>/g, "").substring(0, remainingChars) +
              "...";
            truncatedContent.push(truncatedParagraph);
          }
          break;
        }
      }
    } else {
      const textLength = content.replace(/<[^>]*>/g, "").length;
      if (textLength <= charLimit) {
        truncatedContent.push(content);
        currentLength = textLength;
      } else {
        const truncatedText =
          content.replace(/<[^>]*>/g, "").substring(0, charLimit) + "...";
        truncatedContent.push(truncatedText);
        currentLength = charLimit;
      }
    }

    // Process list items if there's space left
    if (listItems && listItems.length > 0 && currentLength < charLimit) {
      for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        if (currentLength + item.length <= charLimit) {
          truncatedListItems.push(item);
          currentLength += item.length;
        } else {
          break;
        }
      }
    }

    return { content: truncatedContent, listItems: truncatedListItems };
  };

  const renderContent = () => {
    if (!showReadMore || expanded) {
      // Show full content
      return (
        <>
          {Array.isArray(content) ? (
            content.map((paragraph, idx) => (
              <p
                key={idx}
                className={styles.textMutedForegroundClass}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></p>
            ))
          ) : (
            <p
              className={styles.textMutedForegroundClass}
              dangerouslySetInnerHTML={{ __html: content }}
            ></p>
          )}

          {listItems && listItems.length > 0 && (
            <ul className={styles.listClass}>
              {listItems.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </>
      );
    } else {
      // Show truncated content
      const truncated = getTruncatedContent();
      return (
        <>
          {truncated.content.map((paragraph, idx) => (
            <p
              key={idx}
              className={styles.textMutedForegroundClass}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            ></p>
          ))}

          {truncated.listItems.length > 0 && (
            <ul className={styles.listClass}>
              {truncated.listItems.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </>
      );
    }
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.cardClassYds} ${cardInView ? styles.cardVisible : styles.cardHidden
        } ${expanded ? styles.cardExpanded : ""}`}
      style={{ "--card-delay": `${index * 0.12}s` }}
      data-tab={tabColor}
    >
      {/* Spiral-bound punch holes across the top edge */}
      <div className={styles.spiralRow} aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className={styles.spiralRing}></span>
        ))}
      </div>

      {/* Subject tab, like a filing-folder marker */}
      <div className={styles.cardTab} aria-hidden="true">
        <FontAwesomeIcon icon={faLightbulb} className={styles.tabIcon} />
        <span className={styles.tabLabel}>
          Note — {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.cardHeader}>
        <h2
          className={styles.textPrimaryClass}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h2>
      </div>

      <div ref={contentRef} className={styles.cardContent}>
        {renderContent()}
      </div>

      {showReadMore && (
        <div className={styles.readMoreContainer}>
          <button
            className={styles.readMoreButton}
            onClick={onExpandToggle}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Close the page" : "Keep reading"}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.readMoreChevron}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Why;