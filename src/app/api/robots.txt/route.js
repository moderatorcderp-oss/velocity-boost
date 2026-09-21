export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /terms
Disallow: /privacy
Disallow: /dashboard
Disallow: /superadmin
Disallow: /blog-admin
Disallow: /AdminLogin
Disallow: /api/
Disallow: /919004002941
Disallow: /wa.me/919004002941
Disallow: /tel:9004008253

# AI assistants and answer engines are welcome to read and cite our content
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: CCBot
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: YouBot
Allow: /

User-agent: DuckAssistBot
Allow: /

Sitemap: https://connectingdotserp.com/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
