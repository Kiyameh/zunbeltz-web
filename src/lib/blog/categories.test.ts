import { expect, test, describe, vi } from "vitest";
import {
  getAllCategories,
  getCategoriesWithCount,
  getCategoriesWithCountArray,
} from "./categories";

// Mock de getCollection
vi.mock("astro:content", () => ({
  getCollection: vi.fn(async (collection, filter) => {
    const allPosts = [
      {
        data: {
          categories: ["espeleología", "técnicas"],
          draft: false,
        },
      },
      {
        data: {
          categories: ["montaña", "espeleología"],
          draft: false,
        },
      },
      {
        data: {
          categories: ["técnicas"],
          draft: false,
        },
      },
      {
        data: {
          categories: ["draft-category"],
          draft: true,
        },
      },
    ];

    // Si hay filtro, aplicarlo
    if (filter) {
      return allPosts.filter(filter);
    }
    return allPosts;
  }),
}));

describe("categories utilities", () => {
  describe("getAllCategories", () => {
    test("should return unique categories", async () => {
      const categories = await getAllCategories();

      expect(categories).toContain("espeleología");
      expect(categories).toContain("montaña");
      expect(categories).toContain("técnicas");
      // No debe haber duplicados
      expect(categories.length).toBe(3);
    });

    test("should sort categories alphabetically", async () => {
      const categories = await getAllCategories();

      expect(categories).toEqual(["espeleología", "montaña", "técnicas"]);
    });

    test("should exclude categories from draft posts", async () => {
      const categories = await getAllCategories();

      expect(categories).not.toContain("draft-category");
    });

    test("should handle posts with multiple categories", async () => {
      const categories = await getAllCategories();

      // "espeleología" aparece en 2 posts pero solo debe estar una vez
      const espeleologiaCount = categories.filter(
        (c) => c === "espeleología",
      ).length;
      expect(espeleologiaCount).toBe(1);
    });
  });

  describe("getCategoriesWithCount", () => {
    test("should return object with category counts", async () => {
      const categoriesCount = await getCategoriesWithCount();

      expect(typeof categoriesCount).toBe("object");
      expect(categoriesCount).toHaveProperty("espeleología");
      expect(categoriesCount).toHaveProperty("montaña");
      expect(categoriesCount).toHaveProperty("técnicas");
    });

    test("should count posts correctly for each category", async () => {
      const categoriesCount = await getCategoriesWithCount();

      expect(categoriesCount["espeleología"]).toBe(2); // 2 posts
      expect(categoriesCount["montaña"]).toBe(1); // 1 post
      expect(categoriesCount["técnicas"]).toBe(2); // 2 posts
    });

    test("should handle posts with multiple categories", async () => {
      const categoriesCount = await getCategoriesWithCount();

      // Verificar que se cuentan correctamente posts con múltiples categorías
      expect(categoriesCount["espeleología"]).toBe(2);
      expect(categoriesCount["técnicas"]).toBe(2);
    });
  });

  describe("getCategoriesWithCountArray", () => {
    test("should return array of category objects", async () => {
      const categories = await getCategoriesWithCountArray();

      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBe(3);
    });

    test("should include name and count for each category", async () => {
      const categories = await getCategoriesWithCountArray();

      categories.forEach((category) => {
        expect(category).toHaveProperty("name");
        expect(category).toHaveProperty("count");
        expect(typeof category.name).toBe("string");
        expect(typeof category.count).toBe("number");
      });
    });

    test("should sort categories alphabetically", async () => {
      const categories = await getCategoriesWithCountArray();

      const names = categories.map((c) => c.name);
      expect(names).toEqual(["espeleología", "montaña", "técnicas"]);
    });
  });
});
