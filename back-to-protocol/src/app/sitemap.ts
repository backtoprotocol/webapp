import type { MetadataRoute } from "next";

const publicRoutes = [
  "",
  "/solutions",
  "/products",
  "/ai",
  "/pricing",
  "/resources",
  "/support",
  "/about",
  "/privacy",
  "/terms",
  "/accessibility",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `https://backtoprotocol.com${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : ["/solutions", "/products", "/pricing"].includes(route)
          ? 0.8
          : 0.6,
  }));
}
