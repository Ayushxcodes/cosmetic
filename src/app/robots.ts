import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/shop", "/rituals", "/about", "/privacy", "/terms"],
      disallow: ["/admin/", "/api/", "/checkout", "/order-success/"],
    },
  };
}
