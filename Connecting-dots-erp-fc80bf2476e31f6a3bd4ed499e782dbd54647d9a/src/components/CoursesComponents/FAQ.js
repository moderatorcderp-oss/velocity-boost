// components/CoursesComponents/FAQ.js
"use client";

import { useState } from "react";
import { Headphones, MessageCircle, Phone, Plus, Minus } from "lucide-react";
import SectionBackground from "../BackgroundCss/SectionBackground";
import Container from "../StandardContainer";

const FAQ_DATA = [
  {
    question: "What is SAP and why do companies use it?",
    answer:
      "SAP is business software that helps companies manage things like finance, inventory, HR, and operations all from one system, instead of juggling a dozen different tools. Big companies use it because it keeps everything connected — so when something changes in one department, the rest of the business sees it too. That's why SAP skills are in demand, especially in finance, supply chain, and consulting roles.",
  },
  {
    question: "Is an IT course worth it in 2026?",
    answer:
      "Yes, IT is still one of the safer bets when it comes to career growth. Tech isn't slowing down, and companies across every industry — not just tech companies — need people who understand systems, cloud, networking, or software. The trick is picking a specialization instead of trying to learn \"IT\" in a vague, general sense. That's usually what separates someone who gets hired quickly from someone who doesn't.",
  },
  {
    question: "What does an AI course actually teach you?",
    answer:
      "Most AI courses start with the basics — how machines \"learn\" from data, some math and statistics behind it, and then move into hands-on stuff like building models, working with tools like Python, and understanding real use cases like chatbots, recommendation systems, or automation. A good course won't just throw theory at you; it'll have you building small projects along the way so you actually understand how it works, not just what it is.",
  },
  {
    question: "What is an HR course, and is it a good career option?",
    answer:
      "An HR course teaches you how businesses hire, train, manage, and retain people — think recruitment, payroll, employee relations, and workplace policies. It's a good option if you're someone who enjoys working with people rather than just systems or code. HR isn't going anywhere either; every company, no matter the industry, needs someone handling this side of things.",
  },
  {
    question: "Which is better — learning SAP or a general IT course?",
    answer:
      "It's not really about one being \"better,\" it's about what you want to do. SAP is more specialized and tends to lead into consulting or enterprise roles with solid pay, but it's a narrower path. A general IT course gives you more flexibility early on, and you can specialize later once you know what you actually enjoy. If you already know you want to work with big businesses on their internal systems, go SAP. If you're still exploring, IT gives you more room to figure that out.",
  },
  {
    question: "Will AI replace IT and other tech jobs?",
    answer:
      "AI is changing how a lot of IT work gets done, but it's not wiping out the jobs — it's shifting what the jobs look like. Routine, repetitive tasks are the ones most likely to get automated, while roles that involve problem-solving, decision-making, and actually understanding a business are becoming more valuable, not less. If anything, learning how to work alongside AI tools is turning into a skill of its own.",
  },
  {
    question: "How long does it take to become job-ready in SAP, IT, AI, or HR?",
    answer:
      "On average, most people can get to a job-ready level anywhere from 2 to 6 months, depending on the course, how much time they put in, and whether they're starting from scratch or already have some background. Courses that include real projects and practical work tend to get people ready faster than ones that are purely theory-based, since employers usually care more about what you can actually do than just a certificate.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    // <section className="w-screen flex items-center justify-center relative left-1/2 -translate-x-1/2">
    <Container>
      <SectionBackground>
        <div className="faqOuter w-full flex items-center justify-center">
          <div className="faqWrap">
            {/* Left column */}
            <div className="faqLeft">
              <span className="faqEyebrow">FAQS</span>

              <h2 className="faqHeading">
                Questions?
                <br />
                We Have <span className="faqHeadingAccent">Answers.</span>
              </h2>

              <span className="faqUnderline" />

              <p className="faqSubtitle">
                Find answers to the most common questions about our
                courses, admissions, trainings and placement support.
              </p>

              <div className="faqHelpCard">
                <div className="faqHelpTop">
                  <span className="faqHelpIcon">
                    <Headphones size={20} strokeWidth={2} />
                  </span>
                  <div className="faqHelpText">
                    <p className="faqHelpTitle">Still have questions?</p>
                    <p className="faqHelpSubtitle">We're here to help you!</p>
                  </div>
                </div>

                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faqHelpBtn faqHelpBtnWhatsapp"
                >
                  <MessageCircle size={16} strokeWidth={2} />
                  Chat on WhatsApp
                </a>

                <a href="tel:" className="faqHelpBtn faqHelpBtnCall">
                  <Phone size={16} strokeWidth={2} />
                  Call Us Now
                </a>
              </div>
            </div>

            {/* Center figure */}
            <div className="faqCenter">
              <img
                src="https://res.cloudinary.com/djdhtkjhn/image/upload/v1785142207/Boy_FAQ_png_rpzrxp.png"
                alt="Student sitting with a laptop, surrounded by books and a plant"
                className="faqFigureImg"
              />
            </div>

            {/* Right column */}
            <div className="faqRight">
              <div className="faqList">
                {FAQ_DATA.map((item, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={index}
                      className={`faqRow${isOpen ? " faqRowOpen" : ""}`}
                    >
                      <button
                        className="faqRowButton"
                        aria-expanded={isOpen}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                      >
                        <span className="faqQuestionLeft">
                          <span className="faqNumber" aria-hidden="true">
                            {index + 1}
                          </span>
                          <span
                            className={`faqQuestion${isOpen ? " faqQuestionOpen" : ""}`}
                          >
                            {item.question}
                          </span>
                        </span>
                        <span
                          className={`faqToggle${isOpen ? " faqToggleOpen" : ""}`}
                          aria-hidden="true"
                        >
                          {isOpen ? (
                            <Minus size={14} strokeWidth={2.5} color="#ffffff" />
                          ) : (
                            <Plus size={16} strokeWidth={2.5} color="#0b1220" />
                          )}
                        </span>
                      </button>
                      <div
                        className="faqAnswerWrap"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                        }}
                      >
                        <div className="faqAnswerInner">
                          <p className="faqAnswer">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <style jsx>{`
            .faqOuter {
              background-image: Transparent;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              padding: 56px 32px;
              display: flex;
              justify-content: center;
            }

            .faqWrap {
              width: 100%;
              max-width: 1440px;
              display: grid;
              grid-template-columns: minmax(0, 1fr) auto minmax(0, 1.3fr);
              gap: 10px;
              align-items: center;
            }

            /* ---------- Left column ---------- */

            .faqLeft {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              padding: 8px;
            }

            .faqEyebrow {
              display: block;
              font-family: "Inter", sans-serif;
              font-weight: 800;
              font-size: 12px;
              letter-spacing: 0.08em;
              color: #2f6fed;
              margin-bottom: 10px;
            }

            .faqHeading {
              font-family: "Poppins", "Space Grotesk", sans-serif;
              font-weight: 800;
              font-size: 30px;
              line-height: 1.18;
              color: #0b1220;
              margin: 0 0 14px;
            }

            .faqHeadingAccent {
              color: #2f6fed;
            }

            .faqUnderline {
              display: block;
              width: 44px;
              height: 3px;
              border-radius: 4px;
              background: #2f6fed;
              margin-bottom: 14px;
            }

            .faqSubtitle {
              font-family: "Inter", sans-serif;
              font-size: 14px;
              line-height: 1.6;
              color: #475467;
              max-width: 400px;
              margin: 0 0 22px;
            }

            .faqHelpCard {
              background: #f4f7fd;
              border: 1px solid #e3e9f7;
              border-radius: 14px;
              padding: 16px;
              width: 100%;
              max-width: 340px;
            }

            .faqHelpTop {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 14px;
            }

            .faqHelpIcon {
              flex-shrink: 0;
              width: 38px;
              height: 38px;
              border-radius: 999px;
              background: #ffffff;
              color: #2f6fed;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 10px rgba(47, 111, 237, 0.15);
            }

            .faqHelpTitle {
              font-family: "Poppins", "Inter", sans-serif;
              font-weight: 700;
              font-size: 13.5px;
              color: #0b1220;
              margin: 0;
            }

            .faqHelpSubtitle {
              font-family: "Inter", sans-serif;
              font-size: 12px;
              color: #667085;
              margin: 2px 0 0;
            }

            .faqHelpBtn {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              background: #ffffff;
              border: 1px solid #e3e9f7;
              border-radius: 10px;
              padding: 10px 14px;
              font-family: "Inter", sans-serif;
              font-weight: 600;
              font-size: 13px;
              text-decoration: none;
              cursor: pointer;
              transition: transform 150ms ease, box-shadow 150ms ease;
            }

            .faqHelpBtn + .faqHelpBtn {
              margin-top: 8px;
            }

            .faqHelpBtn:hover {
              transform: translateY(-1px);
              box-shadow: 0 6px 14px rgba(11, 18, 32, 0.08);
            }

            .faqHelpBtnWhatsapp {
              color: #16a34a;
            }

            .faqHelpBtnCall {
              color: #2f6fed;
            }

            /* ---------- Center figure ---------- */

            .faqCenter {
              display: flex;
              justify-content: center;
              align-items: center;
              align-self: stretch;
              position: relative;
              width: 220px;
              overflow: visible;
            }

            .faqFigureImg {
              position: absolute;
              left: -200px;
              bottom: 10px;
              width: auto;
              max-width: 30vw;
              height: auto;
              object-fit: contain;
              pointer-events: none;
              z-index: 0;
            }

            .faqLeft,
            .faqRight {
              position: relative;
              z-index: 1;
            }

            /* ---------- Right column ---------- */

            .faqRight {
              min-width: 0;
            }

            .faqList {
              background: #ffffff;
              border-radius: 18px;
              padding: 12px;
              display: flex;
              flex-direction: column;
              gap: 10px;
              box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
            }

            .faqRow {
              border: 1px solid #eaedf3;
              border-radius: 12px;
              background: #ffffff;
              transition: background-color 200ms ease, border-color 200ms ease;
            }

            .faqRowOpen {
              background: #f2f7ff;
              border-color: #dbe6fb;
            }

            .faqRowButton {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 14px;
              padding: 14px 16px;
              background: transparent;
              border: none;
              cursor: pointer;
              text-align: left;
            }

            .faqRowButton:focus-visible {
              outline: 2px solid #2f6fed;
              outline-offset: 2px;
              border-radius: 10px;
            }

            .faqQuestionLeft {
              display: flex;
              align-items: center;
              gap: 12px;
              min-width: 0;
            }

            .faqNumber {
              flex-shrink: 0;
              width: 24px;
              height: 24px;
              border-radius: 999px;
              background: #2f6fed;
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: "Inter", sans-serif;
              font-weight: 700;
              font-size: 12px;
            }

            .faqQuestion {
              font-family: "Poppins", "Inter", sans-serif;
              font-weight: 700;
              font-size: 14px;
              line-height: 1.4;
              color: #0b1220;
            }

            .faqQuestionOpen {
              color: #2f6fed;
            }

            .faqToggle {
              flex-shrink: 0;
              width: 26px;
              height: 26px;
              border-radius: 999px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background-color 200ms ease, transform 200ms ease;
            }

            .faqToggleOpen {
              background: #2f6fed;
            }

            .faqAnswerWrap {
              display: grid;
              transition: grid-template-rows 260ms cubic-bezier(0.4, 0, 0.2, 1);
            }

            .faqAnswerInner {
              overflow: hidden;
            }

            .faqAnswer {
              font-family: "Inter", sans-serif;
              font-size: 13px;
              line-height: 1.65;
              color: #475467;
              margin: 0;
              padding: 0 16px 16px 52px;
            }

            /* ---------- Responsive ---------- */

            @media (max-width: 1180px) {
              .faqWrap {
                grid-template-columns: 1fr 1fr;
                grid-template-areas:
                  "left center"
                  "right right";
                gap: 14px;
              }

              .faqLeft {
                grid-area: left;
              }

              .faqCenter {
                grid-area: center;
                align-self: center;
                width: auto;
                overflow: hidden;
              }

              .faqRight {
                grid-area: right;
              }

              .faqFigureImg {
                position: static;
                left: auto;
                bottom: auto;
                width: auto;
                max-width: 58vw;
              }
            }

            @media (max-width: 760px) {
              .faqWrap {
                grid-template-columns: 1fr;
                grid-template-areas:
                  "center"
                  "left"
                  "right";
                gap: 20px;
              }

              .faqHeading {
                font-size: 26px;
              }

              .faqSubtitle {
                max-width: 100%;
              }

              .faqFigureImg {
                width: auto;
                max-width: 70vw;
              }
            }

            @media (max-width: 480px) {
              .faqOuter {
                padding: 32px 16px;
              }

              .faqHeading {
                font-size: 22px;
              }

              .faqHelpCard {
                max-width: 100%;
              }

              .faqRowButton {
                padding: 12px 14px;
              }

              .faqQuestion {
                font-size: 13px;
              }

              .faqAnswer {
                padding: 0 14px 14px 44px;
              }

              .faqFigureImg {
              width:auto;
                max-width: 80vw;
              }
            }
          `}</style>
        </div>
      </SectionBackground>
    </Container>
    // </section >
  );
}