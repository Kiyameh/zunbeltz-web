import { z } from "astro:content";

/**
 * Schema para períodos de cierre temporal
 */
const closurePeriodSchema = z.object({
  startMonth: z.number().min(1).max(12),
  endMonth: z.number().min(1).max(12),
  reason: z.string(),
});

/**
 * Schema para restricciones y protecciones
 * Usado en todas las colecciones de Navarra
 */
export const restrictionsSchema = z.object({
  hasRestrictions: z.boolean().default(false),
  isPermanentlyClosed: z.boolean().default(false),
  permanentClosureReason: z.string().optional(),
  protectionStatus: z
    .array(
      z.enum([
        "Parque Natural",
        "Reserva Natural",
        "LIC",
        "ZEPA",
        "Monumento Natural",
        "Zona de Especial Conservación",
      ]),
    )
    .optional(),
  closureSeasons: z.array(closurePeriodSchema).optional(),
  requiresPermit: z.boolean().default(false),
  permitInfo: z.string().optional(),
  prohibitions: z.array(z.string()).optional(),
  additionalInfo: z.string().optional(),
});

export type Restrictions = z.infer<typeof restrictionsSchema>