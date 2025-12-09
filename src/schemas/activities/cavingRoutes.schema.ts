import { reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  durationSchema,
  imageAssetSchema,
  topographyAssetSchema,
} from "../shared";

/**
 * Schema para dificultad espeleológica
 * Puedes ajustar los valores según tu sistema de graduación
 */
const cavingDifficultySchema = z.object({
  /** Dificultad técnica */
  technical: z.enum(["Fácil", "Moderada", "Difícil", "Muy Difícil", "Extrema"]),
  /** Dificultad física */
  physical: z.enum(["Baja", "Media", "Alta", "Muy Alta"]),
});

/**
 * Colección de Rutas Espeleológicas
 * 
 * Representa rutas espeleológicas (cavingRoutes) como activities.
 * Cada ruta referencia a una cueva (location) donde se realiza.
 * 
 * Tipo: content (frontmatter + contenido Markdown)
 * 
 * Location principal: Cave
 * Jerarquía opcional: CaveSystem, KarstArea, NavarraZone
 */
export const cavingRouteSchema = (image: ImageFunction) =>
  z.object({
      // ========================================================================
      // HeroSection
      // ========================================================================

      /** Nombre de la ruta */
      name: z.string(),

      /** Descripción */
      description: z.string().optional(),

      // ========================================================================
      // LocationsCard
      // ========================================================================

      /** Cueva donde se realiza la ruta (OBLIGATORIO) */
      cave: reference("caves"),

      /** Sistema de cuevas (opcional, para queries rápidas) */
      caveSystem: reference("caveSystems").optional(),

      /** Área kárstica (opcional, para queries rápidas) */
      karstArea: reference("karstAreas").optional(),

      /** Zona de Navarra (opcional, para queries rápidas) */
      navarraZone: reference("navarraZones").optional(),

      // ========================================================================
      // PropertiesSection
      // ========================================================================

      /** Dificultad de la ruta */
      difficulty: cavingDifficultySchema.optional(),

      /** Duración estimada */
      duration: durationSchema,

      /** Desarrollo vertical de la ruta en metros */
      verticalDevelopment: z.number().optional(),

      // ========================================================================
      // MultimediaSection
      // ========================================================================

      /** Topografías específicas de esta ruta (además de las de la cueva) */
      topographies: z.array(topographyAssetSchema).optional(),

      /** Fotografía principal */
      mainPhoto: imageAssetSchema(image).optional(),

      /** Fotografías adicionales */
      additionalPhotos: z.array(imageAssetSchema(image)).optional(),
    })

export type CavingRoute = z.infer<ReturnType<typeof cavingRouteSchema>>
