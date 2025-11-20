import { expect, test, describe, vi } from "vitest";
import BlogAuthors from "./BlogAuthors.astro";
import { renderAstroComponent } from "@/test/astro-container";

// Mock de las funciones de lib/blog/authors
vi.mock("@/lib/blog/authors", () => ({
  getAuthorsWithPosts: vi.fn(() =>
    Promise.resolve([
      {
        id: "andoni-abarzuza",
        collection: "authors" as const,
        data: {
          name: "Andoni Abarzuza",
          bio: "Espeleólogo y montañero de Navarra",
          avatar: {
            src: "/_astro/test-avatar.jpg",
            width: 80,
            height: 80,
            format: "jpg",
          } as any,
          email: "kiyameh@outlook.com",
          website: "https://kiyameh.com/es/",
          social: {
            instagram: "https://www.instagram.com/andoniabarzuza",
          },
        },
      },
      {
        id: "maria-garcia",
        collection: "authors" as const,
        data: {
          name: "María García",
          bio: "Fotógrafa de naturaleza",
          avatar: {
            src: "/_astro/test-avatar2.jpg",
            width: 80,
            height: 80,
            format: "jpg",
          } as any,
          email: "maria@example.com",
          website: "https://maria.com",
          social: {
            instagram: "https://www.instagram.com/mariagarcia",
          },
        },
      },
    ]),
  ),
  getAuthorPostCounts: vi.fn(() =>
    Promise.resolve({
      "andoni-abarzuza": 5,
      "maria-garcia": 3,
    }),
  ),
}));

describe("BlogAuthors", () => {
  describe("Rendering", () => {
    test("Should render widget title", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain("Autores");
    });

    test("Should render all authors", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain("Andoni Abarzuza");
      expect(html).toContain("María García");
    });

    test("Should render post counts for each author", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain("(5)");
      expect(html).toContain("(3)");
    });

    test("Should render authors list", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain('class="authors-list"');
    });

    test("Should render author items", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      const authorItems = html.match(/class="author-item"/g);
      expect(authorItems).toBeTruthy();
      expect(authorItems!.length).toBe(2);
    });

    test("Should render post count spans", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      const postCounts = html.match(/class="post-count"/g);
      expect(postCounts).toBeTruthy();
      expect(postCounts!.length).toBe(2);
    });
  });

  describe("Functionality - Links", () => {
    test("Title link should point to authors index", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain('href="/blog/autor"');
    });

    test("Author links should have correct hrefs", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain('href="/blog/autor/andoni-abarzuza"');
      expect(html).toContain('href="/blog/autor/maria-garcia"');
    });

    test("Author links should have primary anchor class", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toMatch(
        /class="anchor primary"[^>]*href="\/blog\/autor\/andoni-abarzuza"/,
      );
      expect(html).toMatch(
        /class="anchor primary"[^>]*href="\/blog\/autor\/maria-garcia"/,
      );
    });

    test("Title link should have neutral anchor class", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toMatch(/href="\/blog\/autor"[^>]*class="anchor neutral"/);
    });
  });

  describe("Accessibility", () => {
    test("Should use semantic HTML (aside, header, ul)", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain("<aside");
      expect(html).toContain("<header");
      expect(html).toContain("<ul");
    });

    test("Should have proper heading hierarchy with h3", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain("<h3");
      expect(html).toMatch(/<h3[^>]*>.*Autores.*<\/h3>/s);
    });

    test("Should use list structure for authors", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain("<ul");
      expect(html).toContain("<li");
    });

    test("Should have descriptive link text", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain("Andoni Abarzuza");
      expect(html).toContain("María García");
    });

    test("Widget should have descriptive class name", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain('class="authors-widget"');
    });

    test("Header should have descriptive class name", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain('class="authors-header"');
    });

    test("Title should have descriptive class name", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toContain('class="authors-title');
    });
  });

  describe("Structure", () => {
    test("List should be inside aside element", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toMatch(
        /<aside[^>]*>.*<ul[^>]*class="authors-list".*<\/aside>/s,
      );
    });

    test("Header should be inside aside element", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toMatch(
        /<aside[^>]*>.*<header[^>]*class="authors-header".*<\/aside>/s,
      );
    });

    test("Each author item should contain name and count", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toMatch(/Andoni Abarzuza.*\(5\)/s);
      expect(html).toMatch(/María García.*\(3\)/s);
    });

    test("Post count should be in span element", async () => {
      const html = await renderAstroComponent(BlogAuthors, {});
      expect(html).toMatch(/<span[^>]*class="post-count"[^>]*>\(5\)<\/span>/);
      expect(html).toMatch(/<span[^>]*class="post-count"[^>]*>\(3\)<\/span>/);
    });
  });
});
