import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
    loader: glob({
        pattern: import.meta.env.DEV ? "**/*.{md,mdx}" : "**/[^_]*.{md,mdx}",
        base: "./src/content/blog/posts",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
    }),
});

export const collections = { blog };
