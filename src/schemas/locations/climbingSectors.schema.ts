import { reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  imageAssetSchema,
  accessInfoSchema,
  restrictionsSchema,
} from "../shared";

/**
 * Colección de Sectores de Escalada
 *
 * Representa sectores dentro de escuelas de escalada como locations (lugares físicos).
 * Las vías de escalada que se encuentran en estos sectores (climbingRoutes, boulderProblems)
 * son colecciones separadas que referencian a estas locations.
 *
 * Tipo: content (frontmatter + contenido Markdown)
 *
 * Jerarquía:
 * NavarraZone → ClimbingCrag → ClimbingSector
 *
 * Activities que referencian a ClimbingSector:
 * - climbingRoutes
 * - boulderProblems
 * - multiPitchRoutes (opcionalmente)
 */

export const climbingSectorSchema = (image: ImageFunction) =>
  z.object({
    // ========================================================================
    // HeroSection
    // ========================================================================

    /** Nombre del sector */
    name: z.string(),

    /** Descripción */
    description: z.string().optional(),

    // ========================================================================
    // LocationsCard
    // ========================================================================

    /** Escuela de escalada a la que pertenece */
    climbingCrag: reference("climbingCrags"),

    /** Zona de Navarra a la que pertenece (opcional, heredado del crag) */
    navarraZone: reference("navarraZones").optional(),

    // ========================================================================
    // PropertiesSection
    // ========================================================================

    /** Orientación del sector */
    orientation: z
      .enum(["N", "S", "E", "O", "NE", "NO", "SE", "SO"])
      .optional(),

    /** Altura aproximada de la pared en metros */
    height: z.number().optional(),

    /** Localidad o municipio (opcional, heredado del crag) */
    location: z.string().optional(),

    // ========================================================================
    // LogisticsCard
    // ========================================================================

    /** Coordenadas de la entrada principal */
    entryPoint: utmCoordinatesSchema,

    /** Información de acceso  */
    accessInfo: accessInfoSchema.optional(),

    // ========================================================================
    // MultimediaSection
    // ========================================================================

    /** Fotografía principal del sector */
    mainPhoto: imageAssetSchema(image).optional(),

    /** Imagen de croquis/topo del sector */
    topoImage: imageAssetSchema(image).optional(),

    /** Fotografías adicionales */
    additionalPhotos: z.array(imageAssetSchema(image)).optional(),

    // ========================================================================
    // RestrictionsCard
    // ========================================================================
    /** Restricciones y protecciones */
    restrictions: restrictionsSchema.optional(),
  });

export type ClimbingSector = z.infer<ReturnType<typeof climbingSectorSchema>>;
