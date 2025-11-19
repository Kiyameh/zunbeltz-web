# Búsqueda con PageFind

## Descripción

PageFind es una herramienta de búsqueda estática que indexa automáticamente el contenido de tu sitio web durante el build. Proporciona una experiencia de búsqueda rápida y eficiente sin necesidad de un servidor backend.

## Instalación

```bash
npm install -D pagefind
```

## Configuración en Astro

### 1. Script de Build

Añadir el comando de indexación después del build de Astro en `package.json`:

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist"
  }
}
```

_Ademas, he añadido script para que copie automnaticamente los archivos de PageFind al directorio `public` y pueda previsualizar la búsqueda en modo dev (imagenes no funcionan)_

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist && robocopy dist/pagefind public/pagefind /E"
  }
}
```

### 2. Carga de Scripts y Estilos

En el layout principal (`HtmlLayout.astro`), incluir los recursos de PageFind:

```astro
<!-- Pagefind: Utilidad de búsqueda -->
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js" is:inline></script>
```

**Nota:** El atributo `is:inline` es importante para que Astro no procese el script.

### 3. Variables CSS Personalizadas

En `global.css`, personalizar la apariencia de PageFind:

```css
/* Pagefind search bar styling */
:root {
  --pagefind-ui-scale: 0.9;
  --pagefind-ui-primary: var(--color-secondary-400);
  --pagefind-ui-text: var(--color-content-300);
  --pagefind-ui-background: var(--color-surface-100);
  --pagefind-ui-border: var(--color-border-300);
  --pagefind-ui-tag: var(--color-border-200);
  --pagefind-ui-border-width: 2px;
  --pagefind-ui-border-radius: 12px;
  --pagefind-ui-image-border-radius: 6px;
  --pagefind-ui-font: var(--font-paragraph);
}
```

## Implementación en Páginas

### Atributos de PageFind

#### `data-pagefind-body`

Marca el contenedor principal que debe ser indexado:

```astro
<article class="article" data-pagefind-body>
  <!-- Contenido a indexar -->
</article>
```

#### `data-pagefind-ignore`

Excluye elementos específicos de la indexación:

```astro
<PostHeader post={post} data-pagefind-ignore />
<AuthorProfile author={author} data-pagefind-ignore />
```

### Metadatos y Filtros

#### Metadatos (`data-pagefind-meta`)

Define metadatos que aparecerán en los resultados de búsqueda:

```astro
<div class="pagefind-metadata">
  <span data-pagefind-meta="title">{post.data.title}</span>
  <span data-pagefind-meta="image">{post.data.heroImage.src}</span>
  <span data-pagefind-meta="image_alt">{post.data.title}</span>
</div>
```

**Nota:** Ocultar este contenedor con CSS:

```css
.pagefind-metadata {
  display: none;
}
```

#### Filtros (`data-pagefind-filter`)

Crea filtros para categorizar los resultados:

```astro
<div class="pagefind-metadata">
  <span data-pagefind-filter="Tipo">Entrada de blog</span>
  <span data-pagefind-filter="Autor">{author.data.name}</span>
</div>
```

## Inicializar el Widget de Búsqueda

En el componente donde quieras mostrar el buscador:

```astro
    <div id="search"></div>
      <script>
        window.addEventListener("DOMContentLoaded", (event) => {
          // @ts-ignore
          new PagefindUI({ element: "#search", showSubResults: true });
        });
      </script>
```

## Recursos

* [Documentación oficial de PageFind](https://pagefind.app/)
* [Atributos de PageFind](https://pagefind.app/docs/indexing/)
* [Personalización UI](https://pagefind.app/docs/ui/)
* [Variables CSS](https://pagefind.app/docs/ui-usage/#customising-the-styles)

## Notas Importantes

* PageFind genera los archivos de índice en `/pagefind` dentro del directorio `dist` durante el build
* Los archivos de índice son estáticos y se sirven junto con el resto del sitio
* La búsqueda funciona completamente en el cliente, sin necesidad de servidor
* Es compatible con temas oscuros/claros mediante variables CSS
* Los filtros y metadatos son opcionales pero mejoran la experiencia de búsqueda
