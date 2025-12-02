import { defineCollection, z, reference } from "astro:content";

// ============================================================================
// SCHEMAS COMPARTIDOS - NAVARRA
// ============================================================================

// Coordenadas UTM
const utmCoordinatesSchema = z.object({
  zone: z.number(),
  hemisphere: z.enum(["N", "S"]),
  easting: z.number(),
  northing: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number().optional(),
});

// Duración
const durationSchema = z.object({
  hours: z.number(),
  minutes: z.number(),
});

// Recurso de imagen
const imageAssetSchema = z.object({
  url: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  photographer: z.string().optional(),
  date: z.coerce.date().optional(),
});

// Recurso de topografía
const topographyAssetSchema = z.object({
  url: z.string(),
  title: z.string(),
  author: z.string().optional(),
  year: z.number().optional(),
  format: z.enum(["pdf", "svg", "png", "jpg"]),
  license: z.string().optional(),
});

// Información de acceso
const accessInfoSchema = z.object({
  description: z.string(),
  parking: utmCoordinatesSchema.optional(),
  difficulty: z.string().optional(),
  time: durationSchema.optional(),
  distance: z.number().optional(),
  restrictions: z.string().optional(),
  "4x4Required": z.boolean().optional(),
});

// Restricciones
const restrictionsSchema = z.object({
  hasRestrictions: z.boolean(),
  protectionStatus: z
    .array(
      z.enum([
        "LIC",
        "ZEPA",
        "Parque Natural",
        "Reserva Natural",
        "Monumento Natural",
        "Zona Protegida Fauna",
        "Propiedad Privada",
        "Otros",
      ]),
    )
    .optional(),
  closureSeasons: z
    .array(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
        reason: z.string(),
        isAnnual: z.boolean(),
      }),
    )
    .optional(),
  requiresPermit: z.boolean().optional(),
  permitInfo: z.string().optional(),
  prohibitions: z.array(z.string()).optional(),
  additionalInfo: z.string().optional(),
});

// ============================================================================
// COLECCIÓN: CUEVAS (ESPELEOLOGÍA)
// ============================================================================

const caves = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    coordinates: utmCoordinatesSchema,
    location: z.string(),
    catalogCode: z.string().optional(),
    subterraUrl: z.string().url().optional(),
    length: z.number().optional(),
    depth: z.number().optional(),
    description: z.string(),
    entrancePhoto: imageAssetSchema.optional(),
    additionalPhotos: z.array(imageAssetSchema).optional(),
    topographies: z.array(topographyAssetSchema).optional(),
    access: accessInfoSchema.optional(),
    restrictions: restrictionsSchema.optional(),
    permits: z.string().optional(),
    lastUpdate: z.coerce.date().optional(),
    contributors: z.array(z.string()).optional(),
  }),
});

// ============================================================================
// COLECCIÓN: RÍOS/BARRANCOS (CANYONING)
// ============================================================================

const canyons = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    length: z.number().optional(),
    catchmentArea: z.number().optional(),
    normalFlow: z.number().optional(),
    restrictions: restrictionsSchema.optional(),
  }),
});

// ============================================================================
// COLECCIÓN: MONTAÑAS (SENDERISMO/ALPINISMO)
// ============================================================================

const mountains = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    altitude: z.number(),
    coordinates: utmCoordinatesSchema,
    range: z.string(),
    restrictions: restrictionsSchema.optional(),
    mainPhoto: imageAssetSchema.optional(),
    additionalPhotos: z.array(imageAssetSchema).optional(),
  }),
});

// ============================================================================
// COLECCIÓN: ESCALADA (PAREDES)
// ============================================================================

const climbing = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    coordinates: utmCoordinatesSchema,
    location: z.string(),
    restrictions: restrictionsSchema.optional(),
    access: z.string().optional(),
    orientation: z
      .array(z.enum(["N", "S", "E", "O", "NE", "NO", "SE", "SO"]))
      .optional(),
    mainPhoto: imageAssetSchema.optional(),
    additionalPhotos: z.array(imageAssetSchema).optional(),
  }),
});

// ============================================================================
// COLECCIONES BLOG
// ============================================================================

// Colección de autores
const authors = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      avatar: image(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      social: z
        .object({
          instagram: z.string().url().optional(),
          facebook: z.string().url().optional(),
          twitter: z.string().url().optional(),
        })
        .optional(),
    }),
});

// Colección de posts del blog
const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      heroImage: image(),
      categories: z.array(z.string()),
      draft: z.boolean().default(false),
      author: reference("authors"),
    }),
});

export const collections = {
  // Colecciones blog
  posts,
  authors,
  // Colecciones de Navarra
  caves,
  canyons,
  mountains,
  climbing,
};
