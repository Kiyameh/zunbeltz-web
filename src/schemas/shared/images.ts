import { z, type ImageFunction } from "astro:content";

/**
 * Schema para recursos de imagen
 * Usa el helper image() de Astro para optimización automática
 */
export const imageAssetSchema = (image: ImageFunction) =>
  z.object({
    url: image(),
    caption: z.string(),
    photographer: z.string().optional(),
  });

export type ImageAsset = z.infer<ReturnType<typeof imageAssetSchema>>;

/**
 * Schema para recursos de topografía
 * Planos, mapas, croquis técnicos
 */
export const topographyAssetSchema = z.object({
  url: z.string(),
  title: z.string(),
  author: z.string().optional(),
  year: z.number().optional(),
  format: z.enum(["pdf", "svg", "png", "jpg"]),
  license: z.string().optional(),
});

export type TopographyAsset = z.infer<typeof topographyAssetSchema>;
