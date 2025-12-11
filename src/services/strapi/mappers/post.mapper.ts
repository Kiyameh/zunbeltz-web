import type { Post } from "@/interfaces/blog/post";
import type { StrapiPost } from "../interfaces/blog/strapi-post";
import completeStrapiUrl from "../core/completeStrapiUrl";
import type { ContentVariant } from "@/interfaces/content";
import type { Author } from "@/interfaces/blog/author";
import type { Category } from "@/interfaces/blog/category";

/**
 * Transforma un post de Strapi al dominio
 * Convierte author y categories a objetos completos del dominio
 */
export function strapiPostToDomain(strapiPost: StrapiPost): Post {
  const content: ContentVariant = {
    kind: "blocks",
    value: strapiPost.content,
  };

  const author: Author = {
    documentId: strapiPost.author.documentId,
    createdAt: new Date(strapiPost.author.createdAt),
    updatedAt: new Date(strapiPost.author.updatedAt),
    publishedAt: new Date(
      strapiPost.author.publishedAt || strapiPost.author.createdAt,
    ),
    locale: strapiPost.author.locale,
    name: strapiPost.author.name,
    slug: strapiPost.author.slug,
    bio: strapiPost.author.bio,
    email: strapiPost.author.email,
    website: strapiPost.author.website,
    instagram: strapiPost.author.instagram,
    facebook: strapiPost.author.facebook,
    twitter: strapiPost.author.twitter,
    avatar: completeStrapiUrl(strapiPost.author.avatar.url),
    posts: [],
  };

  const categories: Category[] = strapiPost.categories.map((cat) => ({
    documentId: cat.documentId,
    createdAt: new Date(cat.createdAt),
    updatedAt: new Date(cat.updatedAt),
    publishedAt: new Date(cat.publishedAt || cat.createdAt),
    locale: cat.locale,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    posts: [],
  }));

  return {
    documentId: strapiPost.documentId,
    createdAt: new Date(strapiPost.createdAt),
    updatedAt: new Date(strapiPost.updatedAt),
    publishedAt: new Date(strapiPost.publishedAt || strapiPost.createdAt),
    locale: strapiPost.locale,
    title: strapiPost.title,
    description: strapiPost.description,
    slug: strapiPost.slug,
    cover: completeStrapiUrl(strapiPost.cover.url),
    content,
    author,
    categories,
  };
}

/**
 * Transforma un array de posts de Strapi al dominio
 */
export function strapiPostsToDomain(strapiPosts: StrapiPost[]): Post[] {
  return strapiPosts.map(strapiPostToDomain);
}
