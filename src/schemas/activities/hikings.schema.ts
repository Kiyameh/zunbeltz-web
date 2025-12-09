import { reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  durationSchema,
  imageAssetSchema,
} from "../shared";

/**
 * Esquema de Rutas de Senderismo
 *
 * Representa rutas de senderismo (hikings) como activities.
 * Cada ruta referencia a una montaña (location) donde se realiza.
 *
 * Tipo: content (frontmatter + contenido Markdown)
 *
 * Location principal: Mountain
 * Jerarquía opcional: Massif, NavarraZone
 */
export const hikingSchema = (image: ImageFunction) =>
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

    /** Montaña donde se realiza la ruta (OBLIGATORIO) */
    mountain: reference("mountains"),

    /** Macizo al que pertenece (opcional, para queries rápidas) */
    massif: reference("massifs").optional(),

    /** Zona de Navarra (opcional, para queries rápidas) */
    navarraZone: reference("navarraZones").optional(),

    // ========================================================================
    // PropertiesSection
    // ========================================================================

    /** Duración estimada */
    duration: durationSchema,

    /** Longitud de la ruta en kilómetros */
    length: z.number(),

    /** Desnivel positivo acumulado en metros */
    elevationGain: z.number(),

    /** Desnivel negativo acumulado en metros (opcional) */
    elevationLoss: z.number().optional(),

    /** Dificultad de la ruta */
    difficulty: z.enum(["Fácil", "Moderada", "Difícil", "Muy Difícil"]),

    // ========================================================================
    // LogisticsCard
    // ========================================================================

    /** ¿Es una ruta circular? */
    circularRoute: z.boolean().default(false),

    /** Punto de inicio de la ruta */
    startPoint: utmCoordinatesSchema,

    /** Punto final de la ruta */
    endPoint: utmCoordinatesSchema,

    // ========================================================================
    // MultimediaSection
    // ========================================================================

    /** Fotografía principal */
    mainPhoto: imageAssetSchema(image).optional(),

    /** Fotografías adicionales */
    additionalPhotos: z.array(imageAssetSchema(image)).optional(),
  });

export type Hiking = z.infer<ReturnType<typeof hikingSchema>>;
