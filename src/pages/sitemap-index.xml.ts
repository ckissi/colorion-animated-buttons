import type { APIRoute } from 'astro';
import { SITE } from '../data/catalog';
export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${SITE}/sitemap.xml</loc></sitemap></sitemapindex>`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
