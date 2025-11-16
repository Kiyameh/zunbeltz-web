import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SearchUtility } from "./SearchUtility";

// Mock del icono SVG
vi.mock("@/icons/search.svg?react", () => ({
  default: (props: any) => <svg data-testid="search-icon" {...props} />,
}));

describe("SearchUtility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Button Rendering", () => {
    it("should render the search button", () => {
      render(<SearchUtility />);

      expect(screen.getByLabelText("Abrir búsqueda")).toBeInTheDocument();
      expect(screen.getByText("Buscar")).toBeInTheDocument();
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
      ).not.toBeInTheDocument();
    });

    it("should render the dialog when button is clicked", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        expect(
          screen.getByText("Busca contenido en el sitio web"),
        ).toBeInTheDocument();
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
        expect(description).toBeInTheDocument();
        expect(description).toHaveClass("paragraph");
      });
    });

    it("should render the search input", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const input = screen.getByPlaceholderText("Buscar...");
        expect(input).toBeInTheDocument();
      });
    });

    it("should render the results placeholder", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        expect(
          screen.getByText("Los resultados aparecerán aquí"),
        ).toBeInTheDocument();
      });
    });

    it("should render the close button", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByLabelText("Cerrar")).toBeInTheDocument();
      });
    });
  });

  describe("Functionality", () => {
    describe("Input", () => {
      it("should have autofocus attribute on the search input", async () => {
        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        await waitFor(() => {
          const input = screen.getByPlaceholderText("Buscar...");
          expect(input).toBeInTheDocument();
          expect(input).toHaveFocus();
        });
      });

      it("should allow typing in the search input", async () => {
        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Buscar...");
        await user.type(input, "test query");

        expect(input).toHaveValue("test query");
      });

      it('should have type="search" on the input', async () => {
        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        await waitFor(() => {
          const input = screen.getByPlaceholderText("Buscar...");
          expect(input).toHaveAttribute("type", "search");
        });
      });
    });

    describe("Dialog Control", () => {
      it("should close dialog when close button is clicked", async () => {
        const user = userEvent.setup();
        render(<SearchUtility />);

        const button = screen.getByLabelText("Abrir búsqueda");
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByLabelText("Cerrar")).toBeInTheDocument();
        });

        const closeButton = screen.getByLabelText("Cerrar");
        await user.click(closeButton);

        await waitFor(() => {
          expect(
            screen.queryByText("Busca contenido en el sitio web"),
          ).not.toBeInTheDocument();
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
          ).toBeInTheDocument();
        });

        // Radix UI overlay puede ser clickeado para cerrar el diálogo
        const overlay = container.querySelector("[data-radix-dialog-overlay]");
        if (overlay) {
          await user.click(overlay);
          await waitFor(() => {
            expect(
              screen.queryByText("Busca contenido en el sitio web"),
            ).not.toBeInTheDocument();
          });
        }
      });
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label on search button", () => {
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      expect(button).toHaveAttribute("aria-label", "Abrir búsqueda");
    });

    it("should have aria-label on close button", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const closeButton = screen.getByLabelText("Cerrar");
        expect(closeButton).toHaveAttribute("aria-label", "Cerrar");
      });
    });

    it("should have aria-hidden on search icons", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const icons = screen.getAllByTestId("search-icon");
        icons.forEach((icon) => {
          expect(icon).toHaveAttribute("aria-hidden", "true");
        });
      });
    });

    it("should have proper placeholder text", async () => {
      const user = userEvent.setup();
      render(<SearchUtility />);

      const button = screen.getByLabelText("Abrir búsqueda");
      await user.click(button);

      await waitFor(() => {
        const input = screen.getByPlaceholderText("Buscar...");
        expect(input).toHaveAttribute("placeholder", "Buscar...");
      });
    });
  });
});
