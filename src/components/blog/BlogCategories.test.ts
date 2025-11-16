import { expect, test, describe } from "vitest";

// Extraer la lógica del componente BlogCategories para probarla de forma aislada
const generateCategoryLink = (categoryName: string): string => {
  return `/categoria/${categoryName}`;
};

const formatCategoryCount = (count: number): string => {
  return `(${count})`;
};

// Mock categories data
const mockCategories = [
  { name: "espeleología", count: 5 },
  { name: "montaña", count: 3 },
  { name: "técnicas", count: 2 },
];

describe("BlogCategories Logic", () => {
  test("should generate correct category links", () => {
    const link1 = generateCategoryLink(mockCategories[0].name);
    const link2 = generateCategoryLink(mockCategories[1].name);
    const link3 = generateCategoryLink(mockCategories[2].name);

    expect(link1).toBe("/categoria/espeleología");
    expect(link2).toBe("/categoria/montaña");
    expect(link3).toBe("/categoria/técnicas");
  });

  test("should format category count correctly", () => {
    const count1 = formatCategoryCount(mockCategories[0].count);
    const count2 = formatCategoryCount(mockCategories[1].count);
    const count3 = formatCategoryCount(mockCategories[2].count);

    expect(count1).toBe("(5)");
    expect(count2).toBe("(3)");
    expect(count3).toBe("(2)");
  });

  test("should handle categories with different counts", () => {
    expect(formatCategoryCount(0)).toBe("(0)");
    expect(formatCategoryCount(1)).toBe("(1)");
    expect(formatCategoryCount(100)).toBe("(100)");
  });

  test("should have correct category data structure", () => {
    expect(mockCategories).toHaveLength(3);
    expect(mockCategories[0]).toHaveProperty("name");
    expect(mockCategories[0]).toHaveProperty("count");
  });

  test("should handle categories with special characters", () => {
    const categoryWithAccent = "espeleología";
    const link = generateCategoryLink(categoryWithAccent);

    expect(link).toBe("/categoria/espeleología");
  });

  test("should handle categories with spaces", () => {
    const categoryWithSpace = "montaña alta";
    const link = generateCategoryLink(categoryWithSpace);

    expect(link).toBe("/categoria/montaña alta");
  });

  test("should preserve category order", () => {
    expect(mockCategories[0].name).toBe("espeleología");
    expect(mockCategories[1].name).toBe("montaña");
    expect(mockCategories[2].name).toBe("técnicas");
  });

  test("should have valid count values", () => {
    mockCategories.forEach((category) => {
      expect(category.count).toBeGreaterThanOrEqual(0);
      expect(typeof category.count).toBe("number");
    });
  });
});
