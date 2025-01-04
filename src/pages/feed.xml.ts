import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import rss from "@astrojs/rss";

import {
    BLOG_TITLE,
    BLOG_DESCRIPTION,
    EMAIL_ADDRESS,
    FULL_NAME,
} from "lib/consts";
import { parseDateFromFilePath } from "lib/blog/utils";

export const GET: APIRoute = async () => {
    const blog = await getCollection("blog");
    return rss({
        xmlns: {
            dc: "http://purl.org/dc/elements/1.1/",
            content: "http://purl.org/rss/1.0/modules/content/",
            atom: "http://www.w3.org/2005/Atom",
        },
        title: BLOG_TITLE,
        description: BLOG_DESCRIPTION,
        site: import.meta.env.SITE,
        customData: `<atom:link href="${import.meta.env.SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
        items: await Promise.all(
            blog.map(async (post) => {
                const date = parseDateFromFilePath(post.filePath!);

                return {
                    title: post.data.title,
                    description: post.data.description,
                    link: `/thoughts/${post.id}/`,
                    pubDate: date,
                    language: "en-us",
                    copyright: `Copyright © ${new Date().getUTCFullYear()}, Rayhan Noufal Arayilakath`,
                    author: `${EMAIL_ADDRESS} (${FULL_NAME})`,
                    managingEditor: `${EMAIL_ADDRESS} (${FULL_NAME})`,
                    webMaster: `${EMAIL_ADDRESS} (${FULL_NAME})`,
                    docs: "https://www.rssboard.org/rss-specification",
                    ttl: 60,
                    lastBuildDate: new Date(),
                };
            }),
        ),
    });
};
