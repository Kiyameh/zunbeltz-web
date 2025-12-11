import fetchFromStrapi from "./fetchFromStrapi";
import type { StrapiQueryParams } from "../interfaces/shared/strapi.types";
import type { StrapiCollectionResponse } from "../interfaces/shared/strapi.types";

/**
 * Obtiene una lista de elementos de una colección
 * @param collection - Nombre de la colección
 * @param params - Parámetros extra (populate, sort, pagination)
 * @returns Array de elementos con sus propiedades base de Strapi
 */
export default async function fetchCollection<T>(
  collection: string,
  params: StrapiQueryParams = {},
): Promise<StrapiCollectionResponse<T>> {
  const response = await fetchFromStrapi<T>(collection, params);

  if (!("meta" in response) || !Array.isArray(response.data)) {
    throw new Error(`Expected collection response for ${collection}`);
  }

  return response as StrapiCollectionResponse<T>;
}
