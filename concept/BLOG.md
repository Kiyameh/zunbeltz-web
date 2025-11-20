# Sistema de Blog - Conceptualización y Roadmap

## Visión General

Sistema de blog completo integrado en Astro con Content Collections, autenticación mediante Clerk, y funcionalidades avanzadas de categorización, búsqueda, comentarios y suscripción.

---

## Arquitectura Técnica Base

### Stack Tecnológico

- **Framework**: Astro 5.x (SSR con Node adapter)
- **Content**: Content Collections + MDX
- **Autenticación**: Clerk (ya integrado)
- **Base de Datos**: PostgreSQL (para comentarios y suscripciones)
- **Búsqueda**: Pagefind (búsqueda estática generada en build)
- **Estilos**: Sistema CSS modular existente (CSS por componente)
- **Componentes**: React Islands para interactividad

### Estructura de Directorios Propuesta

```text
src/
├── content/
│   ├── config.ts                    # Definición de collections
│   ├── posts/                       # Colección de posts
│   │   ├── post-1.mdx
│   │   └── post-2.mdx
│   └── authors/                     # Colección de autores
│       ├── author-1.json
│       └── author-2.json
├── components/
│   └── blog/
│       ├── PostCard.astro
│       ├── PostHeader.astro
│       ├── CategoryCloud.astro
│       ├── CategoryTag.astro
│       ├── AuthorProfile.astro
│       ├── SearchBar.tsx            # React Island
│       ├── ShareButtons.tsx         # React Island
│       ├── CommentSection.tsx       # React Island
│       └── SubscribeForm.tsx        # React Island
├── pages/
│   ├── blog/
│   │   ├── index.astro              # Lista de posts
│   │   ├── [slug].astro             # Post individual
│   │   └── category/
│   │       └── [category].astro     # Posts por categoría
│   └── api/
│       ├── comments/
│       │   ├── create.ts
│       │   ├── list.ts
│       │   └── reply.ts
│       ├── subscribe.ts
│       └── search.ts
├── lib/
│   ├── blog/
│   │   ├── categories.ts            # Utilidades de categorías
│   │   └── rss.ts                   # Generación de RSS
│   └── db/
│       ├── schema.ts                # Esquema PostgreSQL
│       └── client.ts                # Cliente DB
```

---

### Convenciones

- Nombre de archivos de post solo slug en castellano

## FASE 1: MVP Básico - Content Collections y Visualización ✅ COMPLETADA

**Objetivo**: Blog funcional con posts en MDX, categorías básicas y navegación.

**Estado**: ✅ **COMPLETADA** - Noviembre 2024

### Funcionalidades Fase 1

- ✅ Content Collection `posts` con schema básico
- ✅ Renderizado de posts individuales
- ✅ Lista de posts con paginación
- ✅ Sistema de categorías (tags en frontmatter)
- ✅ Imagen de cabecera obligatoria

### Decisiones de Diseño - Fase 1

1. **Categorías abiertas**: Las categorías se definen libremente en el frontmatter de cada post
2. **Generación automática**: Las categorías se extraen dinámicamente de todos los posts
3. **Imágenes**: Usar Astro Image Service para optimización automática
4. **Rutas**: `/blog` (lista), `/blog/[slug]` (post individual)
5. **Ordenación**: Posts ordenados por fecha de publicación (más reciente primero)

### Entregables Fase 1

- ✅ Configuración de Content Collection
- ✅ Componente `PostCard.astro` para preview
- ✅ Página de lista de posts con paginación
- ✅ Página de post individual con MDX
- ✅ Componente `PostHeader.astro` con imagen hero
- ✅ Utilidad para extraer categorías únicas (`src/utils/blog/categories.ts`)
- ✅ Componente `CategoryTag.astro` básico
- ✅ Tests unitarios para componentes de blog
- ✅ Componentes adicionales: `RecentPosts.astro`, `BlogCategories.astro`

### Notas de Implementación

- **Testing**: Se implementaron tests unitarios para todos los componentes usando Vitest, probando la lógica de negocio sin depender de AstroContainer
- **Componentes implementados**:
  - `PostCard.astro`: Tarjeta de preview con imagen, título, descripción, fecha y categorías
  - `PostHeader.astro`: Cabecera de post con título, descripción, fecha y categorías
  - `RecentPosts.astro`: Lista de posts recientes ordenados por fecha
  - `BlogCategories.astro`: Lista de categorías con contador de posts
  - `Breadcrumb.astro`: Navegación breadcrumb con formateo automático de segmentos
