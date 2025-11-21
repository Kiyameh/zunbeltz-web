# Guía para Agentes IA

## Reglas Generales

- **PREGUNTA antes de crear nuevas carpetas o archivos**
- **SOLO ejecuta lo que se te pide explícitamente**
- Si contemplas tareas adicionales (testing, componentes de ejemplo, etc.), **pregunta antes**
- **NO ejecutes tests** a menos que se te ordene hacerlo
- Antes de realizar cualquier tarea, leer en este archivo sus instrucciones.

## Creación de Componentes React

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

1. Leer documentación de los tests: /docs/Testing.md
2. **Crear primero tests vacíos** para verificación
3. Esperar confirmación del usuario
4. Implementar los tests

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
