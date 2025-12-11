import type { StrapiBaseEntity, StrapiMedia } from "../shared/strapi.types";
import type { StrapiPostBase, StrapiPostWithCover } from "./strapi-post";

/**
 * Propiedades base de un autor en Strapi (sin relaciones)
 */
export interface StrapiAuthorBase extends StrapiBaseEntity {
  name: string;
  slug: string;
  bio: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  avatar: StrapiMedia;
}

/**
 * Tipo de autor en Strapi con los datos populados
 */
export interface StrapiAuthor extends StrapiAuthorBase {
  posts: StrapiPostWithCover[];
}
