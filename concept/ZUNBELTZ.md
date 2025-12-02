# Concepto del Proyecto: Zunbeltz.org

## 🎯 Identidad del Proyecto

**Nombre del Proyecto**: Zunbeltz.org

**Propósito Principal**: Plataforma web dedicada a la compartición y promoción de la espeleología y otros deportes de aventura relacionados.

**Tagline**: "La Falla de Zunbeltz: Crónicas desde el subsuelo y otras zonas sin cobertura"

---

## 🎪 Target y Audiencia

### Audiencia Principal

1. **Espeleólogos y exploradores**: Aficionados y profesionales de la exploración de cavidades
2. **Montañeros y deportistas de aventura**: Personas interesadas en deportes de montaña, barranquismo, escalada
3. **Estudiantes y aprendices**: Personas que quieren iniciarse en la espeleología y deportes de aventura
4. **Comunidad local de Navarra**: Audiencia regional interesada en descubrir los recursos naturales de la provincia

### Perfiles de Usuario

- **Exploradores activos**: Buscan información técnica, fichas de instalación, topografías
- **Curiosos y aprendices**: Quieren formarse a través de cursos y contenido educativo
- **Lectores del blog**: Interesados en crónicas, experiencias y novedades
- **Comunidad regional**: Buscan información sobre zonas específicas de Navarra

---

## 📚 Tipos de Contenido

### 1. Contenido Editorial (Blog)

**Collection**: `posts` (Content Collection)

- **Formato**: MDX (Markdown + React components)
- **Schema**:
  - `title`: Título del post
  - `description`: Descripción breve
  - `publishDate`: Fecha de publicación
  - `heroImage`: Imagen principal (obligatoria)
  - `categories`: Array de categorías
  - `draft`: Boolean para posts en borrador
  - `author`: Referencia a la colección de autores

**Características**:

- Sistema de categorías dinámicas
- Sistema de autores con perfiles
- Imágenes hero optimizadas
- Paginación
- Búsqueda por categorías y autores
- Meta tags para SEO y compartición social

### 2. Autores

**Collection**: `authors` (Data Collection)

- **Formato**: JSON
- **Schema**:
  - `name`: Nombre del autor
  - `bio`: Biografía
  - `avatar`: Imagen del autor
  - `email`: Email (opcional)
  - `website`: Sitio web personal (opcional)
  - `social`: Redes sociales (Instagram, Facebook, Twitter)

### 3. Contenido Geográfico

**Collections planificadas**: `caves`, `canyons` (actualmente vacías)

- Información sobre cuevas y barrancos de Navarra
- Fichas técnicas de localizaciones
- Datos topográficos

---

## 🗺️ Estructura de Páginas y Secciones

### 1. **La Falla** (Página Principal - `/`)

**Tipo**: Blog principal
**Contenido**: Lista paginada de posts del blog
**Características**:

- Vista de tarjetas de posts
- Paginación (8 posts por página)
- Ordenación por fecha de publicación (más reciente primero)

---

### 2. **Navarra** (`/navarra`)

**Propósito**: Catálogo de recursos naturales y zonas de interés en Navarra

#### Subsecciones

##### 2.1. **Cuevas** (`/navarra/cuevas`)

- Zonas kársticas de Navarra y sus cavidades
- Catálogo de cuevas organizadas por zona

##### 2.2. **Montañas** (`/navarra/montañas`)

- Las montañas y paisajes de la provincia
- Rutas y zonas de escalada

##### 2.3. **Ríos** (`/navarra/rios`)

- Ríos, foces y cauces del territorio
- Zonas de barranquismo

**Estado actual**: Páginas base creadas, pendiente de contenido

---

### 3. **Exploración** (`/exploracion`)

**Propósito**: Herramientas y recursos para la exploración espeleológica

#### Subsecciones exploración

##### 3.1. **Últimas Exploraciones** (`/exploracion/novedades`)

- Novedades en la exploración espeleológica en Navarra
- Blog especializado en exploraciones recientes

##### 3.2. **Topografía** (`/exploracion/topografia`)

- Método, herramientas y software de topografía de cavidades
- Guías técnicas y tutoriales

##### 3.3. **Generador de Fichas** (`/exploracion/fichas`)

- Herramienta para generar fichas técnicas de instalación
- Aplicación interactiva para documentar exploraciones

##### 3.4. **Subterra.app** (Enlace externo)

- Base de datos espeleológica para grupos de exploración
- Enlace a aplicación externa: [https://subterra.app](https://subterra.app)

---

### 4. **Escuela** (`/aprende`)

**Propósito**: Plataforma educativa para aprender espeleología y deportes de aventura

#### Subsecciones aprendizaje

##### 4.1. **Recorrido de Aprendizaje** (`/aprende/recorrido`)

- El camino del buen amante de la aventura
- Ruta progresiva de formación

##### 4.2. **Aprende Online** (`/aprende/online`)

- Mejora tu conocimiento con cursos online en todas las disciplinas
- Plataforma de cursos digitales

##### 4.3. **Cursos Presenciales** (`/aprende/cursos`)

- Pon en práctica tus deportes favoritos en Navarra
- Oferta de cursos presenciales

##### 4.4. **Biblioteca Técnica** (`/aprende/biblioteca`)

- Libros, revistas y documentos técnicos
- Repositorio de recursos educativos

**Estado actual**: Páginas base creadas, pendiente de contenido educativo

---

### 5. **Tienda** (`/tienda`)

**Propósito**: Comercio electrónico (e-commerce)
**Estado actual**: Página base creada, funcionalidad pendiente

---

### 6. **Blog** (`/blog`)

**Propósito**: Sistema completo de blog con funcionalidades avanzadas

#### Rutas del Blog

- **`/blog`** o **`/`**: Lista de posts (página principal)
- **`/blog/[slug]`**: Post individual
- **`/blog/categoria/`**: Índice de categorías con nube de tags
- **`/blog/categoria/[categoria]`**: Posts filtrados por categoría
- **`/blog/autor/`**: Índice de autores
- **`/blog/autor/[authorId]`**: Posts de un autor específico
- **`/blog/buscar/`**: Búsqueda de posts

## 📊 Métricas y Objetivos

### Objetivos de Negocio

- Promover la espeleología en Navarra
- Crear comunidad de deportistas de aventura
- Ofrecer formación de calidad
- Documentar y preservar información sobre cavidades

### KPIs Propuestos

- Número de posts publicados
- Usuarios registrados (Clerk)
- Visitantes únicos mensuales
- Cursos completados
- Fichas de instalación generadas
- Engagement en redes sociales
