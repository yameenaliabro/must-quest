const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const siteConfig = {
  name: "Must Quest",
  description: "Must Quest Project",
  url: siteUrl,
  ogImage: `${siteUrl}/og.png`,
};

export type SiteConfig = typeof siteConfig;
