import { expect, test, describe, beforeAll } from "vitest";
import { readFile } from "fs/promises";
import { resolve } from "path";

// Tests simplificados que verifican solo la responsabilidad de layout del MobileHeader
// No se preocupan por el contenido interno de los componentes hijos

describe("MobileHeader - Layout Responsibility", () => {
  let sourceCode: string;

  beforeAll(async () => {
    const filePath = resolve(__dirname, "./MobileHeader.astro");
    sourceCode = await readFile(filePath, "utf-8");
  });

  describe("Layout Structure", () => {
    test("Should have header element", () => {
      expect(sourceCode).toContain('<header class="header"');
    });

    test("Should have logo section", () => {
      expect(sourceCode).toContain('class="logo"');
    });

    test("Should have burger menu button", () => {
      expect(sourceCode).toContain('id="mobile-menu-toggle"');
    });

    test("Should have menu overlay", () => {
      expect(sourceCode).toContain('id="mobile-menu-overlay"');
    });

    test("Should have header spacer", () => {
      expect(sourceCode).toContain('class="headerSpacer"');
    });
  });

  describe("Burger Menu Structure", () => {
    test("Should have burger button with correct ID", () => {
      expect(sourceCode).toContain('id="mobile-menu-toggle"');
    });

    test("Should have three burger lines", () => {
      const matches = sourceCode.match(/class="burgerLine"/g);
      expect(matches).toBeTruthy();
      expect(matches!.length).toBe(3);
    });

    test("Burger button should have burgerButton class", () => {
      expect(sourceCode).toContain('class="burgerButton"');
    });
  });

  describe("Menu Overlay Structure", () => {
    test("Should have menu overlay with correct ID", () => {
      expect(sourceCode).toContain('id="mobile-menu-overlay"');
    });

    test("Should have menuOverlay class", () => {
      expect(sourceCode).toContain('class="menuOverlay"');
    });

    test("Should have menu container", () => {
      expect(sourceCode).toContain('class="menuContainer"');
    });

    test("Should have tools slot", () => {
      expect(sourceCode).toContain('class="toolsSlot"');
    });

    test("Should have tool groups", () => {
      const matches = sourceCode.match(/class="toolGroup"/g);
      expect(matches).toBeTruthy();
      expect(matches!.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Logo Configuration", () => {
    test("Logo should link to home page", () => {
      expect(sourceCode).toContain('href="/"');
    });

    test("Logo should have text 'Zunbeltz'", () => {
      expect(sourceCode).toContain('Zunbeltz');
    });

    test("Logo should be inside logo div", () => {
      expect(sourceCode).toMatch(/class="logo"[^>]*>.*<a[^>]*href="\/"/s);
    });
  });

  describe("Accessibility Attributes", () => {
    test("Burger button should have aria-label", () => {
      expect(sourceCode).toContain('aria-label="Toggle menu"');
    });

    test("Burger button should have aria-expanded", () => {
      expect(sourceCode).toContain('aria-expanded="false"');
    });

    test("Burger button should have aria-controls", () => {
      expect(sourceCode).toContain('aria-controls="mobile-menu-overlay"');
    });

    test("Menu overlay should have role dialog", () => {
      expect(sourceCode).toContain('role="dialog"');
    });

    test("Menu overlay should have aria-modal", () => {
      expect(sourceCode).toContain('aria-modal="true"');
    });

    test("Menu overlay should have aria-label", () => {
      expect(sourceCode).toContain('aria-label="Mobile navigation menu"');
    });
  });

  describe("Component Imports", () => {
    test("Should import AccountControls", () => {
      expect(sourceCode).toContain('import AccountControls');
    });

    test("Should import ThemeSwitcher", () => {
      expect(sourceCode).toContain('import ThemeSwitcher');
    });

    test("Should import NavigationMobile", () => {
      expect(sourceCode).toContain('import { NavigationMobile }');
    });

    test("Should import SearchUtility", () => {
      expect(sourceCode).toContain('import { SearchUtility }');
    });
  });

  describe("Component Placement", () => {
    test("NavigationMobile should be in menu container", () => {
      expect(sourceCode).toMatch(/class="menuContainer"[^>]*>.*<NavigationMobile/s);
    });

    test("AccountControls should be in tools slot", () => {
      expect(sourceCode).toMatch(/class="toolsSlot"[^>]*>.*<AccountControls/s);
    });

    test("ThemeSwitcher should be in tools slot", () => {
      expect(sourceCode).toMatch(/class="toolsSlot"[^>]*>.*<ThemeSwitcher/s);
    });

    test("SearchUtility should be in tools slot", () => {
      expect(sourceCode).toMatch(/class="toolsSlot"[^>]*>.*<SearchUtility/s);
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

  describe("Script Functionality", () => {
    test("Should have script tag", () => {
      expect(sourceCode).toContain("<script>");
    });

    test("Should reference mobile-menu-toggle in script", () => {
      expect(sourceCode).toMatch(/getElementById\("mobile-menu-toggle"\)/);
    });

    test("Should reference mobile-menu-overlay in script", () => {
      expect(sourceCode).toMatch(/getElementById\("mobile-menu-overlay"\)/);
    });

    test("Should have closeMenu function", () => {
      expect(sourceCode).toMatch(/const closeMenu/);
    });

    test("Should have openMenu function", () => {
      expect(sourceCode).toMatch(/const openMenu/);
    });

    test("Should have toggleMenu function", () => {
      expect(sourceCode).toMatch(/const toggleMenu/);
    });

    test("Should handle Escape key", () => {
      expect(sourceCode).toMatch(/key === "Escape"/);
    });

    test("Should handle Tab key for focus trap", () => {
      expect(sourceCode).toMatch(/key === "Tab"/);
    });

    test("Should use CustomEvent for communication", () => {
      expect(sourceCode).toMatch(/CustomEvent\("closeMobileMenu"\)/);
    });

    test("Should manage body scroll", () => {
      expect(sourceCode).toMatch(/document\.body\.style\.overflow/);
    });

    test("Should manage focus", () => {
      expect(sourceCode).toMatch(/previousFocusedElement/);
    });
  });

  describe("Mobile-Specific Layout", () => {
    test("Should use mobile-specific IDs", () => {
      expect(sourceCode).toContain('mobile-menu-toggle');
      expect(sourceCode).toContain('mobile-menu-overlay');
    });

    test("Should have client:load directives for interactive components", () => {
      expect(sourceCode).toMatch(/<NavigationMobile[^>]*client:load/);
      expect(sourceCode).toMatch(/<SearchUtility[^>]*client:load/);
    });
  });
});
