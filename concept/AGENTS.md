# Guía para Agentes IA

## Reglas Generales

- **PREGUNTA antes de crear nuevas carpetas o archivos**
- **SOLO ejecuta lo que se te pide explícitamente**
- Si contemplas tareas adicionales (testing, componentes de ejemplo, etc.), **pregunta antes**
- **NO ejecutes tests** a menos que se te ordene hacerlo

## Componentes React

### Estructura

- Usa **CSS Modules** para estilos: `import s from './Component.module.css'`
- Estructura de carpeta por componente:

```text
src/components/nombre/
  ├── Nombre.tsx
  ├── Nombre.module.css
  └── Nombre.test.tsx (si hay tests)
```

### Ejemplo

```tsx
import s from "./Button.module.css";

export const Button = ({ children }) => {
  return <button className={s.Button}>{children}</button>;
};
```

## Testing

### Flujo de trabajo

1. **Crear primero tests vacíos** para verificación
2. Esperar confirmación del usuario
3. Implementar los tests

### Estructura de tests

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

### Configuración de tests

- **ResizeObserver** debe estar mockeado en `test.config.ts`
- Usa `waitFor` para contenido asíncrono de Radix UI
- Para dropdowns de Radix UI: usa `click` en lugar de `hover`

## Uso de Iconos

Iconos de [Tabler Icons](https://tabler-icons.io/) en `src/icons/`.

### En Astro (.astro)

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="nombre-del-icono" class="w-6 h-6" />
```

### En React (.tsx)

```tsx
import MiIcono from "@/icons/nombre-del-icono.svg?react";

const Component = () => <MiIcono className="w-4 h-4" />;
```

**Nota**: Usa el sufijo `?react` para importar SVG como componente React.
