import { expect, test, describe } from "vitest";

// Extraer la lógica del componente PostCard para probarla de forma aislada
const formatPostDate = (date: Date): string => {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const generatePostLink = (slug: string): string => {
  return `/blog/${slug}`;
};

// Mock post data
const mockPost = {
  id: "test-post/index.mdx",
  slug: "test-post",
  body: "",
  collection: "posts" as const,
  data: {
    title: "Test Post Title",
    description: "This is a test post description",
    publishDate: new Date("2024-11-16"),
    heroImage: {
      src: "/_astro/hero.hash.jpg",
      width: 800,
      height: 250,
      format: "jpg" as const,
    },
    categories: ["test", "vitest"],
    draft: false,
  },
};

describe("PostCard Logic", () => {
  test("should format date correctly in Spanish", () => {
    const formattedDate = formatPostDate(mockPost.data.publishDate);

    expect(formattedDate).toBe("16 de noviembre de 2024");
  });

  test("should format different dates correctly", () => {
    const date1 = new Date("2023-01-01");
    const date2 = new Date("2024-12-25");

    expect(formatPostDate(date1)).toBe("1 de enero de 2023");
    expect(formatPostDate(date2)).toBe("25 de diciembre de 2024");
  });

  test("should generate correct post link from slug", () => {
    const link = generatePostLink(mockPost.slug);

    expect(link).toBe("/blog/test-post");
  });

  test("should generate correct link for different slugs", () => {
    expect(generatePostLink("my-awesome-post")).toBe("/blog/my-awesome-post");
    expect(generatePostLink("another-post")).toBe("/blog/another-post");
  });

  test("should have correct post data structure", () => {
    expect(mockPost.data.title).toBe("Test Post Title");
    expect(mockPost.data.description).toBe("This is a test post description");
    expect(mockPost.data.categories).toEqual(["test", "vitest"]);
    expect(mockPost.data.draft).toBe(false);
  });

  test("should have valid hero image data", () => {
    expect(mockPost.data.heroImage.src).toBeTruthy();
    expect(mockPost.data.heroImage.width).toBe(800);
    expect(mockPost.data.heroImage.height).toBe(250);
  });

  test("should have ISO date string for datetime attribute", () => {
    const isoString = mockPost.data.publishDate.toISOString();

    expect(isoString).toContain("2024-11-16");
    expect(isoString).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  test("should handle multiple categories", () => {
    const postWithManyCategories = {
      ...mockPost,
      data: {
        ...mockPost.data,
        categories: ["javascript", "typescript", "testing", "vitest"],
      },
    };

    expect(postWithManyCategories.data.categories).toHaveLength(4);
    expect(postWithManyCategories.data.categories).toContain("javascript");
    expect(postWithManyCategories.data.categories).toContain("vitest");
  });

  test("should handle empty categories array", () => {
    const postWithNoCategories = {
      ...mockPost,
      data: {
        ...mockPost.data,
        categories: [],
      },
    };

    expect(postWithNoCategories.data.categories).toHaveLength(0);
  });
});
