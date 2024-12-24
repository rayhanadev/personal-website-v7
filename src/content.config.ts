import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { BLOG_CONTENT_POOL_PATH } from "lib/consts";

const blog = defineCollection({
    loader: glob({
        pattern: import.meta.env.DEV ? "**/*.{md,mdx}" : "**/[^_]*.{md,mdx}",
        base: BLOG_CONTENT_POOL_PATH,
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
    }),
});

export const collections = { blog };
