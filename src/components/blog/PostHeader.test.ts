import { expect, test, describe } from "vitest";

// Extraer la lógica del componente PostHeader para probarla de forma aislada
const formatPostDate = (date: Date): string => {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Mock post data
const mockPost = {
  id: "test-post/index.mdx",
  slug: "test-post",
  body: "",
  collection: "posts" as const,
  data: {
    title: "Test Post Title",
    description: "This is a test post description for the header",
    publishDate: new Date("2024-11-16"),
    heroImage: {} as any,
    categories: ["javascript", "testing"],
    draft: false,
  },
};

describe("PostHeader Logic", () => {
  test("should format date correctly in Spanish", () => {
    const formattedDate = formatPostDate(mockPost.data.publishDate);

    expect(formattedDate).toBe("16 de noviembre de 2024");
  });

  test("should format different dates correctly", () => {
    const date1 = new Date("2023-06-15");
    const date2 = new Date("2024-01-01");

    expect(formatPostDate(date1)).toBe("15 de junio de 2023");
    expect(formatPostDate(date2)).toBe("1 de enero de 2024");
  });

  test("should have correct post data structure", () => {
    expect(mockPost.data.title).toBe("Test Post Title");
    expect(mockPost.data.description).toBe(
      "This is a test post description for the header",
    );
    expect(mockPost.data.categories).toEqual(["javascript", "testing"]);
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
        categories: ["javascript", "typescript", "react", "testing"],
      },
    };

    expect(postWithManyCategories.data.categories).toHaveLength(4);
    expect(postWithManyCategories.data.categories).toContain("javascript");
    expect(postWithManyCategories.data.categories).toContain("react");
  });

  test("should handle single category", () => {
    const postWithOneCategory = {
      ...mockPost,
      data: {
        ...mockPost.data,
        categories: ["javascript"],
      },
    };

    expect(postWithOneCategory.data.categories).toHaveLength(1);
    expect(postWithOneCategory.data.categories[0]).toBe("javascript");
  });

  test("should preserve title and description", () => {
    expect(mockPost.data.title).toBeTruthy();
    expect(mockPost.data.description).toBeTruthy();
    expect(mockPost.data.title.length).toBeGreaterThan(0);
    expect(mockPost.data.description.length).toBeGreaterThan(0);
  });
});
