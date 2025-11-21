import { expect, test, describe, beforeAll } from "vitest";
import { readFile } from "fs/promises";
import { resolve } from "path";

// Tests simplificados que verifican solo la responsabilidad de layout del DesktopHeader
// No se preocupan por el contenido interno de los componentes hijos

describe("DesktopHeader - Layout Responsibility", () => {
  let sourceCode: string;

  beforeAll(async () => {
    const filePath = resolve(__dirname, "./DesktopHeader.astro");
    sourceCode = await readFile(filePath, "utf-8");
  });
  describe("Layout Structure", () => {
    test("Should have header element", () => {
      expect(sourceCode).toContain("<header");
    });

    test("Should have logo section", () => {
      expect(sourceCode).toContain('class="logo"');
    });

    test("Should have navigation section", () => {
      expect(sourceCode).toContain('class="desktop-nav"');
    });

    test("Should have controls section", () => {
      expect(sourceCode).toContain('class="desktop-controls"');
    });

    test("Should have header spacer", () => {
      expect(sourceCode).toContain('class="headerSpacer"');
    });
  });

  describe("Three-Column Layout", () => {
    test("Should have three main sections in order", () => {
      const logoIndex = sourceCode.indexOf('class="logo"');
      const navIndex = sourceCode.indexOf('class="desktop-nav"');
      const controlsIndex = sourceCode.indexOf('class="desktop-controls"');

      expect(logoIndex).toBeGreaterThan(-1);
      expect(navIndex).toBeGreaterThan(logoIndex);
      expect(controlsIndex).toBeGreaterThan(navIndex);
    });

    test("Logo section should contain link to home", () => {
      expect(sourceCode).toMatch(/class="logo"[^>]*>.*<a[^>]*href="\/"/s);
    });

    test("Navigation section should contain Navigation component", () => {
      expect(sourceCode).toMatch(/class="desktop-nav"[^>]*>.*<Navigation/s);
    });

    test("Controls section should contain AccountControls and ThemeSwitcher", () => {
      expect(sourceCode).toMatch(/class="desktop-controls"[^>]*>.*<AccountControls/s);
      expect(sourceCode).toMatch(/class="desktop-controls"[^>]*>.*<ThemeSwitcher/s);
    });
  });

  describe("Logo Configuration", () => {
    test("Logo should link to home page", () => {
      expect(sourceCode).toContain('href="/"');
    });

    test("Logo should have text 'Zunbeltz'", () => {
      expect(sourceCode).toContain('Zunbeltz');
    });
  });

  describe("Semantic HTML", () => {
    test("Should use semantic header element", () => {
      expect(sourceCode).toContain("<header");
    });

    test("Logo should be a link", () => {
      expect(sourceCode).toMatch(/<a[^>]*href="\/"/);
    });
  });

  describe("CSS Classes for Layout", () => {
    test("Should have logo class", () => {
      expect(sourceCode).toContain('class="logo"');
    });

    test("Should have desktop-nav class", () => {
      expect(sourceCode).toContain('class="desktop-nav"');
    });

    test("Should have desktop-controls class", () => {
      expect(sourceCode).toContain('class="desktop-controls"');
    });

    test("Should have headerSpacer class", () => {
      expect(sourceCode).toContain('class="headerSpacer"');
    });
  });

  describe("Fixed Header Pattern", () => {
    test("Should have header spacer for fixed positioning", () => {
      expect(sourceCode).toContain('class="headerSpacer"');
    });

    test("Spacer should come after header", () => {
      const headerIndex = sourceCode.indexOf("</header>");
      const spacerIndex = sourceCode.indexOf('class="headerSpacer"');
      expect(spacerIndex).toBeGreaterThan(headerIndex);
    });
  });

  describe("Component Imports", () => {
    test("Should import AccountControls", () => {
      expect(sourceCode).toContain('import AccountControls');
    });

    test("Should import Navigation", () => {
      expect(sourceCode).toContain('import { Navigation }');
    });

    test("Should import ThemeSwitcher", () => {
      expect(sourceCode).toContain('import ThemeSwitcher');
    });
  });

  describe("Desktop-Specific Layout", () => {
    test("Should use desktop-specific class names", () => {
      expect(sourceCode).toContain('desktop-nav');
      expect(sourceCode).toContain('desktop-controls');
    });

    test("Should have Navigation with client:load", () => {
      expect(sourceCode).toMatch(/<Navigation[^>]*client:load/);
    });
  });
});
