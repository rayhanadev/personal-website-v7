import { getCollection } from "astro:content";

import { OGImageRoute } from "astro-og-canvas";

const entries = await getCollection("blog");

const pages = Object.fromEntries(
    entries.map((entry) => {
        const { id, data } = entry;
        return [id, data];
    }),
);

// TODO(rayhanadev): replace this library with canvaskit (underlying library)
// to support better rendering and more features.

export const { getStaticPaths, GET } = OGImageRoute({
    param: "slug",
    pages,
    getImageOptions: (_path, page) => ({
        title: page.title,
        description: page.description,
        // logo: {
        //     path: "./src/assets/logo.webp",
        //     size: [250, 250],
        // },
        bgImage: {
            path: "./src/assets/og-image-background.png",
        },
        padding: 10,
        font: {
            title: {
                color: [0, 0, 0],
                families: ["SplineSansMono"],
                size: 142,
            },
            description: {
                color: [0, 0, 0],
                families: ["SplineSansMono"],
                size: 24,
            },
        },
        fonts: [
            "./public/fonts/SplineSansMono-Italic-VariableFont_wght.woff2",
            "./public/fonts/SplineSansMono-VariableFont_wght.woff2",
        ],
    }),
});
