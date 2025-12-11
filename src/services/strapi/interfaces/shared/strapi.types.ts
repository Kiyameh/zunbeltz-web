/**
 * Entidad base de Strapi
 * Los content types de Strapi heredan estas propiedades base.
 */
export interface StrapiBaseEntity {
  id: number; // ID numérico único de la entidad
  documentId: string; // Identificador único del documento (Strapi v5+)
  createdAt: string; // Fecha de creación en formato ISO 8601
  updatedAt: string; // Fecha de última actualización en formato ISO 8601
  publishedAt?: string; // Fecha de publicación (solo si Draft/Publish está habilitado)
  locale?: string; // Código de idioma (solo si i18n está habilitado)
}

/**
 * Metadatos de paginación de Strapi
 * Incluido en las respuestas de colecciones para información de paginación.
 */
export interface StrapiMeta {
  pagination: {
    page: number; // Página actual
    pageSize: number; // Número de elementos por página
    pageCount: number; // Número total de páginas
    total: number; // Número total de elementos
  };
}

/**
 * Formato de imagen generado por Strapi
 * Strapi genera automáticamente diferentes tamaños de imagen (thumbnail, small, medium, large).
 */
export interface StrapiMediaFormat {
  name: string; // Nombre del archivo
  hash: string; // Hash único del archivo
  ext: string; // Extensión del archivo (ej: '.jpg', '.png')
  mime: string; // Tipo MIME (ej: 'image/jpeg')
  path: string | null; // Ruta del archivo (puede ser null)
  width: number; // Ancho de la imagen en píxeles
  height: number; // Alto de la imagen en píxeles
  size: number; // Tamaño del archivo en KB
  sizeInBytes: number; // Tamaño del archivo en bytes
  url: string; // URL relativa o absoluta de la imagen
}

/**
 * Objeto multimedia de Strapi (imágenes, videos, archivos)
 * Representa un archivo subido a Strapi. Incluye la entidad base más propiedades específicas de medios.
 */
export interface StrapiMedia extends StrapiBaseEntity {
  name: string; // Nombre original del archivo
  alternativeText: string | null; // Texto alternativo para accesibilidad
  caption: string | null; // Descripción o pie de foto
  width: number; // Ancho original en píxeles
  height: number; // Alto original en píxeles
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null; // Tamaños generados automáticamente
  hash: string; // Hash único del archivo
  ext: string; // Extensión del archivo
  mime: string; // Tipo MIME
  size: number; // Tamaño en KB
  url: string; // URL del archivo (relativa o absoluta según configuración)
  previewUrl: string | null; // URL de vista previa
  provider: string; // Proveedor de almacenamiento (local, cloudinary, etc.)
  provider_metadata: unknown; // Metadatos específicos del proveedor
  folderPath: string | null; // Ruta de la carpeta en Strapi
}

/**
 * Respuesta de Strapi para una colección de elementos
 * Usado cuando se obtienen múltiples elementos (ej: GET /api/posts).
 *
 * @template T - Tipo del content type de Strapi (sin StrapiBaseEntity)
 *
 * @property {Array<T & StrapiBaseEntity>} data - Array de elementos con propiedades base
 * @property {StrapiMeta} meta - Metadatos de paginación
 *
 * @example Array de post con cover populado
 *
 * ```typescript
 * const response: StrapiCollectionResponse<StrapiPost<'cover'>> = await fetch(...);
 * ```
 */
export interface StrapiCollectionResponse<T> {
  data: (T & StrapiBaseEntity)[];
  meta: StrapiMeta;
}

/**
 * Respuesta de Strapi para un elemento individual o single type
 * Usado cuando se obtiene un solo elemento (ej: GET /api/posts/123) o un single type (ej: GET /api/homepage).
 *
 * @template T - Tipo del content type de Strapi (sin StrapiBaseEntity)
 *
 * @property {(T & StrapiBaseEntity) | null} data - Elemento individual o null si no existe
 * @property {object} meta - Metadatos vacíos (single types no tienen paginación)
 *
 * @example Post con cover y author populados
 * ```typescript
 * const response: StrapiSingleResponse<StrapiPost<'cover' | 'author'>> = await fetch(...);
 * ```
 */
export interface StrapiSingleResponse<T> {
  data: (T & StrapiBaseEntity) | null;
  meta: {};
}

/**
 * Parámetros de query disponibles en la API REST de Strapi v5
 * Estos parámetros se usan para filtrar, ordenar, paginar y popular relaciones.
 *
 * @example
 * ```typescript
 * const params: StrapiQueryParams = {
 *   populate: ['cover', 'author'],
 *   filters: { slug: { $eq: 'mi-post' } },
 *   pagination: { page: 1, pageSize: 10 }
 * };
 * ```
 */
export interface StrapiQueryParams {
  populate?: string | string[] | Record<string, any>; // Relaciones a popular
  sort?: string | string[]; // Campos por los que ordenar (ej: 'createdAt:desc')
  filters?: Record<string, any>; // Filtros a aplicar (ej: { slug: { $eq: 'mi-post' } })
  fields?: string | string[]; // Campos específicos a retornar
  locale?: string | string[]; // Idioma(s) a obtener (si i18n está habilitado)
  publicationState?: "live" | "preview"; // Estado de publicación
  pagination?: {
    page?: number; // Página actual
    pageSize?: number; // Número de elementos por página
    start?: number; // Indice de inicio
    limit?: number; // Número de elementos por página
    withCount?: boolean; // Indica si se debe retornar el conteo total
  };
}
