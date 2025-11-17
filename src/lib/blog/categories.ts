import { getCollection } from "astro:content";

/**
 * Obtiene todas las categorías únicas de todos los posts publicados
 * @returns Array de categorías únicas ordenadas alfabéticamente
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getCollection("posts", ({ data }) => {
    return data.draft !== true;
  });

  const categoriesSet = new Set<string>();

  posts.forEach((post) => {
    post.data.categories.forEach((category) => {
      categoriesSet.add(category);
    });
  });

  return Array.from(categoriesSet).sort();
}

/**
 * Cuenta cuántos posts hay por cada categoría
 * @returns Objeto con categorías como keys y cantidad de posts como values
 */
export async function getCategoriesWithCount(): Promise<
  Record<string, number>
> {
  const posts = await getCollection("posts", ({ data }) => {
    return data.draft !== true;
  });

  const categoriesCount: Record<string, number> = {};

  posts.forEach((post) => {
    post.data.categories.forEach((category) => {
      categoriesCount[category] = (categoriesCount[category] || 0) + 1;
    });
  });

  return categoriesCount;
}

/**
 * Obtiene todas las categorías con su cantidad de posts, ordenadas alfabéticamente
 * @returns Array de objetos con nombre de categoría y cantidad de posts
 */
export async function getCategoriesWithCountArray(): Promise<
  Array<{ name: string; count: number }>
> {
  const categoriesCount = await getCategoriesWithCount();

  return Object.entries(categoriesCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Obtiene todos los posts que pertenecen a una categoría específica
 * @param category - Nombre de la categoría
 * @returns Array de posts filtrados por categoría, ordenados por fecha (más reciente primero)
 */
export async function getPostsByCategory(category: string) {
  const posts = await getCollection("posts", ({ data }) => {
    return data.draft !== true && data.categories.includes(category);
  });

  return posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );
}
