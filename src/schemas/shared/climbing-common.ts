import { z } from "astro:content";

/**
 * Schema para graduación de escalada
 * Sistema francés con letra y modificador opcional
 */
export const climbingGradeSchema = z.object({
  number: z.number().min(1).max(9),
  letter: z.enum(["a", "b", "c"]),
  modifier: z.enum(["+", "-", ""]).optional(),
});

export type ClimbigGrade = z.infer<typeof climbingGradeSchema>;
/**
 * Schema para graduación de boulder
 * Sistema francés con letra y modificador opcional
 */
export const boulderGradeSchema = z.object({
  number: z.number().min(1).max(9),
  letter: z.enum(["A", "B", "C"]),
  modifier: z.enum(["+", "-", ""]).optional(),
});

export type BoulderingGrade = z.infer<typeof boulderGradeSchema>;

/**
 * Schema para anclaje de escalada
 */
export const climbAnchorSchema = z.object({
  type: z.enum([
    "Spit",
    "Parabolt",
    "Químico",
    "Arbol",
    "Puente roca",
    "Natural",
    "Flotante",
  ]),
  hasRing: z.boolean().default(false),
});

export type ClimbingAnchor = z.infer<typeof climbAnchorSchema>;

/**
 * Schema para anclaje de reunión
 */
export const belaySchema = z.object({
  anchors: z.array(climbAnchorSchema),
  hasChain: z.boolean().default(false),
  notes: z.string().optional(),
});

export type Belay = z.infer<typeof belaySchema>;

/**
 * Schema para largo de escalada
 * Describe un tramo de escalada dentro de una vía
 */
export const climbingPitchSchema = z.object({
  number: z.number(),
  length: z.number(),
  description: z.string().optional(),
  difficulty: climbingGradeSchema,
  anchorCount: z.number().optional(),
  anchors: z.array(climbAnchorSchema).optional(),
  belay: belaySchema.optional(),
});

export type ClimbingPitch = z.infer<typeof climbingPitchSchema>;
