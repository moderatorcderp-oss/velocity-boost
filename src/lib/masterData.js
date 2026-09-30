// lib/masterData.js
// Only helpers + assembly logic. All pure data lives in public/Jsonfolder/*.json

// why course cards data 
import whyDataPune from "../../public/Jsonfolder/cities/pune/WhyData-pune.json";
import whyDataMumbai from "../../public/Jsonfolder/cities/mumbai/WhyData-mumbai.json";
import whyDataRaipur from "../../public/Jsonfolder/cities/raipur/WhyData-raipur.json";

// Hero section data
import dsHeaderDataPune from "../../public/Jsonfolder/cities/pune/dsHeaderData-pune.json";
import dsHeaderDataMumbai from "../../public/Jsonfolder/cities/mumbai/dsHeaderData-mumbai.json";
import dsHeaderDataRaipur from "../../public/Jsonfolder/cities/raipur/dsHeaderData-raipur.json";

// What you'll learn data
import whatWillLearnDataPune from "../../public/Jsonfolder/cities/pune/whatwilllearn-pune.json";
import whatWillLearnDataMumbai from "../../public/Jsonfolder/cities/mumbai/whatwilllearn-mumbai.json";
import whatWillLearnDataRaipur from "../../public/Jsonfolder/cities/raipur/whatwilllearn-raipur.json";

// skills you'll learn
import skillsDataPune from "../../public/Jsonfolder/cities/pune/SkillsLearn-pune.json";
import skillsDataMumbai from "../../public/Jsonfolder/cities/mumbai/SkillsLearn-mumbai.json";
import skillsDataRaipur from "../../public/Jsonfolder/cities/raipur/SkillsLearn-raipur.json";

//who this is for
import whoDataPune from "../../public/Jsonfolder/cities/pune/Whothisisfor-pune.json";
import whoDataMumbai from "../../public/Jsonfolder/cities/mumbai/Whothisisfor-mumbai.json";
import whoDataRaipur from "../../public/Jsonfolder/cities/raipur/Whothisisfor-raipur.json";

//certificate data
import certificateDataPune from "../../public/Jsonfolder/cities/pune/certificateData-pune.json";
import certificateDataMumbai from "../../public/Jsonfolder/cities/mumbai/certificateData-mumbai.json";
import certificateDataRaipur from "../../public/Jsonfolder/cities/raipur/certificateData-raipur.json";

import faqData from "../../public/Jsonfolder/faqdata.json";

// CTABanner data
import CTABannerData from "../../public/Jsonfolder/cities/pune/CTAbanner.json";
import CTABannerDataMumbai from "../../public/Jsonfolder/cities/mumbai/CTAbanner-mumbai.json";
import CTABannerDataRaipur from "../../public/Jsonfolder/cities/raipur/CTAbanner-raipur.json";


import alumni from "../../public/Jsonfolder/alumni.json";
import icons from "../../public/Jsonfolder/icons.json";
import generatedCourseSpecs from "../../public/Jsonfolder/generatedCourseSpecs.json";
import relatedCoursesLists from "../../public/Jsonfolder/relatedCoursesLists.json";
import citiesData from "../../public/Jsonfolder/cities.json";
import enrichmentMaps from "../../public/Jsonfolder/enrichmentMaps.json";

import coursesSap from "../../public/Jsonfolder/courses-sap.json";
import coursesIt from "../../public/Jsonfolder/courses-it.json";
import coursesHr from "../../public/Jsonfolder/courses-hr.json";

import { resolveContentFamily, neutralizeCityCopy } from "./cityContent.js";

// =====================================================
// HELPERS
// =====================================================

const { iconMap, defaultSapRelatedCourseIcon, sapRelatedCourseIconMap } = icons;

const getSapRelatedCourseIcon = (courseName = "") => {
  const normalizedName = courseName.toUpperCase();
  const matchedKey = Object.keys(sapRelatedCourseIconMap).find((key) =>
    normalizedName.includes(key)
  );
  return matchedKey
    ? sapRelatedCourseIconMap[matchedKey]
    : defaultSapRelatedCourseIcon;
};

const makeRelatedCourses = (names) => ({
  title: "Related courses",
  items: names.map((name) => ({
    name,
    description: `Learn ${name} from experts`,
    icon: name.startsWith("SAP")
      ? getSapRelatedCourseIcon(name)
      : iconMap.Cloud,
    alt: `${name} icon`,
  })),
});

