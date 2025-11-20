import { getCollection } from "astro:content";

/**
 * Obtiene todos los posts de un autor específico
 * @param authorId - ID del autor
 * @returns Array de posts del autor, ordenados por fecha (más reciente primero)
 */
export async function getAuthorPosts(authorId: string) {
  const posts = await getCollection("posts", ({ data }) => {
    return data.draft !== true && data.author.id === authorId;
  });

  return posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );
}

/**
 * Obtiene todos los autores que tienen al menos un post publicado
 * @returns Array de autores con posts
 */
export async function getAuthorsWithPosts() {
  const allAuthors = await getCollection("authors");
  const posts = await getCollection("posts", ({ data }) => data.draft !== true);

  // Filtrar solo autores que tienen posts
  const authorsWithPosts = allAuthors.filter((author) =>
    posts.some((post) => post.data.author.id === author.id),
  );

  return authorsWithPosts;
}

/**
 * Obtiene el conteo de posts por autor
 * @returns Objeto con authorId como key y cantidad de posts como value
 */
export async function getAuthorPostCounts(): Promise<Record<string, number>> {
  const posts = await getCollection("posts", ({ data }) => data.draft !== true);
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    const authorId = post.data.author.id;
    counts[authorId] = (counts[authorId] || 0) + 1;
  });

  return counts;
}
