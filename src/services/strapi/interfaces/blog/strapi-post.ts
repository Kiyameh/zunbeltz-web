import type { BlocksContent } from "@strapi/blocks-react-renderer";
import type { StrapiBaseEntity, StrapiMedia } from "../shared/strapi.types";
import type { StrapiAuthorBase } from "./strapi-author";
import type { StrapiCategoryBase } from "./strapi-category";

/**
 * Propiedades base de un post en Strapi (sin relaciones)
 */
export interface StrapiPostBase extends StrapiBaseEntity {
  title: string;
  description: string;
  slug: string;
  content: BlocksContent[];
}

/**
 * Tipo de post en Strapi con los datos populados
 */
export interface StrapiPost extends StrapiBaseEntity {
  title: string;
  description: string;
  slug: string;
  content: BlocksContent[];
  cover: StrapiMedia;
  author: StrapiAuthorBase;
  categories: StrapiCategoryBase[];
}
