import { describe, it, expect } from "vitest";
import {
  getFacebookShareUrl,
  getTwitterShareUrl,
  getWhatsAppShareUrl,
  generateShareLinks,
} from "./socialUtils";

describe("socialUtils", () => {
  describe("getFacebookShareUrl", () => {
    it("debe generar URL correcta para Facebook", () => {
      const url = "https://zunbeltz.org/blog/mi-post";
      const result = getFacebookShareUrl(url);

      expect(result).toBe(
        "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzunbeltz.org%2Fblog%2Fmi-post",
      );
    });

    it("debe codificar correctamente URLs con parámetros", () => {
      const url = "https://zunbeltz.org/blog/post?ref=social&utm_source=test";
      const result = getFacebookShareUrl(url);

      expect(result).toContain("https://www.facebook.com/sharer/sharer.php?u=");
      expect(result).toContain("%3F"); // ? codificado
      expect(result).toContain("%26"); // & codificado
    });

    it("debe manejar URLs con caracteres especiales", () => {
      const url = "https://zunbeltz.org/blog/guía-astro";
      const result = getFacebookShareUrl(url);

      expect(result).toContain("gu%C3%ADa"); // í codificado
    });
  });

  describe("getTwitterShareUrl", () => {
    it("debe generar URL correcta para Twitter/X", () => {
      const url = "https://zunbeltz.org/blog/mi-post";
      const text = "Mi Post Increíble";
      const result = getTwitterShareUrl(url, text);

      expect(result).toBe(
        "https://twitter.com/intent/tweet?url=https%3A%2F%2Fzunbeltz.org%2Fblog%2Fmi-post&text=Mi%20Post%20Incre%C3%ADble",
      );
    });

    it("debe codificar correctamente el texto con espacios", () => {
      const url = "https://zunbeltz.org/blog/test";
      const text = "Esto es un título largo con espacios";
      const result = getTwitterShareUrl(url, text);

      expect(result).toContain(
        "text=Esto%20es%20un%20t%C3%ADtulo%20largo%20con%20espacios",
      );
    });

    it("debe manejar caracteres especiales en el texto", () => {
      const url = "https://zunbeltz.org/blog/test";
      const text = "¡Título con ñ y acentos!";
      const result = getTwitterShareUrl(url, text);

      expect(result).toContain("%C3%B1"); // ñ codificado
      expect(result).toContain("%C3%AD"); // í codificado
    });

    it("debe manejar emojis en el texto", () => {
      const url = "https://zunbeltz.org/blog/test";
      const text = "Post increíble 🚀";
      const result = getTwitterShareUrl(url, text);

      expect(result).toContain("text=Post%20incre%C3%ADble%20%F0%9F%9A%80");
    });
  });

  describe("getWhatsAppShareUrl", () => {
    it("debe generar URL correcta para WhatsApp", () => {
      const url = "https://zunbeltz.org/blog/mi-post";
      const text = "Mi Post";
      const result = getWhatsAppShareUrl(url, text);

      expect(result).toBe(
        "https://wa.me/?text=Mi%20Post%20https%3A%2F%2Fzunbeltz.org%2Fblog%2Fmi-post",
      );
    });

    it("debe separar texto y URL con espacio codificado", () => {
      const url = "https://zunbeltz.org/blog/test";
      const text = "Título";
      const result = getWhatsAppShareUrl(url, text);

      expect(result).toContain("text=T%C3%ADtulo%20https%3A%2F%2F");
    });

    it("debe manejar textos largos", () => {
      const url = "https://zunbeltz.org/blog/test";
      const text =
        "Este es un título muy largo que debería funcionar correctamente";
      const result = getWhatsAppShareUrl(url, text);

      expect(result).toContain("https://wa.me/?text=");
      expect(result).toContain(encodeURIComponent(text));
    });
  });

  describe("generateShareLinks", () => {
    it("debe generar todas las URLs de compartir", () => {
      const url = "https://zunbeltz.org/blog/test-post";
      const title = "Post de Prueba";
      const result = generateShareLinks(url, title);

      expect(result).toHaveProperty("facebook");
      expect(result).toHaveProperty("x");
      expect(result).toHaveProperty("whatsapp");

      expect(result.facebook).toContain("facebook.com/sharer");
      expect(result.x).toContain("twitter.com/intent/tweet");
      expect(result.whatsapp).toContain("wa.me");
    });

    it("debe generar URLs válidas para todas las plataformas", () => {
      const url = "https://zunbeltz.org/blog/guía-completa";
      const title = "Guía Completa de Astro";
      const result = generateShareLinks(url, title);

      // Verificar que todas las URLs son strings válidas
      expect(typeof result.facebook).toBe("string");
      expect(typeof result.x).toBe("string");
      expect(typeof result.whatsapp).toBe("string");

      // Verificar que todas empiezan con https://
      expect(result.facebook).toMatch(/^https:\/\//);
      expect(result.x).toMatch(/^https:\/\//);
      expect(result.whatsapp).toMatch(/^https:\/\//);
    });

    it("debe manejar URLs y títulos con caracteres especiales", () => {
      const url = "https://zunbeltz.org/blog/post?ref=test&id=123";
      const title = "¡Título con ñ, acentos y símbolos!";
      const result = generateShareLinks(url, title);

      // Verificar que los caracteres especiales están codificados
      // La URL de Facebook contiene ? del parámetro u=, pero el ? original debe estar codificado
      expect(result.facebook).toContain("%3F"); // ? codificado
      expect(result.facebook).toContain("%26"); // & codificado
      expect(result.x).not.toContain("ñ"); // ñ debe estar codificado
      expect(result.x).toContain("%C3%B1"); // ñ codificado
      // WhatsApp puede contener ! al final de la URL, verificar que el contenido esté codificado
      expect(result.whatsapp).toContain("%C3%B1"); // ñ codificado
      expect(result.whatsapp).toContain("%C3%AD"); // í codificado
    });
  });

  describe("Casos extremos", () => {
    it("debe manejar URLs vacías", () => {
      const url = "";
      const title = "Título";

      expect(() => getFacebookShareUrl(url)).not.toThrow();
      expect(() => getTwitterShareUrl(url, title)).not.toThrow();
      expect(() => getWhatsAppShareUrl(url, title)).not.toThrow();
    });

    it("debe manejar títulos vacíos", () => {
      const url = "https://zunbeltz.org/blog/test";
      const title = "";

      expect(() => getTwitterShareUrl(url, title)).not.toThrow();
      expect(() => getWhatsAppShareUrl(url, title)).not.toThrow();
    });

    it("debe manejar URLs muy largas", () => {
      const url = "https://zunbeltz.org/blog/" + "a".repeat(1000);
      const title = "Título";
      const result = generateShareLinks(url, title);

      expect(result.facebook).toContain("facebook.com");
      expect(result.x).toContain("twitter.com");
      expect(result.whatsapp).toContain("wa.me");
    });

    it("debe manejar títulos muy largos", () => {
      const url = "https://zunbeltz.org/blog/test";
      const title = "T".repeat(500);
      const result = generateShareLinks(url, title);

      expect(result.x).toContain("text=");
      expect(result.whatsapp).toContain("text=");
    });
  });

  describe("Validación de formato de URL", () => {
    it("debe generar URLs que sean válidas según URL API", () => {
      const url = "https://zunbeltz.org/blog/test";
      const title = "Test Post";
      const result = generateShareLinks(url, title);

      // Verificar que las URLs generadas son válidas
      expect(() => new URL(result.facebook)).not.toThrow();
      expect(() => new URL(result.x)).not.toThrow();
      expect(() => new URL(result.whatsapp)).not.toThrow();
    });

    it("debe preservar el protocolo https en las URLs generadas", () => {
      const url = "https://zunbeltz.org/blog/test";
      const title = "Test";
      const result = generateShareLinks(url, title);

      expect(result.facebook.startsWith("https://")).toBe(true);
      expect(result.x.startsWith("https://")).toBe(true);
      expect(result.whatsapp.startsWith("https://")).toBe(true);
    });
  });
});
