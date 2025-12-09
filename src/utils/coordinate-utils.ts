import type { UtmCoordinates } from '@/schemas/shared';
import proj4 from 'proj4';

// --- Definiciones de Proyecciones ---

// UTM Zone 30N ETRS89 (EPSG:25830)
const UTM_30N_ETRS89 = "+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs";

// Lat/Long ETRS89 (EPSG:4258)
const LAT_LONG_ETRS89 = "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs +type=crs";

// Registramos las definiciones en proj4
proj4.defs("EPSG:25830", UTM_30N_ETRS89);
proj4.defs("EPSG:4258", LAT_LONG_ETRS89);

// --- Interfaces para Tipado Seguro ---

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

// --- Funciones de Transformación ---

/**
 * Convierte coordenadas UTM 30N (ETRS89) a Latitud/Longitud (ETRS89).
 */
export const utmToLatLong = (utm: UtmCoordinates): GeoPoint => {
  try {
    // proj4 acepta [x, y] y devuelve [longitud, latitud]
    const result = proj4("EPSG:25830", "EPSG:4258", [utm.easting, utm.northing]);

    return {
      longitude: result[0], // X geográfico
      latitude: result[1]   // Y geográfico
    };
  } catch (error) {
    console.error("Error convirtiendo UTM a LatLong:", error);
    throw new Error("Fallo en la conversión de coordenadas UTM.");
  }
};

/**
 * Convierte Latitud/Longitud (ETRS89) a UTM 30N (ETRS89).
 */
export const latLongToUtm = (geo: GeoPoint): UtmCoordinates => {
  try {
    // IMPORTANTE: proj4 espera [longitud, latitud] (orden X, Y)
    const result = proj4("EPSG:4258", "EPSG:25830", [geo.longitude, geo.latitude]);

    return {
      hemisphere: "N",
      zone: 30,
      easting: result[0],
      northing: result[1]
    };
  } catch (error) {
    console.error("Error convirtiendo LatLong a UTM:", error);
    throw new Error("Fallo en la conversión de coordenadas Geográficas.");
  }
};