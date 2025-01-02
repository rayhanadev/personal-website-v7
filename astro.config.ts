import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";

import { schema } from "./env.ts";

export default defineConfig({
    site: process.env.SITE ?? "http://localhost:3000",
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
        react(),
    ],
    server: {
        port: 3000,
    },
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport",
    },
    markdown: {
        syntaxHighlight: "prism",
    },
    redirects: {
        "/work": "/resume",
        "/t/[id]": "/thoughts/[id]",
    },
    env: { schema },
});