- **Utilidades**: `src/utils/blog/categories.ts` con funciones para extraer y contar categorías

---

## FASE 2: Categorías Avanzadas y Navegación ✅ COMPLETADA

**Objetivo**: Sistema completo de categorías con nube de tags y filtrado.

**Estado**: ✅ **COMPLETADA** - Noviembre 2024

### Funcionalidades Fase 2

- ✅ Nube de categorías (tag cloud) con tamaños proporcionales
- ✅ Páginas de categoría individual
- ✅ Filtrado de posts por categoría
- ✅ Contador de posts por categoría
- ✅ Breadcrumbs de navegación

### Decisiones de Diseño - Fase 2

1. **Nube de tags**: 5 tamaños diferentes basados en frecuencia
2. **Normalización**: Categorías en lowercase con guiones (slug-friendly)
3. **Ruta de categoría**: `/blog/category/[category]`
4. **Ordenación en nube**: Alfabético o por popularidad (configurable)
5. **Colores**: Usar `--color-primary-X` del sistema de diseño

### Entregables Fase 2

- ✅ Página `/blog/categoria/index.astro` con nube de categorías
- ✅ Página `/blog/categoria/[categoria].astro` para posts por categoría
- ✅ Función `getPostsByCategory()` en `categories.ts`
- ✅ Algoritmo de cálculo de tamaños proporcionales (5 niveles)
- ✅ Breadcrumbs component (ya existente)
- ✅ Estilos para nube de categorías con efectos hover
- ✅ Tests unitarios para `getPostsByCategory()`
- ✅ Tests para lógica de cálculo de tamaños de tags

### Notas de Implementación - Fase 2

- **Nube de categorías**: Implementada con 5 tamaños basados en frecuencia de posts (distribución en percentiles: 80%, 60%, 40%, 20%)
- **Páginas creadas**:
  - `/blog/categoria/` - Índice con nube de tags y lista completa de categorías
  - `/blog/categoria/[categoria]` - Posts filtrados por categoría con grid responsive
- **Componentes reutilizados**: `PostCard`, `BlogCategories`, `Breadcrumb`
- **Testing**: 19 tests unitarios (7 para `getPostsByCategory`, 12 para lógica de tamaños)
- **Diseño**: Uso de chips del sistema de diseño, efectos hover con elevación, responsive completo

---

## FASE 3: Perfiles de Autor y MDX ✅ COMPLETADA

**Objetivo**: Sistema de autores y componentes React en contenido.

**Estado**: ✅ **COMPLETADA** - Noviembre 2024

### Funcionalidades Fase 3

- ✅ Content Collection `authors`
- ✅ Relación post-autor mediante references
- ✅ Perfil de autor en cada post
- ✅ Página de autor con sus posts
- ✅ Página índice de autores con estadísticas
- ✅ Integración MDX con componentes React
- ✅ Componentes personalizados para MDX

### Schema de Autores

```typescript
// src/content/config.ts
const authors = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      avatar: image(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      social: z
        .object({
          twitter: z.string().optional(),
          instagram: z.string().optional(),
          facebook: z.string().optional(),
        })
        .optional(),
    }),
});

// Actualizar schema de posts
const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      // ... campos anteriores
      author: z.string(), // Reference a authors collection
    }),
});
```

### Notas de Implementación - Fase 3

- **AuthorProfile Component**: Tarjeta moderna con diseño horizontal responsive
  - Header con fondo diferenciado (`--color-surface-300`)
  - Avatar circular de 80x80px
  - Nombre centrado con tipografía del sistema
  - Enlaces sociales con z-index elevado para interacción
  - Bio en sección principal con flex-grow
  - Efectos hover con elevación y transformación
  - Full-card link accesible que cubre toda la tarjeta
- **Páginas implementadas**:
  - `/blog/autor/` - Grid de autores con chips mostrando número de posts
  - `/blog/autor/[authorId]` - Perfil completo con grid de posts del autor
- **Utilidades de autores**:
  - Filtrado automático de posts en draft
  - Ordenación por fecha de publicación (más recientes primero)
  - Contadores eficientes usando Map para O(n) complexity
- **Testing**: 64 tests totales
  - 26 tests para `AuthorProfile.test.ts` (validación de props, estructura CSS, integración)
  - 38 tests para `authors.test.ts` (utilidades, filtrado, ordenación, integración)
