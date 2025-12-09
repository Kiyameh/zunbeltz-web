import { defineCollection, reference, z } from "astro:content";

/**
 * Colección de Áreas Kársticas
 *
 * Agrupa cuevas y sistemas de cuevas que forman parte de una misma área kárstica.
 * Ejemplos: Macizo de Larra, Sierra de Aralar, Sierra de Urbasa, etc.
 *
 * Tipo: data (JSON/YAML sin contenido Markdown)
 *
 * Jerarquía:
 * NavarraZone → KarstArea → CaveSystem/Cave
 */
export const karstAreaSchema = z.object({
  /** Nombre del área kárstica */
  name: z.string(),

  /** Zona de Navarra a la que pertenece */
  navarraZone: reference("navarraZones"),

  /** Descripción breve del área kárstica (opcional) */
  description: z.string().optional(),
});

export type KarstArea = z.infer<typeof karstAreaSchema>;
