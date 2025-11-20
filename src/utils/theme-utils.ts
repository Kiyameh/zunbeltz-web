export type Theme = "light" | "dark";

export const DEFAULT_THEME: Theme = "light";
export const THEME_STORAGE_KEY = "theme";
export const THEME_ATTRIBUTE = "data-theme";

/**
 * Obtiene el tema actual del documento
 */
export const getCurrentTheme = (): Theme => {
  const theme = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return (theme === "dark" ? "dark" : "light") as Theme;
};

/**
 * Detecta si el usuario prefiere el tema oscuro según su sistema
 */
export const getSystemThemePreference = (): Theme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/**
 * Obtiene el tema almacenado en localStorage
 */
export const getStoredTheme = (): Theme | null => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return null;
};

/**
 * Aplica un tema al documento y lo guarda en localStorage
 */
export const applyTheme = (theme: Theme): void => {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

/**
 * Determina qué tema usar basándose en preferencias almacenadas o del sistema
 */
export const resolveTheme = (): Theme => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }
  return getSystemThemePreference();
};
