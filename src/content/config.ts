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
  hasRestrictions: z.boolean().default(false),
  isPermanentlyClosed: z.boolean().default(false),
  permanentClosureReason: z.string().optional(),
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
        "ZEC",
        "Otros",
      ]),
    )
    .optional(),
  closureSeasons: z
    .array(
      z.object({
        startDate: z.string().regex(/^\d{2}-\d{2}$/, "Formato debe ser MM-DD"),
        endDate: z.string().regex(/^\d{2}-\d{2}$/, "Formato debe ser MM-DD"),
        reason: z.string(),
        isAnnual: z.boolean(),
      }),
    )
    .optional(),
  requiresPermit: z.boolean().default(false),
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
      morphology: z
        .enum(["Cueva", "Sima", "Sumidero", "Manantial", "Mina"])
        .optional(),
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
          caption: z.string(),
          photographer: z.string().optional(),
        })
        .optional(),
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            caption: z.string(),
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
          caption: z.string(),
          photographer: z.string().optional(),
        })
        .optional(), // Foto de portada
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            caption: z.string(),
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

// Dificultad de senderismo
const hikingDifficultySchema = z.enum([
  "Fácil",
  "Moderada",
  "Difícil",
  "Muy Difícil",
]);

// Graduación de escalada
const climbingGradeSchema = z.object({
  number: z.number().min(1).max(9),
  letter: z.enum(["a", "b", "c"]),
  modifier: z.enum(["+", "-"]).optional(),
});

// Anclaje de escalada
const climbingAnchorSchema = z.object({
  type: z.enum(["Pb", "Qm", "Sp", "Na"]),
  position: z.number().optional(),
  notes: z.string().optional(),
});

// Reunión (belay)
const belaySchema = z.object({
  anchors: z.array(climbingAnchorSchema).min(2),
  type: z.enum(["Equipada", "Semi-equipada", "Natural"]),
  notes: z.string().optional(),
});

// Largo de escalada
const climbingPitchSchema = z.object({
  number: z.number(),
  length: z.number(),
  description: z.string(),
  difficulty: climbingGradeSchema,
  anchors: z.array(climbingAnchorSchema).optional(),
  belay: belaySchema.optional(),
});

// Schema básico de ruta senderista (para referencias)
const hikingRouteRefSchema = z.object({
  name: z.string(),
  description: z.string(),
  startPoint: utmCoordinatesSchema,
  endPoint: utmCoordinatesSchema,
  duration: durationSchema,
  length: z.number(),
  elevationGain: z.number(),
  elevationLoss: z.number().optional(),
  difficulty: hikingDifficultySchema,
  circularRoute: z.boolean().default(false),
  seasonRecommendation: z.string().optional(),
  warnings: z.string().optional(),
});

// Schema básico de ruta técnica (para referencias)
const technicalRouteRefSchema = z.object({
  name: z.string(),
  description: z.string(),
  startPoint: utmCoordinatesSchema,
  endPoint: utmCoordinatesSchema,
  duration: durationSchema,
  length: z.number(),
  elevationGain: z.number(),
  elevationLoss: z.number().optional(),
  requiredGear: z.array(z.string()),
  difficulty: climbingGradeSchema,
  technicalDescription: z.string(),
  climbingPitches: z.array(climbingPitchSchema).optional(),
  seasonRecommendation: z.string().optional(),
  warnings: z.string().optional(),
});

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
      hikingRoutes: z.array(reference("hikingRoutes")).optional(),
      technicalRoutes: z.array(reference("technicalRoutes")).optional(),
      mainPhoto: z
        .object({
          url: image(),
          caption: z.string(),
          photographer: z.string().optional(),
        })
        .optional(),
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            caption: z.string(),
            photographer: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

// ============================================================================
// COLECCIÓN: ESCALADA (PAREDES)
// ============================================================================

// Vía de escalada
const climbingRouteSchema = z.object({
  name: z.string(),
  description: z.string(),
  heightMeters: z.number().optional(),
  difficulty: climbingGradeSchema,
  pitches: z.array(climbingPitchSchema),
  style: z.enum(["Deportiva", "Clásica", "Mixta", "Artificial", "Boulder"]),
  protection: z.enum(["Equipada", "Parcialmente Equipada", "Desequipada"]),
  firstAscent: z.string().optional(),
  requiredGear: z.string().optional(),
});

