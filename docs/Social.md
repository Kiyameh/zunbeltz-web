# Compartir en Redes Sociales - Documentación Técnica

## Índice

1. [Open Graph Tags](#1-open-graph-tags)
2. [Twitter Cards (X Cards)](#2-twitter-cards-x-cards)
3. [URLs de Compartir en Redes Sociales](#3-urls-de-compartir-en-redes-sociales)
4. [Función de Copiar al Portapapeles](#4-función-de-copiar-al-portapapeles)
5. [Validación de Meta Tags](#5-validación-de-meta-tags)
6. [Resumen para la Implementación](#resumen-para-la-implementación)

---

## 1. Open Graph Tags

**Open Graph** es un protocolo creado por Facebook que permite controlar cómo se muestra el contenido cuando se comparte en redes sociales (Facebook, LinkedIn, WhatsApp, etc.).

### ¿Cómo funcionan?

Se añaden como meta tags en el `<head>` del HTML:

```html
<meta property="og:title" content="Título del Post" />
<meta property="og:description" content="Descripción del contenido" />
<meta property="og:image" content="https://tudominio.com/imagen.jpg" />
<meta property="og:url" content="https://tudominio.com/blog/mi-post" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="es_ES" />
```

### Tags específicos para artículos

```html
<meta property="article:published_time" content="2024-11-21T10:00:00Z" />
<meta property="article:author" content="Nombre del Autor" />
<meta property="article:section" content="Tecnología" />
<meta property="article:tag" content="JavaScript" />
```

### Requisitos importantes

- **og:image**: Debe ser una URL absoluta (https://...), no relativa
- **Tamaño recomendado**: 1200x630px (ratio 1.91:1)
- **Formato**: JPG o PNG
- Las redes sociales cachean estos datos, por lo que cambios pueden tardar en reflejarse

### Ejemplo completo para un post de blog

```html
<!-- Open Graph básico -->
<meta property="og:title" content="Guía completa de Astro 5" />
<meta
  property="og:description"
  content="Aprende todo sobre las nuevas características de Astro 5"
/>
<meta
  property="og:image"
  content="https://zunbeltz.org/images/blog/astro-5-hero.jpg"
/>
<meta property="og:url" content="https://zunbeltz.org/blog/guia-astro-5" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="es_ES" />
<meta property="og:site_name" content="Zunbeltz Blog" />

<!-- Open Graph para artículos -->
<meta property="article:published_time" content="2024-11-21T10:00:00Z" />
<meta property="article:modified_time" content="2024-11-21T15:30:00Z" />
<meta property="article:author" content="Juan Pérez" />
<meta property="article:section" content="Desarrollo Web" />
<meta property="article:tag" content="Astro" />
<meta property="article:tag" content="JavaScript" />
<meta property="article:tag" content="SSR" />
```

---

## 2. Twitter Cards (X Cards)

**Twitter Cards** es el sistema propio de X (Twitter) para mostrar contenido enriquecido. Si no encuentra sus propios tags, usa Open Graph como fallback.

### Tipos de Cards

1. **summary**: Imagen pequeña cuadrada
2. **summary_large_image**: Imagen grande (el más usado para blogs)
3. **app**: Para aplicaciones móviles
4. **player**: Para contenido multimedia

### Tags para summary_large_image

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@tuusuario" />
<meta name="twitter:creator" content="@autor" />
<meta name="twitter:title" content="Título del Post" />
<meta name="twitter:description" content="Descripción" />
<meta name="twitter:image" content="https://tudominio.com/imagen.jpg" />
```

### Diferencias con Open Graph

- Usa `name` en lugar de `property`
- Prefijo `twitter:` en lugar de `og:`
- Requiere especificar el tipo de card con `twitter:card`

### Requisitos de imagen

- **Tamaño**: Mínimo 300x157px, máximo 4096x4096px
- **Recomendado**: 1200x675px (ratio 16:9) o 1200x630px
- **Peso**: Máximo 5MB

### Ejemplo completo

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@zunbeltz" />
<meta name="twitter:creator" content="@juanperez" />
<meta name="twitter:title" content="Guía completa de Astro 5" />
<meta
  name="twitter:description"
  content="Aprende todo sobre las nuevas características de Astro 5"
/>
<meta
  name="twitter:image"
  content="https://zunbeltz.org/images/blog/astro-5-hero.jpg"
/>
<meta name="twitter:image:alt" content="Logo de Astro 5 con fondo degradado" />
```

---

## 3. URLs de Compartir en Redes Sociales

Cada red social tiene su propia URL para compartir contenido con parámetros específicos.

### X (Twitter)

**URL Base**:

```url
https://twitter.com/intent/tweet?url={URL}&text={TEXTO}
```

**Parámetros**:

- `url`: URL del contenido (URL encoded)
- `text`: Texto del tweet (URL encoded)
- `via`: Usuario de Twitter (opcional, sin @)
- `hashtags`: Hashtags separados por comas (opcional, sin #)

**Ejemplo en JavaScript**:

```javascript
const url = encodeURIComponent("https://tudominio.com/blog/mi-post");
const text = encodeURIComponent("Título del Post");
const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
```

**Ejemplo completo con todos los parámetros**:

```javascript
const url = encodeURIComponent("https://zunbeltz.org/blog/guia-astro-5");
const text = encodeURIComponent("Guía completa de Astro 5");
const via = "zunbeltz";
const hashtags = "Astro,JavaScript,WebDev";
const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=${via}&hashtags=${hashtags}`;
// Resultado: https://twitter.com/intent/tweet?url=https%3A%2F%2Fzunbeltz.org%2Fblog%2Fguia-astro-5&text=Gu%C3%ADa%20completa%20de%20Astro%205&via=zunbeltz&hashtags=Astro,JavaScript,WebDev
```

---

### Facebook

**URL Base**:

```url
https://www.facebook.com/sharer/sharer.php?u={URL}
```

**Parámetros**:

- `u`: URL del contenido (URL encoded)

**Ejemplo en JavaScript**:

```javascript
const url = encodeURIComponent("https://tudominio.com/blog/mi-post");
const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
```

**Nota importante**: Facebook obtiene título, descripción e imagen de los Open Graph tags, no de la URL. Por eso es crucial tener bien configurados los meta tags OG.

---

### WhatsApp

**URL Base (móvil y escritorio)**:

```url
https://wa.me/?text={TEXTO}
```

**URL alternativa (solo web)**:

```url
https://web.whatsapp.com/send?text={TEXTO}
```

**Parámetros**:

- `text`: Texto + URL combinados (URL encoded)

**Ejemplo en JavaScript**:

```javascript
const title = "Título del Post";
const url = "https://tudominio.com/blog/mi-post";
const text = encodeURIComponent(`${title} ${url}`);
const shareUrl = `https://wa.me/?text=${text}`;
```

**Ejemplo completo**:

```javascript
const title = "Guía completa de Astro 5";
const url = "https://zunbeltz.org/blog/guia-astro-5";
const text = encodeURIComponent(`${title}\n\n${url}`);
const shareUrl = `https://wa.me/?text=${text}`;
// Resultado: https://wa.me/?text=Gu%C3%ADa%20completa%20de%20Astro%205%0A%0Ahttps%3A%2F%2Fzunbeltz.org%2Fblog%2Fguia-astro-5
```

---

### LinkedIn

**URL Base**:

```url
https://www.linkedin.com/sharing/share-offsite/?url={URL}
```

**Parámetros**:

- `url`: URL del contenido (URL encoded)

**Ejemplo en JavaScript**:

```javascript
const url = encodeURIComponent("https://tudominio.com/blog/mi-post");
const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
```

**Nota**: LinkedIn también obtiene título, descripción e imagen de los Open Graph tags.

---

### Instagram

**⚠️ Limitación importante**: Instagram NO permite compartir enlaces directamente desde web.

**Opciones disponibles**:

1. **No incluir botón de Instagram** (recomendado para web)
2. **Mostrar un código QR** que abra la app
3. **Copiar enlace** con instrucciones de compartir manualmente
4. **Deep link** (solo funciona si la app está instalada):

```url
instagram://library?AssetPath={IMAGEN}
```

**Recomendación para este proyecto**: Dado que es un blog web, es mejor **NO incluir Instagram** en los botones de compartir, o solo mostrar un mensaje informativo indicando que deben compartir manualmente.

---

### Tabla resumen de URLs

| Red Social  | URL Base                                          | Parámetros principales           | Obtiene metadata de |
| ----------- | ------------------------------------------------- | -------------------------------- | ------------------- |
| X (Twitter) | `https://twitter.com/intent/tweet`                | `url`, `text`, `via`, `hashtags` | URL + parámetros    |
| Facebook    | `https://www.facebook.com/sharer/sharer.php`      | `u`                              | Open Graph tags     |
| WhatsApp    | `https://wa.me/`                                  | `text`                           | Parámetro text      |
| LinkedIn    | `https://www.linkedin.com/sharing/share-offsite/` | `url`                            | Open Graph tags     |
| Instagram   | ❌ No disponible en web                           | -                                | -                   |

---

## 4. Función de Copiar al Portapapeles

### API moderna (Clipboard API)

```javascript
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Error al copiar:', err);
    return false;
  }
}
```

### Uso con feedback al usuario

```javascript
async function handleCopyLink(url: string) {
  const success = await copyToClipboard(url);

  if (success) {
    // Mostrar toast de éxito
    showToast('Enlace copiado al portapapeles', 'success');
  } else {
    // Mostrar toast de error
    showToast('Error al copiar el enlace', 'error');
  }
}
```

### Consideraciones importantes

- **Requiere HTTPS** (o localhost para desarrollo)
- **Requiere permisos del navegador** (se solicitan automáticamente)
- **Funciona en navegadores modernos** (Chrome 63+, Firefox 53+, Safari 13.1+)
- **Es asíncrona** (devuelve una Promise)
- **Requiere interacción del usuario** (debe llamarse desde un evento como click)

### Fallback para navegadores antiguos

```javascript
function copyToClipboardFallback(text: string): boolean {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback: Error al copiar', err);
    document.body.removeChild(textArea);
    return false;
  }
}

// Función completa con fallback
async function copyToClipboard(text: string): Promise<boolean> {
  // Intentar con API moderna
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Error con Clipboard API:', err);
    }
  }

  // Fallback para navegadores antiguos
  return copyToClipboardFallback(text);
}
```

---

## 5. Validación de Meta Tags

### Herramientas oficiales para validar

#### 1. Facebook Sharing Debugger

- **URL**: [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)

- **Funciones**:
  - Ver cómo se verá tu contenido al compartir
  - Limpiar la caché de Facebook
  - Detectar errores en los Open Graph tags
  - Ver qué imagen, título y descripción se están usando

#### 2. Twitter Card Validator

- **URL**: [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

- **Funciones**:
  - Previsualizar cómo se verá la Twitter Card
  - Validar los meta tags de Twitter
  - Ver errores y advertencias
  - Actualizar la caché de Twitter

#### 3. LinkedIn Post Inspector

- **URL**: [https://www.linkedin.com/post-inspector/](https://www.linkedin.com/post-inspector/)

- **Funciones**:
  - Ver cómo se verá el post en LinkedIn
  - Validar Open Graph tags
  - Limpiar caché de LinkedIn
  - Detectar problemas con imágenes

### Proceso de validación recomendado

1. **Desarrollo local**:
   - Verificar que los meta tags se generan correctamente
   - Usar herramientas de desarrollo del navegador (inspeccionar `<head>`)

2. **Antes de publicar**:
   - Usar un túnel (ngrok, Cloudflare Tunnel) para exponer localhost
   - Validar con las herramientas oficiales

3. **Después de publicar**:
   - Validar en todas las herramientas
   - Limpiar caché si es necesario
   - Verificar que las imágenes se cargan correctamente

### Problemas comunes y soluciones

| Problema             | Causa                                | Solución                                           |
| -------------------- | ------------------------------------ | -------------------------------------------------- |
| Imagen no se muestra | URL relativa en og:image             | Usar URL absoluta (https://...)                    |
| Caché antigua        | Redes sociales cachean los meta tags | Usar herramientas de validación para limpiar caché |
| Imagen muy pequeña   | Tamaño menor al requerido            | Usar mínimo 1200x630px                             |
| Descripción cortada  | Texto muy largo                      | Máximo 155-160 caracteres                          |
| No se actualiza      | Caché del navegador                  | Limpiar caché y recargar                           |

---

## Implementación en el Proyecto

### Arquitectura y Decisiones de Diseño

El sistema de compartir en redes sociales del proyecto está construido con las siguientes decisiones técnicas:

- **Iconos**: Se utilizan los iconos SVG existentes en `src/icons` (Facebook, X/Twitter, WhatsApp, Link)
- **Nomenclatura**: Twitter se referencia como "X" en el código y la interfaz
- **Estilos**: Los botones usan las clases `icon-button secondary` del sistema de diseño global
- **UI minimalista**: Botones solo con iconos, sin texto descriptivo de la red social
- **Framework**: React para el componente interactivo `ShareButtons` (requiere hidratación con `client:load`)
- **Componentes UI**: Radix UI para el componente Toast (feedback al copiar enlace)
- **Estilos encapsulados**: CSS Modules para evitar conflictos de estilos
- **Redes soportadas**: Facebook, X (Twitter), WhatsApp, y función de copiar enlace
- **Instagram**: No incluido (no tiene API de compartir disponible para web)

### Componentes del Sistema

#### 1. Sistema de Meta Tags SEO

**Componentes**:

- `src/components/SEO/MetaInfo.ts` - Interface TypeScript para meta información
- `src/components/SEO/OpenGraphTags.astro` - Genera Open Graph tags
- `src/components/SEO/TwitterCardTags.astro` - Genera Twitter Cards

**Interface MetaInfo**:

```typescript
export interface MetaInfo {
  // Meta tags básicos
  pageTitle: string;
  pageDescription: string;
  pageTags?: string[];
  pageAuthor?: string;
  pageImage?: string;
  pageUrl?: string;
  pageType?: "website" | "article";

  // Open Graph - Article (para posts de blog)
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];

  // Twitter Cards
  twitterCard?: "summary" | "summary_large_image";
  twitterSite?: string;
  twitterCreator?: string;
}
```

**Uso en layouts**:

```astro
---
import OpenGraphTags from "@/components/SEO/OpenGraphTags.astro";
import TwitterCardTags from "@/components/SEO/TwitterCardTags.astro";
import type { MetaInfo } from "@/components/SEO/MetaInfo";

const { metaInfo } = Astro.props;
---

<head>
  <OpenGraphTags metaInfo={metaInfo} />
  <TwitterCardTags metaInfo={metaInfo} />
</head>
```

---

#### 2. Componente `ShareButtons.tsx`

**Responsabilidades**:

- Botones para: X, Facebook, WhatsApp, Copiar enlace
- Usar iconos de `src/icons` (importados como raw SVG)
- Clases `icon-button secondary` del sistema de diseño
- Toast de Radix UI al copiar enlace
- CSS Modules para estilos encapsulados

**Props necesarias**:

```typescript
interface ShareButtonsProps {
  url: string; // URL del post
  title: string; // Título del post
  description?: string; // Descripción opcional
}
```

**Redes sociales incluidas**:

- ✅ X (Twitter) - `https://twitter.com/intent/tweet?url={URL}&text={TITLE}`
- ✅ Facebook - `https://www.facebook.com/sharer/sharer.php?u={URL}`
- ✅ WhatsApp - `https://wa.me/?text={TITLE}%20{URL}`
- ✅ Copiar enlace - Usa Clipboard API + Toast de Radix UI
- ❌ Instagram (no disponible)

**Ubicación**: `src/components/SEO/ShareButtons.tsx`

**Estilos**: `src/components/SEO/ShareButtons.module.css`

**Características implementadas**:

- Importación de iconos SVG como raw HTML
- Toast Provider de Radix UI con duración de 3 segundos
- Animaciones de entrada/salida para el toast
- Soporte para swipe gesture en el toast
- Manejo de errores en la copia al portapapeles
- Apertura de ventanas en `_blank` con `noopener,noreferrer`

---

### Arquitectura de la Implementación

#### Utilidades de Compartir (`socialUtils.ts`)

Las funciones de generación de URLs están centralizadas en `src/components/SEO/socialUtils.ts`:

```typescript
/**
 * Genera la URL de compartir para Facebook
 */
export function getFacebookShareUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
}

/**
 * Genera la URL de compartir para X (Twitter)
 */
export function getTwitterShareUrl(url: string, text: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
}

/**
 * Genera la URL de compartir para WhatsApp
 */
export function getWhatsAppShareUrl(url: string, text: string): string {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
}

/**
 * Genera todas las URLs de compartir para un post
 */
export function generateShareLinks(url: string, title: string) {
  return {
    facebook: getFacebookShareUrl(url),
    x: getTwitterShareUrl(url, title),
    whatsapp: getWhatsAppShareUrl(url, title),
  };
}
```

#### Componente ShareButtons

El componente `ShareButtons.tsx` utiliza estas utilidades y gestiona:

- **Generación de URLs**: Usa las funciones de `socialUtils.ts`
- **Apertura de ventanas**: Con `window.open()` y flags de seguridad `noopener,noreferrer`
- **Copia al portapapeles**: Usa la Clipboard API moderna
- **Feedback visual**: Toast de Radix UI con duración de 3 segundos
- **Manejo de errores**: Captura y registra errores en la copia al portapapeles

#### Testing

El sistema cuenta con cobertura completa de tests (78 tests):

- **socialUtils.test.ts** (19 tests): Validación de generación de URLs, codificación de caracteres especiales, casos extremos
- **ShareButtons.test.tsx** (19 tests): Renderizado, interacciones, accesibilidad, manejo de errores
- **OpenGraphTags.test.ts** (20 tests): Generación correcta de meta tags OG
- **TwitterCardTags.test.ts** (20 tests): Generación correcta de Twitter Cards

---

### Integración en páginas de blog

#### En `src/pages/blog/[slug].astro`

```astro
---
import { getCollection, getEntry } from "astro:content";
import HtmlLayout from "@/layouts/HtmlLayout.astro";
import ShareButtons from "@/components/SEO/ShareButtons";
import type { MetaInfo } from "@/components/SEO/MetaInfo";

const { post } = Astro.props;
const author = await getEntry(post.data.author);

// Crear objeto MetaInfo con toda la información SEO
const meta: MetaInfo = {
  pageTitle: `${post.data.title} | Blog Zunbeltz`,
  pageDescription: post.data.description,
  pageTags: post.data.categories,
  pageAuthor: author.data.name,
  pageImage: post.data.heroImage.src,
  pageUrl: `https://zunbeltz.org/blog/${post.slug}`,
  pageType: "article",
  articleAuthor: author.data.name,
  articlePublishedTime: post.data.publishDate.toISOString(),
  articleTags: post.data.categories,
};
---

<HtmlLayout metaInfo={meta}>
  <article>
    <!-- Contenido del post -->

    <!-- Botones de compartir al final del post -->
    <div class="share-section" data-pagefind-ignore>
      <h3>Compartir este artículo</h3>
      <ShareButtons
        client:load
        url={meta.pageUrl || ""}
        title={post.data.title}
        description={post.data.description || ""}
      />
    </div>
  </article>
</HtmlLayout>
```

**Notas importantes**:

- El componente `ShareButtons` usa `client:load` porque es React y necesita hidratación
- Los meta tags se pasan al `HtmlLayout` que internamente usa `OpenGraphTags` y `TwitterCardTags`
- La sección de compartir tiene `data-pagefind-ignore` para excluirla de la búsqueda

---

### Configuración necesaria en `astro.config.mjs`

Asegurarse de que `site` está configurado para generar URLs absolutas:

```javascript
export default defineConfig({
  site: "https://zunbeltz.org", // URL base del sitio
  // ... resto de configuración
});
```

Esta configuración es crucial para que `Astro.site` funcione correctamente y se puedan generar URLs absolutas para los meta tags.

---

## Organización de Imágenes SEO

### Estructura Recomendada

#### Opción 1: Usando `public/images/seo/`

```folder
public/
├── images/
│   ├── seo/                          # Imágenes SEO generales
│   │   ├── default-og.jpg            # Imagen por defecto (1200x630px)
│   │   ├── home-og.jpg               # Imagen específica para home
│   │   ├── about-og.jpg              # Imagen para página "sobre nosotros"
│   │   ├── contact-og.jpg            # Imagen para contacto
│   │   └── sections/                 # Imágenes por sección
│   │       ├── espeleologia-og.jpg
│   │       ├── barranquismo-og.jpg
│   │       └── escalada-og.jpg
│   │
│   ├── blog/                         # Imágenes de posts
│   │   ├── post-1-hero.jpg
│   │   ├── post-2-hero.jpg
│   │   └── ...
│   │
│   └── favicon/                      # Favicons y app icons
│       ├── favicon.svg
│       ├── favicon-32x32.png
│       ├── favicon-16x16.png
│       ├── apple-touch-icon.png
│       └── android-chrome-512x512.png
```

#### Opción 2: Usando `src/assets/seo/` (Recomendada)

Si quieres aprovechar la optimización automática de imágenes de Astro:

```folder
src/
├── assets/
│   ├── seo/                          # Imágenes SEO (optimizadas por Astro)
│   │   ├── default-og.jpg
│   │   ├── home-og.jpg
│   │   ├── about-og.jpg
│   │   └── sections/
│   │       ├── espeleologia-og.jpg
│   │       └── ...
│   │
│   └── blog/                         # Imágenes de blog
│       └── heroes/
│           ├── post-1.jpg
│           └── ...
```

**Ventajas de `src/assets/`:**

- ✅ Optimización automática (compresión, formatos modernos)
- ✅ Type-safe imports
- ✅ Versionado automático (cache busting)
- ✅ Responsive images automáticos

### Convención de Nombres

#### Para páginas específicas

```folder
{pagina}-og.jpg          # Imagen Open Graph
{pagina}-twitter.jpg     # Imagen Twitter (si es diferente)
{pagina}-og-{idioma}.jpg # Si tienes i18n
```

**Ejemplos:**

- `home-og.jpg` (1200x630px)
- `about-og.jpg`
- `contact-og.jpg`
- `cuevas-navarra-og.jpg`

#### Para secciones/categorías

```folder
{seccion}-og.jpg
```

**Ejemplos:**

- `espeleologia-og.jpg`
- `barranquismo-og.jpg`
- `escalada-og.jpg`

#### Imagen por defecto

```folder
default-og.jpg           # Fallback general (1200x630px)
```

### Especificaciones Técnicas

#### Tamaños recomendados

| Tipo                | Tamaño     | Ratio  | Uso                          |
| ------------------- | ---------- | ------ | ---------------------------- |
| **Open Graph**      | 1200x630px | 1.91:1 | Facebook, LinkedIn, WhatsApp |
| **Twitter Large**   | 1200x675px | 16:9   | Twitter summary_large_image  |
| **Twitter Summary** | 400x400px  | 1:1    | Twitter summary (opcional)   |
| **Default**         | 1200x630px | 1.91:1 | Fallback universal           |

#### Formatos

- **JPG**: Para fotos (mejor compresión)
- **PNG**: Para gráficos con transparencia (aunque OG no usa transparencia)
- **WebP**: Alternativa moderna (no todos los scrapers lo soportan aún)

#### Peso

- **Máximo**: 5MB (límite de Twitter)
- **Recomendado**: < 300KB (carga rápida)

### Implementación en el Código

#### Usando `public/images/seo/`

```astro
---
// src/pages/index.astro
import HtmlLayout from "@/layouts/HtmlLayout.astro";
---

<HtmlLayout
  pageTitle="Zunbeltz | Espeleología en Navarra"
  pageDescription="Tu portal sobre espeleología"
  pageImage="/images/seo/home-og.jpg"
  ogType="website"
  twitterCard="summary_large_image"
>
  <!-- Contenido -->
</HtmlLayout>
```

#### Usando `src/assets/seo/` (Recomendada)

```astro
---
// src/pages/index.astro
import HtmlLayout from "@/layouts/HtmlLayout.astro";
import homeOgImage from "@/assets/seo/home-og.jpg";
---

<HtmlLayout
  pageTitle="Zunbeltz | Espeleología en Navarra"
  pageDescription="Tu portal sobre espeleología"
  pageImage={homeOgImage.src}
  ogType="website"
  twitterCard="summary_large_image"
>
  <!-- Contenido -->
</HtmlLayout>
```

### Configuración de Imagen por Defecto

Puedes añadir una imagen por defecto en el layout:

```astro
---
// src/layouts/HtmlLayout.astro
import defaultOgImage from "@/assets/seo/default-og.jpg";

const {
  pageImage,
  // ... otras props
} = Astro.props;

// Si no se proporciona imagen, usar la por defecto
const finalPageImage = pageImage || defaultOgImage.src;
---
```

### Mapa de Imágenes Centralizado (Opcional)

Para proyectos grandes, puedes crear un archivo de configuración:

```typescript
// src/config/seo-images.ts
import defaultOg from "@/assets/seo/default-og.jpg";
import homeOg from "@/assets/seo/home-og.jpg";
import aboutOg from "@/assets/seo/about-og.jpg";
import espeleologiaOg from "@/assets/seo/sections/espeleologia-og.jpg";

export const seoImages = {
  default: defaultOg.src,
  home: homeOg.src,
  about: aboutOg.src,
  sections: {
    espeleologia: espeleologiaOg.src,
    barranquismo: "/images/seo/sections/barranquismo-og.jpg",
    escalada: "/images/seo/sections/escalada-og.jpg",
  },
} as const;

// Uso:
// import { seoImages } from '@/config/seo-images';
// pageImage={seoImages.home}
```

### Herramientas para Generar Imágenes OG

#### Automáticas

1. **@vercel/og** - Genera imágenes dinámicamente
2. **Satori** - Convierte HTML/CSS a imágenes
3. **Puppeteer** - Screenshots programáticos

#### Manuales

1. **Figma** - Diseño profesional
2. **Canva** - Templates predefinidos
3. **Photoshop/GIMP** - Edición avanzada

#### Templates online

- [og-playground.vercel.app](https://og-playground.vercel.app/)
- [bannerbear.com](https://www.bannerbear.com/)

### Estructura Recomendada Final para Zunbeltz

```folder
src/
├── assets/
│   └── seo/
│       ├── default-og.jpg           # 1200x630px - Fallback
│       ├── home-og.jpg              # Página principal
│       ├── about-og.jpg             # Sobre nosotros
│       ├── contact-og.jpg           # Contacto
│       └── sections/
│           ├── espeleologia-og.jpg  # Sección espeleología
│           ├── barranquismo-og.jpg  # Sección barranquismo
│           └── escalada-og.jpg      # Sección escalada

src/
├── content/
│   └── posts/
│       ├── post-1.mdx
│       └── images/                  # Imágenes específicas del post
│           └── post-1-hero.jpg
```

**Ventajas:**

- ✅ Optimización automática de Astro
- ✅ Organización clara por contexto
- ✅ Fácil de mantener y escalar
- ✅ Type-safe imports

---

## Estructura de Archivos Actual

```plaintext
src/
├── components/
│   └── SEO/
│       ├── MetaInfo.ts                    # Interface TypeScript
│       ├── OpenGraphTags.astro            # Genera Open Graph tags
│       ├── TwitterCardTags.astro          # Genera Twitter Cards
│       ├── ShareButtons.tsx               # Componente React de botones
│       └── ShareButtons.module.css        # Estilos CSS Module
│
├── icons/
│   ├── brand-facebook.svg                 # Icono de Facebook
│   ├── brand-x.svg                        # Icono de X (Twitter)
│   ├── brand-whatsapp.svg                 # Icono de WhatsApp
│   └── link.svg                           # Icono de copiar enlace
│
├── layouts/
│   └── HtmlLayout.astro                   # Layout que usa OpenGraphTags y TwitterCardTags
│
└── pages/
    └── blog/
        └── [slug].astro                   # Página de post con ShareButtons integrado
```

**Dependencias utilizadas**:

- `radix-ui` (v1.4.3) - Para el componente Toast
- `react` (v19.2.0) - Framework para ShareButtons
- `react-dom` (v19.2.0) - Renderizado de React

---

## Referencias

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters)
- [Clipboard API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [Astro Image Service](https://docs.astro.build/en/guides/images/)
- [Radix UI Toast](https://www.radix-ui.com/primitives/docs/components/toast)
