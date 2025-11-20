import { expect, test, describe } from "vitest";
import Pagination from "./Pagination.astro";
import { renderAstroComponent } from "@/test/astro-container";

describe("Pagination", () => {
  describe("Rendering - Basic", () => {
    test("Should render navigation element", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 5 },
      });
      expect(html).toContain("<nav");
      expect(html).toContain('aria-label="Paginación"');
    });

    test("Should render previous button", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 2, totalPages: 5 },
      });
      expect(html).toContain("← Anterior");
    });

    test("Should render next button", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 5 },
      });
      expect(html).toContain("Siguiente →");
    });

    test("Should render page numbers container", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 5 },
      });
      expect(html).toContain('class="pagination-numbers"');
    });
  });

  describe("Rendering - Page numbers (5 or less pages)", () => {
    test("Should render all page numbers when totalPages <= 5", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 3 },
      });
      expect(html).toContain(">1</span>");
      expect(html).toContain(">2</span>");
      expect(html).toContain(">3</span>");
    });

    test("Should not render ellipsis when totalPages <= 5", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 5 },
      });
      expect(html).not.toContain("...");
    });

    test("Should render exactly 5 page buttons for 5 pages", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 5 },
      });
      const pageButtons = html.match(/aria-label="Página \d+"/g);
      expect(pageButtons?.length).toBe(5);
    });
  });

  describe("Rendering - Page numbers (more than 5 pages)", () => {
    test("Should render ellipsis when totalPages > 5", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 5, totalPages: 10 },
      });
      expect(html).toContain("...");
    });

    test("Should always show first page", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 8, totalPages: 10 },
      });
      expect(html).toMatch(/aria-label="Página 1"/);
    });

    test("Should always show last page", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 2, totalPages: 10 },
      });
      expect(html).toMatch(/aria-label="Página 10"/);
    });

    test("Should show pages around current page", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 5, totalPages: 10 },
      });
      expect(html).toMatch(/aria-label="Página 4"/);
      expect(html).toMatch(/aria-label="Página 5"/);
      expect(html).toMatch(/aria-label="Página 6"/);
    });

    test("Should render leading ellipsis when currentPage > 3", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 5, totalPages: 10 },
      });
      const ellipsis = html.match(/aria-hidden="true"[^>]*>.*\.\.\./g);
      expect(ellipsis).toBeTruthy();
      expect(ellipsis!.length).toBeGreaterThan(0);
    });

    test("Should render trailing ellipsis when currentPage < totalPages - 2", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 10 },
      });
      const ellipsis = html.match(/aria-hidden="true"[^>]*>.*\.\.\./g);
      expect(ellipsis).toBeTruthy();
      expect(ellipsis!.length).toBeGreaterThan(0);
    });
  });

  describe("Functionality - Previous button", () => {
    test("Previous button should be enabled when currentPage > 1", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 2, totalPages: 5 },
      });
      expect(html).toMatch(
        /<a[^>]*href="[^"]*"[^>]*aria-label="Página anterior"/,
      );
      expect(html).not.toContain('aria-disabled="true"');
    });

    test("Previous button should be disabled when currentPage = 1", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 5 },
      });
      expect(html).toContain('aria-disabled="true"');
      expect(html).toContain("← Anterior");
    });

    test("Previous button should link to previous page", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 5, baseUrl: "/blog" },
      });
      expect(html).toContain('href="/blog?page=2"');
    });

    test("Previous button from page 2 should link to baseUrl", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 2, totalPages: 5, baseUrl: "/blog" },
      });
      expect(html).toContain('aria-label="Página anterior"');
      expect(html).toContain('href="/blog"');
      // Verificar que el botón anterior apunta a /blog sin query params
      expect(html).toMatch(
        /<a[^>]*href="\/blog"[^>]*aria-label="Página anterior"/,
      );
    });
  });

  describe("Functionality - Next button", () => {
    test("Next button should be enabled when currentPage < totalPages", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 2, totalPages: 5 },
      });
      expect(html).toMatch(
        /<a[^>]*href="[^"]*"[^>]*aria-label="Página siguiente"/,
      );
      const disabledNext = html.match(/aria-disabled="true"[^>]*>.*Siguiente/);
      expect(disabledNext).toBeNull();
    });

    test("Next button should be disabled when currentPage = totalPages", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 5, totalPages: 5 },
      });
      expect(html).toContain('aria-disabled="true"');
      expect(html).toContain("Siguiente →");
    });

    test("Next button should link to next page", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 2, totalPages: 5, baseUrl: "/blog" },
      });
      expect(html).toContain('href="/blog?page=3"');
    });
  });

  describe("Functionality - Page number links", () => {
    test("Page numbers should have correct hrefs", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 2, totalPages: 5, baseUrl: "/blog" },
      });
      expect(html).toContain('href="/blog"'); // Page 1
      expect(html).toContain('href="/blog?page=2"');
      expect(html).toContain('href="/blog?page=3"');
    });

    test("Page 1 should link to baseUrl without query params", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 5, baseUrl: "/blog" },
      });
      expect(html).toContain('aria-label="Página 1"');
      // Verificar que existe un enlace a /blog para la página 1
      expect(html).toMatch(/<a[^>]*href="\/blog"[^>]*aria-label="Página 1"/);
    });

    test("Current page should have active class", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 5 },
      });
      expect(html).toMatch(
        /class="[^"]*active[^"]*"[^>]*aria-label="Página 3"/,
      );
    });

    test("Current page should have aria-current attribute", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 5 },
      });
      expect(html).toContain('aria-current="page"');
      expect(html).toContain('aria-label="Página 3"');
    });

    test("Only current page should have aria-current", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 5 },
      });
      const ariaCurrent = html.match(/aria-current="page"/g);
      expect(ariaCurrent?.length).toBe(1);
    });
  });

  describe("Functionality - URL building", () => {
    test("Should use default baseUrl when not provided", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 3 },
      });
      expect(html).toContain('href="/?page=2"');
    });

    test("Should handle baseUrl with existing query params", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: {
          currentPage: 1,
          totalPages: 3,
          baseUrl: "/blog?category=tech",
        },
      });
      // HTML escapes & as &#38; or &amp;
      const hasCorrectUrl =
        html.includes('href="/blog?category=tech&page=2"') ||
        html.includes('href="/blog?category=tech&#38;page=2"') ||
        html.includes('href="/blog?category=tech&amp;page=2"');
      expect(hasCorrectUrl).toBe(true);
    });

    test("Should use ? separator when baseUrl has no query params", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 3, baseUrl: "/blog" },
      });
      expect(html).toContain('href="/blog?page=2"');
      expect(html).not.toContain('href="/blog&');
    });
  });

  describe("Accessibility", () => {
    test("Should use semantic nav element with aria-label", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 5 },
      });
      expect(html).toContain("<nav");
      expect(html).toContain('aria-label="Paginación"');
    });

    test("Page number links should have descriptive aria-labels", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 3 },
      });
      expect(html).toContain('aria-label="Página 1"');
      expect(html).toContain('aria-label="Página 2"');
      expect(html).toContain('aria-label="Página 3"');
    });

    test("Previous button should have aria-label", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 2, totalPages: 5 },
      });
      expect(html).toContain('aria-label="Página anterior"');
    });

    test("Next button should have aria-label", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 5 },
      });
      expect(html).toContain('aria-label="Página siguiente"');
    });

    test("Disabled buttons should have aria-disabled", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 5 },
      });
      expect(html).toContain('aria-disabled="true"');
      expect(html).toContain("← Anterior");
    });

    test("Ellipsis should be hidden from screen readers", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 5, totalPages: 10 },
      });
      expect(html).toMatch(/aria-hidden="true"[^>]*>.*\.\.\./);
    });

    test("Should have descriptive class names", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 5 },
      });
      expect(html).toContain('class="pagination"');
      expect(html).toContain('class="pagination-numbers"');
    });
  });

  describe("Validation - currentPage", () => {
    test("Should handle currentPage < 1 by clamping to 1", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 0, totalPages: 5 },
      });
      expect(html).toContain('aria-disabled="true"');
      expect(html).toContain("← Anterior");
      expect(html).toMatch(
        /class="[^"]*active[^"]*"[^>]*aria-label="Página 1"/,
      );
    });

    test("Should handle currentPage > totalPages by clamping to totalPages", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 10, totalPages: 5 },
      });
      expect(html).toContain('aria-disabled="true"');
      expect(html).toContain("Siguiente →");
      expect(html).toMatch(
        /class="[^"]*active[^"]*"[^>]*aria-label="Página 5"/,
      );
    });

    test("Should handle negative currentPage", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: -5, totalPages: 5 },
      });
      expect(html).toMatch(
        /class="[^"]*active[^"]*"[^>]*aria-label="Página 1"/,
      );
    });
  });

  describe("Structure", () => {
    test("Should have button classes on navigation buttons", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 2, totalPages: 5 },
      });
      expect(html).toMatch(
        /class="button secondary"[^>]*aria-label="Página anterior"/,
      );
      expect(html).toMatch(
        /class="button secondary"[^>]*aria-label="Página siguiente"/,
      );
    });

    test("Should have icon-button classes on page numbers", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 3 },
      });
      expect(html).toMatch(
        /class="[^"]*icon-button[^"]*"[^>]*aria-label="Página 1"/,
      );
    });

    test("Page numbers should have number-container wrapper", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 3 },
      });
      expect(html).toContain('class="number-container"');
    });

    test("Should have secondary class on buttons", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 3 },
      });
      expect(html).toMatch(/class="[^"]*secondary[^"]*"/);
    });

    test("Should have rounded class on page number buttons", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 3 },
      });
      expect(html).toMatch(/class="[^"]*rounded[^"]*"[^>]*aria-label="Página/);
    });
  });

  describe("Edge cases", () => {
    test("Should handle single page", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 1, totalPages: 1 },
      });
      const disabledButtons = html.match(/aria-disabled="true"/g);
      expect(disabledButtons?.length).toBe(2);
      expect(html).toContain("← Anterior");
      expect(html).toContain("Siguiente →");
    });

    test("Should handle exactly 5 pages", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 5 },
      });
      expect(html).not.toContain("...");
      const pageButtons = html.match(/aria-label="Página \d+"/g);
      expect(pageButtons?.length).toBe(5);
    });

    test("Should handle exactly 6 pages (boundary case)", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 3, totalPages: 6 },
      });
      expect(html).toContain("...");
    });

    test("Should handle large totalPages number", async () => {
      const html = await renderAstroComponent(Pagination, {
        props: { currentPage: 50, totalPages: 100 },
      });
      expect(html).toContain("...");
      expect(html).toMatch(/aria-label="Página 1"/);
      expect(html).toMatch(/aria-label="Página 100"/);
      expect(html).toMatch(/aria-label="Página 50"/);
    });
  });
});