- **Diseño responsive**: Grid adaptativo con breakpoints en 768px y 640px

### Componentes MDX Personalizados

```typescript
// src/components/blog/mdx/
-Callout.tsx - // Cajas de información/advertencia
  ImageGallery.tsx - // Galería de imágenes
  VideoEmbed.tsx - // Embeds de video
  Quote.tsx; // Citas destacadas
```

### Decisiones de Diseño - Fase 3

1. **Autores como colección**: Separados de posts para reutilización mediante `reference()`
2. **Avatar obligatorio**: Cada autor debe tener imagen optimizada con Astro Image
3. **Ruta de autor**: `/blog/autor/[authorId]` (en español)
4. **MDX Components**: Exportar desde `src/components/blog/mdx/index.ts`
5. **Validación**: Reference checking automático entre posts y autores
6. **Diseño de tarjeta**: Layout horizontal con header (avatar + nombre + redes) y bio
7. **Semántica HTML**: Uso de `<article>`, `<header>`, `<main>` para estructura
8. **Accesibilidad**: Full-card link con `aria-label` y `sr-only` para lectores de pantalla
9. **Redes sociales**: Soporte para Instagram, Facebook, Twitter y website personal
10. **Ordenación**: Autores ordenados por número de posts (descendente)

### Entregables Fase 3

- ✅ Content Collection `authors` con schema completo
- ✅ Componente `AuthorProfile.astro` con diseño de tarjeta moderna
- ✅ Página `/blog/autor/[authorId].astro` con lista de posts del autor
- ✅ Página `/blog/autor/index.astro` con grid de autores y estadísticas
- ✅ Configuración MDX en `astro.config.mjs`
- ✅ Componentes MDX personalizados (mínimo 5)
- ✅ Utilidades en `src/utils/blog/authors.ts`:
  - `getAuthorPosts()` - Posts de un autor específico
  - `getAuthorsWithPosts()` - Autores que tienen posts publicados
  - `getAuthorPostCounts()` - Contador de posts por autor
- ✅ Tests unitarios completos (26 tests para AuthorProfile, 38 tests para utilidades)
- ✅ Documentación de componentes MDX

---

## FASE 4: Sistema de Búsqueda

**Objetivo**: Búsqueda full-text en posts (título, contenido, categorías).

### Funcionalidades Fase 4

- ✅ Índice de búsqueda generado en build con Pagefind
- ✅ Búsqueda estática optimizada
- ✅ Búsqueda por título, contenido y categorías
- ✅ Resultados con highlighting automático
- ✅ UI de búsqueda integrada
- ✅ Búsqueda multiidioma (preparado para i18n)

### Arquitectura de Búsqueda con Pagefind

**Pagefind** es una herramienta de búsqueda estática que genera un índice en build time y proporciona una UI lista para usar. Se integra perfectamente con Astro.

```typescript
// astro.config.mjs - Integración de Pagefind
import { defineConfig } from "astro/config";

export default defineConfig({
  // ... otras configuraciones
  integrations: [
    // Pagefind se ejecuta después del build
  ],
});
```

**Configuración en páginas de blog:**

```astro
---
// src/pages/blog/[slug].astro
// Marcar contenido para indexación
---

<article data-pagefind-body>
  <h1 data-pagefind-meta="title">{post.data.title}</h1>
  <div data-pagefind-meta="description">{post.data.description}</div>
  <div data-pagefind-filter="category">{post.data.categories.join(", ")}</div>
  <div data-pagefind-filter="author">{post.data.author}</div>

  <Content />
</article>
```

**Componente de búsqueda:**

```typescript
// src/components/blog/SearchBar.tsx
import { useEffect, useRef } from 'react';

export function SearchBar() {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cargar Pagefind UI dinámicamente
    import('@pagefind/default-ui').then(({ PagefindUI }) => {
      new PagefindUI({
        element: searchRef.current,
        showSubResults: true,
        showImages: false,
        excerptLength: 15,
      });
    });
  }, []);

  return <div ref={searchRef} />;
}
```

### Decisiones de Diseño - Fase 4

1. **Estrategia**: Pagefind genera índice estático en build (sin servidor)
2. **Indexación**: Automática mediante atributos `data-pagefind-*`
3. **Filtros**: Por categoría y autor usando `data-pagefind-filter`
4. **UI**: Componente React wrapper sobre Pagefind UI (personalizable con CSS)
5. **Ubicación**: Barra de búsqueda en header del blog y página dedicada
6. **Performance**: Carga lazy del índice (solo cuando se usa)
7. **Personalización**: Estilos CSS para adaptar a sistema de diseño existente

