import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import tailwind from '@astrojs/tailwind';
import solidJs from "@astrojs/solid-js";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), tailwind(), solidJs()],
  output: "server",
  adapter: vercel()
});