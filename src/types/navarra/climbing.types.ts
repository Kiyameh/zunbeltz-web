/**
 * Tipos para la categoría Paredes (Escalada)
 * Sección Navarra - Zunbeltz.org
 */

import type {
  UTMCoordinates,
  ImageAsset,
  Restrictions,
  Orientation,
} from "./shared.types";

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Estilos de escalada
 */
export enum ClimbingStyle {
  Deportiva = "Deportiva",
  Clasica = "Clásica",
  Mixta = "Mixta",
  Artificial = "Artificial",
  Boulder = "Boulder",
}

/**
 * Tipos de protección
 */
export enum ProtectionType {
  Equipada = "Equipada",
  Parcialmente = "Parcialmente Equipada",
  Desequipada = "Desquipada",
}

/**
 * Letras de graduación (a, b, c)
 */
export enum GradeLetter {
  A = "a",
  B = "b",
  C = "c",
}

/**
 * Modificadores de graduación (+, -)
 */
export enum GradeModifier {
  Plus = "+",
  Minus = "-",
}

/**
 * Tipos de anclajes en escalada
 */
export enum ClimbingAnchorType {
  Parabolt = "Pb",
  Quimico = "Qm",
  Spit = "Sp",
  Natural = "Na",
}

/**
 * Tipos de reunión
 */
export enum BelayType {
  Equipada = "Equipada",
  Semiequipada = "Semi-equipada",
  Natural = "Natural",
}

// ============================================================================
// GRADUACIÓN
// ============================================================================

/**
 * Sistema de graduación de dificultad en escalada
 * Ejemplos: 4c+, 6b, 9a-, 7a
 */
export interface ClimbingGrade {
  /** Número del 1 al 9 */
  number: number;
  /** Letra: a, b, o c */
  letter: GradeLetter;
  /** Modificador: +, -, o ninguno (opcional) */
  modifier?: GradeModifier;
}

/**
 * Helper para representación de graduación
 * @param grade - Graduación de escalada
 * @returns String formateado (ej: "6b+")
 */
export function formatClimbingGrade(grade: ClimbingGrade): string {
  return `${grade.number}${grade.letter}${grade.modifier || ""}`;
}

// ============================================================================
// ANCLAJES Y REUNIONES
// ============================================================================

/**
 * Anclaje en una vía de escalada
 */
export interface ClimbingAnchor {
  /** Identificador único */
  id: string;
  /** Tipo de anclaje */
  type: ClimbingAnchorType;
  /** Posición aproximada en el largo (metros desde inicio) (opcional) */
  position?: number;
  /** Notas adicionales (opcional) */
  notes?: string;
}

/**
 * Reunión al final de un largo
 */
export interface Belay {
  /** Identificador único */
  id: string;
  /** Anclajes de la reunión (mínimo 2) */
  anchors: ClimbingAnchor[];
  /** Tipo de reunión */
  type: BelayType;
  /** Notas sobre la reunión (opcional) */
  notes?: string;
}

// ============================================================================
// LARGOS Y VÍAS
// ============================================================================

/**
 * Largo de escalada (tramo de una vía)
 */
export interface ClimbingPitch {
  /** Identificador único */
  id: string;
  /** Número de largo (1, 2, 3...) */
  number: number;
  /** Longitud en metros */
  length: number;
  /** Descripción del largo */
  description: string;
  /** Dificultad del largo */
  difficulty: ClimbingGrade;
  /** Anclajes a lo largo del tramo (opcional) */
  anchors?: ClimbingAnchor[];
  /** Reunión al final del largo */
  belay: Belay;
  /** Inclinación en grados (opcional, para alpinismo) */
  inclination?: number;
}

/**
 * Vía de escalada individual
 * NOTA: Las vías pueden estar en sectores/escuelas O en montañas como parte de rutas técnicas
 */
export interface ClimbingRoute {
  /** Identificador único */
  id: string;
  /** Nombre de la vía */
  name: string;
  /** Descripción de la vía */
  description: string;
  /** Altura total de la vía en metros (opcional) */
  heightMeters?: number;
  /** Dificultad de la vía (grado máximo) */
  difficulty: ClimbingGrade;
  /** Largos de escalada */
  pitches: ClimbingPitch[];
  /** Estilo de escalada */
  style: ClimbingStyle;
  /** Tipo de protección */
  protection: ProtectionType;
  /** Información de primera ascensión (opcional) */
  firstAscent?: string;
  /** Material necesario (opcional) */
  requiredGear?: string;
}

// ============================================================================
// SECTORES Y ESCUELAS
// ============================================================================

/**
 * Sector de escalada dentro de una escuela
 */
export interface ClimbingSector {
  /** Identificador único */
  id: string;
  /** Nombre del sector */
  name: string;
  /** Descripción del sector (opcional) */
  description?: string;
  /** Vías de escalada */
  routes: ClimbingRoute[];
  /** Orientación del sector (opcional) */
  orientation?: Orientation;
  /** Altura aproximada en metros (opcional) */
  height?: number;
  /** Fotografía del sector (opcional) */
  photo?: ImageAsset;
  /** Croquis/topo del sector (opcional) */
  topoImage?: ImageAsset;
}

/**
 * Escuela de escalada (zona que agrupa varios sectores)
 */
export interface ClimbingSchool {
  /** Identificador único */
  id: string;
  /** Nombre de la escuela */
  name: string;
  /** Descripción general */
  description: string;
  /** Coordenadas del acceso principal */
  coordinates: UTMCoordinates;
  /** Localidad o municipio */
  location: string;
  /** Restricciones y protecciones (opcional) */
  restrictions?: Restrictions;
  /** Sectores de escalada */
  sectors: ClimbingSector[];
  /** Descripción del acceso (opcional) */
  access?: string;
  /** Orientaciones de los sectores (opcional) */
  orientation?: Orientation[];
  /** Fotografía principal (opcional) */
  mainPhoto?: ImageAsset;
  /** Fotografías adicionales (opcional) */
  additionalPhotos?: ImageAsset[];
}
