import { reference, z, type ImageFunction } from "astro:content";
import { imageAssetSchema, boulderGradeSchema } from "../shared";

/**
 * Colección de Problemas de Boulder
 *
 * Representa problemas de boulder (boulderProblems) como activities.
 * Cada problema referencia a un sector (location) donde se encuentra.
 *
 * Tipo: content (frontmatter + contenido Markdown)
 *
 * Location principal: ClimbingSector
 * Jerarquía opcional: ClimbingCrag, NavarraZone
 */
export const boulderProblemSchema = (image: ImageFunction) =>
  z.object({
    // ========================================================================
    // HeroSection
    // ========================================================================

    /** Nombre del problema */
    name: z.string(),

    /** Descripción */
    description: z.string().optional(),

    // ========================================================================
    // LocationsCard
    // ========================================================================

    /** Sector donde se encuentra el problema (OBLIGATORIO) */
    climbingSector: reference("climbingSectors"),

    /** Escuela de escalada (opcional, para queries rápidas) */
    climbingCrag: reference("climbingCrags").optional(),

    /** Zona de Navarra (opcional, para queries rápidas) */
    navarraZone: reference("navarraZones").optional(),

    // ========================================================================
    // GradingCard
    // ========================================================================

    /** Dificultad del problema */
    grading: boulderGradeSchema,

    // ========================================================================
    // MultimediaSection
    // ========================================================================

    /** Fotografía principal */
    mainPhoto: imageAssetSchema(image).optional(),

    /** Fotografías adicionales */
    additionalPhotos: z.array(imageAssetSchema(image)).optional(),
  });

export type BoulderProblem = z.infer<ReturnType<typeof boulderProblemSchema>>;
