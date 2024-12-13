import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import rss from "@astrojs/rss";

import { BLOG_TITLE, BLOG_DESCRIPTION, EMAIL_ADDRESS } from "lib/consts";

export const GET: APIRoute = async () => {
  const blog = await getCollection("blog");
  return rss({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    site: import.meta.env.SITE,
    items: await Promise.all(
      blog.map(async (post) => {
        const { remarkPluginFrontmatter } = await post.render();
        return {
          title: post.data.title,
          description: post.data.description,
          link: `/blog/${post.slug}/`,
          pubDate: remarkPluginFrontmatter.lastModified,
          language: "en-us",
          copyright: `Copyright © ${new Date().getUTCFullYear()}, Rayhan Noufal Arayilakath`,
          author: EMAIL_ADDRESS,
          managingEditor: EMAIL_ADDRESS,
          webMaster: EMAIL_ADDRESS,
          docs: "https://cyber.harvard.edu/rss/rss.html",
          ttl: 60,
          lastBuildDate: new Date(),
        };
      })
    ),
  });
};
