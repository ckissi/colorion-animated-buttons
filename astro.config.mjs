import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://animatedbuttons.colorion.co',
  server: { port: Number(process.env.PORT) || 4321 },
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
});
