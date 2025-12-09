import {  reference, z, type ImageFunction } from "astro:content";

export const authorSchema = (image: ImageFunction) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      avatar: image(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      social: z
        .object({
          instagram: z.string().url().optional(),
          facebook: z.string().url().optional(),
          twitter: z.string().url().optional(),
        })
        .optional(),
})

export type Author = z.infer<ReturnType<typeof authorSchema>>


export const postSchema = (image: ImageFunction) =>
  z.object({
     title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      heroImage: image(),
      categories: z.array(z.string()),
      draft: z.boolean().default(false),
      author: reference("authors"),
  })


export type Post = z.infer<ReturnType<typeof postSchema>>
