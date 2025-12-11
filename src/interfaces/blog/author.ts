import type Collection from "../collection";
import type { Post } from "./post";

/**
 * Tipo de autor en el dominio
 * Siempre incluye posts populados
 */
export interface Author extends Collection {
  name: string;
  slug: string;
  bio: string;
  avatar?: URL;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  posts: Post[];
}
