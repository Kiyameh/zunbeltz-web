import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SearchPanel } from "./SearchPanel";

// Mock del icono SVG
vi.mock("@/icons/search.svg?react", () => ({
  default: (props: any) => <svg data-testid="search-icon" {...props} />,
}));

describe("SearchPanel", () => {
  const mockOnOpenChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the dialog when open is true", async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        expect(screen.getByText("Buscar")).toBeInTheDocument();
      });
    });

    it("should not render the dialog content when open is false", () => {
      render(<SearchPanel open={false} onOpenChange={mockOnOpenChange} />);

      expect(screen.queryByText("Buscar")).not.toBeInTheDocument();
    });

    it('should render the title "Buscar"', async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        const title = screen.getByText("Buscar");
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass("title-1");
      });
    });

    it("should render the description text", async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        const description = screen.getByText("Busca contenido en el sitio web");
        expect(description).toBeInTheDocument();
        expect(description).toHaveClass("paragraph");
      });
    });

    it("should render the search input", async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        const input = screen.getByPlaceholderText("Buscar...");
        expect(input).toBeInTheDocument();
      });
    });

    it("should render the search icon", async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        expect(screen.getByTestId("search-icon")).toBeInTheDocument();
      });
    });

    it("should render the results placeholder", async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        expect(
          screen.getByText("Los resultados aparecerán aquí"),
        ).toBeInTheDocument();
      });
    });

    it("should render the close button", async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        expect(screen.getByLabelText("Cerrar")).toBeInTheDocument();
      });
    });
  });

  describe("Functionality", () => {
    describe("Input", () => {
      it("should have autofocus attribute on the search input", async () => {
        render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

        await waitFor(() => {
          const input = screen.getByPlaceholderText("Buscar...");
          // Verify the input element is present (autofocus is a React prop that may not appear in DOM)
          expect(input).toBeInTheDocument();
          expect(input).toHaveFocus();
        });
      });

      it("should allow typing in the search input", async () => {
        const user = userEvent.setup();
        render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

        await waitFor(() => {
          expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Buscar...");
        await user.type(input, "test query");

        expect(input).toHaveValue("test query");
      });

      it('should have type="search" on the input', async () => {
        render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

        await waitFor(() => {
          const input = screen.getByPlaceholderText("Buscar...");
          expect(input).toHaveAttribute("type", "search");
        });
      });
    });

    describe("Dialog Control", () => {
      it("should call onOpenChange with false when close button is clicked", async () => {
        const user = userEvent.setup();
        render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

        await waitFor(() => {
          expect(screen.getByLabelText("Cerrar")).toBeInTheDocument();
        });

        const closeButton = screen.getByLabelText("Cerrar");
        await user.click(closeButton);

        expect(mockOnOpenChange).toHaveBeenCalledWith(false);
      });

      it("should call onOpenChange when overlay is clicked", async () => {
        const user = userEvent.setup();
        const { container } = render(
          <SearchPanel open={true} onOpenChange={mockOnOpenChange} />,
        );

        await waitFor(() => {
          expect(screen.getByText("Buscar")).toBeInTheDocument();
        });

        // Radix UI overlay puede ser clickeado para cerrar el diálogo
        const overlay = container.querySelector("[data-radix-dialog-overlay]");
        if (overlay) {
          await user.click(overlay);
          expect(mockOnOpenChange).toHaveBeenCalled();
        }
      });
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label on close button", async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        const closeButton = screen.getByLabelText("Cerrar");
        expect(closeButton).toHaveAttribute("aria-label", "Cerrar");
      });
    });

    it("should have aria-hidden on search icon", async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        const icon = screen.getByTestId("search-icon");
        // The SVG icon should have aria-hidden attribute
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("should have proper placeholder text", async () => {
      render(<SearchPanel open={true} onOpenChange={mockOnOpenChange} />);

      await waitFor(() => {
        const input = screen.getByPlaceholderText("Buscar...");
        expect(input).toHaveAttribute("placeholder", "Buscar...");
      });
    });
  });
});
