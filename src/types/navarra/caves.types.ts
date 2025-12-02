/**
 * Tipos para la categoría Cuevas (Espeleología)
 * Sección Navarra - Zunbeltz.org
 */

import type {
  UTMCoordinates,
  Duration,
  ImageAsset,
  TopographyAsset,
  AccessInfo,
  Restrictions,
} from "./shared.types";

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Tipos de obstáculos en cavidades
 */
export enum ObstacleType {
  Pozo = "Pozo",
  Resalte = "Resalte",
  Escalada = "Escalada",
  Pasamanos = "Pasamanos",
  Otros = "Otros",
}

/**
 * Tipos de instalación en cavidades
 */
export enum InstallationType {
  Cabecera = "Cabecera",
  CabeceraRecuperable = "Cabecera Recuperable",
  Fraccionamiento = "Fraccionamiento",
  Desviador = "Desviador",
  PuntoIntermedio = "Punto Intermedio",
  Otros = "Otros",
}

/**
 * Tipos de anclajes en cavidades
 */
export enum AnchorType {
  Spitinox = "Spx",
  Spit = "Sp",
  Parabolt8 = "Pb8",
  Parabolt10 = "Pb10",
  Parabolt12 = "Pb12",
  Quimico = "Qm",
  Natural = "Na",
  Multimonti6 = "Mm6",
  Multimonti10 = "Mm10",
}

// ============================================================================
// ANCLAJES E INSTALACIONES
// ============================================================================

/**
 * Anclaje individual
 */
export interface Anchor {
  /** Identificador único */
  id: string;
  /** Tipo de anclaje */
  type: AnchorType;
  /** Cantidad (para grupos: 2x, 3x) - default: 1 */
  quantity: number;
  /** ¿Tiene cadena? - default: false */
  hasChain: boolean;
  /** Notas adicionales (opcional) */
  notes?: string;
}

/**
 * Punto de instalación en una cuerda
 */
export interface Installation {
  /** Identificador único */
  id: string;
  /** Tipo de instalación */
  type: InstallationType;
  /** Anclajes que componen la instalación */
  anchors: Anchor[];
}

/**
 * Obstáculo vertical en una cavidad
 */
export interface Obstacle {
  /** Identificador único */
  id: string;
  /** Nombre del obstáculo (ej: "P26") */
  name: string;
  /** Tipo de obstáculo */
  type: ObstacleType;
}

// ============================================================================
// CUERDAS Y FICHAS DE INSTALACIÓN
// ============================================================================

/**
 * Cuerda en la instalación
 *
 * NOTA: Relación Cuerdas-Obstáculos (Muchos-a-Muchos)
 * - Una cuerda puede superar uno o más obstáculos (ej: una cuerda de 50m puede superar un P15 y un P20 consecutivos)
 * - Un obstáculo puede requerir una o más cuerdas (ej: un P80 puede requerir dos cuerdas de 50m empatadas)
 *
 * Esta relación se modela mediante el array `obstacles` en cada `Rope`, que contiene los obstáculos
 * que esa cuerda específica supera. Si un obstáculo requiere múltiples cuerdas, aparecerá en el
 * array `obstacles` de cada una de esas cuerdas.
 */
export interface Rope {
  /** Identificador único */
  id: string;
  /** Longitud en metros */
  length: number;
  /** Obstáculos que supera esta cuerda */
  obstacles: Obstacle[];
  /** Instalaciones en esta cuerda */
  installations: Installation[];
}

/**
 * Ficha de instalación de una cavidad
 * Documenta la instalación de cuerdas y anclajes
 */
export interface CaveInstallationSheet {
  /** Identificador único */
  id: string;
  /** Cuerdas utilizadas */
  ropes: Rope[];
}

// ============================================================================
// RECORRIDOS Y CAVIDADES
// ============================================================================

/**
 * Recorrido espeleológico dentro de una cavidad
 */
export interface CaveRoute {
  /** Identificador único */
  id: string;
  /** Nombre del recorrido */
  name: string;
  /** Descripción del recorrido */
  description: string;
  /** Duración estimada */
  duration: Duration;
  /** Riesgos y precauciones (opcional) */
  risks?: string;
  /** Material necesario */
  requiredGear: string[];
  /** Fichas de instalación (opcional) */
  installationSheets?: CaveInstallationSheet[];
}

/**
 * Cavidad natural (cueva, sima, etc.)
 */
export interface Cave {
  /** Identificador único */
  id: string;
  /** Nombre de la cavidad */
  name: string;
  /** Coordenadas UTM de la entrada */
  coordinates: UTMCoordinates;
  /** Localidad o municipio */
  location: string;
  /** Sigla del catálogo (ej: "NA-01") (opcional) */
  catalogCode?: string;
  /** URL a la ficha en Subterra.app (opcional) */
  subterraUrl?: string;
  /** Longitud en metros (opcional) */
  length?: number;
  /** Desarrollo/profundidad en metros (opcional) */
  depth?: number;
  /** Descripción general de la cavidad */
  description: string;
  /** Fotografía de la entrada (opcional) */
  entrancePhoto?: ImageAsset;
  /** Fotografías adicionales (opcional) */
  additionalPhotos?: ImageAsset[];
  /** Topografías de la cavidad (opcional) */
  topographies?: TopographyAsset[];
  /** Recorridos espeleológicos */
  routes: CaveRoute[];
  /** Información de acceso (opcional) */
  access?: AccessInfo;
  /** Restricciones y protecciones (opcional) */
  restrictions?: Restrictions;
  /** Permisos necesarios (opcional) */
  permits?: string;
  /** Última actualización (opcional) */
  lastUpdate?: Date;
  /** Colaboradores/fuentes (opcional) */
  contributors?: string[];
}
