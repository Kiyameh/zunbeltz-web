import qs from "qs";
import type { StrapiQueryParams } from "../interfaces/shared/strapi.types";
import type { StrapiCollectionResponse } from "../interfaces/shared/strapi.types";
import type { StrapiSingleResponse } from "../interfaces/shared/strapi.types";

/**
 * Fetcher de datos de strapi generico
 * @param path El endpoint de strapi
 * @param query Objeto con query params
 * @returns JSON
 */
export default async function fetchFromStrapi<T>(
  path: string,
  query?: StrapiQueryParams,
): Promise<StrapiSingleResponse<T> | StrapiCollectionResponse<T>> {
  const url = buildUrl(path, query);
  const token = import.meta.env.STRAPI_TOKEN;

  if (!token) throw new Error("Strapi token not defined in env");

  try {
    const response = await fetch(url.href, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching from Strapi: ${(error as Error).message}`);
    throw error;
  }
}

function buildUrl(path: string, query?: StrapiQueryParams): URL {
  const baseUrl: string | undefined = import.meta.env.STRAPI_URL;
  if (!baseUrl) throw new Error("Strapi url not defined in env");

  const url = new URL(`/api/${path}`, baseUrl);

  if (query) {
    url.search = qs.stringify(query, { encodeValuesOnly: true });
  }

  return url;
}
