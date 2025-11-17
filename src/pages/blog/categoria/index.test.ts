import { expect, test, describe } from "vitest";

/**
 * Tests para la lógica de la página de índice de categorías
 * Estos tests validan la función de cálculo de tamaños de tags
 */

// Función extraída de la página para poder testearla
function getCategorySize(
  count: number,
  minCount: number,
  maxCount: number,
): number {
  if (maxCount === minCount) return 3; // Todas del mismo tamaño si tienen el mismo count

  const range = maxCount - minCount;
  const normalized = (count - minCount) / range;

  // Distribuir en 5 niveles
  if (normalized >= 0.8) return 5;
  if (normalized >= 0.6) return 4;
  if (normalized >= 0.4) return 3;
  if (normalized >= 0.2) return 2;
  return 1;
}

describe("Category Index Page - Tag Size Calculation", () => {
  describe("getCategorySize", () => {
    test("should return size 3 when all categories have same count", () => {
      const size = getCategorySize(5, 5, 5);
      expect(size).toBe(3);
    });

    test("should return size 5 for maximum count", () => {
      const size = getCategorySize(100, 1, 100);
      expect(size).toBe(5);
    });

    test("should return size 1 for minimum count", () => {
      const size = getCategorySize(1, 1, 100);
      expect(size).toBe(1);
    });

    test("should return size 5 for count at 80% of range", () => {
      // Para rango [1, 100], 80% = 1 + (99 * 0.8) = 80.2
      // Usamos 81 para estar seguro de >= 0.8
      const size = getCategorySize(81, 1, 100);
      expect(size).toBe(5); // >= 0.8
    });

    test("should return size 3 for count at 50% of range", () => {
      // 50 está en el 50% del rango [1, 100]
      const size = getCategorySize(50, 1, 100);
      expect(size).toBe(3); // >= 0.4 y < 0.6
    });

    test("should return size 2 for count at 30% of range", () => {
      // 30 está en el 30% del rango [1, 100]
      const size = getCategorySize(30, 1, 100);
      expect(size).toBe(2); // >= 0.2 y < 0.4
    });

    test("should handle small ranges correctly", () => {
      // Rango pequeño: 1-5
      expect(getCategorySize(5, 1, 5)).toBe(5); // 100% = size 5
      expect(getCategorySize(4, 1, 5)).toBe(4); // 75% = size 4
      expect(getCategorySize(3, 1, 5)).toBe(3); // 50% = size 3
      expect(getCategorySize(2, 1, 5)).toBe(2); // 25% = size 2
      expect(getCategorySize(1, 1, 5)).toBe(1); // 0% = size 1
    });

    test("should distribute sizes evenly across range", () => {
      const min = 1;
      const max = 100;

      // Verificar que cada nivel tiene el rango correcto
      // normalized = (count - min) / (max - min)
      // Para [1, 100]: rango = 99
      // Para >= 0.8: (count - 1) / 99 >= 0.8 -> count >= 80.2 -> count = 81
      // Para >= 0.6: (count - 1) / 99 >= 0.6 -> count >= 60.4 -> count = 61
      // Para >= 0.4: (count - 1) / 99 >= 0.4 -> count >= 40.6 -> count = 41
      // Para >= 0.2: (count - 1) / 99 >= 0.2 -> count >= 20.8 -> count = 21
      expect(getCategorySize(100, min, max)).toBe(5); // 100%
      expect(getCategorySize(81, min, max)).toBe(5); // >= 80%
      expect(getCategorySize(80, min, max)).toBe(4); // < 80%
      expect(getCategorySize(61, min, max)).toBe(4); // >= 60%
      expect(getCategorySize(60, min, max)).toBe(3); // < 60%
      expect(getCategorySize(41, min, max)).toBe(3); // >= 40%
      expect(getCategorySize(40, min, max)).toBe(2); // < 40%
      expect(getCategorySize(21, min, max)).toBe(2); // >= 20%
      expect(getCategorySize(20, min, max)).toBe(1); // < 20%
      expect(getCategorySize(1, min, max)).toBe(1); // 0%
    });

    test("should handle edge cases", () => {
      // Mismo valor min y max
      expect(getCategorySize(10, 10, 10)).toBe(3);

      // Valores muy pequeños
      expect(getCategorySize(1, 1, 2)).toBe(1);
      expect(getCategorySize(2, 1, 2)).toBe(5);

      // Valores muy grandes
      expect(getCategorySize(1000, 1, 1000)).toBe(5);
      expect(getCategorySize(1, 1, 1000)).toBe(1);
    });

    test("should be consistent for repeated calls", () => {
      const count = 50;
      const min = 1;
      const max = 100;

      const size1 = getCategorySize(count, min, max);
      const size2 = getCategorySize(count, min, max);
      const size3 = getCategorySize(count, min, max);

      expect(size1).toBe(size2);
      expect(size2).toBe(size3);
    });
  });

  describe("Tag Size Distribution", () => {
    test("should create visual hierarchy with different counts", () => {
      const categories = [
        { name: "popular", count: 100 },
        { name: "medium", count: 50 },
        { name: "small", count: 10 },
      ];

      const min = Math.min(...categories.map((c) => c.count));
      const max = Math.max(...categories.map((c) => c.count));

      const sizes = categories.map((c) => getCategorySize(c.count, min, max));

      // Verificar que hay jerarquía visual
      expect(sizes[0]).toBeGreaterThan(sizes[1]); // popular > medium
      expect(sizes[1]).toBeGreaterThan(sizes[2]); // medium > small
    });

    test("should handle real-world scenario with multiple categories", () => {
      const categories = [
        { name: "espeleología", count: 15 },
        { name: "montaña", count: 8 },
        { name: "técnicas", count: 12 },
        { name: "equipo", count: 5 },
        { name: "viajes", count: 20 },
      ];

      const min = Math.min(...categories.map((c) => c.count));
      const max = Math.max(...categories.map((c) => c.count));

      const sizes = categories.map((c) => ({
        name: c.name,
        count: c.count,
        size: getCategorySize(c.count, min, max),
      }));

      // Verificar que los tamaños son válidos (1-5)
      sizes.forEach((s) => {
        expect(s.size).toBeGreaterThanOrEqual(1);
        expect(s.size).toBeLessThanOrEqual(5);
      });

      // Verificar que la categoría más popular tiene el tamaño más grande
      const viajes = sizes.find((s) => s.name === "viajes");
      expect(viajes?.size).toBe(5);

      // Verificar que la categoría menos popular tiene el tamaño más pequeño
      const equipo = sizes.find((s) => s.name === "equipo");
      expect(equipo?.size).toBe(1);
    });
  });
});
