import { defineCollection, reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  imageAssetSchema,
  restrictionsSchema,
} from "../shared";

/**
 * Colección de Montañas
 * 
 * Representa cumbres y picos de Navarra como locations (lugares físicos).
 * Las actividades que se realizan en estas montañas (hikings, multiPitchRoutes)
 * son colecciones separadas que referencian a estas locations.
 * 
 * Tipo: content (frontmatter + contenido Markdown)
 * 
 * Jerarquía:
 * NavarraZone → Massif → Mountain
 * 
 * Activities que referencian a Mountain:
 * - hikings
 * - multiPitchRoutes (opcionalmente)
 */
export const mountainSchema = (image: ImageFunction) =>
  z.object({
      // ========================================================================
      // HeroSection
      // ========================================================================

      /** Nombre de la montaña */
      name: z.string(),

      /** Descripción */
      description: z.string(),

      // ========================================================================
      // LocationsCard
      // ========================================================================

      /** Macizo al que pertenece (opcional) */
      massif: reference("massifs").optional(),

      /** Zona de Navarra a la que pertenece */
      navarraZone: reference("navarraZones"),

      // ========================================================================
      // PropertiesSection
      // ========================================================================

      /** Altitud en metros sobre el nivel del mar */
      altitude: z.number(),

      /** Coordenadas de la cumbre */
      coordinates: utmCoordinatesSchema,

      /** Localidad o municipio más cercano */
      location: z.string(),

      // ========================================================================
      // MultimediaSection
      // ========================================================================

      /** Fotografía principal */
      mainPhoto: imageAssetSchema(image).optional(),

      /** Fotografías adicionales */
      additionalPhotos: z.array(imageAssetSchema(image)).optional(),

      // ========================================================================
      // RestrictionsCard
      // ========================================================================      
      /** Restricciones y protecciones */
      restrictions: restrictionsSchema.optional(),
    })

export type Mountain = z.infer<ReturnType<typeof mountainSchema>>
