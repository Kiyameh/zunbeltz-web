import { z } from "astro:content";

/**
 * Schema para duración de tiempo
 * Usado en rutas, descensos, aproximaciones, etc.
 */
export const durationSchema = z.object({
  days: z.number().default(0),
  hours: z.number().default(0),
  minutes: z.number().default(0),
});

export type Duration = z.infer<typeof durationSchema>;
