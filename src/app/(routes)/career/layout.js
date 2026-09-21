export const metadata = {
  title: "Careers at Connecting Dots ERP | Join Our Team",
  description:
    "Explore career opportunities at Connecting Dots ERP. Apply for HR, counsellor, digital marketing, design, admin, accounts and trainer roles in Mumbai, Pune and Raipur.",
  alternates: { canonical: "https://connectingdotserp.com/career" },
  openGraph: {
    title: "Careers at Connecting Dots ERP | Join Our Team",
    description:
      "Open roles across Mumbai, Pune and Raipur — HR, counsellors, digital marketers, designers, admin, accounts and freelance trainers.",
    url: "https://connectingdotserp.com/career",
    siteName: "Connecting Dots ERP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Connecting Dots ERP | Join Our Team",
    description:
      "Open roles across Mumbai, Pune and Raipur at Connecting Dots ERP.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://connectingdotserp.com/career#webpage",
      url: "https://connectingdotserp.com/career",
      name: "Careers at Connecting Dots ERP",
      description:
        "Career and hiring information for Connecting Dots ERP, including open roles and the application process.",
      isPartOf: { "@id": "https://connectingdotserp.com/#website" },
      about: { "@id": "https://connectingdotserp.com/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://connectingdotserp.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Careers",
          item: "https://connectingdotserp.com/career",
        },
      ],
    },
  ],
};

export default function CareerLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
