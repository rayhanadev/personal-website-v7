import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";

import { schema } from "./env.ts";
import { gitCommitRemarkPlugin } from "./src/lib/blog/gitCommitRemarkPlugin.ts";

const { SITE } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

export default defineConfig({
    site: SITE ?? "http://localhost:3000",
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
        sitemap({
            filter: (page) => {
                return !page.includes("/thoughts/_");
            },
        }),
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
        // @ts-ignore: incorrectly typed in @astrojs/markdown-remark
        remarkPlugins: [gitCommitRemarkPlugin],
    },
    redirects: {
        "/work": "/resume",
        "/t/[id]": "/thoughts/[id]",
    },
    env: { schema },
});
