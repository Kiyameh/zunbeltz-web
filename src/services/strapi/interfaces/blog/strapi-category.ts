import type { StrapiBaseEntity, StrapiMedia } from "../shared/strapi.types";
import type { StrapiPostBase, StrapiPostWithCover } from "./strapi-post";

/**
 * Propiedades base de una categoría en Strapi (sin relaciones)
 */
export interface StrapiCategoryBase extends StrapiBaseEntity {
  name: string;
  slug: string;
  description?: string;
}

/**
 * Tipo de categoría en Strapi con los datos populados
 */
export interface StrapiCategory extends StrapiCategoryBase {
  posts: StrapiPostWithCover[];
}
