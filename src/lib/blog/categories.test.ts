import { expect, test, describe, vi } from "vitest";
import {
  getAllCategories,
  getCategoriesWithCount,
  getCategoriesWithCountArray,
  getPostsByCategory,
} from "./categories";

// Mock de getCollection
vi.mock("astro:content", () => ({
  getCollection: vi.fn(async (collection, filter) => {
    const allPosts = [
      {
        slug: "post-1",
        data: {
          categories: ["espeleología", "técnicas"],
          draft: false,
          publishDate: new Date("2024-01-15"),
        },
      },
      {
        slug: "post-2",
        data: {
          categories: ["montaña", "espeleología"],
          draft: false,
          publishDate: new Date("2024-02-20"),
        },
      },
      {
        slug: "post-3",
        data: {
          categories: ["técnicas"],
          draft: false,
          publishDate: new Date("2024-03-10"),
        },
      },
      {
        slug: "post-4",
        data: {
          categories: ["draft-category"],
          draft: true,
          publishDate: new Date("2024-04-01"),
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

  describe("getPostsByCategory", () => {
    test("should return posts for a specific category", async () => {
      const posts = await getPostsByCategory("espeleología");

      expect(posts.length).toBe(2);
      expect(posts[0].slug).toBeDefined();
      expect(posts[0].data.categories).toContain("espeleología");
    });

    test("should exclude draft posts", async () => {
      const posts = await getPostsByCategory("draft-category");

      expect(posts.length).toBe(0);
    });

    test("should sort posts by date (most recent first)", async () => {
      const posts = await getPostsByCategory("espeleología");

      expect(posts.length).toBe(2);
      // post-2 (2024-02-20) debe estar antes que post-1 (2024-01-15)
      expect(posts[0].slug).toBe("post-2");
      expect(posts[1].slug).toBe("post-1");
    });

    test("should return empty array for non-existent category", async () => {
      const posts = await getPostsByCategory("categoria-inexistente");

      expect(posts.length).toBe(0);
      expect(Array.isArray(posts)).toBe(true);
    });

    test("should handle category with single post", async () => {
      const posts = await getPostsByCategory("montaña");

      expect(posts.length).toBe(1);
      expect(posts[0].slug).toBe("post-2");
      expect(posts[0].data.categories).toContain("montaña");
    });

    test("should handle posts with multiple categories correctly", async () => {
      const postsEspeleologia = await getPostsByCategory("espeleología");
      const postsTecnicas = await getPostsByCategory("técnicas");

      // post-1 tiene ambas categorías
      expect(postsEspeleologia.some((p) => p.slug === "post-1")).toBe(true);
      expect(postsTecnicas.some((p) => p.slug === "post-1")).toBe(true);
    });

    test("should return posts sorted correctly for category with multiple posts", async () => {
      const posts = await getPostsByCategory("técnicas");

      expect(posts.length).toBe(2);
      // post-3 (2024-03-10) debe estar antes que post-1 (2024-01-15)
      expect(posts[0].slug).toBe("post-3");
      expect(posts[1].slug).toBe("post-1");
    });
  });
});
