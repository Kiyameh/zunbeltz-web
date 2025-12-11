import type { Post } from "@/interfaces/blog/post";
import fetchCollection from "../core/fetchCollection";
import type { StrapiPost } from "../interfaces/blog/strapi-post";
import {
  strapiPostsToDomain,
  strapiPostToDomain,
} from "../mappers/post.mapper";

export async function getAllPosts(): Promise<Post[]> {
  const response = await fetchCollection<StrapiPost>("posts", {
    populate: ["cover", "author", "categories"],
  });

  return strapiPostsToDomain(response.data);
}

export async function getPostsByAuthor(author: string): Promise<Post[]> {
  const response = await fetchCollection<StrapiPost>("posts", {
    filters: {
      author: {
        slug: {
          $eq: author,
        },
      },
    },
    populate: ["cover", "author", "categories"],
  });

  return strapiPostsToDomain(response.data);
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const response = await fetchCollection<StrapiPost>("posts", {
    filters: {
      categories: {
        slug: {
          $eq: category,
        },
      },
    },
    populate: ["cover", "author", "categories"],
  });

  return strapiPostsToDomain(response.data);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await fetchCollection<StrapiPost>("posts", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ["cover", "author", "categories"],
  });

  if (response.data.length === 0) {
    return null;
  }

  return strapiPostToDomain(response.data[0]);
}
