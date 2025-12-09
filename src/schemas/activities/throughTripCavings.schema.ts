import { reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  durationSchema,
  imageAssetSchema,
  topographyAssetSchema,
  accessInfoSchema,
} from "../shared";

/**
 * Schema para dificultad espeleológica
 */
const cavingDifficultySchema = z.object({
  /** Dificultad técnica */
  technical: z.enum(["Fácil", "Moderada", "Difícil", "Muy Difícil", "Extrema"]),
  /** Dificultad física */
  physical: z.enum(["Baja", "Media", "Alta", "Muy Alta"]),
});

/**
 * Colección de Travesías Espeleológicas
 *
 * Representa travesías espeleológicas (throughTripCavings) como activities.
 * Cada travesía referencia a un sistema de cuevas (location) donde se realiza.
 *
 * Tipo: content (frontmatter + contenido Markdown)
 *
 * Location principal: CaveSystem
 * Jerarquía opcional: KarstArea, NavarraZone
 */
export const throughTripCavingSchema = (image: ImageFunction) =>
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

    /** Sistema de cuevas donde se realiza la travesía (OBLIGATORIO) */
    caveSystem: reference("caveSystems"),

    /** Área kárstica (opcional, para queries rápidas) */
    karstArea: reference("karstAreas").optional(),

    /** Zona de Navarra (opcional, para queries rápidas) */
    navarraZone: reference("navarraZones").optional(),

    // ========================================================================
    // PropertiesSection
    // ========================================================================

    /** Dificultad de la travesía */
    difficulty: cavingDifficultySchema.optional(),

    /** Duración estimada */
    duration: durationSchema,

    /** Longitud total de la travesía en metros */
    totalLength: z.number().optional(),

    /** Desarrollo vertical total en metros */
    verticalDevelopment: z.number().optional(),

    // ========================================================================
    // LogisticsCard
    // ========================================================================

    /** Punto de entrada a la travesía */
    entryPoint: utmCoordinatesSchema,

    /** Punto de salida de la travesía */
    exitPoint: utmCoordinatesSchema,

    /** Información de acceso al punto de inicio */
    accessInfo: accessInfoSchema.optional(),

    /** Información de retorno al punto de inicio */
    returnInfo: accessInfoSchema.optional(),

    // ========================================================================
    // MultimediaSection
    // ========================================================================

    /** Topografías de la travesía */
    topographies: z.array(topographyAssetSchema).optional(),

    /** Fotografía principal */
    mainPhoto: imageAssetSchema(image).optional(),

    /** Fotografías adicionales */
    additionalPhotos: z.array(imageAssetSchema(image)).optional(),
  });

export type ThroughTripCaving = z.infer<
  ReturnType<typeof throughTripCavingSchema>
>;
