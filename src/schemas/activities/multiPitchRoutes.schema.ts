import { reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  durationSchema,
  imageAssetSchema,
  climbingGradeSchema,
  climbingPitchSchema,
  accessInfoSchema,
} from "../shared";

/**
 * Colección de Vías de Varios Largos
 *
 * Representa vías de escalada de varios largos (multiPitchRoutes) como activities.
 * Cada vía puede referenciar a un sector de escalada O a una montaña.
 *
 * Tipo: content (frontmatter + contenido Markdown)
 *
 * Location principal: ClimbingSector OR Mountain
 * Jerarquía opcional: ClimbingCrag/Massif, NavarraZone
 */

export const multiPitchRouteSchema = (image: ImageFunction) =>
  z.object({
    // ========================================================================
    // HeroSection
    // ========================================================================

    /** Nombre de la vía */
    name: z.string(),

    /** Descripción */
    description: z.string(),

    // ========================================================================
    // LocationsCard
    // ========================================================================

    /** Sector donde se encuentra la vía (opcional) */
    climbingSector: reference("climbingSectors").optional(),

    /** Montaña donde se encuentra la vía (opcional) */
    mountain: reference("mountains").optional(),

    /** Escuela de escalada (opcional, si pertenece a sector) */
    climbingCrag: reference("climbingCrags").optional(),

    /** Macizo (opcional, si pertenece a montaña) */
    massif: reference("massifs").optional(),

    /** Zona de Navarra (opcional, para queries rápidas) */
    navarraZone: reference("navarraZones").optional(),

    // ========================================================================
    // PropertiesSection
    // ========================================================================

    /** Largos de escalada */
    pitches: z.array(climbingPitchSchema),

    /** Longitud total en metros */
    length: z.number(),

    /** Desnivel total en metros */
    elevationGain: z.number(),

    /** Estilo de escalada */
    style: z.enum(["Deportiva", "Clásica", "Artificial", "Mixta"]).optional(),

    /** Duración estimada (aproximación + escalada + descenso) */
    duration: durationSchema,

    // ========================================================================
    // GradingCard
    // ========================================================================

    /** Dificultad máxima de la vía */
    grading: climbingGradeSchema,

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

    /** Material necesario */
    requiredGear: z.array(z.string()).optional(),

    // ========================================================================
    // MultimediaSection
    // ========================================================================

    /** Fotografía principal */
    mainPhoto: imageAssetSchema(image).optional(),

    /** Fotografías adicionales */
    additionalPhotos: z.array(imageAssetSchema(image)).optional(),

    /** Croquis de la vía */
    topoImage: imageAssetSchema(image).optional(),
  });

export type MultiPitchRoute = z.infer<ReturnType<typeof multiPitchRouteSchema>>;
