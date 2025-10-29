# Blog Zunbeltz - Documentación Técnica

## Descripción General

Blog personal desarrollado en Astro con enfoque minimalista, utilizando Content Collections para gestión de contenido y PostgreSQL como base de datos. Prioriza soluciones nativas y código abierto sobre servicios externos.

## Stack Tecnológico

### Core

- **Frontend**: Astro (SSG/SSR híbrido) + React
- **Styling**: CSS nativo (sin frameworks)
- **Base de Datos**: PostgreSQL (Supabase/Neon)
- **ORM**: Prisma
- **Autenticación**: Clerk
- **Hosting**: Vercel/Netlify

### Dependencias Mínimas

```json
{
  "@astrojs/react": "^3.0.0",
  "@clerk/astro": "^0.1.0",
  "prisma": "^5.0.0",
  "@prisma/client": "^5.0.0",
  "fuse.js": "^7.0.0",
  "resend": "^2.0.0"
}
```

## Funcionalidades del Blog

### ✅ Funcionalidades Base (Implementadas)

- [x] Content Collections para posts
- [x] Sistema de temas (claro/oscuro)
- [x] Estructura básica de componentes

### 🚀 Funcionalidades a Desarrollar

## 1. Sistema de Tags y Categorías

### Características

- Nube de tags visual con contadores
- Filtrado de posts por categoría
- Páginas dinámicas por tag
- Agrupación automática desde frontmatter

### Plan de Actuación

1. **Configurar Content Collections**
   - Definir schema con tags obligatorios
   - Crear tipos TypeScript para posts
2. **Crear utilidades de agrupación**
   - Función para contar posts por tag
   - Generador de páginas dinámicas
3. **Implementar componentes**
   - `TagCloud.tsx` - Nube visual de tags
   - `TagFilter.tsx` - Filtros interactivos
   - `[tag].astro` - Páginas por categoría

**Archivos a crear:**

```folder
src/utils/tags.ts
src/components/blog/TagCloud.tsx
src/pages/tags/[tag].astro
```

---

## 2. Sistema de Comentarios

### Características comentarios

- Comentarios autenticados (Clerk) e invitados
- Respuestas anidadas (threading)
- Moderación básica
- Notificaciones por email (opcional)

### Plan de Actuación comentarios

1. **Schema de Base de Datos**

   ```sql
   CREATE TABLE comments (
     id SERIAL PRIMARY KEY,
     post_slug VARCHAR(255) NOT NULL,
     user_id VARCHAR(255), -- Clerk user ID
     guest_name VARCHAR(100),
     guest_email VARCHAR(255),
     content TEXT NOT NULL,
     parent_id INTEGER REFERENCES comments(id),
     created_at TIMESTAMP DEFAULT NOW(),
     is_approved BOOLEAN DEFAULT true
   );
   ```

2. **API Endpoints**
   - `POST /api/comments` - Crear comentario
   - `GET /api/comments/[slug]` - Obtener comentarios
   - `DELETE /api/comments/[id]` - Eliminar (solo autor/admin)

3. **Componentes React**
   - `CommentSection.tsx` - Sección completa
   - `CommentForm.tsx` - Formulario de comentario
   - `CommentThread.tsx` - Lista anidada

**Archivos a crear:**

```folder
src/pages/api/comments.ts
src/components/blog/CommentSection.tsx
src/lib/comments.ts
```

---

## 3. Sistema de Búsqueda Nativo

### Características búsqueda

- Búsqueda full-text en título, contenido y tags
- Resultados con scoring y highlighting
- Búsqueda instantánea (cliente)
- Fallback a PostgreSQL full-text search

### Plan de Actuación búsqueda

1. **Opción A: Cliente + Build-time**
   - Generar índice JSON en build
   - Búsqueda con Fuse.js
   - Web Worker para rendimiento

2. **Opción B: PostgreSQL Full-Text**
   - Configurar tsvector en posts
   - API de búsqueda server-side
   - Índices GIN para velocidad

3. **Implementación**
   - `SearchBox.tsx` - Input con autocompletado
   - `SearchResults.tsx` - Lista de resultados
   - `/search` - Página de resultados

**Archivos a crear:**

```folder
src/utils/search.ts
src/components/blog/SearchBox.tsx
src/pages/search.astro
src/pages/api/search.ts
```

---

## 4. Analytics Propio

### Características analytics

- Tracking de page views privacy-friendly
- Estadísticas de posts populares
- Dashboard básico de métricas
- Sin cookies, hash de IPs

### Plan de Actuación analytics

