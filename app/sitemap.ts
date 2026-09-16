import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { SITE_URL, slugify } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const d = await getContent();
  const now = new Date();

  const routes: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = [
    ["", "weekly", 1],
    ["/system", "monthly", 0.9],
    ["/services", "monthly", 0.9],
    ["/work", "weekly", 0.8],
    ["/about", "yearly", 0.6],
    ["/contact", "yearly", 0.7],
  ];
  const pages: MetadataRoute.Sitemap = routes.map(([path, changeFrequency, priority]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  return [
    ...pages,
    ...d.projects.map((p) => ({
      url: `${SITE_URL}/work/${slugify(p.title)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
