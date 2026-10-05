import type { MetadataRoute } from "next";
import { blogPosts } from "./data/blogPosts";
import { destinations } from "./data/destinations";
import { siteUrl } from "./lib/seo";

const lastModified = new Date("2026-10-05T00:00:00.000Z");

const mainRoutes = [
  { path: "", priority: 1 },
  { path: "/study-destinations", priority: 0.85 },
  { path: "/universities", priority: 0.85 },
  { path: "/courses", priority: 0.85 },
  { path: "/scholarships", priority: 0.85 },
  { path: "/services", priority: 0.85 },
  { path: "/contact", priority: 0.8 },
  { path: "/faq", priority: 0.75 },
  { path: "/blog", priority: 0.7 },
  { path: "/sitemap", priority: 0.6 }
];

function route(path: string, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...mainRoutes.map((item) => route(item.path, item.priority)),
    ...blogPosts.map((post) => route(`/blog/${post.slug}`, 0.65)),
    ...destinations.map((destination) =>
      route(`/destinations/${destination.slug}`, destination.institutions.length > 0 ? 0.75 : 0.55)
    )
  ];
}