### Entregables Fase 4

- ✅ Instalación y configuración de Pagefind
- ✅ Script de build para ejecutar Pagefind post-build
- ✅ Atributos `data-pagefind-*` en templates de blog
- ✅ Componente `SearchBar.tsx` (React Island con Pagefind UI)
- ✅ Estilos CSS personalizados para Pagefind UI
- ✅ Página `/blog/search` dedicada
- ✅ Configuración de filtros (categorías, autor)
- ✅ Documentación de uso

---

## FASE 5: Compartir en Redes Sociales

**Objetivo**: Botones de compartir y generación de meta tags.

### Funcionalidades Fase 5

- ✅ Botones de compartir (Twitter, Facebook, WhatsApp, Enlace directo)
- ✅ Open Graph meta tags
- ✅ Twitter Cards
- ✅ Imagen social generada automáticamente

### Redes Sociales Soportadas

- Instagram
- Twitter
- Facebook
- WhatsApp
- Enlace directo

### Meta Tags Template

```astro
---
// src/components/blog/SocialMeta.astro
const { post, url } = Astro.props;
const ogImage = post.data.heroImage || "/default-og.png";
---

<meta property="og:title" content={post.data.title} />
<meta property="og:description" content={post.data.description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={url} />
<meta property="og:type" content="article" />
<meta
  property="article:published_time"
  content={post.data.publishDate.toISOString()}
/>
<meta property="article:author" content={post.data.author} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={post.data.title} />
<meta name="twitter:description" content={post.data.description} />
<meta name="twitter:image" content={ogImage} />
```

### Decisiones de Diseño - Fase 5

1. **Posición**: Botones al final del post y en header
2. **Estilo**: Usar iconos de Tabler Icons
3. **Feedback**: Toast notification al copiar enlace
4. **Toast**: Usar toast de Radix-ui
5. **Analytics**: Tracking de compartidos (opcional)
6. **OG Image**: Usar heroImage del post como fallback

### Entregables Fase 5

- [ ] Componente `ShareButtons.tsx`
- [ ] Componente `SocialMeta.astro`
- [ ] Utilidad `copyToClipboard()`
- [ ] Estilos para botones de compartir
- [ ] Tests de generación de URLs

---

## FASE 6: Suscripción por Email y RSS

**Objetivo**: Sistema de suscripción y feeds RSS/Atom.

### Funcionalidades Fase 6

- ✅ Feed RSS 2.0
- ✅ Feed Atom
- ✅ Formulario de suscripción por email
- ✅ Almacenamiento de suscriptores en PostgreSQL
- ✅ Validación y sanitización de emails
- ✅ Double opt-in (confirmación por email)

### Schema de Base de Datos - Suscriptores

```sql
-- src/lib/db/schema.sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE,
  confirmation_token VARCHAR(255),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP,
  unsubscribed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_confirmed ON subscribers(confirmed);
```

### Generación de RSS

```typescript
// src/pages/blog/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return rss({
    title: "Zunbeltz Blog",
    description: "Blog sobre desarrollo web y tecnología",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.slug}/`,
      categories: post.data.categories,
      author: post.data.author,
    })),
    customData: "<language>es-ES</language>",
  });
}
```

### API Endpoints - Suscripción

```typescript
// src/pages/api/subscribe.ts
POST /api/subscribe
Body: { email: string }
Response: { success: boolean, message: string }

// src/pages/api/confirm-subscription.ts
GET /api/confirm-subscription?token=xxx
Response: { success: boolean, message: string }

