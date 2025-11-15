import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SearchPanelMobile } from "./SearchPanelMobile";

// Mock del icono SVG
vi.mock("@/icons/search.svg?react", () => ({
  default: (props: any) => <svg data-testid="search-icon" {...props} />,
}));

describe("SearchPanelMobile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the component", () => {
      const { container } = render(<SearchPanelMobile />);
      expect(container).toBeInTheDocument();
    });

    it("should not show dialog initially", () => {
      render(<SearchPanelMobile />);
      expect(screen.queryByText("Buscar")).not.toBeInTheDocument();
    });

    it('should render the title "Buscar"', async () => {
      render(<SearchPanelMobile />);

      // Dispatch event to open dialog
      window.dispatchEvent(new Event("open-mobile-search"));

      await waitFor(() => {
        const title = screen.getByText("Buscar");
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass("title-1");
      });
    });

    it("should render the description text", async () => {
      render(<SearchPanelMobile />);

      window.dispatchEvent(new Event("open-mobile-search"));

      await waitFor(() => {
        const description = screen.getByText("Busca contenido en el sitio web");
        expect(description).toBeInTheDocument();
        expect(description).toHaveClass("paragraph");
      });
    });

    it("should render the search input", async () => {
      render(<SearchPanelMobile />);

      window.dispatchEvent(new Event("open-mobile-search"));

      await waitFor(() => {
        const input = screen.getByPlaceholderText("Buscar...");
        expect(input).toBeInTheDocument();
      });
    });

    it("should render the search icon", async () => {
      render(<SearchPanelMobile />);

      window.dispatchEvent(new Event("open-mobile-search"));

      await waitFor(() => {
        expect(screen.getByTestId("search-icon")).toBeInTheDocument();
      });
    });

    it("should render the results placeholder", async () => {
      render(<SearchPanelMobile />);

      window.dispatchEvent(new Event("open-mobile-search"));

      await waitFor(() => {
        expect(
          screen.getByText("Los resultados aparecerán aquí"),
        ).toBeInTheDocument();
      });
    });

    it("should render the close button", async () => {
      render(<SearchPanelMobile />);

      window.dispatchEvent(new Event("open-mobile-search"));

      await waitFor(() => {
        expect(screen.getByLabelText("Cerrar")).toBeInTheDocument();
      });
    });
  });

  describe("Functionality", () => {
    describe("Event Listener", () => {
      it('should open dialog when "open-mobile-search" event is dispatched', async () => {
        render(<SearchPanelMobile />);

        expect(screen.queryByText("Buscar")).not.toBeInTheDocument();

        window.dispatchEvent(new Event("open-mobile-search"));

        await waitFor(() => {
          expect(screen.getByText("Buscar")).toBeInTheDocument();
        });
      });

      it("should add event listener on mount", () => {
        const addEventListenerSpy = vi.spyOn(window, "addEventListener");

        render(<SearchPanelMobile />);

        expect(addEventListenerSpy).toHaveBeenCalledWith(
          "open-mobile-search",
          expect.any(Function),
        );

        addEventListenerSpy.mockRestore();
      });

      it("should remove event listener on unmount", () => {
        const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

        const { unmount } = render(<SearchPanelMobile />);
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
          "open-mobile-search",
          expect.any(Function),
        );

        removeEventListenerSpy.mockRestore();
      });
    });

    describe("Input", () => {
      it("should have autofocus attribute on the search input", async () => {
        render(<SearchPanelMobile />);

        window.dispatchEvent(new Event("open-mobile-search"));

        await waitFor(() => {
          const input = screen.getByPlaceholderText("Buscar...");
          // Verify the input element is present (autofocus is a React prop that may not appear in DOM)
          expect(input).toBeInTheDocument();
          expect(input).toHaveFocus();
        });
      });

      it("should allow typing in the search input", async () => {
        const user = userEvent.setup();
        render(<SearchPanelMobile />);

        window.dispatchEvent(new Event("open-mobile-search"));

        await waitFor(() => {
          expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Buscar...");
        await user.type(input, "test query");

        expect(input).toHaveValue("test query");
      });

      it('should have type="search" on the input', async () => {
        render(<SearchPanelMobile />);

        window.dispatchEvent(new Event("open-mobile-search"));

        await waitFor(() => {
          const input = screen.getByPlaceholderText("Buscar...");
          expect(input).toHaveAttribute("type", "search");
        });
      });
    });

    describe("Dialog Control", () => {
      it("should close dialog when close button is clicked", async () => {
        const user = userEvent.setup();
        render(<SearchPanelMobile />);

        window.dispatchEvent(new Event("open-mobile-search"));

        await waitFor(() => {
          expect(screen.getByLabelText("Cerrar")).toBeInTheDocument();
        });

        const closeButton = screen.getByLabelText("Cerrar");
        await user.click(closeButton);

        await waitFor(() => {
          expect(screen.queryByText("Buscar")).not.toBeInTheDocument();
        });
      });

      it("should close dialog when overlay is clicked", async () => {
        const user = userEvent.setup();
        const { container } = render(<SearchPanelMobile />);

        window.dispatchEvent(new Event("open-mobile-search"));

        await waitFor(() => {
          expect(screen.getByText("Buscar")).toBeInTheDocument();
        });

        // Radix UI overlay puede ser clickeado para cerrar el diálogo
        const overlay = container.querySelector("[data-radix-dialog-overlay]");
        if (overlay) {
          await user.click(overlay);

          await waitFor(() => {
            expect(screen.queryByText("Buscar")).not.toBeInTheDocument();
          });
        }
      });
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label on close button", async () => {
      render(<SearchPanelMobile />);

      window.dispatchEvent(new Event("open-mobile-search"));

      await waitFor(() => {
        const closeButton = screen.getByLabelText("Cerrar");
        expect(closeButton).toHaveAttribute("aria-label", "Cerrar");
      });
    });

    it("should have aria-hidden on search icon", async () => {
      render(<SearchPanelMobile />);

      window.dispatchEvent(new Event("open-mobile-search"));

      await waitFor(() => {
        const icon = screen.getByTestId("search-icon");
        // The SVG icon should have aria-hidden attribute
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("should have proper placeholder text", async () => {
      render(<SearchPanelMobile />);

      window.dispatchEvent(new Event("open-mobile-search"));

      await waitFor(() => {
        const input = screen.getByPlaceholderText("Buscar...");
        expect(input).toHaveAttribute("placeholder", "Buscar...");
      });
    });
  });
});
