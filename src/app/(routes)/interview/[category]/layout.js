const titleCase = (slug = "") =>
  decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

export async function generateMetadata({ params }) {
  const { category } = await params;
  const name = titleCase(category) || "Interview";
  const url = `https://connectingdotserp.com/interview/${category}`;
  const title = `${name} Interview Questions and Answers`;
  const description = `Practise the most asked ${name} interview questions with clear, expert-reviewed answers from Connecting Dots ERP trainers.`;

  return {
    title: `${title} | Connecting Dots ERP`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Connecting Dots ERP",
      locale: "en_US",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function InterviewCategoryLayout({ children, params }) {
  const { category } = await params;
  const name = titleCase(category) || "Interview";
  const url = `https://connectingdotserp.com/interview/${category}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${name} Interview Questions and Answers`,
        description: `Curated ${name} interview questions with answers, maintained by Connecting Dots ERP trainers.`,
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
            name: "Interview Questions",
            item: "https://connectingdotserp.com/interview",
          },
          { "@type": "ListItem", position: 3, name: name, item: url },
        ],
      },
    ],
  };

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
