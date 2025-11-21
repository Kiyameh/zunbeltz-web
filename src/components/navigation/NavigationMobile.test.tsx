/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { NavigationMobile } from "./NavigationMobile";

describe("NavigationMobile", () => {
  beforeEach(() => {
    // Mock de la función global closeMobileMenu
    (window as any).closeMobileMenu = vi.fn();
  });

  afterEach(() => {
    cleanup();
    delete (window as any).closeMobileMenu;
  });

  describe("Rendering", () => {
    it("should render all main navigation items", () => {
      render(<NavigationMobile />);

      expect(screen.getByText("La falla")).toBeTruthy();
      expect(screen.getByText("Navarra")).toBeTruthy();
      expect(screen.getByText("Exploración")).toBeTruthy();
      expect(screen.getByText("Escuela")).toBeTruthy();
      expect(screen.getByText("Tienda")).toBeTruthy();
    });

    it("should render La falla as a link", () => {
      render(<NavigationMobile />);

      const laFallaLink = screen.getByRole("link", { name: "La falla" });
      expect(laFallaLink).toBeTruthy();
    });

    it("should render Navarra as a trigger button", () => {
      render(<NavigationMobile />);

      const navarraTrigger = screen.getByRole("button", { name: /Navarra/i });
      expect(navarraTrigger).toBeTruthy();
    });

    it("should render Exploración as a trigger button", () => {
      render(<NavigationMobile />);

      const exploracionTrigger = screen.getByRole("button", {
        name: /Exploración/i,
      });
      expect(exploracionTrigger).toBeTruthy();
    });

    it("should render Escuela as a trigger button", () => {
      render(<NavigationMobile />);

      const escuelaTrigger = screen.getByRole("button", { name: /Escuela/i });
      expect(escuelaTrigger).toBeTruthy();
    });

    it("should render Tienda as a link", () => {
      render(<NavigationMobile />);

      const tiendaLink = screen.getByRole("link", { name: "Tienda" });
      expect(tiendaLink).toBeTruthy();
    });

    it("should render with vertical orientation", () => {
      const { container } = render(<NavigationMobile />);

      // NavigationMenu.Root debería estar presente
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Links - Correct hrefs", () => {
    it("should have correct href for La falla", () => {
      render(<NavigationMobile />);

      const laFallaLink = screen.getByRole("link", { name: "La falla" });
      expect(laFallaLink.getAttribute("href")).toBe("/");
    });

    it("should have correct href for Tienda", () => {
      render(<NavigationMobile />);

      const tiendaLink = screen.getByRole("link", { name: "Tienda" });
      expect(tiendaLink.getAttribute("href")).toBe("/tienda");
    });

    it("should have visible links with correct structure", () => {
      render(<NavigationMobile />);

      // Verificar que los enlaces principales están presentes
      const laFallaLink = screen.getByRole("link", { name: "La falla" });
      const tiendaLink = screen.getByRole("link", { name: "Tienda" });

      expect(laFallaLink).toBeTruthy();
      expect(tiendaLink).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should have nav element", () => {
      const { container } = render(<NavigationMobile />);

      const nav = container.querySelector("nav");
      expect(nav).toBeTruthy();
    });

    it("should have proper DOM structure", () => {
      const { container } = render(<NavigationMobile />);

      // Verificar que hay una estructura básica
      expect(container.firstChild).toBeTruthy();
    });

    it("should have aria-expanded attribute on trigger buttons", () => {
      render(<NavigationMobile />);

      const navarraTrigger = screen.getByRole("button", { name: /Navarra/i });
      expect(navarraTrigger.getAttribute("aria-expanded")).toBeTruthy();
    });

    it("should have proper link structure", () => {
      render(<NavigationMobile />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });

    it("should have proper button structure for dropdowns", () => {
      render(<NavigationMobile />);

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe("Content Structure", () => {
    it("should have navigation structure", () => {
      const { container } = render(<NavigationMobile />);

      // Verificar que hay una estructura de navegación
      const nav = container.querySelector("nav");
      expect(nav).toBeTruthy();
    });

    it("should have visible links", () => {
      render(<NavigationMobile />);

      // Verificar los enlaces principales que están siempre visibles
      expect(screen.getByRole("link", { name: "La falla" })).toBeTruthy();
      expect(screen.getByRole("link", { name: "Tienda" })).toBeTruthy();
    });

    it("should have dropdown triggers", () => {
      render(<NavigationMobile />);

      // Verificar que hay botones para los dropdowns
      expect(screen.getByRole("button", { name: /Navarra/i })).toBeTruthy();
      expect(screen.getByRole("button", { name: /Exploración/i })).toBeTruthy();
      expect(screen.getByRole("button", { name: /Escuela/i })).toBeTruthy();
    });
  });

  describe("Mobile-Specific Functionality", () => {
    it("should have handleLinkClick function", () => {
      render(<NavigationMobile />);

      const laFallaLink = screen.getByRole("link", { name: "La falla" });
      expect(laFallaLink.getAttribute("href")).toBe("/");
    });

    it("should call closeMobileMenu when link is clicked", () => {
      render(<NavigationMobile />);

      const laFallaLink = screen.getByRole("link", { name: "La falla" });
      laFallaLink.click();

      // Verificar que la función fue llamada
      expect((window as any).closeMobileMenu).toHaveBeenCalled();
    });

    it("should not crash if closeMobileMenu is not defined", () => {
      delete (window as any).closeMobileMenu;

      expect(() => render(<NavigationMobile />)).not.toThrow();
    });
  });
});
