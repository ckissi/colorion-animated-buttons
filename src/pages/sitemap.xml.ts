import type { APIRoute } from 'astro';
import { SITE } from '../data/catalog';
import { indexableRoutes } from '../data/routes';
export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexableRoutes.map((path) => `<url><loc>${new URL(path, SITE).href}</loc></url>`).join('')}</urlset>`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
