import { reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  imageAssetSchema,
  topographyAssetSchema,
  accessInfoSchema,
  restrictionsSchema,
} from "../shared";

/**
 * Colección de Cuevas
 * 
 * Representa cavidades (cuevas, simas, sumideros) como locations (lugares físicos).
 * Las rutas espeleológicas que se realizan en estas cuevas (cavingRoutes)
 * son colecciones separadas que referencian a estas locations.
 * 
 * Tipo: content (frontmatter + contenido Markdown)
 * 
 * Jerarquía:
 * NavarraZone → KarstArea → CaveSystem → Cave
 * 
 * Activities que referencian a Cave:
 * - cavingRoutes
 */
export const caveSchema = (image: ImageFunction) =>
  z.object({
      // ========================================================================
      // HeroSection
      // ========================================================================

      /** Nombre de la cavidad */
      name: z.string(),

      /** Descripción */
      description: z.string(),

      // ========================================================================
      // LocationsCard
      // ========================================================================

      /** Macizo al que pertenece (opcional) */
      massif: z.string().optional(),

      /** Sistema de cuevas al que pertenece (opcional) */
      caveSystem: reference("caveSystems").optional(),

      /** Área kárstica a la que pertenece (opcional) */
      karstArea: reference("karstAreas").optional(),

      /** Zona de Navarra a la que pertenece */
      navarraZone: reference("navarraZones"),

      // ========================================================================
      // PropertiesSection
      // ========================================================================

      /** Nombres alternativos */
      alternativeNames: z.array(z.string()).optional(),

      /** Tipo morfológico de la cavidad */
      morphology: z
        .enum(["Cueva", "Sima", "Sumidero", "Manantial", "Mina"])
        .optional(),

      /** Localidad o municipio */
      location: z.string(),
      
      /** Código de catálogo (ej: "NA-01") */
      catalogCode: z.string().optional(),

      /** URL a la ficha en Subterra.app */
      subterraUrl: z.string().url().optional(),

      /** Desarrollo total en metros */
      length: z.number().optional(),
      
      /** Profundidad/desnivel en metros */
      depth: z.number().optional(),

      // ========================================================================
      // LogisticsCard
      // ========================================================================

      /** Coordenadas de la entrada principal */
      entryPoint: utmCoordinatesSchema,

      /** Información de acceso a la cueva */
      accessInfo: accessInfoSchema.optional(),

      // ========================================================================
      // MultimediaSection
      // ========================================================================

      /** Fotografía principal */
      mainPhoto: imageAssetSchema(image).optional(),

      /** Fotografías adicionales */
      additionalPhotos: z.array(imageAssetSchema(image)).optional(),

      /** Topografías de la cavidad */
      topographies: z.array(topographyAssetSchema).optional(),

      // ========================================================================
      // RestrictionsCard
      // ========================================================================      

      /** Restricciones y protecciones */
      restrictions: restrictionsSchema.optional(),
    })

export type Cave = z.infer<ReturnType<typeof caveSchema>>
