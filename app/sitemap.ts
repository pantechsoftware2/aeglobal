import type { MetadataRoute } from "next";
import { blogPosts } from "./data/blogPosts";
import { destinations, getDestinationHero } from "./data/destinations";
import { siteUrl, toAbsoluteUrl } from "./lib/seo";

const defaultLastModified = "2026-10-06";
const recentContentLastModified = "2026-10-15";
const latestBlogDate = blogPosts.reduce(
  (latest, post) => (post.publishedAt > latest ? post.publishedAt : latest),
  defaultLastModified
);

const mainRoutes = [
  { path: "", priority: 1, lastModified: defaultLastModified },
  {
    path: "/study-destinations",
    priority: 0.85,
    lastModified: recentContentLastModified,
    images: ["/images/study-destinations-ai-hero.webp"]
  },
  { path: "/universities", priority: 0.85, lastModified: defaultLastModified },
  { path: "/courses", priority: 0.85, lastModified: defaultLastModified },
  { path: "/scholarships", priority: 0.85, lastModified: defaultLastModified },
  { path: "/services", priority: 0.85, lastModified: defaultLastModified },
  { path: "/contact", priority: 0.8, lastModified: defaultLastModified },
  { path: "/faq", priority: 0.75, lastModified: recentContentLastModified },
  {
    path: "/blog",
    priority: 0.7,
    lastModified: latestBlogDate,
    changeFrequency: "weekly" as const,
    images: blogPosts.map((post) => post.heroImage)
  },
  { path: "/sitemap", priority: 0.6, lastModified: defaultLastModified },
  { path: "/privacy-policy", priority: 0.45, lastModified: defaultLastModified },
  { path: "/terms-and-conditions", priority: 0.45, lastModified: defaultLastModified }
] satisfies Array<{
  path: string;
  priority: number;
  lastModified: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  images?: string[];
}>;

type RouteOptions = {
  lastModified: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  images?: string[];
};

function route(path: string, priority: number, options: RouteOptions): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${path}`,
    lastModified: new Date(`${options.lastModified}T00:00:00.000Z`),
    changeFrequency: options.changeFrequency ?? "monthly",
    priority,
    ...(options.images?.length
      ? { images: options.images.map((image) => toAbsoluteUrl(image)) }
      : {})
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...mainRoutes.map((item) => route(item.path, item.priority, item)),
    ...blogPosts.map((post) =>
      route(`/blog/${post.slug}`, 0.65, {
        lastModified: post.publishedAt,
        changeFrequency: "monthly",
        images: [post.heroImage]
      })
    ),
    ...destinations.map((destination) => {
      const hero = getDestinationHero(destination);

      return route(`/destinations/${destination.slug}`, destination.institutions.length > 0 ? 0.75 : 0.55, {
        lastModified: recentContentLastModified,
        changeFrequency: "monthly",
        images: [hero.image]
      });
    })
  ];
}
