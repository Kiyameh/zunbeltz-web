/**
 * Tipos para la categoría Ríos (Barranquismo/Canyoning)
 * Sección Navarra - Zunbeltz.org
 */

import type {
  UTMCoordinates,
  Duration,
  Restrictions,
} from "./shared.types";

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Tipos de obstáculos en barrancos
 * NOTA: Un obstáculo puede tener múltiples tipos. Por ejemplo: [Rapel, Salto, Tobogan]
 * indica que se puede superar de tres formas diferentes.
 */
export enum CanyoningObstacleType {
  Rapel = "Rapel",
  Resalte = "Resalte",
  Escalada = "Escalada",
  Pasamanos = "Pasamanos",
  Salto = "Salto",
  Tobogan = "Tobogan",
}

/**
 * Tipos de instalación en barrancos
 */
export enum CanyoningInstallationType {
  Cabecera = "Cabecera",
  Fraccionamiento = "Fraccionamiento",
  Desviador = "Desviador",
  PuntoIntermedio = "Punto Intermedio",
  Otros = "Otros",
}

/**
 * Tipos de anclajes en barrancos
 */
export enum CanyoningAnchorType {
  Spitinox = "Spx",
  Spit = "Sp",
  Parabolt8 = "Pb8",
  Parabolt10 = "Pb10",
  Parabolt12 = "Pb12",
  Quimico = "Qm",
  Natural = "Na",
}

/**
 * Nivel de compromiso en barrancos (I-VI)
 */
export type CommitmentLevel = "I" | "II" | "III" | "IV" | "V" | "VI";

// ============================================================================
// GRADUACIÓN
// ============================================================================

/**
 * Sistema de graduación de barrancos
 * Ejemplos: v3 a2 IV, v4 a3 III, v4 a5 III
 */
export interface CanyoningGrading {
  /** Dificultad vertical (v1-v7) */
  vertical: number;
  /** Dificultad acuática (a1-a7) */
  aquatic: number;
  /** Compromiso y envergadura (I-VI) */
  commitment: CommitmentLevel;
}

// ============================================================================
// ANCLAJES E INSTALACIONES
// ============================================================================

/**
 * Anclaje en un barranco
 */
export interface CanyoningAnchor {
  /** Identificador único */
  id: string;
  /** Tipo de anclaje */
  type: CanyoningAnchorType;
  /** Cantidad (para grupos: 2x, 3x) - default: 1 */
  quantity: number;
  /** ¿Tiene cadena? - default: false */
  hasChain: boolean;
  /** Notas adicionales (opcional) */
  notes?: string;
}

/**
 * Instalación en un obstáculo de barranco
 */
export interface CanyoningInstallation {
  /** Identificador único */
  id: string;
  /** Tipo de instalación */
  type: CanyoningInstallationType;
  /** Anclajes */
  anchors: CanyoningAnchor[];
}

/**
 * Obstáculo en un barranco
 */
export interface CanyoningObstacle {
  /** Identificador único */
  id: string;
  /** Nombre (ej: "R15", "P26") */
  name: string;
  /** Tipos de obstáculo (puede tener varios) */
  types: CanyoningObstacleType[];
  /** Longitud/altura en metros (opcional) */
  length?: number;
  /** Notas (para saltos/toboganes) (opcional) */
  notes?: string;
  /** Instalaciones (si aplica) (opcional) */
  installations?: CanyoningInstallation[];
}

// ============================================================================
// FICHAS DE INSTALACIÓN
// ============================================================================

/**
 * Ficha de instalación barranquista
 * Documenta los obstáculos y su equipamiento en un barranco
 */
export interface CanyoningInstallationSheet {
  /** Identificador único */
  id: string;
  /** Obstáculos concatenados */
  obstacles: CanyoningObstacle[];
}

// ============================================================================
// RECORRIDOS Y RÍOS
// ============================================================================

/**
 * Recorrido de barranquismo
 */
export interface CanyoningRoute {
  /** Identificador único */
  id: string;
  /** Nombre del recorrido */
  name: string;
  /** Descripción del recorrido */
  description: string;
  /** Coordenadas del punto de entrada */
  entryPoint: UTMCoordinates;
  /** Coordenadas del punto de salida */
  exitPoint: UTMCoordinates;
  /** Duración estimada del descenso */
  duration: Duration;
  /** Tiempo de aproximación desde parking (opcional) */
  approachTime?: Duration;
  /** Tiempo de retorno hasta parking (opcional) */
  returnTime?: Duration;
  /** Longitud de cuerda necesaria en metros (opcional) */
  ropeLength?: number;
  /** Época recomendada (opcional) */
  recommendedSeason?: string;
  /** Rápel más alto en metros (opcional) */
  highestRappel?: number;
  /** Graduación del barranco */
  grading: CanyoningGrading;
  /** Ficha de instalación (opcional) */
  installationSheet?: CanyoningInstallationSheet;
}

/**
 * Río o barranco
 */
export interface River {
  /** Identificador único */
  id: string;
  /** Nombre del río */
  name: string;
  /** Descripción general */
  description: string;
  /** Longitud en km (opcional) */
  length?: number;
  /** Cuenca de captación en km² (opcional) */
  catchmentArea?: number;
  /** Caudal normal en m³/s (opcional) */
  normalFlow?: number;
  /** Restricciones y protecciones (opcional) */
  restrictions?: Restrictions;
  /** Recorridos barranquistas */
  canyoningRoutes: CanyoningRoute[];
}
