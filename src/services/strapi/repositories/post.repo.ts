import type { Post } from "@/interfaces/blog/post";
import fetchCollection from "../core/fetchCollection";
import type { StrapiPost } from "../interfaces/blog/strapi-post";
import { strapiPostsToDomain } from "../mappers/post.mapper";

export async function getAllPosts(): Promise<Post[]> {
  const response = await fetchCollection<StrapiPost>("posts", {
    populate: {
      cover: true,
      author: {
        populate: ["avatar"],
      },
      categories: true,
    },
  });

  return strapiPostsToDomain(response.data);
}
