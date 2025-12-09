import { reference, z, type ImageFunction } from "astro:content";
import { imageAssetSchema, restrictionsSchema } from "../shared";

/**
 * Colección de Escuelas de Escalada (Crags)
 *
 * Representa escuelas/zonas de escalada como locations (lugares físicos).
 * Los sectores dentro de estas escuelas (climbingSectors) y las vías de escalada
 * (climbingRoutes, multiPitchRoutes) son colecciones separadas que referencian
 * a estas locations.
 *
 * Tipo: content (frontmatter + contenido Markdown)
 *
 * Jerarquía:
 * NavarraZone → ClimbingCrag → ClimbingSector
 *
 * Activities que referencian a ClimbingCrag:
 * - climbingRoutes (indirectamente vía sector)
 * - multiPitchRoutes (opcionalmente)
 * - boulderProblems (indirectamente vía sector)
 */
export const climbingCragSchema = (image: ImageFunction) =>
  z.object({
    // ========================================================================
    // HeroSection
    // ========================================================================

    /** Nombre de la escuela */
    name: z.string(),

    /** Descripción */
    description: z.string(),

    // ========================================================================
    // LocationsCard
    // ========================================================================

    /** Zona de Navarra a la que pertenece */
    navarraZone: reference("navarraZones"),

    // ========================================================================
    // PropertiesSection
    // ========================================================================

    /** Localidad o municipio */
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
    //

    /** Restricciones y protecciones */
    restrictions: restrictionsSchema.optional(),
  });

export type ClimbingCrag = z.infer<ReturnType<typeof climbingCragSchema>>;
