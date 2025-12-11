import type { Author } from "@/interfaces/blog/author";
import type { StrapiAuthor } from "../interfaces/blog/strapi-author";
import completeStrapiUrl from "../core/completeStrapiUrl";
import type { Post } from "@/interfaces/blog/post";
import type { ContentVariant } from "@/interfaces/content";

/**
 * Transforma un autor de Strapi al dominio
 * Convierte posts a objetos completos del dominio
 */
export function strapiAuthorToDomain(strapiAuthor: StrapiAuthor): Author {
  const posts: Post[] = strapiAuthor.posts.map((post) => {
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
      cover: new URL(""),
      content,
      author: {
        documentId: strapiAuthor.documentId,
        createdAt: new Date(strapiAuthor.createdAt),
        updatedAt: new Date(strapiAuthor.updatedAt),
        publishedAt: new Date(
          strapiAuthor.publishedAt || strapiAuthor.createdAt,
        ),
        locale: strapiAuthor.locale,
        name: strapiAuthor.name,
        slug: strapiAuthor.slug,
        bio: strapiAuthor.bio,
        avatar: strapiAuthor.avatar
          ? completeStrapiUrl(strapiAuthor.avatar.url)
          : undefined,
        email: strapiAuthor.email,
        website: strapiAuthor.website,
        instagram: strapiAuthor.instagram,
        facebook: strapiAuthor.facebook,
        twitter: strapiAuthor.twitter,
        posts: [],
      },
      categories: [],
    };
  });

  return {
    documentId: strapiAuthor.documentId,
    createdAt: new Date(strapiAuthor.createdAt),
    updatedAt: new Date(strapiAuthor.updatedAt),
    publishedAt: new Date(strapiAuthor.publishedAt || strapiAuthor.createdAt),
    locale: strapiAuthor.locale,
    name: strapiAuthor.name,
    slug: strapiAuthor.slug,
    bio: strapiAuthor.bio,
    avatar: strapiAuthor.avatar
      ? completeStrapiUrl(strapiAuthor.avatar.url)
      : undefined,
    email: strapiAuthor.email,
    website: strapiAuthor.website,
    instagram: strapiAuthor.instagram,
    facebook: strapiAuthor.facebook,
    twitter: strapiAuthor.twitter,
    posts,
  };
}

/**
 * Transforma un array de autores de Strapi al dominio
 */
export function strapiAuthorsToDomain(strapiAuthors: StrapiAuthor[]): Author[] {
  return strapiAuthors.map(strapiAuthorToDomain);
}
