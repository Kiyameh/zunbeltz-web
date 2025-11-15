# Guía del Sistema de Diseño CSS (Basado en Variables)

Este documento resume la metodología de organización, la convención de nomenclatura y el mapeo de colores para los estilos CSS de la aplicación, diseñado para ser modular y escalable usando exclusivamente variables CSS.

## 1. Metodología y Principios

El sistema se basa en una arquitectura **Componente Modular** que sigue los principios de **OOCSS (Separación de Estructura y Presentación)** de forma simplificada.

### 1.1. Nomenclatura de Clases

Se utiliza una convención de nomenclatura **simplificada** inspirada en BEM, enfocándose en la claridad y la capacidad de combinación:

|

| **Categoría** | **Convención** | **Ejemplo de Uso** | **Descripción** |
| **Componente (Bloque)** | `.nombre` | `.btn`, `.card` | Nombre base y principal del componente. |
| **Variante** | `.nombre-variante` | `.btn-primary`, `.card-alert` | Modifica el tamaño, color o apariencia del bloque. |
| **Estado** | `.is-estado` | `.is-active`, `.is-disabled` | Clases que se aplican **adicionalmente** para indicar un estado temporal o interactivo. |

### 1.2. Estructura de Archivos CSS

El código CSS se organiza por funcionalidad para maximizar la reutilización y facilitar la búsqueda. Cada componente vive en su propio archivo (`_nombre.css`).

css/
├── base/
│   ├── _reset.css         /*Normalize o reset. */
│   └── _typography.css    /* Estilos por defecto para etiquetas (h1, a, p). */
│
├── components/
│   ├── _button.css        /* Define .btn, .btn-primary, .btn-ghost, etc. */
│   ├── _card.css          /* Define .card, .card-panel. */
│   └── _input.css         /* Define .input, .input-error. */
│   └── ... (Resto de 10-12 componentes)
│
├── utilities/
│   └── _states.css        /* Centraliza todas las clases de estado (is-active, is-hidden). */
│
└── styles.css             /* Archivo principal, importa todo en orden.*/

## 2. Definición del Sistema de Variables CSS

La apariencia se gestiona mediante un sistema de temas (Light/Dark) y temas de color (`data-dark`, `data-theme`) que modifican las siguientes escalas numéricas:

| **Variable** | **Escala Usada** | **Nivel por Defecto** | **Nivel Resaltado (Manual)** |
| **`--color-surface-X`** | 100 a 500 | 100, 200, 300 | 400, 500 |
| **`--color-content-X`** | 100 a 500 | 100 (Muted), 300 (Normal) | 400, 500 |
| **`--color-border-X`** | 100 a 300 | 200 (Normal) | 100 (Sutil), 300 (Resaltado) |
| **`--color-primary-X`** | 100 a 500 | 300 (Normal) | N/A |
| **`--color-accent-X`** | 100 a 500 | 300 (Normal) | N/A |

### 2.1. Mapeo de Jerarquía Visual

* **Elevación (Surface):** Se usa de forma incremental: 100 (Fondo) < 200 (Contenedor) < 300 (Estructura).

* **Contraste (Content):** El texto normal es `300`. Los textos de ayuda/secundarios son `100`.

* **Bordes:** El `200` se usa para separar elementos, el `100` para tablas sutiles, y el `300` para destacar elementos estructurales (Sidebar).

## 3. Tabla de Diseño de Componentes UI

Esta tabla especifica las variables de coloración para los componentes más comunes, incluyendo el manejo de estados (`:hover`) utilizando las superficies contiguas para simular elevación.

| **Componente** | **Variante/Estado** | **Surface (Base)** | **Content** | **Border** | **Shadow** | **Notas de Uso** |
| **Página** | `body` | `--color-surface-100` | `--color-content-300` | N/A | N/A | Lienzo de la aplicación. |
| **Contenedor** | `.card` / `.panel` | `--color-surface-200` | `--color-content-300` | `--color-border-200` | `--shadow-md` | Contenedores principales de contenido. |
| **Estructura** | `.sidebar` / `.nav-main` | `--color-surface-300` | `--color-content-300` | `--color-border-300` | `--shadow-md` | Elementos de la estructura persistente. |
| **Botón** | `.btn` (Defecto) | `--color-surface-100` | `--color-content-300` | `--color-border-200` | N/A | **Regla:** El botón base tiene un fondo 100 con borde 200. |
|  | `.btn:hover` | `--color-surface-200` | `--color-content-300` | `--color-border-200` | N/A | El hover eleva la superficie un nivel. |
|  | `.btn-primary` | `--color-primary-300` | `--color-content-500` | `--color-primary-300` | `--shadow-sm` | Botón de acción principal. |
|  | `.btn-ghost` | `transparent` | `--color-primary-300` | `--color-primary-300` | N/A | Botón de baja prioridad. |
| **Input** | `.input` (Defecto) | `--color-surface-100` | `--color-content-300` | `--color-border-200` | N/A | Input se separa del fondo con el borde. |
|  | `.input:focus` | `--color-surface-100` | `--color-content-300` | **`--color-primary-300`** | N/A | El foco usa el color `primary`. |
| **Alerta** | `.alert-success` | `--color-success-100` | `--color-success-400` | `--color-success-300` | N/A | Fondo sutil con texto y borde de color semántico. |
| **Etiqueta** | `.badge-primary` | `--color-primary-300` | `--color-content-500` | N/A | N/A | Usado para clasificación o conteo. |
| **Dropdown** | `.dropdown` / `.menu` | `--color-surface-400` | `--color-content-300` | N/A | `--shadow-lg` | Alta elevación visual (manual 400). |
| **Tabs** | `.tabs__item.is-active` | `--color-surface-200` | `--color-content-400` | N/A | N/A | La pestaña activa se eleva a `surface-200`. |
| **Texto** | `h1` / Destacado | N/A | `--color-content-400` | N/A | N/A | Texto de alta jerarquía. |
|  | `p` / Normal | N/A | `--color-content-300` | N/A | N/A | Texto estándar. |
|  | `p` / Muted | N/A | `--color-content-100` | N/A | N/A | Texto secundario o de ayuda. |
