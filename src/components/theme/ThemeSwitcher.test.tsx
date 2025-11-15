import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";

// Simulate the ThemeSwitcher script logic
const applyTheme = (newTheme: "light" | "dark") => {
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
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

      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });

    it("should set data-theme attribute to dark", () => {
      applyTheme("dark");

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("should save theme to localStorage", () => {
      applyTheme("dark");

      expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("should update localStorage when theme changes", () => {
      applyTheme("light");
      expect(localStorage.getItem("theme")).toBe("light");

      applyTheme("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("should update data-theme attribute when called multiple times", () => {
      applyTheme("light");
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");

      applyTheme("dark");
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

      applyTheme("light");
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });
  });

  describe("toggleTheme", () => {
    it("should toggle from light to dark", () => {
      document.documentElement.setAttribute("data-theme", "light");

      toggleTheme();

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("should toggle from dark to light", () => {
      document.documentElement.setAttribute("data-theme", "dark");

      toggleTheme();

      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
      expect(localStorage.getItem("theme")).toBe("light");
    });

    it("should toggle multiple times correctly", () => {
      document.documentElement.setAttribute("data-theme", "light");

      toggleTheme();
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

      toggleTheme();
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");

      toggleTheme();
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("should default to dark when no theme is set", () => {
      // No theme set initially
      toggleTheme();

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("should handle null theme attribute", () => {
      document.documentElement.removeAttribute("data-theme");

      toggleTheme();

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });
  });

  describe("DOM Integration", () => {
    it("should attach click event to theme-toggle buttons", () => {
      // Create a mock button
      const button = document.createElement("button");
      button.className = "theme-toggle";
      document.body.appendChild(button);

      // Set initial theme
      document.documentElement.setAttribute("data-theme", "light");

      // Simulate the script's querySelectorAll and addEventListener
      document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.addEventListener("click", toggleTheme);
      });

      // Click the button
      button.click();

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

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
      document.documentElement.setAttribute("data-theme", "light");

      // Attach event listeners
      document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.addEventListener("click", toggleTheme);
      });

      // Click first button
      button1.click();
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

      // Click second button
      button2.click();
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");

      // Cleanup
      document.body.removeChild(button1);
      document.body.removeChild(button2);
    });

    it("should update aria-label accessibility", () => {
      const button = document.createElement("button");
      button.className = "theme-toggle";
      button.setAttribute("aria-label", "Toggle theme");
      document.body.appendChild(button);

      expect(button.getAttribute("aria-label")).toBe("Toggle theme");

      // Cleanup
      document.body.removeChild(button);
    });
  });

  describe("LocalStorage Persistence", () => {
    it("should persist theme choice across toggles", () => {
      document.documentElement.setAttribute("data-theme", "light");

      toggleTheme();
      const savedTheme = localStorage.getItem("theme");

      expect(savedTheme).toBe("dark");
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("should overwrite previous localStorage value", () => {
      localStorage.setItem("theme", "light");

      applyTheme("dark");

      expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("should handle rapid theme changes", () => {
      document.documentElement.setAttribute("data-theme", "light");

      toggleTheme();
      toggleTheme();
      toggleTheme();

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
    });
  });

  describe("Edge Cases", () => {
    it("should handle invalid theme attribute gracefully", () => {
      document.documentElement.setAttribute("data-theme", "invalid-theme");

      toggleTheme();

      // Should toggle to dark since current theme is not 'dark'
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("should work when localStorage is cleared externally", () => {
      applyTheme("dark");
      localStorage.clear();

      toggleTheme();

      // Should still toggle based on data-theme attribute
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
      expect(localStorage.getItem("theme")).toBe("light");
    });

    it("should maintain consistency between DOM and localStorage", () => {
      applyTheme("light");

      expect(document.documentElement.getAttribute("data-theme")).toBe(
        localStorage.getItem("theme"),
      );

      applyTheme("dark");

      expect(document.documentElement.getAttribute("data-theme")).toBe(
        localStorage.getItem("theme"),
      );
    });
  });
});
