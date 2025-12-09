import { reference, z, type ImageFunction } from "astro:content";
import {
  imageAssetSchema,
  restrictionsSchema,
  topographyAssetSchema,
} from "../shared";

/**
 * Colección de Barrancos
 *
 * Representa barrancos como locations (lugares físicos).
 * Los descensos de barranquismo que se realizan en estos barrancos (canyoningDescents)
 * son colecciones separadas que referencian a estas locations.
 *
 * Tipo: content (frontmatter + contenido Markdown)
 *
 * Jerarquía:
 * NavarraZone → Canyon
 *
 * Activities que referencian a Canyon:
 * - canyoningDescents
 */

export const canyonSchema = (image: ImageFunction) =>
  z.object({
    // ========================================================================
    // HeroSection
    // ========================================================================

    /** Nombre del barranco */
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

    /** Río al que pertenece el barranco */
    river: z.string(),

    /** Localidad o municipio */
    location: z.string(),

    /** Cuenca de captación en km² (características hidrológicas) */
    catchmentArea: z.number().optional(),

    /** Caudal normal en m³/s (características hidrológicas) */
    normalFlow: z.number().optional(),

    // ========================================================================
    // MultimediaSection
    // ========================================================================

    /** Fotografía principal */
    mainPhoto: imageAssetSchema(image).optional(),

    /** Fotografías adicionales */
    additionalPhotos: z.array(imageAssetSchema(image)).optional(),

    /** Topografías del barranco */
    topographies: z.array(topographyAssetSchema).optional(),

    // ========================================================================
    // RestrictionsCard
    // ========================================================================

    /** Restricciones y protecciones del lugar */
    restrictions: restrictionsSchema.optional(),
  });

export type Canyon = z.infer<ReturnType<typeof canyonSchema>>;
