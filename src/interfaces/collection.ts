/**
 * Interfaz base para todas las colecciones del dominio
 *
 * Representa las propiedades comunes que comparten todos los content types
 * después de ser transformados desde Strapi u otro CMS al dominio de la aplicación.
 */
export default interface Collection {
  documentId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale?: string;
}