// src/pages/api/unsubscribe.ts
POST /api/unsubscribe
Body: { email: string }
Response: { success: boolean, message: string }
```

### Decisiones de Diseño - Fase 6

1. **Double opt-in**: Obligatorio para GDPR compliance
2. **Unsubscribe**: Link en cada email y página web
3. **Frecuencia**: Notificación inmediata por nuevo post (configurable)
4. **Template**: Email HTML responsive

### Entregables Fase 6

- [ ] Generador RSS (`/blog/rss.xml`)
- [ ] Generador Atom (`/blog/atom.xml`)
- [ ] Tabla `subscribers` en PostgreSQL
- [ ] Componente `SubscribeForm.tsx`
- [ ] API endpoints de suscripción
- [ ] Servicio de envío de emails
- [ ] Template de email de confirmación
- [ ] Template de email de nuevo post
- [ ] Página de confirmación
- [ ] Página de unsubscribe

---

## FASE 7: Sistema de Comentarios

**Objetivo**: Comentarios anidados con autenticación de Clerk.

### Funcionalidades Fase 7

- ✅ Comentarios autenticados (Clerk)
- ✅ Respuestas anidadas (threading)
- ✅ Edición y eliminación de comentarios
- ✅ Moderación básica
- ✅ Notificaciones de respuestas
- ✅ Ordenación (más recientes, más antiguos, más populares)

### Schema de Base de Datos - Comentarios

```sql
-- src/lib/db/schema.sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL, -- Clerk User ID
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  edited BOOLEAN DEFAULT FALSE,
  deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_content_length CHECK (char_length(content) <= 5000)
);

CREATE INDEX idx_comments_post_slug ON comments(post_slug);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);

-- Tabla para likes/reacciones (opcional)
CREATE TABLE comment_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL,
  reaction_type VARCHAR(50) NOT NULL, -- 'like', 'love', etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(comment_id, user_id, reaction_type)
);

CREATE INDEX idx_reactions_comment_id ON comment_reactions(comment_id);
```

### Estructura de Comentarios Anidados

```typescript
// src/utils/blog/comments.ts
export interface Comment {
  id: string;
  postSlug: string;
  userId: string;
  userName: string;
  userAvatar: string;
  parentId: string | null;
  content: string;
  edited: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  replies: Comment[]; // Anidación recursiva
  reactionCount?: number;
}

export function buildCommentTree(comments: Comment[]): Comment[] {
  const commentMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];

  // Primera pasada: crear mapa
  comments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Segunda pasada: construir árbol
  comments.forEach((comment) => {
    const node = commentMap.get(comment.id)!;
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies.push(node);
      }
    } else {
      rootComments.push(node);
    }
  });

  return rootComments;
}
```

### API Endpoints - Comentarios

```typescript
// GET /api/comments/list.ts
GET /api/comments/list?postSlug=xxx&sort=newest
Response: { comments: Comment[] }

// POST /api/comments/create.ts
POST /api/comments/create
Body: { postSlug: string, content: string, parentId?: string }
Headers: Authorization (Clerk)
Response: { comment: Comment }

// PUT /api/comments/update.ts
PUT /api/comments/update
Body: { commentId: string, content: string }
Headers: Authorization (Clerk)
Response: { comment: Comment }

// DELETE /api/comments/delete.ts
DELETE /api/comments/delete
Body: { commentId: string }
Headers: Authorization (Clerk)
Response: { success: boolean }

// POST /api/comments/react.ts
POST /api/comments/react
Body: { commentId: string, reactionType: string }
Headers: Authorization (Clerk)
Response: { success: boolean }
```

### Componente de Comentarios

```typescript
// src/components/blog/CommentSection.tsx
interface CommentSectionProps {
  postSlug: string;
  initialComments: Comment[];
}

