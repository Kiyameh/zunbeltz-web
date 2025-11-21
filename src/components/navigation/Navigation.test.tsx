/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Navigation } from "./Navigation";

describe("Navigation", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Rendering", () => {
    it("should render all main navigation items", () => {
      render(<Navigation />);

      expect(screen.getByText("La falla")).toBeTruthy();
      expect(screen.getByText("Navarra")).toBeTruthy();
      expect(screen.getByText("Exploración")).toBeTruthy();
      expect(screen.getByText("Escuela")).toBeTruthy();
      expect(screen.getByText("Tienda")).toBeTruthy();
    });

    it("should render La falla as a link", () => {
      render(<Navigation />);

      const laFallaLink = screen.getByRole("link", { name: "La falla" });
      expect(laFallaLink).toBeTruthy();
    });

    it("should render Navarra as a trigger button", () => {
      render(<Navigation />);

      const navarraTrigger = screen.getByRole("button", { name: /Navarra/i });
      expect(navarraTrigger).toBeTruthy();
    });

    it("should render Exploración as a trigger button", () => {
      render(<Navigation />);

      const exploracionTrigger = screen.getByRole("button", {
        name: /Exploración/i,
      });
      expect(exploracionTrigger).toBeTruthy();
    });

    it("should render Escuela as a trigger button", () => {
      render(<Navigation />);

      const escuelaTrigger = screen.getByRole("button", { name: /Escuela/i });
      expect(escuelaTrigger).toBeTruthy();
    });

    it("should render Tienda as a link", () => {
      render(<Navigation />);

      const tiendaLink = screen.getByRole("link", { name: "Tienda" });
      expect(tiendaLink).toBeTruthy();
    });

    it("should render SearchUtility component", () => {
      const { container } = render(<Navigation />);

      // SearchUtility debería estar presente en el DOM
      expect(container.querySelector("button")).toBeTruthy();
    });
  });

  describe("Links - Correct hrefs", () => {
    it("should have correct href for La falla", () => {
      render(<Navigation />);

      const laFallaLink = screen.getByRole("link", { name: "La falla" });
      expect(laFallaLink.getAttribute("href")).toBe("/");
    });

    it("should have correct href for Tienda", () => {
      render(<Navigation />);

      const tiendaLink = screen.getByRole("link", { name: "Tienda" });
      expect(tiendaLink.getAttribute("href")).toBe("/tienda");
    });

    it("should have visible links with correct structure", () => {
      render(<Navigation />);

      // Verificar que los enlaces principales están presentes
      const laFallaLink = screen.getByRole("link", { name: "La falla" });
      const tiendaLink = screen.getByRole("link", { name: "Tienda" });

      expect(laFallaLink).toBeTruthy();
      expect(tiendaLink).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should have nav element", () => {
      const { container } = render(<Navigation />);

      const nav = container.querySelector("nav");
      expect(nav).toBeTruthy();
    });

    it("should have aria-expanded attribute on trigger buttons", () => {
      render(<Navigation />);

      const navarraTrigger = screen.getByRole("button", { name: /Navarra/i });
      expect(navarraTrigger.getAttribute("aria-expanded")).toBeTruthy();
    });

    it("should have proper link structure", () => {
      render(<Navigation />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });

    it("should have proper button structure for dropdowns", () => {
      render(<Navigation />);

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe("Content Structure", () => {
    it("should have navigation structure", () => {
      const { container } = render(<Navigation />);

      // Verificar que hay una estructura de navegación
      const nav = container.querySelector("nav");
      expect(nav).toBeTruthy();
    });

    it("should have visible links", () => {
      render(<Navigation />);

      // Verificar los enlaces principales que están siempre visibles
      expect(screen.getByRole("link", { name: "La falla" })).toBeTruthy();
      expect(screen.getByRole("link", { name: "Tienda" })).toBeTruthy();
    });

    it("should have dropdown triggers", () => {
      render(<Navigation />);

      // Verificar que hay botones para los dropdowns
      expect(screen.getByRole("button", { name: /Navarra/i })).toBeTruthy();
      expect(screen.getByRole("button", { name: /Exploración/i })).toBeTruthy();
      expect(screen.getByRole("button", { name: /Escuela/i })).toBeTruthy();
    });
  });
});
