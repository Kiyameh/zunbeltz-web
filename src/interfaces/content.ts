import { type BlocksContent } from "@strapi/blocks-react-renderer";

/**
 * Tipo discriminado para el contenido de un post
 *
 * Soporta dos formatos de contenido: Markdown (string) o Strapi Blocks (rich content).
 * El campo `kind` permite discriminar entre ambos tipos en tiempo de ejecución.
 *
 * @typedef {Object} MarkdownContent
 * @property {'markdown'} kind - Discriminador para contenido Markdown
 * @property {string} value - Contenido en formato Markdown
 *
 * @typedef {Object} BlocksContent
 * @property {'blocks'} kind - Discriminador para contenido Strapi Blocks
 * @property {BlocksContent | BlocksContent[]} value - Contenido en formato Strapi Blocks (puede ser un bloque o array)
 *
 * @example
 * ```typescript
 * // Contenido en Markdown
 * const markdownContent: ContentVariant = {
 *   kind: 'markdown',
 *   value: '# Mi Post\n\nEste es el contenido...'
 * };
 *
 * // Contenido en Strapi Blocks
 * const blocksContent: ContentVariant = {
 *   kind: 'blocks',
 *   value: [{ type: 'paragraph', children: [...] }]
 * };
 *
 * // Uso con discriminación de tipos
 * if (content.kind === 'markdown') {
 *   console.log(content.value); // TypeScript sabe que es string
 * } else {
 *   console.log(content.value); // TypeScript sabe que es BlocksContent | BlocksContent[]
 * }
 * ```
 */
export type ContentVariant =
  | { kind: "markdown"; value: string }
  | { kind: "blocks"; value: BlocksContent | BlocksContent[] };
