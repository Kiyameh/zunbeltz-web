import fetchCollection from "../core/fetchCollection";
import type { Author } from "@/interfaces/blog/author";
import type { StrapiAuthor } from "../interfaces/blog/strapi-author";
import {
  strapiAuthorsToDomain,
  strapiAuthorToDomain,
} from "../mappers/author.mapper";

export async function getAllAuthors(): Promise<Author[]> {
  const response = await fetchCollection<StrapiAuthor>("authors", {
    populate: ["avatar", "posts"],
  });

  return strapiAuthorsToDomain(response.data);
}

export async function getAuthorBySlug(
  slug: string,
): Promise<Author | undefined> {
  const response = await fetchCollection<StrapiAuthor>("authors", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ["avatar", "posts"],
  });

  if (response.data.length === 0) {
    return undefined;
  }

  return strapiAuthorToDomain(response.data[0]);
}
