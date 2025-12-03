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
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      alternativeNames: z.array(z.string()).optional(),
      morphology: z.enum(["Cueva", "Sima", "Sumidero", "Manantial", "Mina"]).optional(),
      massif: z.string().optional(),
      coordinates: utmCoordinatesSchema,
      location: z.string(),
      catalogCode: z.string().optional(),
      subterraUrl: z.string().url().optional(),
      length: z.number().optional(),
      depth: z.number().optional(),
      description: z.string(),
      mainPhoto: z
        .object({
          url: image(),
          alt: z.string(),
          caption: z.string().optional(),
          photographer: z.string().optional(),
        })
        .optional(),
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            alt: z.string(),
            caption: z.string().optional(),
            photographer: z.string().optional(),
          }),
        )
        .optional(),
      topographies: z.array(topographyAssetSchema).optional(),
      access: accessInfoSchema.optional(),
      restrictions: restrictionsSchema.optional(),
    }),
});

// ============================================================================
// COLECCIÓN: RÍOS/BARRANCOS (CANYONING)
// ============================================================================

// Graduación de barrancos
const canyoningGradingSchema = z.object({
  vertical: z.number().min(1).max(7),
  aquatic: z.number().min(1).max(7),
  commitment: z.enum(["I", "II", "III", "IV", "V", "VI"]),
});

const canyons = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      // Información básica
      name: z.string(),
      description: z.string(),
      location: z.string(), // Localidad
      river: z.string(), // Río al que pertenece el barranco

      // Características técnicas
      highestRappel: z.number().optional(), // Rápel máximo en metros
      numberOfRappels: z.number().optional(), // Número de rápeles
      verticalDrop: z.number().optional(), // Desnivel en metros
      length: z.number().optional(), // Longitud del descenso en km

      // Tiempos
      approachTime: durationSchema.optional(), // Tiempo de aproximación
      descentTime: durationSchema.optional(), // Tiempo de descenso
      returnTime: durationSchema.optional(), // Tiempo de retorno

      // Graduación
      grading: canyoningGradingSchema.optional(), // Graduación del barranco

      // Época recomendada (array de meses: 1-12)
      recommendedMonths: z.array(z.number().min(1).max(12)).optional(),

      // Coordenadas
      entryPoint: utmCoordinatesSchema.optional(), // Coordenadas de acceso/entrada
      exitPoint: utmCoordinatesSchema.optional(), // Coordenadas de salida/final

      // Información hidrológica
      catchmentArea: z.number().optional(), // Cuenca de captación en km²
      normalFlow: z.number().optional(), // Caudal normal en m³/s

      // Fotografías (usando helper image() de Astro)
      mainPhoto: z
        .object({
          url: image(),
          alt: z.string(),
          caption: z.string().optional(),
          photographer: z.string().optional(),
        })
        .optional(), // Foto de portada
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            alt: z.string(),
            caption: z.string().optional(),
            photographer: z.string().optional(),
          }),
        )
        .optional(), // Fotos adicionales

      // Restricciones
      restrictions: restrictionsSchema.optional(),
    }),
});

// ============================================================================
// COLECCIÓN: MONTAÑAS (SENDERISMO/ALPINISMO)
// ============================================================================

const mountains = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      altitude: z.number(),
      coordinates: utmCoordinatesSchema,
      location: z.string(),
      massif: z.string().optional(),
      restrictions: restrictionsSchema.optional(),
      mainPhoto: z
        .object({
          url: image(),
          alt: z.string(),
          caption: z.string().optional(),
          photographer: z.string().optional(),
        })
        .optional(),
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            alt: z.string(),
            caption: z.string().optional(),
            photographer: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

// ============================================================================
// COLECCIÓN: ESCALADA (PAREDES)
// ============================================================================

const climbing = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      coordinates: utmCoordinatesSchema,
      location: z.string(),
      restrictions: restrictionsSchema.optional(),
      orientation: z
        .array(z.enum(["N", "S", "E", "O", "NE", "NO", "SE", "SO"]))
        .optional(),
      mainPhoto: z
        .object({
          url: image(),
          alt: z.string(),
          caption: z.string().optional(),
          photographer: z.string().optional(),
        })
        .optional(),
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            alt: z.string(),
            caption: z.string().optional(),
            photographer: z.string().optional(),
          }),
        )
        .optional(),
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
