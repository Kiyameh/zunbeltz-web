import { reference, z, type ImageFunction } from "astro:content";
import {
  utmCoordinatesSchema,
  durationSchema,
  imageAssetSchema,
  accessInfoSchema,
} from "../shared";

/**
 * Schema para graduación de barranquismo
 */
const canyoningGradingSchema = z.object({
  /** Graduación vertical (1-7) */
  vertical: z.number().min(1).max(7),
  /** Graduación acuática (1-7) */
  aquatic: z.number().min(1).max(7),
  /** Nivel de compromiso (I-VI) */
  commitment: z.enum(["I", "II", "III", "IV", "V", "VI"]),
});

/**
 * Colección de Descensos de Barranquismo
 * 
 * Representa descensos de barranquismo (canyoningDescents) como activities.
 * Cada descenso referencia a un barranco (location) donde se realiza.
 * 
 * Tipo: content (frontmatter + contenido Markdown)
 * 
 * Location principal: Canyon
 * Jerarquía opcional: NavarraZone
 */
export const canyoningDescentSchema = (image: ImageFunction) =>
  z.object({
      // ========================================================================
      // HeroSection
      // ========================================================================

      /** Nombre de la ruta */
      name: z.string(),

      // ========================================================================
      // LocationsCard
      // ========================================================================

      /** Barranco donde se realiza el descenso (OBLIGATORIO) */
      canyon: reference("canyons"),

      /** Zona de Navarra (opcional, para queries rápidas) */
      navarraZone: reference("navarraZones").optional(),

      // ========================================================================
      // PropertiesSection
      // ========================================================================

      /** Rápel más alto en metros */
      highestRappel: z.number().optional(),

      /** Número total de rápeles */
      numberOfRappels: z.number().optional(),

      /** Desnivel total en metros */
      verticalDrop: z.number().optional(),

      /** Longitud del descenso en metros */
      length: z.number().optional(),

      /** Tiempo de descenso */
      descentTime: durationSchema.optional(),

      /** Meses recomendados para el descenso (1-12) */
      recommendedMonths: z.array(z.number().min(1).max(12)).optional(),

      // ========================================================================
      // GradingCard
      // ========================================================================
      
      /** Graduación del descenso */
      grading: canyoningGradingSchema.optional(),

      // ========================================================================
      // LogisticsCard
      // ========================================================================

      /** Punto de entrada al barranco */
      entryPoint: utmCoordinatesSchema.optional(),

      /** Punto de salida del barranco */
      exitPoint: utmCoordinatesSchema.optional(),

      /** Acceso */
      accessInfo: accessInfoSchema.optional(),
       
      /** Retorno */
      returnInfo: accessInfoSchema.optional(),

      // ========================================================================
      // MultimediaSection
      // ========================================================================

      /** Fotografía principal */
      mainPhoto: imageAssetSchema(image).optional(),

      /** Fotografías adicionales */
      additionalPhotos: z.array(imageAssetSchema(image)).optional(),
    })

export type CanyoningDescent = z.infer<ReturnType<typeof canyoningDescentSchema>>
