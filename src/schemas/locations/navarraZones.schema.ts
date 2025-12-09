import { z } from "astro:content";

/**
 * Colección de Zonas de Navarra
 *
 * División artificial del territorio navarro en 6 áreas geográficas
 * para organizar y agrupar locations y activities.
 *
 * Tipo: data (JSON/YAML sin contenido Markdown)
 *
 * Esta colección es fija y contiene exactamente 6 zonas:
 * 1. Valles Atlánticos (atlantic_valleys)
 * 2. Pirineo & Irati (pyrenees_irati)
 * 3. Aralar, Urbasa & Andia (aralar_urbasa)
 * 4. Tierra Estella & Lokiz (estella_codes)
 * 5. Prepirineo & Foces (prepyrenees_gorges)
 * 6. Ribera & Bardenas (ribera_bardenas)
 */

export const navarraZoneSchema = z.object({
  /** Nombre de la zona */
  name: z.string(),

  /** Clave única para identificación programática */
  key: z.enum([
    "atlantic_valleys",
    "pyrenees_irati",
    "aralar_urbasa",
    "estella_codes",
    "prepyrenees_gorges",
    "ribera_bardenas",
  ]),

  /** Descripción breve de la zona (características climáticas, geográficas) */
  description: z.string(),

  /** Lista de áreas geográficas que componen esta zona */
  geographicAreas: z.array(z.string()),
});

export type NavarraZone = z.infer<typeof navarraZoneSchema>;
