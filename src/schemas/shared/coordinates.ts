import { z } from "astro:content";

/**
 * Schema para coordenadas UTM
 * Usado en todas las colecciones de Navarra
 */
export const utmCoordinatesSchema = z.object({
  zone: z.number().default(30),
  hemisphere: z.enum(["N", "S"]).default("N"),
  easting: z.number(),
  northing: z.number(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  altitude: z.number().optional(),
});


 export type UtmCoordinates = z.infer<typeof utmCoordinatesSchema>