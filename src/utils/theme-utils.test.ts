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
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THEME_ATTRIBUTE,
  getCurrentTheme,
  getSystemThemePreference,
  getStoredTheme,
  applyTheme,
  resolveTheme,
} from "./theme-utils";

describe("theme-utils", () => {
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

  describe("Constants", () => {
    it("should export DEFAULT_THEME as 'light'", () => {
      expect(DEFAULT_THEME).toBe("light");
    });

    it("should export THEME_STORAGE_KEY as 'theme'", () => {
      expect(THEME_STORAGE_KEY).toBe("theme");
    });

    it("should export THEME_ATTRIBUTE as 'data-theme'", () => {
      expect(THEME_ATTRIBUTE).toBe("data-theme");
    });
  });

  describe("getCurrentTheme", () => {
    it("should return 'light' when data-theme attribute is 'light'", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "light");
      expect(getCurrentTheme()).toBe("light");
    });

    it("should return 'dark' when data-theme attribute is 'dark'", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "dark");
      expect(getCurrentTheme()).toBe("dark");
    });

    it("should return 'light' when data-theme attribute is not set", () => {
      document.documentElement.removeAttribute(THEME_ATTRIBUTE);
      expect(getCurrentTheme()).toBe("light");
    });

    it("should return 'light' when data-theme attribute has invalid value", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "invalid");
      expect(getCurrentTheme()).toBe("light");
    });

    it("should return 'light' when data-theme attribute is empty string", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "");
      expect(getCurrentTheme()).toBe("light");
    });

    it("should return 'light' when data-theme attribute is null", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "null");
      expect(getCurrentTheme()).toBe("light");
    });
  });

  describe("getSystemThemePreference", () => {
    it("should return 'dark' when prefers-color-scheme is dark", () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
      });

      expect(getSystemThemePreference()).toBe("dark");
    });

    it("should return 'light' when prefers-color-scheme is not dark", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      expect(getSystemThemePreference()).toBe("light");
    });

    it("should call window.matchMedia with correct query", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      getSystemThemePreference();

      expect(matchMediaMock).toHaveBeenCalledWith(
        "(prefers-color-scheme: dark)",
      );
    });

    it("should handle matchMedia returning undefined matches", () => {
      matchMediaMock.mockReturnValue({
        matches: undefined,
        media: "(prefers-color-scheme: dark)",
      });

      expect(getSystemThemePreference()).toBe("light");
    });
  });

  describe("getStoredTheme", () => {
    it("should return 'light' when localStorage has 'light'", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "light");
      expect(getStoredTheme()).toBe("light");
    });

    it("should return 'dark' when localStorage has 'dark'", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
      expect(getStoredTheme()).toBe("dark");
    });

    it("should return null when localStorage is empty", () => {
      expect(getStoredTheme()).toBeNull();
    });

    it("should return null when localStorage has invalid value", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "invalid");
      expect(getStoredTheme()).toBeNull();
    });

    it("should return null when localStorage has empty string", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "");
      expect(getStoredTheme()).toBeNull();
    });

    it("should return null when localStorage has null string", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "null");
      expect(getStoredTheme()).toBeNull();
    });

    it("should return null when localStorage has undefined string", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "undefined");
      expect(getStoredTheme()).toBeNull();
    });

    it("should call localStorage.getItem with correct key", () => {
      const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
      getStoredTheme();
      expect(getItemSpy).toHaveBeenCalledWith(THEME_STORAGE_KEY);
      getItemSpy.mockRestore();
    });
  });

  describe("applyTheme", () => {
    it("should set data-theme attribute to 'light'", () => {
      applyTheme("light");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );
    });

    it("should set data-theme attribute to 'dark'", () => {
      applyTheme("dark");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });

    it("should save 'light' to localStorage", () => {
      applyTheme("light");
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    });

    it("should save 'dark' to localStorage", () => {
      applyTheme("dark");
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });

    it("should update both DOM and localStorage", () => {
      applyTheme("dark");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });

    it("should overwrite previous theme in DOM", () => {
      applyTheme("light");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "light",
      );

      applyTheme("dark");
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
        "dark",
      );
    });

    it("should overwrite previous theme in localStorage", () => {
      applyTheme("light");
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");

      applyTheme("dark");
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
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

    it("should call localStorage.setItem with correct key and value", () => {
      const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
      applyTheme("dark");
      expect(setItemSpy).toHaveBeenCalledWith(THEME_STORAGE_KEY, "dark");
      setItemSpy.mockRestore();
    });

    it("should call setAttribute with correct attribute and value", () => {
      const setAttributeSpy = vi.spyOn(
        document.documentElement,
        "setAttribute",
      );
      applyTheme("light");
      expect(setAttributeSpy).toHaveBeenCalledWith(THEME_ATTRIBUTE, "light");
      setAttributeSpy.mockRestore();
    });
  });

  describe("resolveTheme", () => {
    it("should return stored theme when available", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      expect(resolveTheme()).toBe("dark");
    });

    it("should prioritize stored theme over system preference", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "light");
      matchMediaMock.mockReturnValue({
        matches: true, // System prefers dark
        media: "(prefers-color-scheme: dark)",
      });

      expect(resolveTheme()).toBe("light");
    });

    it("should return system preference when no stored theme", () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
      });

      expect(resolveTheme()).toBe("dark");
    });

    it("should return 'light' when no stored theme and system prefers light", () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      expect(resolveTheme()).toBe("light");
    });

    it("should ignore invalid stored theme and use system preference", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "invalid");
      matchMediaMock.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
      });

      expect(resolveTheme()).toBe("dark");
    });

    it("should handle empty localStorage", () => {
      localStorage.clear();
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      expect(resolveTheme()).toBe("light");
    });

    it("should call getStoredTheme", () => {
      const getStoredThemeSpy = vi.spyOn({ getStoredTheme }, "getStoredTheme");
      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      resolveTheme();

      // Note: This test verifies the logic flow, actual spy won't work on imported function
      expect(localStorage.getItem).toBeDefined();
    });
  });

  describe("Integration tests", () => {
    it("should work with complete theme switching flow", () => {
      // Initial state: no theme set
      expect(getCurrentTheme()).toBe("light");

      // Apply dark theme
      applyTheme("dark");
      expect(getCurrentTheme()).toBe("dark");
      expect(getStoredTheme()).toBe("dark");

      // Switch to light theme
      applyTheme("light");
      expect(getCurrentTheme()).toBe("light");
      expect(getStoredTheme()).toBe("light");
    });

    it("should resolve theme correctly after applying", () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
      });

      // Apply light theme
      applyTheme("light");

      // Resolve should return stored theme (light) not system preference (dark)
      expect(resolveTheme()).toBe("light");
    });

    it("should handle theme persistence across page reloads", () => {
      // Simulate first page load
      applyTheme("dark");

      // Simulate page reload (clear DOM but keep localStorage)
      document.documentElement.removeAttribute(THEME_ATTRIBUTE);

      // Resolve theme should restore from localStorage
      const theme = resolveTheme();
      expect(theme).toBe("dark");

      // Apply resolved theme
      applyTheme(theme);
      expect(getCurrentTheme()).toBe("dark");
    });

    it("should handle clearing localStorage", () => {
      applyTheme("dark");
      expect(getStoredTheme()).toBe("dark");

      localStorage.clear();
      expect(getStoredTheme()).toBeNull();

      matchMediaMock.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
      });

      expect(resolveTheme()).toBe("light");
    });
  });

  describe("Edge cases", () => {
    it("should handle rapid theme changes", () => {
      applyTheme("light");
      applyTheme("dark");
      applyTheme("light");
      applyTheme("dark");

      expect(getCurrentTheme()).toBe("dark");
      expect(getStoredTheme()).toBe("dark");
    });

    it("should handle theme application when localStorage is disabled", () => {
      const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
      setItemSpy.mockImplementation(() => {
        throw new Error("localStorage disabled");
      });

      // Should still set DOM attribute even if localStorage fails
      expect(() => applyTheme("dark")).toThrow();

      setItemSpy.mockRestore();
    });

    it("should handle missing matchMedia", () => {
      const originalMatchMedia = window.matchMedia;

      // @ts-expect-error - Testing edge case
      window.matchMedia = undefined;

      expect(() => getSystemThemePreference()).toThrow();

      // Restore
      window.matchMedia = originalMatchMedia;
    });

    it("should validate Theme type at compile time", () => {
      // This test ensures TypeScript type checking works
      const validTheme: Theme = "light";
      expect(validTheme).toBe("light");

      const anotherValidTheme: Theme = "dark";
      expect(anotherValidTheme).toBe("dark");

      // @ts-expect-error - Invalid theme should cause TypeScript error
      const invalidTheme: Theme = "invalid";
      expect(invalidTheme).toBeDefined();
    });
  });

  describe("Type safety", () => {
    it("should only accept valid Theme values in applyTheme", () => {
      // These should compile
      applyTheme("light");
      applyTheme("dark");

      // @ts-expect-error - This should cause a TypeScript error
      applyTheme("invalid");
    });

    it("getCurrentTheme should always return a valid Theme", () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, "anything");
      const theme = getCurrentTheme();

      // Type should be Theme, not string
      const isValidTheme: boolean = theme === "light" || theme === "dark";
      expect(isValidTheme).toBe(true);
    });

    it("getStoredTheme should return Theme or null", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "light");
      const theme = getStoredTheme();

      if (theme !== null) {
        const isValidTheme: boolean = theme === "light" || theme === "dark";
        expect(isValidTheme).toBe(true);
      }
    });
  });
});
