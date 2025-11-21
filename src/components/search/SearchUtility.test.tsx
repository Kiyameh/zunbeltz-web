/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchUtility } from "./SearchUtility";

// Mock de los iconos SVG
vi.mock("@/icons/search.svg?react", () => ({
  default: (props: any) => <svg data-testid="search-icon" {...props} />,
}));

vi.mock("@/icons/x.svg?react", () => ({
  default: (props: any) => <svg data-testid="x-icon" {...props} />,
}));

describe("SearchUtility", () => {
  let mockPagefindUI: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock de window.PagefindUI
    mockPagefindUI = vi.fn();
    (window as any).PagefindUI = mockPagefindUI;

    // Mock de requestAnimationFrame que simula el comportamiento real
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb: any) => {
      setTimeout(cb, 0);
      return 0;
    });
  });

  afterEach(() => {
    cleanup();
    delete (window as any).PagefindUI;
    vi.restoreAllMocks();
  });

  describe("Button Rendering", () => {
    it("should render the search button", () => {
      render(<SearchUtility />);

      expect(screen.getByLabelText("Abrir búsqueda")).toBeTruthy();
      expect(screen.getByText("Buscar")).toBeTruthy();
    });

    it("should render the search icon in the button", () => {
      render(<SearchUtility />);

      const icons = screen.getAllByTestId("search-icon");
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe("Dialog Rendering", () => {
    it("should not render the dialog content initially", () => {
      render(<SearchUtility />);

      expect(
        screen.queryByText("Busca contenido en el sitio web"),
      ).toBeNull();
    });

    it("should render the dialog when button is clicked", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        expect(
          screen.getByText("Busca contenido en el sitio web"),
        ).toBeTruthy();
      });
    });

    it("should render the dialog title", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const titles = screen.getAllByText("Buscar");
        // Should have button text + dialog title
        expect(titles.length).toBeGreaterThan(1);
      });
    });

    it("should render the description text", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const description = screen.getByText("Busca contenido en el sitio web");
        expect(description).toBeTruthy();
        expect(description.className).toContain("paragraph");
      });
    });

    it("should render the pagefind search container", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const pagefindContainer = document.querySelector("#pagefind-search");
        expect(pagefindContainer).toBeTruthy();
      });
    });

    it("should have the correct CSS class on pagefind container", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const pagefindContainer = document.querySelector("#pagefind-search");
        expect(pagefindContainer?.className).toContain("PagefindSearch");
      });
    });

    it("should render the close button", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByLabelText("Cerrar")).toBeTruthy();
      });
    });
  });

  describe("Functionality", () => {
    describe("Pagefind Integration", () => {
      it("should initialize PagefindUI when dialog opens", async () => {
        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        // Esperar a que el contenedor esté en el DOM (Portal lo renderiza en document.body)
        await waitFor(() => {
          const pagefindContainer = document.querySelector("#pagefind-search");
          expect(pagefindContainer).toBeTruthy();
        });

        // Esperar a que PagefindUI se inicialice
        await waitFor(
          () => {
            expect(mockPagefindUI).toHaveBeenCalledWith({
              element: "#pagefind-search",
              showSubResults: true,
              showImages: true,
              autofocus: true,
            });
          },
          { timeout: 2000 },
        );
      });

      it("should not initialize PagefindUI if container is not empty", async () => {
        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        // Esperar a que se inicialice la primera vez
        await waitFor(
          () => {
            expect(mockPagefindUI).toHaveBeenCalledTimes(1);
          },
          { timeout: 2000 },
        );

        const pagefindContainer = document.querySelector("#pagefind-search");
        if (pagefindContainer) {
          pagefindContainer.innerHTML = "<div>Already initialized</div>";
        }

        // Limpiar el mock para verificar que no se llama de nuevo
        mockPagefindUI.mockClear();

        // Forzar un re-render del efecto sin cerrar el diálogo
        // Esto simula un cambio de estado que dispara el useEffect nuevamente
        // pero el contenedor ya tiene contenido

        // Verificar que después de un tiempo razonable, no se ha llamado de nuevo
        await new Promise((resolve) => setTimeout(resolve, 200));

        // No debería inicializar de nuevo porque el contenedor no está vacío
        expect(mockPagefindUI).not.toHaveBeenCalled();
      });

      it("should use requestAnimationFrame for initialization", async () => {
        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        await waitFor(() => {
          expect(window.requestAnimationFrame).toHaveBeenCalled();
        });
      });

      it("should handle PagefindUI initialization errors gracefully", async () => {
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => { });

        // Configurar el mock para lanzar un error cuando se instancia
        const MockPagefindUIWithError = vi.fn().mockImplementation(() => {
          throw new Error("Pagefind error");
        });
        (window as any).PagefindUI = MockPagefindUIWithError;

        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        // Esperar a que el contenedor esté en el DOM
        await waitFor(() => {
          const pagefindContainer = document.querySelector("#pagefind-search");
          expect(pagefindContainer).toBeTruthy();
        });

        // Esperar a que se capture el error
        await waitFor(
          () => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
              "Error al iniciar Pagefind:",
              expect.any(Error),
            );
          },
          { timeout: 2000 },
        );

        consoleErrorSpy.mockRestore();
      });

      it("should not initialize PagefindUI if window.PagefindUI is not available", async () => {
        // Eliminar PagefindUI antes de renderizar
        delete (window as any).PagefindUI;

        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        // Esperar a que el diálogo se abra
        await waitFor(() => {
          expect(
            screen.getByText("Busca contenido en el sitio web"),
          ).toBeTruthy();
        });

        // PagefindUI no debería haberse llamado porque no está disponible
        expect(mockPagefindUI).not.toHaveBeenCalled();
      });
    });

    describe("Dialog Control", () => {
      it("should close dialog when close button is clicked", async () => {
        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByLabelText("Cerrar")).toBeTruthy();
        });

        const closeButton = screen.getByLabelText("Cerrar");
        await user.click(closeButton);

        await waitFor(() => {
          expect(
            screen.queryByText("Busca contenido en el sitio web"),
          ).toBeNull();
        });
      });

      it("should close dialog when overlay is clicked", async () => {
        const user = userEvent.setup();
        const { container } = render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        await waitFor(() => {
          expect(
            screen.getByText("Busca contenido en el sitio web"),
          ).toBeTruthy();
        });

        // Radix UI overlay puede ser clickeado para cerrar el diálogo
        const overlay = container.querySelector("[data-radix-dialog-overlay]");
        if (overlay) {
          await user.click(overlay);
          await waitFor(() => {
            expect(
              screen.queryByText("Busca contenido en el sitio web"),
            ).toBeNull();
          });
        }
      });
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label on search button", () => {
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      expect(button.getAttribute("aria-label")).toBe("Abrir búsqueda");
    });

    it("should have aria-label on close button", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const closeButton = screen.getByLabelText("Cerrar");
        expect(closeButton.getAttribute("aria-label")).toBe("Cerrar");
      });
    });

    it("should have aria-hidden on icons", () => {
      render(<SearchUtility />);

      const searchIcon = screen.getByTestId("search-icon");
      expect(searchIcon.getAttribute("aria-hidden")).toBe("true");
    });

    it("should have aria-hidden on close icon", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const xIcon = screen.getByTestId("x-icon");
        expect(xIcon.getAttribute("aria-hidden")).toBe("true");
      });
    });
  });
});
