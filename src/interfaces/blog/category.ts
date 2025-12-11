import type Collection from "../collection";
import type { Post } from "./post";

/**
 * Tipo de categoría en el dominio
 * Siempre incluye posts populados
 */
export interface Category extends Collection {
  name: string;
  slug: string;
  description?: string;
  posts: Post[];
}