const makeGeneratedCourseModulesData = (spec) => ({
  title: `${spec.title} CURRICULUM`,
  globalActions: {
    startLearning: `https://example.com/start-learning-${spec.slug}`,
    downloadCurriculum: `https://example.com/download-curriculum-${spec.slug}`,
  },
  banner: {
    title: `Master ${spec.fullTitle}`,
    subtitle: "Build practical skills with guided labs and project-based learning.",
    image:
      "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
    technologies: spec.modules,
  },
  tabs: [
    {
      type: "beginner",
      duration: spec.duration,
      modules: spec.curriculum.map((module) => ({
        title: module.title,
        duration: module.duration,
        content: module.content,
        detailedContent: module.content.map(
          (topic) => `Hands-on practice for ${topic}`
        ),
        toolsAndTechnologies: module.tools.map((tool) => ({
          name: tool,
          icon: iconMap[tool] || iconMap.Cloud,
          alt: tool,
        })),
        actions: {
          startLearning: `https://example.com/start-learning-${spec.slug}`,
          downloadCurriculum: `https://example.com/download-curriculum-${spec.slug}`,
        },
      })),
    },
  ],
});

// =====================================================
// 1. BUILD GENERATED COURSES
// =====================================================

const generatedCourseData = generatedCourseSpecs.reduce((acc, spec) => {
  const isSap = spec.category === "sap";
  const courseWord = isSap ? "SAP training" : "IT training";
  const backgroundVideo =
    "https://res.cloudinary.com/bropujss/video/upload/v1784205478/digital_kaitnq_clpqqp.webm";

  acc[spec.slug] = {
    title: spec.title,
    fullTitle: spec.fullTitle,
    category: spec.category,
    slug: spec.slug,
    description: `Join the best ${spec.title} course in {city} and master ${spec.fullTitle} with expert-led training, real-time projects, certification guidance, and 100%  placement support.`,
    metaTitle: `${spec.title} Course in {city} | Training & Certification`,
    metaDescription: `Master ${spec.title} in {city}. Expert-led training, hands-on projects, certification guidance, and 100%  placement support for career growth.`,
    duration: spec.duration,
    price: spec.price,
    modules: spec.modules,
    prerequisites: spec.prerequisites,
    certification: spec.certification,
    jobRoles: spec.jobRoles,
    header: {
      title: `${spec.title} Course in {city}`,
      subtitle: `Practical Based Job Oriented ${courseWord} in {city}`,
      description: `Connecting Dots ERP's ${spec.title} course in {city} is designed around industry use cases, guided labs, and mentor-led practice. Learn ${spec.modules
        .slice(0, 4)
        .join(", ")} and prepare for ${spec.jobRoles
          .slice(0, 2)
          .join(" and ")} roles.`,
      backgroundVideo,
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni,
      buttons: [
        { text: "Request Call Back", courseName: `${spec.title} Program` },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          {
            type: "location",
            name: "location",
            placeholder: "Select your location",
          },
          { type: "course", name: "course", placeholder: "Select course" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },
    why: {
      title: `Why ${spec.title}?`,
      cards: [
        {
          title: `What is <span class="highlight-span-cards">${spec.title}</span>?`,
          content: `${spec.fullTitle} helps professionals build practical capability across ${spec.modules
            .slice(0, 3)
            .join(", ")} and connected enterprise workflows.`,
        },
        {
          title: `What does a <span class="highlight-span-cards">${spec.title} Professional</span> do?`,
          content: `${spec.title} professionals configure, operate, analyze, and improve business technology processes using industry-standard tools and project practices.`,
          listItems: spec.jobRoles.slice(0, 3),
        },
        {
          title: `Why take <span class="highlight-span-cards">${spec.title}</span> training in {city}?`,
          content: `Our ${spec.title} training in {city} combines curriculum-led learning, real scenarios, assignments, and interview preparation so learners become job ready.`,
          listItems: [
            "Hands-on labs",
            "Project-based practice",
            "Placement assistance",
          ],
        },
      ],
    },
    sapMod: isSap
      ? {
        title2: `<span class="highlight-span-cards">${spec.title}</span> Syllabus`,
        description: `Industry aligned ${spec.title} syllabus with certification guidance`,
        summary: `A practical ${spec.title} syllabus designed by industry experts to help you prepare for project and consultant roles.`,
        noteMaster: `We provide advanced ${spec.title} training`,
        noteAdvance: "Advance",
        features: [
          { label: "10+", description: "Tools & Concepts" },
          { label: "120+", description: "Live Session Hours" },
        ],
        overview: {
          title: "Syllabus Overview",
          modules: spec.curriculum.map((module) => ({
            name: module.title,
            duration: module.duration,
            subtopics: module.content,
          })),
        },
        videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
        downloadLink: `https://example.com/download-${spec.slug}-syllabus`,
      }
      : undefined,
    descriptionContent: {
      title: `Why Choose Connecting Dots ERP for ${spec.title} Training in {city}?`,
      paragraphs: [
        `Connecting Dots ERP offers a structured ${spec.title} course in {city} for students, working professionals, and career switchers who want practical skills in ${spec.fullTitle}.`,
        `The curriculum covers ${spec.modules.join(
          ", "
        )} with guided practice, project scenarios, and trainer support so learners understand how the subject is used in real business environments.`,
      ],
      listItem1Header: `What makes our ${spec.title} training in {city} useful?`,
      listItem1: [
        "Industry-oriented curriculum with practical assignments.",
        "Experienced trainers with project exposure.",
        "Flexible batches for students and working professionals.",
        "Interview preparation and 100%  placement support.",
        "Certification-focused learning path.",
      ],
      listItemAfterIndex: 1,
      paragraphsAfterList: [
        `After completing the ${spec.title} course in {city}, you can apply for roles such as ${spec.jobRoles
          .slice(0, 3)
          .join(", ")}.`,
        `Join our ${spec.title} classes in {city} to build a clear, job-oriented path into ${spec.fullTitle}.`,
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: `What is ${spec.title}?`,
          answer: `${spec.title} stands for ${spec.fullTitle}. It is used by organizations to solve practical business and technology challenges through structured processes and tools.`,
        },
        {
          question: `Who can join the ${spec.title} course in {city}?`,
          answer: `Students, freshers, working professionals, and domain users can join. ${spec.prerequisites}.`,
        },
        {
          question: `What will I learn in ${spec.title} training?`,
          answer: `You will learn ${spec.modules
            .slice(0, 5)
            .join(", ")} through practical sessions and project-based assignments.`,
        },
        {
          question: `Does this ${spec.title} course include placement support?`,
          answer:
            "Yes. The course includes resume guidance, interview preparation, and 100%  placement support from the training team.",
        },
        {
          question: `How long is the ${spec.title} course?`,
          answer: `The ${spec.title} course usually takes ${spec.duration}, depending on the batch schedule and learning mode.`,
        },
      ],
    },
    relatedCourses: makeRelatedCourses(
      isSap ? relatedCoursesLists.sap : relatedCoursesLists.it
    ),
    defaultRating: 4.7,
    defaultReviewCount: 82,
    publishedAt: "2025-08-01T00:00:00Z",
    updatedAt: "2026-05-13T00:00:00Z",
  };

  if (!isSap) {
    acc[spec.slug].modulesData = makeGeneratedCourseModulesData(spec);
    acc[spec.slug].header.buttons[1].text = "Download Curriculum";
    delete acc[spec.slug].sapMod;
  }

  return acc;
}, {});

// =====================================================
// 2. ASSEMBLE BASE COURSES
// =====================================================

let coursesData = {
  ...coursesSap,
  ...coursesIt,
  ...coursesHr,
  ...generatedCourseData,
};

// =====================================================
// 3. ALIASES
// =====================================================

coursesData["data-science-with-ai"] = coursesData["data-science"];
coursesData["advanced-data-analytics-with-generative-ai"] =
  coursesData["data-analytics"];
coursesData["python-with-ai"] = coursesData["python"];
coursesData["data-visualization-with-ai"] = coursesData["data-visualization"];
coursesData["full-stack-with-ai"] =
  coursesData["full-stack-developer"] ?? coursesData["full-stack"];
coursesData["it-course-with-ai"] = coursesData["it"];
coursesData["hr-courses-training-institute"] = coursesData["hr-training"];
coursesData["hr"] = coursesData["hr-training"];
coursesData["generative-ai"] = coursesData["chatgpt"]; // will be refined in step 6

// =====================================================
// 3b. SNAPSHOT CITY-NEUTRAL COPY (before Pune enrichment overwrites it)
// =====================================================
// The enrichment step below replaces header/why/whothisisfor/certificate/
// demoBanner on each course with copy written *about Pune*. Cities that have no
// authored copy of their own must never see that, so we keep the original
// `{city}`-templated versions here. (Kept OUTSIDE the course objects on purpose:
// course objects are serialised into client components, so attaching a second
// copy would bloat every page.)

const CITY_COPY_KEYS = ["header", "why", "whothisisfor", "certificate", "demoBanner"];
const GENERIC_CITY_COPY = {};
Object.entries(coursesData).forEach(([slug, course]) => {
  const snap = {};
  CITY_COPY_KEYS.forEach((key) => {
    if (course?.[key] !== undefined) snap[key] = structuredClone(course[key]);
  });
  GENERIC_CITY_COPY[slug] = snap;
});

// =====================================================
// 4. ENRICHMENT (matches your enrichmentMaps.json)
// =====================================================

const {
  whatWillLearnMap,
  skillsToCoursesMap,
  headerMap,
  whyMap,
  skillsMap,
  whoMap,
  certificateMap,
  faqMap,
} = enrichmentMaps;

// ---------- Header ----------
Object.entries(headerMap || {}).forEach(([courseSlug, [groupKey, headerKey]]) => {
  if (coursesData[courseSlug] && dsHeaderDataPune?.[groupKey]?.[headerKey]) {
    coursesData[courseSlug].header = dsHeaderDataPune[groupKey][headerKey];
  }
});

// ---------- Why ----------
Object.entries(whyMap || {}).forEach(([courseSlug, [groupKey, whyKey]]) => {
  if (!coursesData[courseSlug]) return;

  if (whyDataPune?.[groupKey]?.[whyKey]) {
    coursesData[courseSlug].why = whyDataPune[groupKey][whyKey];
  } else if (whyDataPune?.[courseSlug]) {
    coursesData[courseSlug].why = whyDataPune[courseSlug];
  }
});

// ---------- What You'll Learn  (IMPORTANT: direction is courseSlug → whatKey) ----------
Object.entries(whatWillLearnMap || {}).forEach(([courseSlug, whatKey]) => {
  const data = whatWillLearnDataPune?.[whatKey];

  if (!coursesData[courseSlug]) {
    console.warn(`[WhatYouWillLearn] course not found: ${courseSlug}`);
    return;
  }
  if (!data) {
    console.warn(`[WhatYouWillLearn] no data for key: ${whatKey}`);
    return;
  }

  coursesData[courseSlug].whatYouWillLearn = Array.isArray(data)
    ? data
    : data.items || data.cards || [];
});

// ---------- Skills & Tools ----------
// Your skillsMap is: courseSlug → SkillsKey
Object.entries(skillsMap || {}).forEach(([courseSlug, skillsKey]) => {
  if (coursesData[courseSlug] && skillsDataPune?.[skillsKey]) {
    coursesData[courseSlug].skillsndtools = skillsDataPune[skillsKey];
  }
});

// ---------- Who This Is For ----------
// Your whoMap is: courseSlug → whoKey
Object.entries(whoMap || {}).forEach(([courseSlug, whoKey]) => {
  if (coursesData[courseSlug] && whoDataPune?.[whoKey]) {
    coursesData[courseSlug].whothisisfor = whoDataPune[whoKey];
  }
});

// ---------- Certificate ----------
Object.entries(certificateMap || {}).forEach(([courseSlug, certKey]) => {
  if (coursesData[courseSlug] && certificateDataPune?.[certKey]) {
    coursesData[courseSlug].certificate = certificateDataPune[certKey];
  }
});

// ---------- FAQ ----------
Object.entries(faqMap || {}).forEach(([courseSlug, [groupKey, faqKey]]) => {
  if (!coursesData[courseSlug]) return;

  // faqData is the big JSON you just pasted (import it if not already)
  const faqEntry = faqData?.[groupKey]?.[faqKey];

  if (faqEntry) {
    coursesData[courseSlug].faq = faqEntry;
  }
});


// ---------- CTA Banner ----------
Object.entries(enrichmentMaps?.demoBannerMap || {}).forEach(([courseSlug, bannerKey]) => {
  if (coursesData[courseSlug] && CTABannerData?.[bannerKey]) {
    coursesData[courseSlug].demoBanner = CTABannerData[bannerKey];
  }
});

// =====================================================
// 5. FIX SAP RELATED COURSE ICONS
// =====================================================

Object.values(coursesData).forEach((course) => {
  if (course.category !== "sap" || !course.relatedCourses?.items) return;

  course.relatedCourses.items = course.relatedCourses.items.map((item) => ({
    ...item,
    icon: getSapRelatedCourseIcon(item.name),
    alt: item.alt || `${item.name} icon`,
  }));
});

// =====================================================
// 6. SPECIAL generative-ai OVERRIDE
// =====================================================

function deriveGenerativeAiHeader(baseHeader) {
  return {
    ...(baseHeader || {}),
    title: "Generative AI Course in {city}",
    subtitle:
      "Get Certified with the Best Generative AI Training Program in {city}",
    description:
      "Connecting Dots ERP's Generative AI course in {city} helps you master AI tools, prompt engineering, automation workflows, machine learning foundations, and real-world AI project practice for modern tech and business roles.",
  };
}

function deriveGenerativeAiWhy(baseWhy) {
  return baseWhy
    ? {
      ...baseWhy,
      title: "Why Generative AI?",
      cards: (baseWhy.cards || []).map((card) => ({
        ...card,
        title: (card.title || "").replace("ChatGPT and AI", "Generative AI"),
        content: (card.content || "")
          .replace(/generative-ai and AI/g, "Generative AI")
          .replace(/Artificial Intelligence/g, "Generative AI"),
      })),
    }
    : { title: "Why Generative AI?", cards: [] };
}

if (coursesData.chatgpt) {
  const base = coursesData.chatgpt;

  coursesData["generative-ai"] = {
    ...base,
    title: "Generative AI",
    fullTitle: "Generative AI and Prompt Engineering",
    category: "it",
    slug: "generative-ai",
    description:
      "Master Generative AI in {city} with expert-led training in AI tools, prompt engineering, automation, and real-world AI projects. Our Generative AI course in {city} includes hands-on practice, certification guidance, and 100%  placement support.",
    metaTitle: "Generative AI Course in {city} | AI Training & Certification",
    metaDescription:
      "Master Generative AI in {city}. Learn AI tools, prompt engineering, automation, projects, certification guidance, and 100%  placement support.",
    header: deriveGenerativeAiHeader(base.header),
    why: deriveGenerativeAiWhy(base.why),
  };

  // City-neutral version for cities that have no authored copy (see 3b).
  GENERIC_CITY_COPY["generative-ai"] = {
    ...(GENERIC_CITY_COPY.chatgpt || {}),
    header: deriveGenerativeAiHeader(GENERIC_CITY_COPY.chatgpt?.header),
    why: deriveGenerativeAiWhy(GENERIC_CITY_COPY.chatgpt?.why),
  };
}

// =====================================================
// 7. CITY-AWARE HELPERS
// =====================================================
//
// Resolution order for the five "city copy" blocks
// (header, why, whothisisfor, certificate, demoBanner):
//
//   1. the city's OWN authored file (only pune / mumbai / raipur — see
//      cityContent.js)
//   2. the Pune copy, re-targeted with neutralizeCityCopy(): course-offered
//      mentions ("course in Pune") are renamed, Pune-specific market claims
//      are REMOVED (never renamed to another city)
//   3. the course's own city-neutral `{city}` object, if it has one
//
// Nothing here can fall back to raw Pune copy for a non-Pune city.
// `cityName` should be citiesData[citySlug].name; it defaults sensibly.

const CITY_SOURCES = {
  header: { pune: dsHeaderDataPune, mumbai: dsHeaderDataMumbai, raipur: dsHeaderDataRaipur },
  why: { pune: whyDataPune, mumbai: whyDataMumbai, raipur: whyDataRaipur },
  who: { pune: whoDataPune, mumbai: whoDataMumbai, raipur: whoDataRaipur },
  what: { pune: whatWillLearnDataPune, mumbai: whatWillLearnDataMumbai, raipur: whatWillLearnDataRaipur },
  skills: { pune: skillsDataPune, mumbai: skillsDataMumbai, raipur: skillsDataRaipur },
  certificate: { pune: certificateDataPune, mumbai: certificateDataMumbai, raipur: certificateDataRaipur },
  demoBanner: { pune: CTABannerData, mumbai: CTABannerDataMumbai, raipur: CTABannerDataRaipur },
};

const cityNameFor = (citySlug, cityName) =>
  cityName || citiesData[citySlug]?.name || citySlug;

// In courses-*.json several of these fields are not copy at all but pointer
// strings such as "dsHeaderData['ficoheader']['FICOHeader']" that the enrichment
// step resolves to Pune data. Those are not usable as generic copy.
const genericCopy = (courseSlug, key) => {
  const value = GENERIC_CITY_COPY[courseSlug]?.[key];
  return value && typeof value === "object" ? value : null;
};

/**
 * Mumbai-only overrides for courses that share "Whysap" in whyMap
 * but have dedicated Mumbai Why content.
 */
const MUMBAI_WHY_OVERRIDES = {
  "sap-mm": ["Whymm", "WhyMM"],
  "sap-hr-hcm": ["Whyhrhcm", "WhyHRHCM"],
  "sap-qm": ["Whyqm", "WhyQM"],
  "sap-ps": ["Whyps", "WhyPS"],
  "sap-scm": ["Whyscm", "WhySCM"],
  "sap-ehs": ["Whyehs", "WhyEHS"],
  "sap-ibp": ["Whyibp", "WhyIBP"],
  "sap-pp": ["Whypp", "WhyPP"],
  "sap-pm": ["Whypm", "WhyPM"],
  "sap-btp": ["Whybtp", "WhyBTP"],
  "sap-grc": ["Whygrc", "WhyGRC"],
};

/**
 * Enrichment maps are keyed by canonical slug ("it"), but some URLs use an alias
 * that shares the same course object ("it-course-with-ai"). Find the map entry
 * for the slug itself or for any slug that points at the same course object.
 */
function mapEntry(map, courseSlug) {
  if (!map) return undefined;
  if (map[courseSlug] !== undefined) return map[courseSlug];
  const course = coursesData[courseSlug];
  if (!course) return undefined;
  const canonical = Object.keys(map).find((key) => coursesData[key] === course);
  return canonical ? map[canonical] : undefined;
}

// ---- raw lookups: (family, courseSlug) -> block | null -------------------

const lookupHeader = (family, courseSlug) => {
  const path = mapEntry(enrichmentMaps?.headerMap, courseSlug);
  if (!path) return null;
  const [groupKey, headerKey] = path;
  return CITY_SOURCES.header[family]?.[groupKey]?.[headerKey] || null;
};

const lookupWhy = (family, courseSlug) => {
  const path =
    (family === "mumbai" && MUMBAI_WHY_OVERRIDES[courseSlug]) ||
    mapEntry(enrichmentMaps?.whyMap, courseSlug);
  if (!path) return null;
  const [groupKey, whyKey] = path;
  return CITY_SOURCES.why[family]?.[groupKey]?.[whyKey] || null;
};

const lookupWho = (family, courseSlug) => {
  const whoKey = mapEntry(enrichmentMaps?.whoMap, courseSlug);
  return whoKey ? CITY_SOURCES.who[family]?.[whoKey] || null : null;
};

const lookupCertificate = (family, courseSlug) => {
  const certKey = mapEntry(enrichmentMaps?.certificateMap, courseSlug);
  return certKey ? CITY_SOURCES.certificate[family]?.[certKey] || null : null;
};

const lookupDemoBanner = (family, courseSlug) => {
  const bannerKey = mapEntry(enrichmentMaps?.demoBannerMap, courseSlug);
  return bannerKey ? CITY_SOURCES.demoBanner[family]?.[bannerKey] || null : null;
};

// ---- resolution ----------------------------------------------------------

/**
 * Hero-header fallbacks: if a header field can only be expressed as a Pune
 * claim, replace it with wording built from the course's own city-neutral
 * data rather than dropping the hero.
 */
function headerFallbacks(courseSlug, cityName) {
  const course = coursesData[courseSlug] || {};
  const label = course.title || courseSlug;
  const neutralDescription =
    typeof course.description === "string"
      ? course.description.replace(/\{city\}/g, cityName)
      : `Connecting Dots ERP's ${label} course in ${cityName}, with practical training, projects and placement support.`;
  return {
    title: `${label} Course in ${cityName}`,
    subtitle: `Job-oriented ${label} training in ${cityName}`,
    description: neutralDescription,
  };
}

function resolveCityCopy(key, lookup, courseSlug, citySlug, cityName) {
  const name = cityNameFor(citySlug, cityName);

  // 1. authored copy for this exact city
  const family = resolveContentFamily(citySlug);
  if (family) {
    const own = lookup(family, courseSlug);
    if (own) return own;
  }

  // 2. Pune copy with every Pune-specific claim stripped
  const options = key === "header" ? { fallbacks: headerFallbacks(courseSlug, name) } : {};
  const retargeted = neutralizeCityCopy(lookup("pune", courseSlug), name, "Pune", options);
  if (retargeted) return retargeted;

  // 3. course-level city-neutral copy (if the course has any)
  return genericCopy(courseSlug, key);
}

export function getHeaderForCity(courseSlug, citySlug = "pune", cityName) {
  return resolveCityCopy("header", lookupHeader, courseSlug, citySlug, cityName);
}

export function getWhyForCity(courseSlug, citySlug = "pune", cityName) {
  return resolveCityCopy("why", lookupWhy, courseSlug, citySlug, cityName);
}

export function getWhoThisIsForForCity(courseSlug, citySlug = "pune", cityName) {
  return resolveCityCopy("whothisisfor", lookupWho, courseSlug, citySlug, cityName);
}

export function getCertificateForCity(courseSlug, citySlug = "pune", cityName) {
  return resolveCityCopy("certificate", lookupCertificate, courseSlug, citySlug, cityName);
}

/** Returns the Demo / CTA Banner object for a course + city. */
export function getDemoBannerForCity(courseSlug, citySlug = "pune", cityName) {
  return resolveCityCopy("demoBanner", lookupDemoBanner, courseSlug, citySlug, cityName);
}

/**
 * What you'll learn / skills currently contain no city-specific wording
 * (scripts/check-location-content.mjs enforces this), so non-authored cities
 * share the Pune source. It is still passed through neutralizeCityCopy() so a
 * future edit to the Pune file cannot leak Pune claims into other cities.
 */
export function getWhatYouWillLearnForCity(courseSlug, citySlug = "pune", cityName) {
  const family = resolveContentFamily(citySlug);
  const whatKey = mapEntry(enrichmentMaps?.whatWillLearnMap, courseSlug);
  if (!whatKey) return null;

  const data = CITY_SOURCES.what[family || "pune"]?.[whatKey];
  if (!data) return null;

  // same normalisation the enrichment step uses
  const items = Array.isArray(data) ? data : data.items || data.cards || [];
  return family ? items : neutralizeCityCopy(items, cityNameFor(citySlug, cityName)) || [];
}

export function getSkillsForCity(courseSlug, citySlug = "pune", cityName) {
  const family = resolveContentFamily(citySlug);
  const skillsKey = mapEntry(enrichmentMaps?.skillsMap, courseSlug);
  if (!skillsKey) return null;

  const data = CITY_SOURCES.skills[family || "pune"]?.[skillsKey] || null;
  return family ? data : neutralizeCityCopy(data, cityNameFor(citySlug, cityName));
}

export function getCourseData(slug, citySlug = "pune") {
  const base = coursesData[slug];
  if (!base) return null;

  const course = structuredClone(base);
  course.city = citiesData[citySlug] || null;

  const cityName = citiesData[citySlug]?.name;
  const header = getHeaderForCity(slug, citySlug, cityName);
  if (header) course.header = header;

  const why = getWhyForCity(slug, citySlug, cityName);
  if (why) course.why = why;

  const demoBanner = getDemoBannerForCity(slug, citySlug, cityName);
  if (demoBanner) course.demoBanner = demoBanner;

  return course;
}

// =====================================================
// 8. EXPORTS
// =====================================================

export {
  coursesData,
  citiesData,
  dsHeaderDataPune,
  dsHeaderDataMumbai,
  whyDataPune,
  whyDataMumbai,
  enrichmentMaps,
  faqData,
};
