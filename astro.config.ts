import { execSync } from "node:child_process";

import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";

import { schema } from "./env.ts";

export default defineConfig({
  site: "https://www.rayhanadev.com",
  output: "static",
  integrations: [
    mdx(),
    tailwind({
      configFile: "./tailwind.config.ts",
      applyBaseStyles: false,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
    playformCompress({
      Logger: 1,
    }),
  ],
  server: {
    port: 3000,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  markdown: {
    remarkPlugins: [
      () => (_tree, file) => {
        const filepath = file.history[0];
        const result = execSync(
          `git log -1 --pretty="format:%cI" "${filepath}"`
        );
        // @ts-ignore: added by astro but not exposed in the types
        file.data.astro.frontmatter.lastModified = result.toString();
      },
    ],
  },
  env: { schema },
});
