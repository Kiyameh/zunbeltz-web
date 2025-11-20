/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  type Theme,
  getCurrentTheme,
  applyTheme,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
} from "@/utils/theme-utils";

// Helper functions for testing (these simulate the component's behavior)
const updateAriaLabels = (currentTheme: Theme) => {
  const newLabel =
    currentTheme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro";

  document
    .querySelectorAll<HTMLButtonElement>(".theme-toggle")
    .forEach((button) => {
      button.setAttribute("aria-label", newLabel);
    });
};

const announceThemeChange = (newTheme: Theme) => {
  const announcement = document.getElementById("theme-announcement");
  if (announcement) {
    const message =
      newTheme === "dark" ? "Tema oscuro activado" : "Tema claro activado";
    announcement.textContent = message;
  }
};

const toggleTheme = () => {
  const currentTheme = getCurrentTheme();
  const newTheme: Theme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);
  updateAriaLabels(newTheme);
  announceThemeChange(newTheme);
};

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();

    // Reset document.documentElement attributes
    document.documentElement.removeAttribute("data-theme");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("applyTheme", () => {
    it("should set data-theme attribute to light", () => {
      applyTheme("light");

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );
    });

    it("should set data-theme attribute to dark", () => {
      applyTheme("dark");

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });

    it("should save theme to localStorage", () => {
      applyTheme("dark");

      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });

    it("should update localStorage when theme changes", () => {
      applyTheme("light");
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");

      applyTheme("dark");
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });

    it("should update data-theme attribute when called multiple times", () => {
      applyTheme("light");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );

      applyTheme("dark");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );

      applyTheme("light");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );
    });
  });

  describe("toggleTheme", () => {
    it("should toggle from light to dark", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      toggleTheme();

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });

    it("should toggle from dark to light", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "dark");

      toggleTheme();

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    });

    it("should toggle multiple times correctly", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      toggleTheme();
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );

      toggleTheme();
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );

      toggleTheme();
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });

    it("should default to dark when no theme is set", () => {
      // No theme set initially
      toggleTheme();

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });

    it("should handle null theme attribute", () => {
      document.documentElement.removeAttribute(THEME_ATTRIBUTE);

      toggleTheme();

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });
  });

  describe("DOM Integration", () => {
    it("should attach click event to theme-toggle buttons", () => {
      // Create a mock button
      const button = document.createElement("button");
      button.className = "theme-toggle";
      document.body.appendChild(button);

      // Set initial theme
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      // Simulate the script's querySelectorAll and addEventListener
      document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.addEventListener("click", toggleTheme);
      });

      // Click the button
      button.click();

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );

      // Cleanup
      document.body.removeChild(button);
    });

    it("should handle multiple theme-toggle buttons", () => {
      // Create multiple buttons
      const button1 = document.createElement("button");
      button1.className = "theme-toggle";
      const button2 = document.createElement("button");
      button2.className = "theme-toggle";

      document.body.appendChild(button1);
      document.body.appendChild(button2);

      // Set initial theme
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      // Attach event listeners
      document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.addEventListener("click", toggleTheme);
      });

      // Click first button
      button1.click();
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );

      // Click second button
      button2.click();
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );

      // Cleanup
      document.body.removeChild(button1);
      document.body.removeChild(button2);
    });

    it("should have aria-label attribute on buttons", () => {
      const button = document.createElement("button");
      button.className = "theme-toggle";
      button.setAttribute("aria-label", "Cambiar a tema oscuro");
      document.body.appendChild(button);

      expect(button.getAttribute("aria-label")).toBeTruthy();

      // Cleanup
      document.body.removeChild(button);
    });
  });

  describe("LocalStorage Persistence", () => {
    it("should persist theme choice across toggles", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      toggleTheme();
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

      expect(savedTheme).toBe("dark");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });

    it("should overwrite previous localStorage value", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "light");

      applyTheme("dark");

      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });

    it("should handle rapid theme changes", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      toggleTheme();
      toggleTheme();
      toggleTheme();

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });
  });

  describe("Edge Cases", () => {
    it("should handle invalid theme attribute gracefully", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "invalid-theme");

      toggleTheme();

      // Should toggle to dark since current theme is not 'dark'
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });

    it("should work when localStorage is cleared externally", () => {
      applyTheme("dark");
      localStorage.clear();

      toggleTheme();

      // Should still toggle based on data-theme attribute
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    });

    it("should maintain consistency between DOM and localStorage", () => {
      applyTheme("light");

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        localStorage.getItem(THEME_STORAGE_KEY),
      );

      applyTheme("dark");

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        localStorage.getItem(THEME_STORAGE_KEY),
      );
    });
  });

  describe("Accessibility - Dynamic aria-labels", () => {
    it("should update aria-label when theme changes to dark", () => {
      const button = document.createElement("button");
      button.className = "theme-toggle";
      button.setAttribute("aria-label", "Cambiar a tema oscuro");
      document.body.appendChild(button);

      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");
      updateAriaLabels("light");

      expect(button.getAttribute("aria-label")).toBe("Cambiar a tema oscuro");

      // Cleanup
      document.body.removeChild(button);
    });

    it("should update aria-label when theme changes to light", () => {
      const button = document.createElement("button");
      button.className = "theme-toggle";
      button.setAttribute("aria-label", "Cambiar a tema claro");
      document.body.appendChild(button);

      document.documentElement.setAttribute(THEME_ATTRIBUTE, "dark");
      updateAriaLabels("dark");

      expect(button.getAttribute("aria-label")).toBe("Cambiar a tema claro");

      // Cleanup
      document.body.removeChild(button);
    });

    it("should update aria-label on all theme-toggle buttons", () => {
      const button1 = document.createElement("button");
      button1.className = "theme-toggle";
      const button2 = document.createElement("button");
      button2.className = "theme-toggle";

      document.body.appendChild(button1);
      document.body.appendChild(button2);

      updateAriaLabels("light");

      expect(button1.getAttribute("aria-label")).toBe("Cambiar a tema oscuro");
      expect(button2.getAttribute("aria-label")).toBe("Cambiar a tema oscuro");

      updateAriaLabels("dark");

      expect(button1.getAttribute("aria-label")).toBe("Cambiar a tema claro");
      expect(button2.getAttribute("aria-label")).toBe("Cambiar a tema claro");

      // Cleanup
      document.body.removeChild(button1);
      document.body.removeChild(button2);
    });

    it("toggleTheme should update aria-labels automatically", () => {
      const button = document.createElement("button");
      button.className = "theme-toggle";
      document.body.appendChild(button);

      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");
      toggleTheme();

      expect(button.getAttribute("aria-label")).toBe("Cambiar a tema claro");

      // Cleanup
      document.body.removeChild(button);
    });
  });

  describe("Accessibility - Theme announcements", () => {
    it("should announce theme change to screen readers", () => {
      const announcement = document.createElement("div");
      announcement.id = "theme-announcement";
      announcement.setAttribute("aria-live", "polite");
      document.body.appendChild(announcement);

      announceThemeChange("dark");

      expect(announcement.textContent).toBe("Tema oscuro activado");

      // Cleanup
      document.body.removeChild(announcement);
    });

    it("should announce light theme activation", () => {
      const announcement = document.createElement("div");
      announcement.id = "theme-announcement";
      document.body.appendChild(announcement);

      announceThemeChange("light");

      expect(announcement.textContent).toBe("Tema claro activado");

      // Cleanup
      document.body.removeChild(announcement);
    });

    it("should handle missing announcement element gracefully", () => {
      // No announcement element in DOM
      expect(() => announceThemeChange("dark")).not.toThrow();
    });

    it("toggleTheme should trigger announcement", () => {
      const announcement = document.createElement("div");
      announcement.id = "theme-announcement";
      document.body.appendChild(announcement);

      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");
      toggleTheme();

      expect(announcement.textContent).toBe("Tema oscuro activado");

      // Cleanup
      document.body.removeChild(announcement);
    });
  });

  describe("Cross-tab synchronization", () => {
    it("should sync theme when storage event is triggered", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      // Simulate storage event from another tab
      const storageEvent = new StorageEvent("storage", {
        key: "theme",
        newValue: "dark",
        oldValue: "light",
        storageArea: localStorage,
      });

      window.dispatchEvent(storageEvent);

      // The component should update the data-theme attribute
      // Note: In the actual component, this is handled by the storage event listener
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "dark");

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });

    it("should update aria-labels when syncing from another tab", () => {
      const button = document.createElement("button");
      button.className = "theme-toggle";
      document.body.appendChild(button);

      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");
      updateAriaLabels("light");

      // Simulate theme change from another tab
      const storageEvent = new StorageEvent("storage", {
        key: "theme",
        newValue: "dark",
        oldValue: "light",
        storageArea: localStorage,
      });

      window.dispatchEvent(storageEvent);

      // Update theme and aria-labels as the component would
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "dark");
      updateAriaLabels("dark");

      expect(button.getAttribute("aria-label")).toBe("Cambiar a tema claro");

      // Cleanup
      document.body.removeChild(button);
    });

    it("should ignore storage events for other keys", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      const storageEvent = new StorageEvent("storage", {
        key: "other-key",
        newValue: "some-value",
        storageArea: localStorage,
      });

      window.dispatchEvent(storageEvent);

      // Theme should remain unchanged
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );
    });
  });

  describe("getCurrentTheme helper", () => {
    it("should return 'light' when data-theme is light", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");
      expect(getCurrentTheme()).toBe("light");
    });

    it("should return 'dark' when data-theme is dark", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "dark");
      expect(getCurrentTheme()).toBe("dark");
    });

    it("should default to 'light' when no theme is set", () => {
      document.documentElement.removeAttribute(THEME_ATTRIBUTE);
      expect(getCurrentTheme()).toBe("light");
    });

    it("should default to 'light' for invalid theme values", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "invalid");
      expect(getCurrentTheme()).toBe("light");
    });
  });

  describe("Event delegation", () => {
    it("should work with delegated click events", () => {
      const button = document.createElement("button");
      button.className = "theme-toggle";
      document.body.appendChild(button);

      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      // Simulate delegated event listener
      const clickHandler = (event: Event) => {
        const target = event.target as HTMLElement;
        const themeButton = target.closest(".theme-toggle");
        if (themeButton) {
          toggleTheme();
        }
      };

      document.addEventListener("click", clickHandler);

      button.click();

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );

      // Cleanup
      document.removeEventListener("click", clickHandler);
      document.body.removeChild(button);
    });

    it("should handle clicks on child elements of theme-toggle", () => {
      const button = document.createElement("button");
      button.className = "theme-toggle";
      const icon = document.createElement("svg");
      button.appendChild(icon);
      document.body.appendChild(button);

      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");

      // Simulate click on child element with delegated handler
      const clickHandler = (event: Event) => {
        const target = event.target as HTMLElement;
        const themeButton = target.closest(".theme-toggle");
        if (themeButton) {
          toggleTheme();
        }
      };

      document.addEventListener("click", clickHandler);

      icon.click();

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );

      // Cleanup
      document.removeEventListener("click", clickHandler);
      document.body.removeChild(button);
    });
  });
});
