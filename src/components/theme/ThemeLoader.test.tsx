/**
 * @vitest-environment jsdom
 */

import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import {
  type Theme,
  resolveTheme,
  THEME_STORAGE_KEY,
  THEME_ATTRIBUTE,
  DEFAULT_THEME,
} from "@/utils/theme-utils";

// Simulate the ThemeLoader script logic (matches the refactored component)
const themeLoaderScript = (defaultTheme: Theme) => {
  const theme = resolveTheme();
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  return theme;
};

describe("ThemeLoader", () => {
  const defaultTheme = "light";
  let matchMediaMock: Mock;

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();

    // Reset document.documentElement attributes
    document.documentElement.removeAttribute(THEME_ATTRIBUTE);

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
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );
    });

    it("should use stored theme when available", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("dark");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });

    it("should use dark theme when prefers-color-scheme is dark and no stored theme", () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("dark");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });

    it("should prioritize stored theme over system preference", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "light");
      matchMediaMock.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      expect(theme).toBe("light");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );
    });

    it("should ignore invalid theme values from localStorage", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "custom-theme");
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(defaultTheme);

      // Invalid themes are ignored, should fall back to default
      expect(theme).toBe("light");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
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
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );

      // Second call with stored theme
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
      themeLoaderScript(defaultTheme);
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });
  });

  describe("LocalStorage Integration", () => {
    it("should read theme from localStorage", () => {
      const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      themeLoaderScript(defaultTheme);

      expect(getItemSpy).toHaveBeenCalledWith(THEME_STORAGE_KEY);
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
      localStorage.setItem(THEME_STORAGE_KEY, "");
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

    it("should use DEFAULT_THEME constant", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      const theme = themeLoaderScript(DEFAULT_THEME);

      expect(theme).toBe(DEFAULT_THEME);
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        DEFAULT_THEME,
      );
    });
  });
});
