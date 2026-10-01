import { ORG_FACTS } from "@/lib/orgFacts";

const placementTitle =
  "100% Job Placement Assistance | Connecting Dots ERP - SAP Training Institute";
const placementDescription =
  `Get 100% job placement assistance with a ${ORG_FACTS.placementRate} placement rate, ${ORG_FACTS.averagePackage} average package, and ${ORG_FACTS.highestPackage} highest package. Expert interview prep, resume building, and career support at Connecting Dots ERP.`;
const placementUrl = "https://connectingdotserp.com/placements";
const logoUrl = "https://connectingdotserp.com/Connecting_Logo_New.webp";
const organizationId = "https://connectingdotserp.com/#organization";
const websiteId = "https://connectingdotserp.com/#website";

export const placementKeywords = [
  "job placement",
  "placement assistance",
  "100% placement",
  "100% placement support",
  "job assistance",
  "SAP placement",
  "IT placement",
  "placement rate",
  "average package",
  "highest package",
  "interview preparation",
  "resume building",
  "career support",
  "placement guarantee",
  "job training",
  "hiring partners",
  "career guidance",
  "placement cell",
  "Connecting Dots ERP",
];

export const metadata = {
  title: placementTitle,
  description: placementDescription,
  keywords: placementKeywords,
  authors: [{ name: "Connecting Dots ERP" }],
  creator: "Connecting Dots ERP",
  publisher: "Connecting Dots ERP",
  category: "Education",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: placementUrl },
  openGraph: {
    title: placementTitle,
    description: placementDescription,
    url: placementUrl,
    siteName: "Connecting Dots ERP",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://res.cloudinary.com/bropujss/image/upload/v1783687070/logo_rju9sa_scdui4.webp",
        width: 1200,
        height: 630,
        alt: "Connecting Dots ERP placement assistance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: placementTitle,
    description: placementDescription,
    images: [
      "https://res.cloudinary.com/bropujss/image/upload/v1783687070/logo_rju9sa_scdui4.webp",
    ],
    site: "@CD_ERP",
    creator: "@CD_ERP",
  },
  other: {
    "placement.rate": ORG_FACTS.placementRate,
    "placement.average_package": ORG_FACTS.averagePackage,
    "placement.highest_package": ORG_FACTS.highestPackage,
    "course.provider": "Connecting Dots ERP",
    "career.support":
      "Interview preparation, resume building, placement assistance",
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Connecting Dots ERP",
      url: "https://connectingdotserp.com/",
      description:
        "Connecting Dots ERP provides SAP, IT, and HR training with job placement assistance, interview preparation, resume building, and career guidance.",
      telephone: ["+919004002941", "+919004002958"],
      logo: {
        "@type": "ImageObject",
        "@id": "https://connectingdotserp.com/#organizationLogoImage",
        url: logoUrl,
      },
      sameAs: [
        "https://www.facebook.com/sapinstallation.pune.9",
        "https://x.com/CD_ERP",
        "https://www.youtube.com/channel/UCxQ-RBOBaoYjjd4Mv7qQekA",
        "https://www.linkedin.com/company/connecting-dots-erp",
        "https://www.instagram.com/connecting_dot_software_course/",
        "https://in.pinterest.com/Connecting_Dots_ERP/",
        "https://www.quora.com/profile/Connecting-Dot-ERP-SAP-And-IT-Training-Institute",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: "https://connectingdotserp.com/",
      name: "Connecting Dots ERP",
      description:
        "SAP & IT Training Institute in Pune and Mumbai with 100% Placement Support.",
      publisher: { "@id": organizationId },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://connectingdotserp.com/?s={search_term_string}",
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            valueRequired: true,
            valueName: "search_term_string",
          },
        },
      ],
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": `${placementUrl}#webpage`,
      url: placementUrl,
      name: placementTitle,
      description: placementDescription,
      inLanguage: "en-US",
      isPartOf: { "@id": websiteId },
      image: { "@id": `${placementUrl}#primaryimage` },
      primaryImageOfPage: { "@id": `${placementUrl}#primaryimage` },
      breadcrumb: { "@id": `${placementUrl}#breadcrumb` },
      mainEntity: { "@id": `${placementUrl}#placementservice` },
      potentialAction: [{ "@type": "ReadAction", target: [placementUrl] }],
    },
    {
      "@type": "ImageObject",
      "@id": `${placementUrl}#primaryimage`,
      inLanguage: "en-US",
      url: logoUrl,
      contentUrl: logoUrl,
    },
    {
      "@type": "Service",
      "@id": `${placementUrl}#placementservice`,
      name: "Job Placement Assistance",
      description: placementDescription,
      serviceType: "Career 100% placement support",
      provider: { "@id": organizationId },
      areaServed: { "@type": "Country", name: "India" },
      audience: {
        "@type": "Audience",
        audienceType: "SAP, IT, and HR training students",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${placementUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://connectingdotserp.com/" },
        { "@type": "ListItem", position: 2, name: "Placements", item: placementUrl },
      ],
    },
  ],
};
