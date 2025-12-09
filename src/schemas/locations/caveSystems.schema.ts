import {  reference, z } from "astro:content";

/**
 * Colección de Sistemas de Cuevas
 * 
 * Agrupa varias cuevas conectadas que forman un sistema espeleológico.
 * Ejemplos: Sistema de la Pierre Saint-Martin, Sistema del Mortillano, etc.
 * 
 * Tipo: data (JSON/YAML sin contenido Markdown)
 * 
 * Jerarquía:
 * NavarraZone → KarstArea → CaveSystem → Cave
 * 
 * Nota: Un CaveSystem puede existir sin KarstArea si no está claramente
 * asociado a un área kárstica específica.
 */

export const caveSystemSchema = z.object({
    /** Nombre del sistema de cuevas */
    name: z.string(),

    /** Área kárstica a la que pertenece (opcional) */
    karstArea: reference("karstAreas").optional(),

    /** Zona de Navarra a la que pertenece */
    navarraZone: reference("navarraZones"),

    /** Descripción breve del sistema (opcional) */
    description: z.string().optional(),

    /** Desarrollo total del sistema en metros (opcional) */
    totalLength: z.number().optional(),

    /** Desnivel total del sistema en metros (opcional) */
    totalDepth: z.number().optional(),
  })

export type CaveSystem = z.infer<typeof caveSystemSchema>