1. **Schema de Analytics**

   ```sql
   CREATE TABLE page_views (
     id SERIAL PRIMARY KEY,
     page_path VARCHAR(255) NOT NULL,
     ip_hash VARCHAR(64),
     referrer VARCHAR(255),
     user_agent TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE posts_metadata (
     slug VARCHAR(255) PRIMARY KEY,
     views INTEGER DEFAULT 0,
     likes INTEGER DEFAULT 0,
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. **Tracking Component**
   - `Analytics.astro` - Script de tracking
   - Respeto a Do Not Track
   - Batch de eventos

3. **Dashboard**
   - `Dashboard.astro` - Página de estadísticas
   - Gráficos con Chart.js o D3
   - Métricas en tiempo real

**Archivos a crear:**

```folder
src/components/Analytics.astro
src/pages/api/analytics.ts
src/pages/dashboard.astro
src/utils/analytics.ts
```

---

## 5. Suscripción por Email

### Características suscripción

- Newsletter semanal/mensual
- Formulario de suscripción
- Gestión de suscriptores
- Templates de email personalizados

### Plan de Actuación suscripción

1. **Schema de Suscriptores**

   ```sql
   CREATE TABLE subscribers (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     is_active BOOLEAN DEFAULT true,
     subscribed_at TIMESTAMP DEFAULT NOW(),
     unsubscribe_token VARCHAR(255) UNIQUE
   );
   ```

2. **Sistema de Emails**
   - Integración con Resend
   - Templates en React Email
   - Cron job para newsletters

3. **Componentes**
   - `Newsletter.tsx` - Formulario suscripción
   - `EmailTemplate.tsx` - Template newsletter
   - Página de unsubscribe

**Archivos a crear:**

```folder
src/pages/api/subscribe.ts
src/components/Newsletter.tsx
src/emails/NewsletterTemplate.tsx
src/pages/unsubscribe.astro
```

---

## 6. Perfiles de Autor

### Características autor

- Páginas individuales de autor
- Bio, foto, redes sociales
- Lista de posts por autor
- Múltiples autores support

### Plan de Actuación autor

1. **Content Collection de Autores**

   ```typescript
   // src/content/config.ts
   const authors = defineCollection({
     type: "data",
     schema: z.object({
       name: z.string(),
       bio: z.string(),
       avatar: z.string(),
       social: z.object({
         twitter: z.string().optional(),
         github: z.string().optional(),
         website: z.string().optional(),
       }),
     }),
   });
   ```

2. **Relación Posts-Autores**
   - Referencia en frontmatter de posts
   - Validación de autores existentes

3. **Páginas Dinámicas**
   - `[author].astro` - Página de autor
   - Lista de posts filtrada
   - Componente de bio

**Archivos a crear:**

```folder
src/content/authors/
src/pages/authors/[author].astro
src/components/AuthorCard.tsx
```

---

## 7. Compartir en Redes Sociales

### Características compartir

- Botones de compartir nativos
- Meta tags optimizados (Open Graph)
- Web Share API para móviles
- URLs de compartir personalizadas

### Plan de Actuación compartir

1. **Meta Tags Dinámicos**
   - Component `SEO.astro`
   - Open Graph para cada post
   - Twitter Cards

2. **Componente de Compartir**
   - `ShareButtons.tsx`
   - Web Share API + fallbacks
   - Iconos SVG personalizados

3. **URLs Optimizadas**
   - Parámetros UTM para tracking
   - Textos pre-rellenados

**Archivos a crear:**

```folder
src/components/SEO.astro
src/components/blog/ShareButtons.tsx
src/utils/social.ts
```

---

## Estructura de Archivos Final

```folder
src/
├── content/
│   ├── config.ts
│   ├── blog/              # Posts en markdown
│   └── authors/           # Perfiles de autores
├── components/
│   ├── blog/
│   │   ├── SearchBox.tsx
│   │   ├── CommentSection.tsx
│   │   ├── TagCloud.tsx
│   │   └── ShareButtons.tsx
│   ├── Newsletter.tsx
│   ├── Analytics.astro
│   └── SEO.astro
├── pages/
│   ├── api/
│   │   ├── comments.ts
│   │   ├── analytics.ts
│   │   ├── search.ts
│   │   └── subscribe.ts
│   ├── blog/[slug].astro
│   ├── tags/[tag].astro
│   ├── authors/[author].astro
│   ├── search.astro
│   └── dashboard.astro
├── lib/
│   ├── db.ts             # Prisma client
│   ├── search.ts         # Lógica de búsqueda
│   ├── comments.ts       # Utilidades comentarios
│   └── analytics.ts      # Utilidades analytics
├── utils/
│   ├── tags.ts
│   ├── social.ts
│   └── email.ts
└── emails/
    └── NewsletterTemplate.tsx
```

## Fases de Desarrollo

### Fase 1: Contenido Base (Semana 1-2)

- [ ] Content Collections setup
- [ ] Sistema de tags y categorías
- [ ] Páginas dinámicas básicas

### Fase 2: Interactividad (Semana 3-4)

- [ ] Sistema de búsqueda
- [ ] Comentarios básicos
- [ ] Analytics propio

### Fase 3: Engagement (Semana 5-6)

- [ ] Suscripción por email
- [ ] Perfiles de autor
- [ ] Compartir en redes

### Fase 4: Optimización (Semana 7-8)

- [ ] Dashboard de estadísticas
- [ ] Posts populares
- [ ] Optimizaciones de rendimiento
- [ ] SEO avanzado

## Notas de Implementación

### Variables de Entorno Necesarias

```env
# Base de datos
DATABASE_URL="postgresql://..."

# Clerk
CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Email (opcional)
RESEND_API_KEY="re_..."

# Analytics
ANALYTICS_SECRET="random_string"
```

### Comandos Útiles

```bash
# Setup inicial
npm install
npx prisma generate
npx prisma db push

# Desarrollo
npm run dev
npx prisma studio

# Build
npm run build
npm run preview
```

---

_Documento actualizado: Octubre 2025_
_Próxima revisión: Tras completar Fase 1_
