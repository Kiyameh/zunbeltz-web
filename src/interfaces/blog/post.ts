import type { ContentVariant } from "../content";
import type Collection from "../collection";
import type { Author } from "./author";
import type { Category } from "./category";

/**
 * Tipo de post en el dominio
 * Siempre incluye author y categories populados
 */
export interface Post extends Collection {
  title: string;
  description: string;
  slug: string;
  cover: URL;
  content: ContentVariant;
  author: Author;
  categories: Category[];
}
