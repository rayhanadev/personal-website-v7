import { getCollection } from "astro:content";

import { OGImageRoute } from "astro-og-canvas";

const entries = await getCollection("blog");

const pages = Object.fromEntries(entries.map(({ slug, data }) => [slug, data]));

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
        families: ["Lusitana"],
        weight: "Bold",
      },
      description: {
        color: [0, 0, 0],
        families: ["Jost"],
      },
    },
    fonts: [
      "./public/fonts/Jost-Italic-VariableFont_wght.woff2",
      "./public/fonts/Jost-VariableFont_wght.woff2",
      "./public/fonts/Lusitana-Bold.woff2",
      "./public/fonts/Lusitana-Regular.woff2",
    ],
  }),
});
