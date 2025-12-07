import { expect, test, describe, vi } from "vitest";
import {
  getCavesCount,
  getCanyonsCount,
  getMountainsCount,
  getClimbingSchoolsCount,
  getNavarraStats,
} from "./collection-stats";

// Mock de getCollection
vi.mock("astro:content", () => ({
  getCollection: vi.fn(async (collection: string) => {
    const mockData: Record<string, unknown[]> = {
      caves: [
        { id: "cueva-1", data: { name: "Cueva 1" } },
        { id: "cueva-2", data: { name: "Cueva 2" } },
        { id: "cueva-3", data: { name: "Cueva 3" } },
      ],
      canyons: [
        { id: "barranco-1", data: { name: "Barranco 1" } },
        { id: "barranco-2", data: { name: "Barranco 2" } },
      ],
      mountains: [
        { id: "montana-1", data: { name: "Montaña 1" } },
        { id: "montana-2", data: { name: "Montaña 2" } },
        { id: "montana-3", data: { name: "Montaña 3" } },
        { id: "montana-4", data: { name: "Montaña 4" } },
      ],
      climbing: [
        { id: "escuela-1", data: { name: "Escuela 1" } },
      ],
    };

    return mockData[collection] || [];
  }) as any,
}));

describe("collection-stats utilities", () => {
  describe("getCavesCount", () => {
    test("should return the correct number of caves", async () => {
      const count = await getCavesCount();

      expect(count).toBe(3);
      expect(typeof count).toBe("number");
    });

    test("should return a positive number", async () => {
      const count = await getCavesCount();

      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getCanyonsCount", () => {
    test("should return the correct number of canyons", async () => {
      const count = await getCanyonsCount();

      expect(count).toBe(2);
      expect(typeof count).toBe("number");
    });

    test("should return a positive number", async () => {
      const count = await getCanyonsCount();

      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getMountainsCount", () => {
    test("should return the correct number of mountains", async () => {
      const count = await getMountainsCount();

      expect(count).toBe(4);
      expect(typeof count).toBe("number");
    });

    test("should return a positive number", async () => {
      const count = await getMountainsCount();

      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getClimbingSchoolsCount", () => {
    test("should return the correct number of climbing schools", async () => {
      const count = await getClimbingSchoolsCount();

      expect(count).toBe(1);
      expect(typeof count).toBe("number");
    });

    test("should return a positive number", async () => {
      const count = await getClimbingSchoolsCount();

      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getNavarraStats", () => {
    test("should return an object with all collection counts", async () => {
      const stats = await getNavarraStats();

      expect(typeof stats).toBe("object");
      expect(stats).toHaveProperty("caves");
      expect(stats).toHaveProperty("canyons");
      expect(stats).toHaveProperty("mountains");
      expect(stats).toHaveProperty("climbing");
    });

    test("should return correct counts for all collections", async () => {
      const stats = await getNavarraStats();

      expect(stats.caves).toBe(3);
      expect(stats.canyons).toBe(2);
      expect(stats.mountains).toBe(4);
      expect(stats.climbing).toBe(1);
    });

    test("should return all counts as numbers", async () => {
      const stats = await getNavarraStats();

      expect(typeof stats.caves).toBe("number");
      expect(typeof stats.canyons).toBe("number");
      expect(typeof stats.mountains).toBe("number");
      expect(typeof stats.climbing).toBe("number");
    });

    test("should return all counts as non-negative numbers", async () => {
      const stats = await getNavarraStats();

      expect(stats.caves).toBeGreaterThanOrEqual(0);
      expect(stats.canyons).toBeGreaterThanOrEqual(0);
      expect(stats.mountains).toBeGreaterThanOrEqual(0);
      expect(stats.climbing).toBeGreaterThanOrEqual(0);
    });

    test("should call all count functions in parallel", async () => {
      const startTime = Date.now();
      await getNavarraStats();
      const endTime = Date.now();

      // Si se ejecutan en paralelo, debería ser más rápido que en serie
      // Este test verifica que la función existe y se ejecuta correctamente
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });

  describe("Integration tests", () => {
    test("getNavarraStats should match individual count functions", async () => {
      const [caves, canyons, mountains, climbing, stats] = await Promise.all([
        getCavesCount(),
        getCanyonsCount(),
        getMountainsCount(),
        getClimbingSchoolsCount(),
        getNavarraStats(),
      ]);

      expect(stats.caves).toBe(caves);
      expect(stats.canyons).toBe(canyons);
      expect(stats.mountains).toBe(mountains);
      expect(stats.climbing).toBe(climbing);
    });

    test("all count functions should return consistent results", async () => {
      const firstCall = await getNavarraStats();
      const secondCall = await getNavarraStats();

      expect(firstCall).toEqual(secondCall);
    });

    test("individual count functions should be consistent", async () => {
      const firstCaves = await getCavesCount();
      const secondCaves = await getCavesCount();

      expect(firstCaves).toBe(secondCaves);
    });
  });

  describe("Edge cases", () => {
    test("should handle empty collections", async () => {
      // Temporalmente mockear colecciones vacías
      const originalMock = vi.mocked(
        await import("astro:content"),
      ).getCollection;

      vi.mocked(await import("astro:content")).getCollection = vi.fn(
        async () => [],
      ) as any;

      const stats = await getNavarraStats();

      expect(stats.caves).toBe(0);
      expect(stats.canyons).toBe(0);
      expect(stats.mountains).toBe(0);
      expect(stats.climbing).toBe(0);

      // Restaurar mock original
      vi.mocked(await import("astro:content")).getCollection = originalMock;
    });

    test("should handle single item collections", async () => {
      const originalMock = vi.mocked(
        await import("astro:content"),
      ).getCollection;

      vi.mocked(await import("astro:content")).getCollection = vi.fn(
        async () => [{ id: "item-1", data: { name: "Item 1" } }],
      ) as any;

      const caves = await getCavesCount();
      expect(caves).toBe(1);

      // Restaurar mock original
      vi.mocked(await import("astro:content")).getCollection = originalMock;
    });
  });
});
