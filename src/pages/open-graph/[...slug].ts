import { getCollection } from "astro:content";

import { OGImageRoute } from "astro-og-canvas";

const entries = await getCollection("blog");

const pages = Object.fromEntries(
    entries.map((entry) => {
        const { id, data } = entry;
        return [id, data];
    }),
);

export const { getStaticPaths, GET } = OGImageRoute({
    param: "slug",
    pages,
    getImageOptions: (_path, page) => ({
        title: page.title,
        description: page.description,
        logo: {
            path: "./src/assets/logo.webp",
            size: [250, 250],
        },
        bgGradient: [[255, 255, 255]],
        border: {
            color: [0, 0, 0],
            width: 10,
        },
        padding: 50,
        font: {
            title: {
                color: [0, 0, 0],
                families: ["SplineSansMono"],
                weight: "Bold",
            },
            description: {
                color: [0, 0, 0],
                families: ["SplineSansMono"],
            },
        },
        fonts: [
            "./public/fonts/SplineSansMono-Italic-VariableFont_wght.woff2",
            "./public/fonts/SplineSansMono-VariableFont_wght.woff2",
        ],
    }),
});
