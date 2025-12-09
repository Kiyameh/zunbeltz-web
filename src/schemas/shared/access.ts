import { z } from "astro:content";
import { utmCoordinatesSchema } from "./coordinates";
import { durationSchema } from "./duration";

/**
 * Schema para información de acceso o retorno
 * Describe cómo llegar al punto de inicio de la actividad
 */
export const accessInfoSchema = z.object({
  description: z.string(),
  parking: utmCoordinatesSchema.optional(),
  time: durationSchema.optional(),
  distance: z.number().optional(),
});

export type AccessInfo = z.infer<typeof accessInfoSchema>;
