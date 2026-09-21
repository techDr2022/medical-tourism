import type { MetadataRoute } from "next";
import { company } from "@/lib/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || company.websiteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/packages",
    "/knee-replacement",
    "/hip-replacement",
    "/patient-support",
    "/consultation",
    "/how-it-works",
    "/privacy",
    "/terms",
    "/advertising-disclosure",
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/consultation" || path === "/packages" ? 0.9 : 0.7,
  }));
}
