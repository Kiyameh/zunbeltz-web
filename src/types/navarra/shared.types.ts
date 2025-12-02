/**
 * Tipos compartidos para la sección Navarra
 * Estos tipos son utilizados por todas las categorías (cuevas, ríos, montañas, paredes)
 */

// ============================================================================
// COORDENADAS Y UBICACIÓN
// ============================================================================

/**
 * Coordenadas UTM con conversión a WGS84
 * El sistema UTM es el estándar en el territorio, pero también se almacenan
 * las coordenadas geográficas (latitud/longitud) en WGS84 para facilitar
 * la integración con servicios externos, exportación a GPX, y visualización en mapas web.
 */
export interface UTMCoordinates {
  /** Zona UTM (ej: 30 para Navarra) */
  zone: number;
  /** Hemisferio */
  hemisphere: "N" | "S";
  /** Coordenada Este (X) */
  easting: number;
  /** Coordenada Norte (Y) */
  northing: number;
  /** Latitud en WGS84 (grados decimales) */
  latitude: number;
  /** Longitud en WGS84 (grados decimales) */
  longitude: number;
  /** Altitud en metros sobre el nivel del mar (opcional) */
  altitude?: number;
}

// ============================================================================
// TIEMPO Y DURACIÓN
// ============================================================================

/**
 * Duración en horas y minutos
 */
export interface Duration {
  /** Horas */
  hours: number;
  /** Minutos */
  minutes: number;
}

// ============================================================================
// RECURSOS MULTIMEDIA
// ============================================================================

/**
 * Recurso de imagen (fotografía)
 */
export interface ImageAsset {
  /** URL o path de la imagen */
  url: string;
  /** Texto alternativo para accesibilidad */
  alt: string;
  /** Descripción o pie de foto (opcional) */
  caption?: string;
  /** Autor de la fotografía (opcional) */
  photographer?: string;
  /** Fecha de captura (opcional) */
  date?: Date;
}

/**
 * Recurso de topografía o plano
 */
export interface TopographyAsset {
  /** URL o path del archivo */
  url: string;
  /** Título de la topografía */
  title: string;
  /** Autor/topógrafo (opcional) */
  author?: string;
  /** Año de realización (opcional) */
  year?: number;
  /** Formato del archivo */
  format: "pdf" | "svg" | "png" | "jpg";
  /** Licencia o derechos de autor (opcional) */
  license?: string;
}

// ============================================================================
// ACCESO Y RESTRICCIONES
// ============================================================================

/**
 * Información sobre cómo acceder a una localización
 */
export interface AccessInfo {
  /** Descripción textual del acceso */
  description: string;
  /** Coordenadas del aparcamiento/punto de inicio (opcional) */
  parking?: UTMCoordinates;
  /** Dificultad del acceso (opcional) */
  difficulty?: string;
  /** Tiempo desde parking hasta inicio actividad (opcional) */
  time?: Duration;
  /** Distancia en kilómetros desde parking (opcional) */
  distance?: number;
  /** Restricciones, permisos, avisos (opcional) */
  restrictions?: string;
  /** ¿Requiere vehículo 4x4? (opcional) */
  "4x4Required"?: boolean;
}

/**
 * Estados de protección aplicables a una localización
 */
export type ProtectionStatus =
  | "LIC" // Lugar de Importancia Comunitaria
  | "ZEPA" // Zona de Especial Protección para las Aves
  | "Parque Natural"
  | "Reserva Natural"
  | "Monumento Natural"
  | "Zona Protegida Fauna" // Por murciélagos, águilas, etc.
  | "Propiedad Privada"
  | "Otros";

/**
 * Período de cierre temporal
 */
export interface ClosurePeriod {
  /** Fecha de inicio (formato: "MM-DD", ej: "11-01" para 1 de noviembre) */
  startDate: string;
  /** Fecha de fin (formato: "MM-DD", ej: "03-31" para 31 de marzo) */
  endDate: string;
  /** Motivo del cierre (ej: "Protección de murciélagos", "Temporada de caza") */
  reason: string;
  /** ¿Se repite anualmente? */
  isAnnual: boolean;
}

/**
 * Restricciones y protecciones en una localización
 */
export interface Restrictions {
  /** ¿Existen restricciones activas? */
  hasRestrictions: boolean;
  /** Estado(s) de protección aplicables (opcional) */
  protectionStatus?: ProtectionStatus[];
  /** Períodos de cierre temporal (opcional) */
  closureSeasons?: ClosurePeriod[];
  /** ¿Requiere permiso especial? (default: false) */
  requiresPermit?: boolean;
  /** Información sobre cómo obtener el permiso (opcional) */
  permitInfo?: string;
  /** Lista de actividades prohibidas (opcional) */
  prohibitions?: string[];
  /** Información adicional sobre restricciones (opcional) */
  additionalInfo?: string;
}

// ============================================================================
// ORIENTACIÓN
// ============================================================================

/**
 * Orientaciones cardinales
 */
export enum Orientation {
  Norte = "N",
  Sur = "S",
  Este = "E",
  Oeste = "O",
  Noreste = "NE",
  Noroeste = "NO",
  Sureste = "SE",
  Suroeste = "SO",
}
