import { defineCollection, z, reference } from "astro:content";

// Colección de autores
const authors = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      avatar: image(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      social: z
        .object({
          instagram: z.string().optional(),
          facebook: z.string().optional(),
          twitter: z.string().optional(),
        })
        .optional(),
    }),
});

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
      author: reference("authors"),
    }),
});

export const collections = {
  posts,
  authors,
};
