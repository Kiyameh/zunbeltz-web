import { expect, test, describe, vi } from "vitest";
import BlogCategories from "./BlogCategories.astro";
import { renderAstroComponent } from "@/test/astro-container";

// Mock de la función de lib/blog/categories
vi.mock("@/lib/blog/categories", () => ({
  getCategoriesWithCountArray: vi.fn(() => Promise.resolve([
    {
      name: "Montañismo",
      count: 8,
    },
    {
      name: "Espeleología",
      count: 5,
    },
    {
      name: "Fotografía",
      count: 3,
    },
  ])),
}));

describe("BlogCategories", () => {
  describe("Rendering", () => {
    test("Should render widget title", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain("Categorías");
    });

    test("Should render all categories", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain("Montañismo");
      expect(html).toContain("Espeleología");
      expect(html).toContain("Fotografía");
    });

    test("Should render post counts for each category", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain("(8)");
      expect(html).toContain("(5)");
      expect(html).toContain("(3)");
    });

    test("Should render categories list", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain('class="categories-list"');
    });

    test("Should render category items", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      const categoryItems = html.match(/class="category-item"/g);
      expect(categoryItems).toBeTruthy();
      expect(categoryItems!.length).toBe(3);
    });

    test("Should render post count spans", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      const postCounts = html.match(/class="post-count"/g);
      expect(postCounts).toBeTruthy();
      expect(postCounts!.length).toBe(3);
    });
  });

  describe("Functionality - Links", () => {
    test("Title link should point to categories index", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain('href="/blog/categoria"');
    });

    test("Category links should have correct hrefs", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain('href="/blog/categoria/Montañismo"');
      expect(html).toContain('href="/blog/categoria/Espeleología"');
      expect(html).toContain('href="/blog/categoria/Fotografía"');
    });

    test("Category links should have primary anchor class", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toMatch(/class="anchor primary"[^>]*href="\/blog\/categoria\/Montañismo"/);
      expect(html).toMatch(/class="anchor primary"[^>]*href="\/blog\/categoria\/Espeleología"/);
      expect(html).toMatch(/class="anchor primary"[^>]*href="\/blog\/categoria\/Fotografía"/);
    });

    test("Title link should have neutral anchor class", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toMatch(/href="\/blog\/categoria"[^>]*class="anchor neutral"/);
    });
  });

  describe("Accessibility", () => {
    test("Should use semantic HTML (aside, header, ul)", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain("<aside");
      expect(html).toContain("<header");
      expect(html).toContain("<ul");
    });

    test("Should have proper heading hierarchy with h3", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain("<h3");
      expect(html).toMatch(/<h3[^>]*>.*Categorías.*<\/h3>/s);
    });

    test("Should use list structure for categories", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain("<ul");
      expect(html).toContain("<li");
    });

    test("Should have descriptive link text", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain("Montañismo");
      expect(html).toContain("Espeleología");
      expect(html).toContain("Fotografía");
    });

    test("Widget should have descriptive class name", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain('class="categories-widget"');
    });

    test("Header should have descriptive class name", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain('class="categories-header"');
    });

    test("Title should have descriptive class name", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toContain('class="categories-title');
    });
  });

  describe("Structure", () => {
    test("List should be inside aside element", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toMatch(/<aside[^>]*>.*<ul[^>]*class="categories-list".*<\/aside>/s);
    });

    test("Header should be inside aside element", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toMatch(/<aside[^>]*>.*<header[^>]*class="categories-header".*<\/aside>/s);
    });

    test("Each category item should contain name and count", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toMatch(/Montañismo.*\(8\)/s);
      expect(html).toMatch(/Espeleología.*\(5\)/s);
      expect(html).toMatch(/Fotografía.*\(3\)/s);
    });

    test("Post count should be in span element", async () => {
      const html = await renderAstroComponent(BlogCategories, {});
      expect(html).toMatch(/<span[^>]*class="post-count"[^>]*>\(8\)<\/span>/);
      expect(html).toMatch(/<span[^>]*class="post-count"[^>]*>\(5\)<\/span>/);
      expect(html).toMatch(/<span[^>]*class="post-count"[^>]*>\(3\)<\/span>/);
    });
  });
});
