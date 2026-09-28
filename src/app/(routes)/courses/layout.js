import { metadata } from './metadata';

export { metadata };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://connectingdotserp.com/courses#webpage",
      url: "https://connectingdotserp.com/courses",
      name: "Courses - Connecting Dots ERP",
      description:
        "Complete list of SAP, data science, data analytics, digital marketing, HR and software development courses offered by Connecting Dots ERP.",
      isPartOf: { "@id": "https://connectingdotserp.com/#website" },
      publisher: { "@id": "https://connectingdotserp.com/#organization" },
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
          name: "Courses",
          item: "https://connectingdotserp.com/courses",
        },
      ],
    },
  ],
};

// This is a Server Component by default
export default function CoursesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">SAP, IT, Data and HR Courses at Connecting Dots ERP</h1>
      {children}
    </>
  );
}
