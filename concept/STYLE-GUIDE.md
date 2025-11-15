# Guía del Sistema de Diseño CSS (Basado en Variables)

Este documento resume la metodología de organización, la convención de nomenclatura y el mapeo de colores para los estilos CSS de la aplicación, diseñado para ser modular y escalable usando exclusivamente variables CSS.

## 1. Metodología y Principios

El sistema se basa en una arquitectura **Componente Modular** que sigue los principios de **OOCSS (Separación de Estructura y Presentación)** de forma simplificada.

### 1.1. Nomenclatura de Clases

Se utiliza una convención de nomenclatura **simplificada** inspirada en BEM, enfocándose en la claridad y la capacidad de combinación:

|

| **Categoría** | **Convención** | **Ejemplo de Uso** | **Descripción** |
| **Componente (Bloque)** | `.nombre` | `.button`, `.input`, `.anchor` | Nombre base y principal del componente. |
| **Variante** | `.nombre.variante` | `.button.primary`, `.button.ghost` | Modifica el tamaño, color o apariencia del bloque usando clases múltiples. |
| **Estado** | `:pseudo-clase` | `:hover`, `:focus`, `:disabled` | Se usan pseudo-clases CSS para estados interactivos. |
| **Clases de texto** | `.tipo-nivel` | `.title-1`, `.title-2`, `.paragraph` | Clases utilitarias para tipografía. |

### 1.2. Estructura de Archivos CSS

El código CSS se organiza por funcionalidad para maximizar la reutilización y facilitar la búsqueda. Cada componente vive en su propio archivo.

src/styles/
├── global.css /_Variables CSS, reset CSS y estilos base _/
├── fonts.css /_ Definición de @font-face para fuentes personalizadas _/
├── components.css /_ Importa todos los componentes _/
│
└── components/
├── button.css /_ Define .button, .button.primary, .button.ghost, etc. _/
├── input.css /_ Define .input y sus estados _/
├── anchor.css /_ Define .anchor y variantes _/
├── text-items.css /_ Define .title-1, .title-2, .title-3, .paragraph _/
└── glassmorphism.css /_ Define .glassmorph_/

Nota: Los componentes React usan CSS Modules (\*.module.css) para estilos específicos del componente.

## 2. Definición del Sistema de Variables CSS

La apariencia se gestiona mediante un sistema de temas (Light/Dark) y temas de color (`data-dark`, `data-theme`) que modifican las siguientes escalas numéricas:

| **Variable** | **Escala Usada** | **Nivel por Defecto** | **Nivel Resaltado (Manual)** |
| **`--color-surface-X`** | 100 a 500 | 100, 200, 300 | 400, 500 |
| **`--color-content-X`** | 100 a 500 | 100 (Muted), 300 (Normal) | 400, 500 |
| **`--color-border-X`** | 100 a 300 | 200 (Normal) | 100 (Sutil), 300 (Resaltado) |
| **`--color-primary-X`** | 100 a 500 | 300 (Normal) | N/A |
| **`--color-secondary-X`** | 100 a 500 | 300 (Normal) | N/A |

**Variables adicionales:**

- **`--radius-X`**: Border radius (sm, md, lg, xl, 2xl, 3xl, full)
- **`--shadow-X`**: Box shadows (sm, md, lg, xl, 2xl, inner, none)
- **`--font-paragraph`**: Fuente para texto de párrafo ("Outfit regular")
- **`--font-title`**: Fuente para títulos ("Gabarito bold")

### 2.1. Mapeo de Jerarquía Visual

- **Elevación (Surface):** Se usa de forma incremental: 100 (Fondo) < 200 (Contenedor) < 300 (Estructura).

- **Contraste (Content):** El texto normal es `300`. Los textos de ayuda/secundarios son `100`.

- **Bordes:** El `200` se usa para separar elementos, el `100` para tablas sutiles, y el `300` para destacar elementos estructurales (Sidebar).

## 3. Tabla de Diseño de Componentes UI

Esta tabla especifica las variables de coloración para los componentes más comunes, incluyendo el manejo de estados (`:hover`) utilizando las superficies contiguas para simular elevación.

| **Componente** | **Variante/Estado** | **Surface (Base)** | **Content** | **Border** | **Shadow** | **Notas de Uso** |
| **Página** | `body` | `--color-surface-100` | `--color-content-300` | N/A | N/A | Lienzo de la aplicación. |
| **Contenedor** | `.card` / `.panel` | `--color-surface-200` | `--color-content-300` | `--color-border-200` | `--shadow-md` | Contenedores principales de contenido. |
| **Estructura** | `header` / `nav` | `--color-surface-100` | `--color-content-300` | `--color-border-100` | `--shadow-md` | Elementos de la estructura persistente. |
| **Botón** | `.button` (Defecto) | `--color-surface-200` | `--color-content-300` | `--color-border-100` | N/A | Botón base con fondo surface-200. |
| | `.button:hover` | `--color-surface-100` | `--color-content-300` | `--color-border-100` | N/A | El hover reduce la superficie un nivel. |
| | `.button.primary` | `--color-primary-300` | `white` | `--color-primary-300` | N/A | Botón de acción principal. |
| | `.button.secondary` | `--color-secondary-300` | `white` | `--color-secondary-300` | N/A | Botón de acción secundaria. |
| | `.button.ghost` | `transparent` | `--color-content-300` | `--color-border-100` | N/A | Botón de baja prioridad. |
| **Icon Button** | `.icon-button` | `--color-surface-200` | `--color-content-300` | `--color-border-100` | N/A | Botón solo con icono. |
| **Input** | `.input` (Defecto) | `--color-surface-200` | `--color-content-300` | `--color-border-200` | N/A | Input se separa del fondo con el borde. |
| | `.input:focus` | `--color-surface-200` | `--color-content-300` | **`--color-primary-300`** | N/A | El foco usa el color `primary`. |
| **Anchor** | `.anchor` | N/A | `--color-primary-300` | N/A | N/A | Enlaces con color primary. |
| | `.anchor:hover` | N/A | `--color-primary-400` | N/A | N/A | Hover oscurece el color. |
| **Texto** | `.title-1` | N/A | `inherit` | N/A | N/A | Título grande (2rem, font-title). |
| | `.title-2` | N/A | `inherit` | N/A | N/A | Título mediano (1.5rem, font-title). |
| | `.title-3` | N/A | `inherit` | N/A | N/A | Título pequeño (1rem, font-title). |
| | `.paragraph` | N/A | `inherit` | N/A | N/A | Párrafo normal (1rem, font-paragraph). |
| | `.paragraph.big` | N/A | `inherit` | N/A | N/A | Párrafo grande (1.5rem, font-paragraph). |
