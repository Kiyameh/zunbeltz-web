import { getCollection } from "astro:content";

/**
 * Cuenta el número total de cuevas en la colección
 * @returns Número de cuevas documentadas
 */
export async function getCavesCount(): Promise<number> {
  const caves = await getCollection("caves");
  return caves.length;
}

/**
 * Cuenta el número total de ríos/barrancos en la colección
 * @returns Número de barrancos catalogados
 */
export async function getCanyonsCount(): Promise<number> {
  const canyons = await getCollection("canyons");
  return canyons.length;
}

/**
 * Cuenta el número total de montañas en la colección
 * @returns Número de montañas documentadas
 */
export async function getMountainsCount(): Promise<number> {
  const mountains = await getCollection("mountains");
  return mountains.length;
}

/**
 * Cuenta el número total de escuelas de escalada en la colección
 * @returns Número de escuelas de escalada catalogadas
 */
export async function getClimbingSchoolsCount(): Promise<number> {
  const climbing = await getCollection("climbing");
  return climbing.length;
}

/**
 * Obtiene todas las estadísticas de las colecciones de Navarra
 * @returns Objeto con el conteo de todas las colecciones
 */
export async function getNavarraStats() {
  const [caves, canyons, mountains, climbing] = await Promise.all([
    getCavesCount(),
    getCanyonsCount(),
    getMountainsCount(),
    getClimbingSchoolsCount(),
  ]);

  return {
    caves,
    canyons,
    mountains,
    climbing,
  };
}
