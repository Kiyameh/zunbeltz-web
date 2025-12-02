/**
 * Tipos para la categoría Montañas (Senderismo/Alpinismo)
 * Sección Navarra - Zunbeltz.org
 */

import type { ClimbingGrade, ClimbingPitch } from "./climbing.types";
import type {
  UTMCoordinates,
  Duration,
  ImageAsset,
  Restrictions,
} from "./shared.types";

// Importar tipos de escalada para rutas técnicas

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Dificultad de rutas de senderismo
 */
export enum HikingDifficulty {
  Facil = "Fácil",
  Moderada = "Moderada",
  Dificil = "Difícil",
  MuyDificil = "Muy Difícil",
}

// ============================================================================
// RUTAS DE SENDERISMO
// ============================================================================

/**
 * Ruta de senderismo no técnica
 */
export interface HikingRoute {
  /** Identificador único */
  id: string;
  /** Nombre de la ruta */
  name: string;
  /** Descripción del recorrido */
  description: string;
  /** Coordenadas del punto de inicio */
  startPoint: UTMCoordinates;
  /** Coordenadas del punto final */
  endPoint: UTMCoordinates;
  /** Duración estimada */
  duration: Duration;
  /** Longitud en kilómetros */
  length: number;
  /** Desnivel positivo acumulado en metros */
  elevationGain: number;
  /** Desnivel negativo acumulado en metros (opcional) */
  elevationLoss?: number;
  /** Dificultad de la ruta */
  difficulty: HikingDifficulty;
  /** ¿Es ruta circular? - default: false */
  circularRoute: boolean;
  /** Época recomendada (opcional) */
  seasonRecommendation?: string;
  /** Avisos y precauciones (opcional) */
  warnings?: string;
}

// ============================================================================
// RUTAS TÉCNICAS DE ALPINISMO
// ============================================================================

/**
 * Ruta técnica de alpinismo que requiere técnicas de escalada
 */
export interface TechnicalRoute {
  /** Identificador único */
  id: string;
  /** Nombre de la ruta */
  name: string;
  /** Descripción del recorrido */
  description: string;
  /** Coordenadas del punto de inicio */
  startPoint: UTMCoordinates;
  /** Coordenadas del punto final */
  endPoint: UTMCoordinates;
  /** Duración estimada */
  duration: Duration;
  /** Longitud en kilómetros */
  length: number;
  /** Desnivel positivo en metros */
  elevationGain: number;
  /** Desnivel negativo en metros (opcional) */
  elevationLoss?: number;
  /** Material técnico necesario */
  requiredGear: string[];
  /** Dificultad de escalada */
  difficulty: ClimbingGrade;
  /** Descripción técnica detallada */
  technicalDescription: string;
  /** Largos de escalada (si aplica) (opcional) */
  climbingPitches?: ClimbingPitch[];
  /** Época recomendada (opcional) */
  seasonRecommendation?: string;
  /** Avisos y precauciones (opcional) */
  warnings?: string;
}

// ============================================================================
// MONTAÑAS
// ============================================================================

/**
 * Montaña o cumbre
 */
export interface Mountain {
  /** Identificador único */
  id: string;
  /** Nombre de la montaña */
  name: string;
  /** Descripción general */
  description: string;
  /** Altitud en metros s.n.m. */
  altitude: number;
  /** Coordenadas de la cumbre */
  coordinates: UTMCoordinates;
  /** Macizo o cordillera (ej: "Pirineos", "Sierra de Urbasa") */
  range: string;
  /** Restricciones y protecciones (opcional) */
  restrictions?: Restrictions;
  /** Rutas senderistas (opcional) */
  hikingRoutes?: HikingRoute[];
  /** Rutas técnicas de alpinismo (opcional) */
  technicalRoutes?: TechnicalRoute[];
  /** Fotografía principal (opcional) */
  mainPhoto?: ImageAsset;
  /** Fotografías adicionales (opcional) */
  additionalPhotos?: ImageAsset[];
}
