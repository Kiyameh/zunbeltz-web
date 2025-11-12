# Guía de Agentes

## Uso de Iconos

Se usan iconos de [Tabler Icons](https://tabler-icons.io/).
Para gestionar los iconos en el proyecto, utilizamos dos métodos optimizados:

### En Componentes Astro (Archivos .astro)

Utiliza la integración astro-icon.

Coloca tus archivos SVG en src/icons/.

Impórtalo y úsalo con el nombre del archivo (sin la extensión):

```astro
---
import { Icon } from 'astro-icon/components';
---

<Icon name="nombre-del-icono" class="w-6 h-6 text-primary" />
```

(Esto se renderiza como SVG estático sin JS).

### En Componentes React (Archivos .jsx/.tsx)

Utiliza el plugin de Vite vite-plugin-svgr para convertir el SVG a un componente React en tiempo de compilación.

Importa tu SVG directamente desde la carpeta icons/ como un componente:

```jsx
import MiIcono from '../../icons/nombre-del-icono.svg';

const MyComponent = () => (
  <MiIcono className="w-4 h-4 text-white" />
);
```

(Esto asegura que solo se incluya el SVG necesario en la "Island" de React).
