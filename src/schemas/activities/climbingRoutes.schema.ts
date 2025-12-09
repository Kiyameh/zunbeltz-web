import { reference, z, type ImageFunction } from "astro:content";
import {
  imageAssetSchema,
  climbingGradeSchema,
  belaySchema,
} from "../shared";

/**
 * Colección de Vías de Escalada
 * 
 * Representa vías de escalada deportiva (climbingRoutes) como activities.
 * Cada vía referencia a un sector (location) donde se encuentra.
 * 
 * Tipo: content (frontmatter + contenido Markdown)
 * 
 * Location principal: ClimbingSector
 * Jerarquía opcional: ClimbingCrag, NavarraZone
 */
export const climbingRouteSchema = (image: ImageFunction) =>
  z.object({
    // ========================================================================
    // HeroSection
    // ========================================================================

    /** Nombre de la vía */
    name: z.string(),
    
    /** Descripción */
    description: z.string().optional(),

    // ========================================================================
    // LocationsCard
    // ========================================================================

    /** Sector donde se encuentra la vía (OBLIGATORIO) */
    climbingSector: reference("climbingSectors"),

    /** Escuela de escalada (opcional, para queries rápidas) */
    climbingCrag: reference("climbingCrags").optional(),

    /** Zona de Navarra (opcional, para queries rápidas) */
    navarraZone: reference("navarraZones").optional(),

    // ========================================================================
    // PropertiesSection
    // ========================================================================

    /** Altura de la vía en metros */
    heightMeters: z.number().optional(),
    
    /** Cantidad de anclajes */
    anchorCount: z.number().optional(),
    
    /** Tipo de anclajes */
    anchorType: z.enum(["Parabolt", "Químico"]).optional(),
    
    /** Reunión */
    belay: belaySchema.optional(),

    // ========================================================================
    // GradingCard
    // ========================================================================

    /** Dificultad de la vía (grado máximo) */
    grading: climbingGradeSchema,

    // ========================================================================
    // MultimediaSection
    // ========================================================================

    /** Fotografía principal */
    mainPhoto: imageAssetSchema(image).optional(),

    /** Fotografías adicionales */
    additionalPhotos: z.array(imageAssetSchema(image)).optional(),
  });

export type ClimbingRoute = z.infer<ReturnType<typeof climbingRouteSchema>>
