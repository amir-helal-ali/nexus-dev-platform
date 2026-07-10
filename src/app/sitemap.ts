import type { MetadataRoute } from "next";
import { TEMPLATES, BLOG_POSTS } from "@/lib/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nexusdev.eg";

  const staticPages = [
    "",
    "/services",
    "/templates",
    "/portfolio",
    "/pricing",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
    "/refund",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const templatePages = TEMPLATES.map((t) => ({
    url: `${baseUrl}/templates/${t.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...templatePages, ...blogPages];
}
