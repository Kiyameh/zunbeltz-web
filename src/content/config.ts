import { authorSchema, postSchema } from "@/schemas/blog.schema";
import { navarraZoneSchema, massifSchema, karstAreaSchema, caveSystemSchema } from "@/schemas/locations";
import { mountainSchema, caveSchema, canyonSchema, climbingCragSchema,climbingSectorSchema } from "@/schemas/locations";
import { canyoningDescentSchema, cavingRouteSchema, climbingRouteSchema, boulderProblemSchema, multiPitchRouteSchema } from "@/schemas/activities";
import { throughTripCavingSchema, trekkingSchema, viaFerrataSchema , hikingSchema} from "@/schemas/activities";
import { defineCollection } from "astro:content";



const authors = defineCollection({
  type: "data",
  schema: ({ image }) => authorSchema(image),
});

const posts = defineCollection({
  type: "content",
  schema: ({ image }) => postSchema(image),
});

const navarraZones = defineCollection({
  type: "data",
  schema: navarraZoneSchema
});

const massifs = defineCollection({
  type: "data",
  schema: massifSchema
})

const karstAreas = defineCollection({
   type: "data",
   schema: karstAreaSchema
})

const caveSystems = defineCollection({
  type: "data",
  schema: caveSystemSchema
})

const mountains = defineCollection({
  type: "content",
  schema: ({ image }) => mountainSchema(image)
})

const caves = defineCollection({
  type: "content",
  schema: ({ image }) => caveSchema(image)
})

const canyons = defineCollection({
  type: "content",
  schema: ({ image }) => canyonSchema(image)
})

const climbingCrags = defineCollection({
  type: "content",
  schema: ({ image }) => climbingCragSchema(image)
})

const climbingSectors = defineCollection({
  type: "content",
  schema: ({ image }) => climbingSectorSchema(image)
})

const hikings = defineCollection({
  type: "content",
  schema: ({ image }) => hikingSchema(image)
})

const canyoningDescents = defineCollection({
  type: "content",
  schema: ({ image }) => canyoningDescentSchema(image)
})

const cavingRoutes = defineCollection({
  type: "content",
  schema: ({ image }) => cavingRouteSchema(image)
})

const climbingRoutes = defineCollection({
  type: "content",
  schema: ({ image }) => climbingRouteSchema(image)
})

const boulderProblems = defineCollection({
  type: "content",
  schema: ({ image }) => boulderProblemSchema(image)
})

const multiPitchRoutes = defineCollection({
  type: "content",
  schema: ({ image }) => multiPitchRouteSchema(image)
})

const throughTripCavings = defineCollection({
  type: "content",
  schema: ({ image }) => throughTripCavingSchema(image)
})

const trekkings = defineCollection({
  type: "content",
  schema: ({ image }) => trekkingSchema(image)
})

const viaFerratas = defineCollection({
  type: "content",
  schema: ({ image }) => viaFerrataSchema(image)
})





export const collections = {
  // Blog
  authors,
  posts,

  // Locations - Jerarquía Superior (Sin Markdown)
  navarraZones,
  massifs,
  karstAreas,
  caveSystems,

  // Locations - Con Markdown
  mountains,
  caves,
  canyons,
  climbingCrags,
  climbingSectors,

  // Activities
  hikings,
  canyoningDescents,
  cavingRoutes,
  climbingRoutes,
  boulderProblems,
  multiPitchRoutes,
  throughTripCavings,
  trekkings,
  viaFerratas,
};
