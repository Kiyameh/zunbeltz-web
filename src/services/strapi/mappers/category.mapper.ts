import type { Category } from "@/interfaces/blog/category";
import type { StrapiCategory } from "../interfaces/blog/strapi-category";
import type { Post } from "@/interfaces/blog/post";
import type { ContentVariant } from "@/interfaces/content";
import completeStrapiUrl from "../core/completeStrapiUrl";

/**
 * Transforma una categoría de Strapi al dominio
 * Convierte posts a objetos completos del dominio
 */
export function strapiCategoryToDomain(
  strapiCategory: StrapiCategory,
): Category {
  const posts: Post[] = strapiCategory.posts.map((post) => {
    const content: ContentVariant = {
      kind: "blocks",
      value: post.content,
    };

    return {
      documentId: post.documentId,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
      publishedAt: new Date(post.publishedAt || post.createdAt),
      locale: post.locale,
      title: post.title,
      description: post.description,
      slug: post.slug,
      cover: completeStrapiUrl(post.cover.url),
      content,
      author: {
        documentId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
        locale: "",
        name: "",
        slug: "",
        bio: "",
        posts: [],
      },
      categories: [],
    };
  });

  return {
    documentId: strapiCategory.documentId,
    createdAt: new Date(strapiCategory.createdAt),
    updatedAt: new Date(strapiCategory.updatedAt),
    publishedAt: new Date(
      strapiCategory.publishedAt || strapiCategory.createdAt,
    ),
    locale: strapiCategory.locale,
    name: strapiCategory.name,
    slug: strapiCategory.slug,
    description: strapiCategory.description,
    posts,
  };
}

/**
 * Transforma un array de categorías de Strapi al dominio
 */
export function strapiCategoriesToDomain(
  strapiCategories: StrapiCategory[],
): Category[] {
  return strapiCategories.map(strapiCategoryToDomain);
}
