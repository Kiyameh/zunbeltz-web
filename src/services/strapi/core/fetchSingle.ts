import fetchFromStrapi from "./fetchFromStrapi";
import type { StrapiQueryParams } from "../interfaces/shared/strapi.types";
import type { StrapiSingleResponse } from "../interfaces/shared/strapi.types";

/**
 * Obtiene un elemento individual (single type o item específico)
 * @param path - Ruta del endpoint (ej: 'homepage' o 'posts/123')
 * @param params - Parámetros extra (populate, etc.)
 * @returns Elemento individual con sus propiedades base de Strapi
 */
export default async function fetchSingle<T>(
  path: string,
  params: StrapiQueryParams = {},
): Promise<StrapiSingleResponse<T>> {
  const response = await fetchFromStrapi<T>(path, params);

  if ("meta" in response && "pagination" in response.meta) {
    throw new Error(`Expected single response for ${path}, got collection`);
  }

  return response as StrapiSingleResponse<T>;
}
