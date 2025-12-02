import { expect, test, describe } from "vitest";
import Breadcrumb from "./Breadcrumb.astro";
import { renderAstroComponent } from "@/test/astro-container";

describe("Breadcrumb", () => {
  describe("Rendering - Root path", () => {
    test("Should render only 'Inicio' for root path", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/"),
      });
      expect(html).toContain("Inicio");
      const breadcrumbItems = html.match(/class="breadcrumb-item"/g);
      expect(breadcrumbItems?.length).toBe(1);
    });

    test("Should render 'Inicio' as current page for root path", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/"),
      });
      expect(html).toContain('class="breadcrumb-current"');
      expect(html).toMatch(
        /<span[^>]*class="breadcrumb-current"[^>]*>Inicio<\/span>/,
      );
    });

    test("Should not render separator for root path", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/"),
      });
      expect(html).not.toContain('class="breadcrumb-separator"');
    });
  });

  describe("Rendering - Simple path", () => {
    test("Should render breadcrumbs for simple path", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toContain("Inicio");
      expect(html).toContain("Blog");
    });

    test("Should render correct number of breadcrumb items", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      const breadcrumbItems = html.match(/class="breadcrumb-item"/g);
      expect(breadcrumbItems?.length).toBe(2);
    });

    test("Should capitalize segment names", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toContain("Blog");
      expect(html).not.toContain("blog");
    });

    test("Should render separators between items", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      const separators = html.match(/class="breadcrumb-separator"/g);
      expect(separators?.length).toBe(1);
    });
  });

  describe("Rendering - Nested path", () => {
    test("Should render all segments for nested path", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog/categoria/montanismo"),
      });
      expect(html).toContain("Inicio");
      expect(html).toContain("Blog");
      expect(html).toContain("Categoria");
      expect(html).toContain("Montanismo");
    });

    test("Should render correct number of items for nested path", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog/categoria/montanismo"),
      });
      const breadcrumbItems = html.match(/class="breadcrumb-item"/g);
      expect(breadcrumbItems?.length).toBe(4);
    });

    test("Should handle hyphenated segments", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/mi-perfil"),
      });
      expect(html).toContain("Mi Perfil");
    });

    test("Should render correct number of separators", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog/categoria/montanismo"),
      });
      const separators = html.match(/class="breadcrumb-separator"/g);
      expect(separators?.length).toBe(3);
    });
  });

  describe("Functionality - Links", () => {
    test("'Inicio' should link to root", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog/categoria"),
      });
      expect(html).toContain('href="/"');
    });

    test("Intermediate segments should have correct hrefs", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog/categoria/montanismo"),
      });
      expect(html).toContain('href="/blog"');
      expect(html).toContain('href="/blog/categoria"');
    });

    test("Last segment should not be a link", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog/categoria"),
      });
      expect(html).toMatch(
        /<span[^>]*class="breadcrumb-current"[^>]*>Categoria<\/span>/,
      );
      expect(html).not.toContain('href="/blog/categoria"');
    });

    test("Links should have anchor class", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toMatch(/<a[^>]*href="\/"[^>]*class="anchor"/);
    });
  });

  describe("Accessibility", () => {
    test("Should use semantic nav element", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toContain("<nav");
      expect(html).toContain('aria-label="Breadcrumb"');
    });

    test("Should use ordered list structure", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toContain("<ol");
      expect(html).toContain("<li");
    });

    test("Current page should have aria-current attribute", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toContain('aria-current="page"');
    });

    test("Only last item should have aria-current", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog/categoria"),
      });
      const ariaCurrent = html.match(/aria-current="page"/g);
      expect(ariaCurrent?.length).toBe(1);
    });

    test("Separators should be hidden from screen readers", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toMatch(
        /<span[^>]*class="breadcrumb-separator"[^>]*aria-hidden="true"/,
      );
    });

    test("Should have descriptive class names", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toContain('class="breadcrumb"');
      expect(html).toContain('class="breadcrumb-list"');
      expect(html).toContain('class="breadcrumb-item"');
    });
  });

  describe("Structure", () => {
    test("List should be inside nav element", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toMatch(
        /<nav[^>]*>.*<ol[^>]*class="breadcrumb-list".*<\/nav>/s,
      );
    });

    test("Items should be inside list", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toMatch(
        /<ol[^>]*>.*<li[^>]*class="breadcrumb-item".*<\/ol>/s,
      );
    });

    test("Separator should be after link, not after current page", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toMatch(
        /<a[^>]*href="\/"[^>]*>.*Inicio.*<\/a>.*<span[^>]*class="breadcrumb-separator"/s,
      );
      expect(html).not.toMatch(
        /<span[^>]*class="breadcrumb-current"[^>]*>.*<\/span>.*<span[^>]*class="breadcrumb-separator"/s,
      );
    });

    test("Current page should be in span element", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog"),
      });
      expect(html).toMatch(
        /<span[^>]*class="breadcrumb-current"[^>]*>Blog<\/span>/,
      );
    });
  });

  describe("Edge cases", () => {
    test("Should handle trailing slash", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog/"),
      });
      expect(html).toContain("Blog");
      const breadcrumbItems = html.match(/class="breadcrumb-item"/g);
      expect(breadcrumbItems?.length).toBe(2);
    });

    test("Should handle multiple hyphens in segment", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/mi-super-perfil"),
      });
      expect(html).toContain("Mi Super Perfil");
    });

    test("Should handle numeric segments", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/blog/2024"),
      });
      expect(html).toContain("2024");
    });

    test("Should decode URL-encoded characters", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/navarra/monta%C3%B1as"),
      });
      expect(html).toContain("Montañas");
      expect(html).not.toContain("Monta%C3%B1as");
    });

    test("Should handle accented characters in URLs", async () => {
      const html = await renderAstroComponent(Breadcrumb, {
        request: new Request("http://localhost/espa%C3%B1a/r%C3%ADos"),
      });
      expect(html).toContain("España");
      expect(html).toContain("Ríos");
    });
  });
});
