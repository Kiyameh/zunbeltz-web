# Testing en Zunbeltz Web

## Introducción

Este proyecto utiliza **Vitest** como framework de testing, combinado con **@testing-library/react** para componentes React y **Astro Container** para componentes Astro.

**Principios clave:**

- Tests simples y enfocados
- Uso de aserciones nativas de Vitest

---

## Dependencias

### Instaladas

```json
{
  "devDependencies": {
    "vitest": "^4.0.9",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@vitest/ui": "^4.0.9",
    "jsdom": "^25.0.1"
  }
}
```

### Configuración

**`vitest.config.ts`:**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "node", // Por defecto
    globals: true,
  },
});
```

**Mock de SVG imports:**

```typescript
// En vitest.config.ts
export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
  },
});

// vitest.setup.ts
vi.mock("*.svg?react", () => ({
  default: () => null,
}));
```

---

## Estructura de tests

- Agrupar tests en **categorías** con `describe`:

```tsx
describe("ComponentName", () => {
  describe("Rendering", () => {
    it("should render...", () => {});
  });

  describe("Functionality", () => {
    describe("Hovering", () => {
      it("should...", async () => {});
    });

    describe("Routing", () => {
      it("should...", () => {});
    });
  });

  describe("Accessibility", () => {
    it("should...", () => {});
  });
});
```

## Función AstroContainer

**Ubicación:** `src/test/astro-container.ts`

Utilidad para renderizar componentes Astro en tests:

```typescript
import { experimental_AstroContainer as AstroContainer } from "astro/container";

export async function renderAstroComponent(
  component: any,
  props?: Record<string, any>,
) {
  const container = await AstroContainer.create();
  const result = await container.renderToString(component, { props });
  return result;
}
```

**Uso:**

```typescript
import { renderAstroComponent } from "@/test/astro-container";
import BlogCategories from "./BlogCategories.astro";

const html = await renderAstroComponent(BlogCategories, {
  categories: mockCategories,
});
```

---

## Testing de Componentes

### Componentes de Astro

**Características:**

- Renderizado a string HTML
- Verificación con `toContain()` y `toMatch()`
- Tests síncronos con `async/await`
- No requieren entorno jsdom

**Ejemplo básico:**

```typescript
import { describe, it, expect } from "vitest";
import { renderAstroComponent } from "@/test/astro-container";
import BlogCategories from "./BlogCategories.astro";

describe("BlogCategories", () => {
  it("should render category links", async () => {
    const mockCategories = [
      { name: "Espeleología", count: 5 },
      { name: "Topografía", count: 3 },
    ];

    const html = await renderAstroComponent(BlogCategories, {
      categories: mockCategories,
    });

    expect(html).toContain("Espeleología");
    expect(html).toContain("Topografía");
    expect(html).toMatch(/href="\/blog\/categoria\/espeleologia"/);
  });

  it("should have accessibility attributes", async () => {
    const html = await renderAstroComponent(BlogCategories);

    expect(html).toContain("aria-label");
    expect(html).toMatch(/<nav/);
  });
});
```

**Patrones comunes:**

- `expect(html).toContain("texto")` - Verificar presencia de texto
- `expect(html).toMatch(/pattern/)` - Verificar patrones con regex
- `expect(html).not.toContain("texto")` - Verificar ausencia

---

### Componentes de React

**Características:**

- Requieren entorno jsdom
- Uso de `@testing-library/react`
- Aserciones con métodos nativos de Vitest
- Cleanup entre tests

**Estructura básica:**

```typescript
/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Navigation } from "./Navigation";

describe("Navigation", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render main navigation items", () => {
    render(<Navigation />);

    expect(screen.getByText("La falla")).toBeTruthy();
    expect(screen.getByText("Navarra")).toBeTruthy();
  });

  it("should have correct href for links", () => {
    render(<Navigation />);

    const link = screen.getByRole("link", { name: "La falla" });
    expect(link.getAttribute("href")).toBe("/");
  });

  it("should have accessibility attributes", () => {
    render(<Navigation />);

    const button = screen.getByRole("button", { name: /Navarra/i });
    expect(button.getAttribute("aria-expanded")).toBeTruthy();
  });
});
```

**Elementos clave:**

**Directiva de entorno:**

```typescript
/**
 * @vitest-environment jsdom
 */
```

**Cleanup:**

```typescript
afterEach(() => {
  cleanup();
});
```

**Aserciones sin jest-dom:**

```typescript
// ❌ NO usar (jest-dom)
expect(element).toBeInTheDocument();
expect(element).toHaveAttribute("href", "/");
expect(element).toHaveClass("active");

// ✅ SÍ usar (Vitest nativo)
expect(element).toBeTruthy();
expect(element.getAttribute("href")).toBe("/");
expect(element.className).toContain("active");

// Para elementos no presentes
expect(screen.queryByText("texto")).toBeNull();
```

**Queries recomendadas:**

```typescript
// Por rol (preferido para accesibilidad)
screen.getByRole("link", { name: "Inicio" });
screen.getByRole("button", { name: /Abrir/i });

// Por texto
screen.getByText("Contenido");
screen.getByText(/patrón/i);

// Por label
screen.getByLabelText("Buscar");

// Por test-id (último recurso)
screen.getByTestId("custom-element");

// Queries que no fallan si no encuentran
screen.queryByText("texto"); // Retorna null si no existe
```

**Verificación de elementos en DOM:**

```typescript
const { container } = render(<Component />);

// Usar querySelector para elementos específicos
const element = container.querySelector('a[href="/ruta"]');
expect(element).toBeTruthy();

// Contar elementos
const links = container.querySelectorAll("a");
expect(links.length).toBeGreaterThan(0);
```

**Consideraciones especiales:**

- **SVG imports:** Requieren mock en `vitest.config.ts`
- **Imágenes:** Usar `src` property para verificar rutas

---

## Testing de Páginas

_Sección pendiente de completar._

**Temas a cubrir:**

- Renderizado de páginas completas
- Verificación de metadata
- Testing de layouts
- Integración con getStaticPaths
- Testing de API routes

---

## Comandos Útiles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Ejecutar tests de un archivo específico
npm test -- Navigation.test.tsx

# Ejecutar tests con patrón
npm test -- navigation

# Ejecutar tests con UI
npm run test:ui

# Ejecutar tests con coverage
npm test -- --coverage
```

## Recursos

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)
- [Astro Container API](https://docs.astro.build/en/reference/container-reference/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