// Schema básico de sector (para referencias)
const climbingSectorRefSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  routes: z.array(climbingRouteSchema),
  orientation: z.enum(["N", "S", "E", "O", "NE", "NO", "SE", "SO"]).optional(),
  height: z.number().optional(),
  photo: z
    .object({
      url: z.string(),
      caption: z.string(),
      photographer: z.string().optional(),
    })
    .optional(),
  topoImage: z
    .object({
      url: z.string(),
      caption: z.string(),
      photographer: z.string().optional(),
    })
    .optional(),
});

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
      sectors: z.array(reference("climbingSectors")).optional(),
      mainPhoto: z
        .object({
          url: image(),
          caption: z.string(),
          photographer: z.string().optional(),
        })
        .optional(),
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            caption: z.string(),
            photographer: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

// ============================================================================
// COLECCIÓN: RUTAS SENDERISTAS
// ============================================================================

const hikingRoutes = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      startPoint: utmCoordinatesSchema,
      endPoint: utmCoordinatesSchema,
      duration: durationSchema,
      length: z.number(),
      elevationGain: z.number(),
      elevationLoss: z.number().optional(),
      difficulty: hikingDifficultySchema,
      circularRoute: z.boolean().default(false),
      seasonRecommendation: z.string().optional(),
      warnings: z.string().optional(),
      mainPhoto: z
        .object({
          url: image(),
          caption: z.string(),
          photographer: z.string().optional(),
        })
        .optional(),
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            caption: z.string(),
            photographer: z.string().optional(),
          }),
        )
        .optional(),
      location: z.string().optional(),
      mountainReference: z
        .object({
          name: z.string(),
          slug: z.string(),
        })
        .optional(),
    }),
});

// ============================================================================
// COLECCIÓN: RUTAS TÉCNICAS (LARGOS)
// ============================================================================

const technicalRoutes = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      startPoint: utmCoordinatesSchema,
      endPoint: utmCoordinatesSchema,
      duration: durationSchema,
      length: z.number(),
      elevationGain: z.number(),
      elevationLoss: z.number().optional(),
      requiredGear: z.array(z.string()),
      difficulty: climbingGradeSchema,
      technicalDescription: z.string(),
      climbingPitches: z.array(climbingPitchSchema).optional(),
      seasonRecommendation: z.string().optional(),
      warnings: z.string().optional(),
      mainPhoto: z
        .object({
          url: image(),
          caption: z.string(),
          photographer: z.string().optional(),
        })
        .optional(),
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            caption: z.string(),
            photographer: z.string().optional(),
          }),
        )
        .optional(),
      location: z.string().optional(),
      mountainReference: z
        .object({
          name: z.string(),
          slug: z.string(),
        })
        .optional(),
    }),
});

// ============================================================================
// COLECCIÓN: SECTORES DE ESCALADA
// ============================================================================

const climbingSectors = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string().optional(),
      routes: z.array(climbingRouteSchema),
      orientation: z
        .enum(["N", "S", "E", "O", "NE", "NO", "SE", "SO"])
        .optional(),
      height: z.number().optional(),
      coordinates: utmCoordinatesSchema.optional(),
      location: z.string().optional(),
      mainPhoto: z
        .object({
          url: image(),
          caption: z.string(),
          photographer: z.string().optional(),
        })
        .optional(),
      photo: z
        .object({
          url: image(),
          caption: z.string(),
          photographer: z.string().optional(),
        })
        .optional(),
      topoImage: z
        .object({
          url: image(),
          caption: z.string(),
          photographer: z.string().optional(),
        })
        .optional(),
      additionalPhotos: z
        .array(
          z.object({
            url: image(),
            caption: z.string(),
            photographer: z.string().optional(),
          }),
        )
        .optional(),
      climbingSchoolReference: z
        .object({
          name: z.string(),
          slug: z.string(),
        })
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
  // Colecciones de rutas y sectores
  hikingRoutes,
  technicalRoutes,
  climbingSectors,
};
