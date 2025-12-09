import { reference, z } from "astro:content";

/**
 * Colección de Macizos Montañosos
 * 
 * Agrupa varias montañas que forman parte de un mismo macizo o cordillera.
 * Ejemplos: Pirineos, Sierra de Aralar, Sierra de Urbasa, etc.
 * 
 * Tipo: data (JSON/YAML sin contenido Markdown)
 * 
 * Jerarquía:
 * NavarraZone → Massif → Mountain
 */

export const massifSchema = z.object({
    /** Nombre del macizo */
    name: z.string(),

    /** Zona de Navarra a la que pertenece */
    navarraZone: reference("navarraZones"),

    /** Descripción breve del macizo (opcional) */
    description: z.string().optional(),
  })

export type Massif = z.infer<typeof massifSchema>