import { reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  durationSchema,
  imageAssetSchema,
  accessInfoSchema,
} from "../shared";

/**
 * Colección de Vías Ferratas
 *
 * Representa vías ferratas (viaFerratas) como activities.
 * Cada vía ferrata referencia directamente a una zona de Navarra.
 *
 * Tipo: content (frontmatter + contenido Markdown)
 *
 * Location principal: NavarraZone
 */

export const viaFerrataSchema = (image: ImageFunction) =>
  z.object({
    // ========================================================================
    // HeroSection
    // ========================================================================

    /** Nombre de la vía ferrata */
    name: z.string(),

    /** Descripción */
    description: z.string().optional(),

    // ========================================================================
    // LocationsCard
    // ========================================================================

    /** Montaña donde se encuentra la vía (opcional) */
    mountain: reference("mountains"),

    /** Zona de Navarra donde se encuentra (OBLIGATORIO) */
    navarraZone: reference("navarraZones"),

    // ========================================================================
    // PropertiesSection
    // ========================================================================

    /** Longitud total en metros */
    length: z.number(),

    /** Desnivel total en metros */
    elevationGain: z.number(),

    /** Duración estimada (aproximación + ferrata + descenso) */
    duration: durationSchema,

    // ========================================================================
    // GradingCard
    // ========================================================================

    /** Dificultad según escala K (Klettersteig) */
    grading: z.enum(["K1", "K2", "K3", "K4", "K5", "K6"]),

    // ========================================================================
    // LogisticsCard
    // ========================================================================

    /** Punto de inicio de la aproximación */
    startPoint: utmCoordinatesSchema,

    /** Punto final (cima o salida) */
    endPoint: utmCoordinatesSchema,

    /** Información de acceso */
    accessInfo: accessInfoSchema.optional(),

    /** Información del retorno */
    returnInfo: accessInfoSchema.optional(),

    // ========================================================================
    // RequiredGearCard
    // ========================================================================

    /** Material necesario (además del equipo básico de ferrata) */
    requiredGear: z.array(z.string()).optional(),

    // ========================================================================
    // MultimediaSection
    // ========================================================================

    /** Fotografía principal */
    mainPhoto: imageAssetSchema(image).optional(),

    /** Fotografías adicionales */
    additionalPhotos: z.array(imageAssetSchema(image)).optional(),

    /** Croquis de la vía ferrata */
    topoImage: imageAssetSchema(image).optional(),
  });

export type ViaFerrata = z.infer<ReturnType<typeof viaFerrataSchema>>;
