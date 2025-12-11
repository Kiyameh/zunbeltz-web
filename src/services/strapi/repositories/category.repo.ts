import type { Category } from "@/interfaces/blog/category";
import fetchCollection from "../core/fetchCollection";
import type { StrapiCategory } from "../interfaces/blog/strapi-category";
import {
  strapiCategoriesToDomain,
  strapiCategoryToDomain,
} from "../mappers/category.mapper";

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetchCollection<StrapiCategory>("categories", {
    populate: {
      posts: {
        populate: ["cover"],
      },
    },
  });
  return strapiCategoriesToDomain(response.data);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const response = await fetchCollection<StrapiCategory>("categories", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      posts: {
        populate: ["cover"],
      },
    },
  });

  if (response.data.length === 0) {
    return null;
  }

  return strapiCategoryToDomain(response.data[0]);
}
