import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nihonkirei.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/shop",
          "/shop/*",
          "/rituals",
          "/about",
          "/team",
          "/privacy",
          "/terms",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/admin",
          "/account/",
          "/account",
          "/dashboard/",
          "/dashboard",
          "/checkout/",
          "/checkout",
          "/order-success/",
          "/order-success",
          "/login",
          "/signup",
          "/register",
        ],
      },
      {
        // Block aggressive AI scraping bots from overwhelming server resources if desired
        userAgent: ["GPTBot", "CCBot", "ClaudeBot"],
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
