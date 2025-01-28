import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import remarkPrependUrl from "remark-prepend-url";

import { schema } from "./env.ts";
import { gitCommitRemarkPlugin } from "./src/lib/blog/gitCommitRemarkPlugin.ts";

const { SITE } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

export default defineConfig({
    site: SITE ?? "http://localhost:3000",
    output: "static",
    integrations: [
        mdx(),
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
        remarkPlugins: [
            // @ts-ignore: incorrectly typed in @astrojs/markdown-remark
            gitCommitRemarkPlugin,
            [remarkPrependUrl, new URL(SITE ?? "http://localhost:3000")],
        ],
    },
    redirects: {
        "/work": "/resume",
        "/t/[id]": "/thoughts/[id]",
    },
    env: { schema },
    vite: {
        plugins: [tailwindcss()],
    },
});
