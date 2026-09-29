# Deep SEO audit fixes

## Confirmed fixes

- Correct city propagation so non-Pune pages cannot inherit visible Pune wording from fallback course data, while preserving genuine office details for Pune, Mumbai, and Raipur.
- Remove the developer-only related-courses message from rendered pages when no data exists.
- Correct generated course-link labels and URLs so labels such as “IT Course with AI” are not malformed.
- Initialize city course lists in the server-rendered output and show “no results” only after a real search.
- Remove crawler-visible About-page loading messages while preserving the same reserved space and visual loading behavior.
- Repair course-page canonical and structured-data URLs for public alias slugs.
- Remove unsupported or fabricated structured-data fields, including placeholder images, fake review text, changing build-time dates, and the malformed logo URL.
- Add a preview-deployment `noindex` response header without affecting the production domain.

## Already present — leave unchanged

- Keep the existing crawlable `robots.txt`, XML sitemap, page metadata, canonical tags, JSON-LD foundations, and `llms.txt`.
- Keep current responsive layout and performance optimizations unless validation exposes a specific defect.
- Do not add new AI-only content or dependencies; normal search fundamentals remain the priority.

## Not safe to guess

- Do not alter placement rates, student counts, addresses, phone numbers, or other business claims without an authoritative source from the business.
- Do not remove or `noindex` course-city pages solely from the audit. Which courses are genuinely offered in each city is a business decision; the code will avoid generating invalid routes, but a stricter location-quality allowlist requires confirmed availability data.
- Old Vercel projects and aliases must also be protected or removed in Vercel. This repository can protect its own preview builds, but cannot configure unrelated deployments.

## Validation

- Build the project and inspect the current build diagnostics.
- Check representative audit URLs for the requested city in headings, metadata, canonical URLs, and structured data.
- Check city sitemap initial HTML and search behavior.
- Run the existing phone/tablet/desktop browser audit and verify no interface or navigation regression.