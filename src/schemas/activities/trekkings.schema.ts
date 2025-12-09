import { reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  durationSchema,
  imageAssetSchema,
  accessInfoSchema,
} from "../shared";

/**
 * Esquema de Trekkings
 *
 * Representa trekkings de varios días (trekkings) como activities.
 * Cada trekking referencia a un macizo (location) donde se realiza.
 *
 * Tipo: content (frontmatter + contenido Markdown)
 *
 * Location principal: Massif
 * Jerarquía opcional: NavarraZone
 */
export const trekkingSchema = (image: ImageFunction) =>
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

    /** Macizo donde se realiza el trekking (OBLIGATORIO) */
    massif: reference("massifs"),

    /** Zona de Navarra (opcional, para queries rápidas) */
    navarraZone: reference("navarraZones").optional(),

    // ========================================================================
    // PropertiesSection
    // ========================================================================

    /** Duración total */
    duration: durationSchema,

    /** Número de etapas */
    numberOfStages: z.number(),

    /** Longitud total en kilómetros */
    totalLength: z.number(),

    /** Desnivel positivo acumulado en metros */
    totalElevationGain: z.number(),

    /** Desnivel negativo acumulado en metros */
    totalElevationLoss: z.number().optional(),

    /** Dificultad del trekking */
    difficulty: z.enum(["Fácil", "Moderada", "Difícil", "Muy Difícil"]),

    // ========================================================================
    // LogisticsCard
    // ========================================================================

    /** ¿Es un trekking circular? */
    circularRoute: z.boolean().default(false),

    /** Punto de inicio del trekking */
    startPoint: utmCoordinatesSchema,

    /** Punto final del trekking */
    endPoint: utmCoordinatesSchema,

    // ========================================================================
    // MultimediaSection
    // ========================================================================

    /** Fotografía principal */
    mainPhoto: imageAssetSchema(image).optional(),

    /** Fotografías adicionales */
    additionalPhotos: z.array(imageAssetSchema(image)).optional(),
  });

export type Trekking = z.infer<ReturnType<typeof trekkingSchema>>;
