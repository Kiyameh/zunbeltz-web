import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import "@testing-library/jest-dom";

// Simulate the ThemeLoader script logic
const themeLoaderScript = (defaultTheme: string) => {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  let themeToSet = defaultTheme;

  if (storedTheme) {
    themeToSet = storedTheme;
  } else if (prefersDark) {
    themeToSet = "dark";
  }

  document.documentElement.setAttribute("data-theme", themeToSet);
  return themeToSet;
};

describe("ThemeLoader", () => {
  const defaultTheme = "light";
  let matchMediaMock: Mock;

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();

    // Reset document.documentElement attributes
    document.documentElement.removeAttribute("data-theme");

    // Mock window.matchMedia
    matchMediaMock = vi.fn();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Theme Selection Logic", () => {
    it("should use default theme when no stored theme and no dark preference", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("light");
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });

    it("should use stored theme when available", () => {
      localStorage.setItem("theme", "dark");
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("dark");
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("should use dark theme when prefers-color-scheme is dark and no stored theme", () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("dark");
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("should prioritize stored theme over system preference", () => {
      localStorage.setItem("theme", "light");
      matchMediaMock.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("light");
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });

    it("should handle custom theme values from localStorage", () => {
      localStorage.setItem("theme", "custom-theme");
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("custom-theme");
      expect(document.documentElement.getAttribute("data-theme")).toBe(
        "custom-theme",
      );
    });
  });

  describe("DOM Manipulation", () => {
    it("should set data-theme attribute on document.documentElement", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      themeLoaderScript(defaultTheme);

      expect(document.documentElement.hasAttribute("data-theme")).toBe(true);
    });

    it("should update data-theme attribute when theme changes", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      // First call with default theme
      themeLoaderScript(defaultTheme);
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");

      // Second call with stored theme
      localStorage.setItem("theme", "dark");
      themeLoaderScript(defaultTheme);
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });
  });

  describe("LocalStorage Integration", () => {
    it("should read theme from localStorage", () => {
      const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
      localStorage.setItem("theme", "dark");
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      themeLoaderScript(defaultTheme);

      expect(getItemSpy).toHaveBeenCalledWith("theme");
      getItemSpy.mockRestore();
    });

    it("should handle null value from localStorage", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("light");
    });

    it("should handle empty string from localStorage", () => {
      localStorage.setItem("theme", "");
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      // Empty string is falsy, so it should use default or system preference
      expect(theme).toBe("light");
    });
  });

  describe("Media Query Integration", () => {
    it("should call window.matchMedia with correct query", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      themeLoaderScript(defaultTheme);

      expect(matchMediaMock).toHaveBeenCalledWith(
        "(prefers-color-scheme: dark)",
      );
    });

    it("should handle matchMedia returning matches: true", () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("dark");
    });

    it("should handle matchMedia returning matches: false", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("light");
    });
  });

  describe("Default Theme Configuration", () => {
    it('should use "light" as default theme', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript("light");

      expect(theme).toBe("light");
    });

    it("should support different default themes", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript("dark");

      expect(theme).toBe("dark");
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });
  });
});
