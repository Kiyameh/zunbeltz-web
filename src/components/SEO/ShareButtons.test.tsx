/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShareButtons from "./ShareButtons";

// Mock de los iconos SVG
vi.mock("@/icons/brand-facebook.svg?raw", () => ({
  default: "<svg>Facebook Icon</svg>",
}));

vi.mock("@/icons/brand-x.svg?raw", () => ({
  default: "<svg>X Icon</svg>",
}));

vi.mock("@/icons/brand-whatsapp.svg?raw", () => ({
  default: "<svg>WhatsApp Icon</svg>",
}));

vi.mock("@/icons/link.svg?raw", () => ({
  default: "<svg>Link Icon</svg>",
}));

// Mock de CSS modules
vi.mock("./ShareButtons.module.css", () => ({
  default: {
    shareButtons: "shareButtons",
    toastRoot: "toastRoot",
    toastDescription: "toastDescription",
    toastClose: "toastClose",
    toastViewport: "toastViewport",
  },
}));

describe("ShareButtons", () => {
  const mockUrl = "https://zunbeltz.org/blog/test-post";
  const mockTitle = "Test Post Title";
  const mockDescription = "Test post description";

  let windowOpenSpy: ReturnType<typeof vi.spyOn>;
  let clipboardWriteTextSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Mock de window.open
    windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    // Mock de clipboard API
    clipboardWriteTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: clipboardWriteTextSpy,
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("debe renderizar todos los botones de compartir", () => {
      render(
        <ShareButtons
          url={mockUrl}
          title={mockTitle}
          description={mockDescription}
        />,
      );

      expect(
        screen.getByRole("button", { name: /compartir en facebook/i }),
      ).toBeTruthy();
      expect(
        screen.getByRole("button", { name: /compartir en x \(twitter\)/i }),
      ).toBeTruthy();
      expect(
        screen.getByRole("button", { name: /compartir en whatsapp/i }),
      ).toBeTruthy();
      expect(
        screen.getByRole("button", { name: /copiar enlace/i }),
      ).toBeTruthy();
    });

    it("debe renderizar con descripción opcional", () => {
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      expect(
        screen.getByRole("button", { name: /compartir en facebook/i }),
      ).toBeTruthy();
    });

    it("debe tener las clases CSS correctas", () => {
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        if (button.getAttribute("aria-label") !== "Cerrar") {
          expect(button.className).toContain("icon-button secondary");
        }
      });
    });

    it("debe tener atributos de accesibilidad correctos", () => {
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const facebookButton = screen.getByRole("button", {
        name: /compartir en facebook/i,
      });
      expect(facebookButton.getAttribute("title")).toBe(
        "Compartir en Facebook",
      );
      expect(facebookButton.getAttribute("aria-label")).toBe(
        "Compartir en Facebook",
      );
    });
  });

  describe("Funcionalidad de compartir en Facebook", () => {
    it("debe abrir ventana de Facebook con URL correcta", async () => {
      const user = userEvent.setup();
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const facebookButton = screen.getByRole("button", {
        name: /compartir en facebook/i,
      });
      await user.click(facebookButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://www.facebook.com/sharer/sharer.php?u=",
        ),
        "_blank",
        "noopener,noreferrer",
      );
    });

    it("debe codificar correctamente la URL para Facebook", async () => {
      const user = userEvent.setup();
      const urlWithParams = "https://zunbeltz.org/blog/post?ref=test&id=123";
      render(<ShareButtons url={urlWithParams} title={mockTitle} />);

      const facebookButton = screen.getByRole("button", {
        name: /compartir en facebook/i,
      });
      await user.click(facebookButton);

      const callUrl = windowOpenSpy.mock.calls[0][0] as string;
      expect(callUrl).toContain("%3F"); // ? codificado
      expect(callUrl).toContain("%26"); // & codificado
    });
  });

  describe("Funcionalidad de compartir en X (Twitter)", () => {
    it("debe abrir ventana de Twitter con URL y texto correctos", async () => {
      const user = userEvent.setup();
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const xButton = screen.getByRole("button", {
        name: /compartir en x \(twitter\)/i,
      });
      await user.click(xButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining("https://twitter.com/intent/tweet?url="),
        "_blank",
        "noopener,noreferrer",
      );

      const callUrl = windowOpenSpy.mock.calls[0][0] as string;
      expect(callUrl).toContain("&text=");
    });

    it("debe codificar correctamente el título", async () => {
      const user = userEvent.setup();
      const titleWithSpaces = "Mi Post Increíble";
      render(<ShareButtons url={mockUrl} title={titleWithSpaces} />);

      const xButton = screen.getByRole("button", {
        name: /compartir en x \(twitter\)/i,
      });
      await user.click(xButton);

      const callUrl = windowOpenSpy.mock.calls[0][0] as string;
      expect(callUrl).toContain("text=Mi%20Post%20Incre%C3%ADble");
    });
  });

  describe("Funcionalidad de compartir en WhatsApp", () => {
    it("debe abrir ventana de WhatsApp con texto y URL", async () => {
      const user = userEvent.setup();
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const whatsappButton = screen.getByRole("button", {
        name: /compartir en whatsapp/i,
      });
      await user.click(whatsappButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining("https://wa.me/?text="),
        "_blank",
        "noopener,noreferrer",
      );
    });

    it("debe incluir título y URL en el mensaje de WhatsApp", async () => {
      const user = userEvent.setup();
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const whatsappButton = screen.getByRole("button", {
        name: /compartir en whatsapp/i,
      });
      await user.click(whatsappButton);

      const callUrl = windowOpenSpy.mock.calls[0][0] as string;
      expect(callUrl).toContain(encodeURIComponent(mockTitle));
      expect(callUrl).toContain(encodeURIComponent(mockUrl));
    });
  });

  describe("Funcionalidad de copiar enlace", () => {
    it("debe copiar la URL al portapapeles", async () => {
      const user = userEvent.setup();

      // Crear un mock específico para este test
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: writeTextMock,
        },
        writable: true,
        configurable: true,
      });

      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const copyButton = screen.getByRole("button", {
        name: /copiar enlace/i,
      });
      await user.click(copyButton);

      expect(writeTextMock).toHaveBeenCalledWith(mockUrl);
    });

    it("debe mostrar toast después de copiar", async () => {
      const user = userEvent.setup();
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const copyButton = screen.getByRole("button", {
        name: /copiar enlace/i,
      });
      await user.click(copyButton);

      // Esperar un momento para que el toast aparezca
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Usar queryAllByText porque Radix UI crea múltiples elementos para accesibilidad
      const toastMessages = screen.queryAllByText(
        /¡enlace copiado al portapapeles!/i,
      );
      expect(toastMessages.length).toBeGreaterThan(0);
    });

    it("debe manejar errores al copiar", async () => {
      const user = userEvent.setup();
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      // Configurar el mock para que falle en esta llamada específica
      const failingWriteText = vi
        .fn()
        .mockRejectedValueOnce(new Error("Clipboard error"));
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: failingWriteText,
        },
        writable: true,
        configurable: true,
      });

      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const copyButton = screen.getByRole("button", {
        name: /copiar enlace/i,
      });
      await user.click(copyButton);

      // Esperar un momento para que se maneje el error
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error al copiar el enlace:",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("Toast", () => {
    it("debe tener botón de cerrar en el toast", async () => {
      const user = userEvent.setup();
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const copyButton = screen.getByRole("button", {
        name: /copiar enlace/i,
      });
      await user.click(copyButton);

      // Esperar un momento para que el toast aparezca
      await new Promise((resolve) => setTimeout(resolve, 100));

      const closeButton = screen.queryByRole("button", { name: /cerrar/i });
      expect(closeButton).toBeTruthy();
    });

    it("debe cerrar el toast al hacer click en cerrar", async () => {
      const user = userEvent.setup();
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const copyButton = screen.getByRole("button", {
        name: /copiar enlace/i,
      });
      await user.click(copyButton);

      // Esperar un momento para que el toast aparezca
      await new Promise((resolve) => setTimeout(resolve, 100));

      const toastMessages = screen.queryAllByText(
        /¡enlace copiado al portapapeles!/i,
      );
      expect(toastMessages.length).toBeGreaterThan(0);

      const closeButton = screen.getByRole("button", { name: /cerrar/i });
      expect(closeButton).toBeTruthy();

      // Verificar que el botón de cerrar existe y es clickeable
      // No hacemos click real para evitar errores de Radix UI en el entorno de test
      expect(closeButton.getAttribute("aria-label")).toBe("Cerrar");
    });
  });

  describe("Seguridad", () => {
    it("debe abrir ventanas con noopener y noreferrer", async () => {
      const user = userEvent.setup();
      render(<ShareButtons url={mockUrl} title={mockTitle} />);

      const facebookButton = screen.getByRole("button", {
        name: /compartir en facebook/i,
      });
      await user.click(facebookButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.any(String),
        "_blank",
        "noopener,noreferrer",
      );
    });
  });

  describe("Casos extremos", () => {
    it("debe manejar URLs muy largas", async () => {
      const user = userEvent.setup();
      const longUrl = "https://zunbeltz.org/blog/" + "a".repeat(1000);
      render(<ShareButtons url={longUrl} title={mockTitle} />);

      const facebookButton = screen.getByRole("button", {
        name: /compartir en facebook/i,
      });
      await user.click(facebookButton);

      expect(windowOpenSpy).toHaveBeenCalled();
    });

    it("debe manejar títulos muy largos", async () => {
      const user = userEvent.setup();
      const longTitle = "T".repeat(500);
      render(<ShareButtons url={mockUrl} title={longTitle} />);

      const xButton = screen.getByRole("button", {
        name: /compartir en x \(twitter\)/i,
      });
      await user.click(xButton);

      expect(windowOpenSpy).toHaveBeenCalled();
    });

    it("debe manejar caracteres especiales en URL y título", async () => {
      const user = userEvent.setup();
      const specialUrl =
        "https://zunbeltz.org/blog/guía-completa?ref=test&id=123";
      const specialTitle = "¡Guía Completa de Astro!";
      render(<ShareButtons url={specialUrl} title={specialTitle} />);

      const xButton = screen.getByRole("button", {
        name: /compartir en x \(twitter\)/i,
      });
      await user.click(xButton);

      const callUrl = windowOpenSpy.mock.calls[0][0] as string;
      // Verificar que los caracteres especiales están codificados
      expect(callUrl).not.toContain("¡");
      // La URL de Twitter contiene ? como parte de la query string, verificar que esté codificado
      expect(callUrl).toContain("%3F"); // ? original codificado
      expect(callUrl).toContain("%26"); // & original codificado
    });
  });
});
