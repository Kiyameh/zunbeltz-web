import { defineCollection, z } from "astro:content";

// Colección de posts del blog
const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      heroImage: image(),
      categories: z.array(z.string()),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  posts,
};