// Características:
// - Carga inicial de comentarios desde props (SSR)
// - Carga dinámica de respuestas (lazy loading)
// - Formulario de comentario con preview
// - Botón "Responder" en cada comentario
// - Edición inline con confirmación
// - Eliminación con confirmación
// - Indicador de "Editado"
// - Paginación o infinite scroll
// - Ordenación (más recientes, más antiguos)
```

### Decisiones de Diseño - Fase 7

1. **Autenticación**: Obligatoria mediante Clerk (no anónimos)
2. **Profundidad**: Máximo 5 niveles de anidación
3. **Longitud**: Máximo 5000 caracteres por comentario
4. **Markdown**: Soporte básico (bold, italic, links, code)
5. **Moderación**: Soft delete (marcar como eliminado, no borrar)
6. **Notificaciones**: Email cuando alguien responde (opcional)
7. **Rate limiting**: Máximo 10 comentarios por hora por usuario
8. **Spam protection**: Validación de contenido básica

### Entregables Fase 7

- [ ] Tablas `comments` y `comment_reactions`
- [ ] Componente `CommentSection.tsx`
- [ ] Componente `Comment.tsx` (recursivo)
- [ ] Componente `CommentForm.tsx`
- [ ] API endpoints de comentarios (CRUD)
- [ ] Utilidad `buildCommentTree()`
- [ ] Middleware de autenticación Clerk
- [ ] Rate limiting middleware
- [ ] Validación y sanitización de contenido
- [ ] Sistema de notificaciones (email)
- [ ] Tests de integración

---

## Consideraciones Técnicas Transversales

### Base de Datos PostgreSQL

**Opciones de Hosting**:

1. **Supabase** (Recomendado para MVP)
   - Free tier generoso
   - PostgreSQL managed
   - APIs REST automáticas
   - Realtime subscriptions

2. **Neon** (Alternativa)
   - Serverless PostgreSQL
   - Branching de BD
   - Free tier

3. **Railway** / **Render**
   - PostgreSQL tradicional
   - Más control

**Cliente de Base de Datos**:

```typescript
// Opción 1: Drizzle ORM (Recomendado)
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Opción 2: Prisma
import { PrismaClient } from "@prisma/client";
```

### Seguridad

1. **Autenticación**: Clerk middleware en todas las rutas protegidas
2. **Validación**: Zod para validar inputs de API
3. **Sanitización**: DOMPurify para contenido HTML
4. **Rate Limiting**: Implementar en API endpoints
5. **CORS**: Configurar correctamente para APIs públicas
6. **SQL Injection**: Usar prepared statements (ORM)
7. **XSS**: Escapar contenido de usuarios

### Performance

1. **Imágenes**: Astro Image Service con lazy loading
2. **Búsqueda**: Índice pre-generado en build
3. **Comentarios**: Paginación o infinite scroll
4. **Caché**: Cache-Control headers en posts estáticos
5. **Bundle**: Code splitting para React Islands
6. **CDN**: Servir assets estáticos desde CDN

### SEO

1. **Meta tags**: Open Graph y Twitter Cards
2. **Sitemap**: Generar automáticamente
3. **Robots.txt**: Configurar correctamente
4. **Structured Data**: JSON-LD para artículos
5. **Canonical URLs**: Evitar contenido duplicado
6. **RSS/Atom**: Para agregadores

### Accesibilidad

1. **Semántica HTML**: Usar tags apropiados
2. **ARIA labels**: En componentes interactivos
3. **Keyboard navigation**: Soporte completo
4. **Focus management**: Visible y lógico
5. **Color contrast**: Cumplir WCAG AA
6. **Screen readers**: Testar con NVDA/JAWS

---

## Estimación de Tiempo por Fase

| Fase       | Funcionalidades                     | Tiempo Estimado | Complejidad |
| ---------- | ----------------------------------- | --------------- | ----------- |
| **Fase 1** | Content Collections + Visualización | 1-2 semanas     | Baja        |
| **Fase 2** | Categorías Avanzadas                | 1 semana        | Media       |
| **Fase 3** | Autores + MDX                       | 1-2 semanas     | Media       |
| **Fase 4** | Sistema de Búsqueda                 | 1 semana        | Media       |
| **Fase 5** | Compartir en RRSS                   | 3-5 días        | Baja        |
| **Fase 6** | Suscripción + RSS                   | 1-2 semanas     | Media-Alta  |
| **Fase 7** | Sistema de Comentarios              | 2-3 semanas     | Alta        |

**Total estimado**: 8-12 semanas (2-3 meses)

---

## Dependencias entre Fases

```text
Fase 1 (Base)
    ↓
Fase 2 (Categorías) ← Independiente de Fase 3
    ↓
Fase 3 (Autores + MDX) ← Independiente de Fase 2
    ↓
Fase 4 (Búsqueda) ← Requiere Fase 1-3
    ↓
Fase 5 (Compartir) ← Requiere Fase 1
    ↓
Fase 6 (Suscripción) ← Requiere Fase 1 + Setup DB
    ↓
Fase 7 (Comentarios) ← Requiere Fase 1 + Setup DB + Clerk
```

**Nota**: Las Fases 2 y 3 pueden desarrollarse en paralelo. Las Fases 5 y 6 también pueden paralelizarse.

---

## Próximos Pasos

1. **Decisión de Base de Datos**: Elegir entre Supabase, Neon, Railway
2. **Decisión de ORM**: Elegir entre Drizzle o Prisma
3. **Decisión de Email Service**: Elegir entre Resend, SendGrid, Mailgun
4. **Setup de Proyecto**: Instalar dependencias necesarias
5. **Comenzar Fase 1**: Configurar Content Collections

---

## Notas Adicionales

- Cada fase debe incluir tests unitarios y de integración
- Documentar decisiones de diseño en este archivo
- Evaluar analytics (Plausible, Umami) para métricas de blog
