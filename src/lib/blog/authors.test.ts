import { expect, test, describe, vi } from "vitest";
import {
  getAuthorPosts,
  getAuthorsWithPosts,
  getAuthorPostCounts,
} from "./authors";

// Mock de getCollection
vi.mock("astro:content", () => ({
  getCollection: vi.fn(async (collection, filter) => {
    if (collection === "posts") {
      const allPosts = [
        {
          slug: "post-1",
          data: {
            title: "Post 1",
            author: { id: "andoni-abarzuza" },
            draft: false,
            publishDate: new Date("2024-01-15"),
          },
        },
        {
          slug: "post-2",
          data: {
            title: "Post 2",
            author: { id: "andoni-abarzuza" },
            draft: false,
            publishDate: new Date("2024-02-20"),
          },
        },
        {
          slug: "post-3",
          data: {
            title: "Post 3",
            author: { id: "maria-garcia" },
            draft: false,
            publishDate: new Date("2024-03-10"),
          },
        },
        {
          slug: "post-4",
          data: {
            title: "Post 4 Draft",
            author: { id: "andoni-abarzuza" },
            draft: true,
            publishDate: new Date("2024-04-01"),
          },
        },
      ];

      if (filter) {
        return allPosts.filter(filter);
      }
      return allPosts;
    }

    if (collection === "authors") {
      return [
        {
          id: "andoni-abarzuza",
          data: {
            name: "Andoni Abarzuza",
            bio: "Espeleólogo y montañero",
          },
        },
        {
          id: "maria-garcia",
          data: {
            name: "María García",
            bio: "Montañera y escaladora",
          },
        },
        {
          id: "juan-perez",
          data: {
            name: "Juan Pérez",
            bio: "Aventurero sin posts",
          },
        },
      ];
    }

    return [];
  }),
}));

describe("authors utilities", () => {
  describe("getAuthorPosts", () => {
    test("should return posts for a specific author", async () => {
      const posts = await getAuthorPosts("andoni-abarzuza");

      expect(posts.length).toBe(2);
      expect(posts[0].data.author.id).toBe("andoni-abarzuza");
      expect(posts[1].data.author.id).toBe("andoni-abarzuza");
    });

    test("should exclude draft posts", async () => {
      const posts = await getAuthorPosts("andoni-abarzuza");

      expect(posts.length).toBe(2);
      expect(posts.every((p) => !p.data.draft)).toBe(true);
    });

    test("should sort posts by date (most recent first)", async () => {
      const posts = await getAuthorPosts("andoni-abarzuza");

      expect(posts.length).toBe(2);
      // post-2 (2024-02-20) debe estar antes que post-1 (2024-01-15)
      expect(posts[0].slug).toBe("post-2");
      expect(posts[1].slug).toBe("post-1");
    });

    test("should return empty array for author with no posts", async () => {
      const posts = await getAuthorPosts("juan-perez");

      expect(posts.length).toBe(0);
      expect(Array.isArray(posts)).toBe(true);
    });

    test("should return empty array for non-existent author", async () => {
      const posts = await getAuthorPosts("autor-inexistente");

      expect(posts.length).toBe(0);
      expect(Array.isArray(posts)).toBe(true);
    });

    test("should handle author with single post", async () => {
      const posts = await getAuthorPosts("maria-garcia");

      expect(posts.length).toBe(1);
      expect(posts[0].slug).toBe("post-3");
      expect(posts[0].data.author.id).toBe("maria-garcia");
    });
  });

  describe("getAuthorsWithPosts", () => {
    test("should return only authors with published posts", async () => {
      const authors = await getAuthorsWithPosts();

      expect(authors.length).toBe(2);
      expect(authors.some((a) => a.id === "andoni-abarzuza")).toBe(true);
      expect(authors.some((a) => a.id === "maria-garcia")).toBe(true);
    });

    test("should exclude authors without posts", async () => {
      const authors = await getAuthorsWithPosts();

      expect(authors.some((a) => a.id === "juan-perez")).toBe(false);
    });

    test("should return array of author objects", async () => {
      const authors = await getAuthorsWithPosts();

      authors.forEach((author) => {
        expect(author).toHaveProperty("id");
        expect(author).toHaveProperty("data");
        expect(author.data).toHaveProperty("name");
        expect(author.data).toHaveProperty("bio");
      });
    });

    test("should not count draft posts", async () => {
      const authors = await getAuthorsWithPosts();

      // juan-perez no tiene posts publicados, solo drafts
      // por lo tanto no debería aparecer
      expect(authors.length).toBe(2);
    });
  });

  describe("getAuthorPostCounts", () => {
    test("should return object with author post counts", async () => {
      const counts = await getAuthorPostCounts();

      expect(typeof counts).toBe("object");
      expect(counts).toHaveProperty("andoni-abarzuza");
      expect(counts).toHaveProperty("maria-garcia");
    });

    test("should count posts correctly for each author", async () => {
      const counts = await getAuthorPostCounts();

      expect(counts["andoni-abarzuza"]).toBe(2);
      expect(counts["maria-garcia"]).toBe(1);
    });

    test("should not count draft posts", async () => {
      const counts = await getAuthorPostCounts();

      // andoni-abarzuza tiene 2 posts publicados y 1 draft
      // solo debe contar los 2 publicados
      expect(counts["andoni-abarzuza"]).toBe(2);
    });

    test("should not include authors without posts", async () => {
      const counts = await getAuthorPostCounts();

      expect(counts).not.toHaveProperty("juan-perez");
    });

    test("should return empty object if no posts exist", async () => {
      // Temporalmente mockear sin posts
      const originalMock = vi.mocked(
        await import("astro:content"),
      ).getCollection;

      vi.mocked(await import("astro:content")).getCollection = vi.fn(
        async (collection: string) => {
          if (collection === "posts") return [];
          return [];
        },
      );

      const counts = await getAuthorPostCounts();
      expect(Object.keys(counts).length).toBe(0);

      // Restaurar mock original
      vi.mocked(await import("astro:content")).getCollection = originalMock;
    });

    test("should handle multiple posts from same author", async () => {
      const counts = await getAuthorPostCounts();

      // Verificar que se cuentan correctamente múltiples posts
      expect(counts["andoni-abarzuza"]).toBeGreaterThan(1);
    });
  });

  describe("Integration tests", () => {
    test("getAuthorsWithPosts and getAuthorPostCounts should be consistent", async () => {
      const authors = await getAuthorsWithPosts();
      const counts = await getAuthorPostCounts();

      // Todos los autores con posts deben tener un count
      authors.forEach((author) => {
        expect(counts).toHaveProperty(author.id);
        expect(counts[author.id]).toBeGreaterThan(0);
      });
    });

    test("getAuthorPosts count should match getAuthorPostCounts", async () => {
      const counts = await getAuthorPostCounts();

      for (const authorId in counts) {
        const posts = await getAuthorPosts(authorId);
        expect(posts.length).toBe(counts[authorId]);
      }
    });

    test("all functions should exclude draft posts consistently", async () => {
      const authorsWithPosts = await getAuthorsWithPosts();
      const counts = await getAuthorPostCounts();

      for (const author of authorsWithPosts) {
        const posts = await getAuthorPosts(author.id);

        // Verificar que ningún post es draft
        expect(posts.every((p) => !p.data.draft)).toBe(true);

        // Verificar que el count coincide
        expect(posts.length).toBe(counts[author.id]);
      }
    });
  });
});
