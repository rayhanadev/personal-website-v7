import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";

import { schema } from "./env.ts";

export default defineConfig({
    site: "https://staging.rayhanadev.com",
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
    redirects: {
        "/t/[id]": "/thoughts/[id]",
    },
    env: { schema },
});
