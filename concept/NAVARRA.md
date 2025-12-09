# Concepto: Sección Navarra

## Introducción

La sección **Navarra** es el núcleo geográfico y temático de Zunbeltz.org, dedicada a
catalogar, documentar y compartir información detallada sobre las actividades de aventura
que se pueden realizar en el territorio navarro. Esta sección funciona como una base de
datos exhaustiva y accesible para deportistas, exploradores y personas aficionadas que
quieran descubrir y disfrutar de los recursos naturales de Navarra.

La sección se articula alrededor de cuatro grandes bloques temáticos:

1. **Cuevas** – Cavidades y actividades espeleológicas.
2. **Ríos / Barrancos** – Descensos de barranquismo y actividades acuáticas.
3. **Montañas** – Cumbres, rutas senderistas y rutas técnicas de alpinismo.
4. **Paredes** – Escuelas de escalada, sectores y vías.

## Arquitectura actual (resumen)

Durante el desarrollo se ha migrado desde un `config.ts` monolítico a una **arquitectura
modular de colecciones**, documentada en detalle en `docs/Colecciones.md` y
`docs/COLLECTIONS-ARCHITECTURE.md`.

Puntos clave de la arquitectura actual:

- Separación clara entre **Locations** (lugares físicos) y **Activities** (rutas/recorridos).
- Jerarquía geográfica basada en `navarraZones`, `massifs`, `karstAreas` y `caveSystems`.
- Schemas Zod modulares en `src/schemas/shared`, `src/schemas/locations` y
  `src/schemas/activities`.
- Referencias unidireccionales de Activities → Locations para simplificar queries.

Este documento no describe los detalles de los schemas. Su único objetivo es servir como
**guía de desarrollo** y roadmap por fases para la sección Navarra.

---

## Planificación en Fases

> Principios de Desarrollo (se mantienen del diseño original):
>
> - Desarrollo paralelo de las 4 categorías (Cuevas, Ríos, Montañas, Paredes).
> - Iteración incremental: cada fase añade funcionalidad a todas las categorías
>   siempre que sea razonable.
> - El contenido vive en **Content Collections** de Astro, PostgreSQL se reserva
>   para funcionalidades avanzadas (comentarios, etc.).
> - Se trabaja inicialmente con datos de ejemplo que luego se sustituyen por datos
>   reales.

---

### Fase 1: Fundamentos y Tipos (Semana 1-2) ✅ COMPLETADA

**Objetivo**: Establecer la base de datos tipada y las colecciones vacías para las 4 categorías.

#### Tareas Fase 1

- [x] Crear tipos TypeScript completos en `/src/types/navarra/`
  - [x] `caves.types.ts` - Tipos para cuevas y espeleología
  - [x] `rivers.types.ts` - Tipos para ríos y barranquismo
  - [x] `mountains.types.ts` - Tipos para montañas y senderismo
  - [x] `climbing.types.ts` - Tipos para paredes y escalada
  - [x] `shared.types.ts` - Tipos compartidos (UTM, Duration, ImageAsset, Restrictions, etc.)

- [x] Crear schemas Zod en `/src/content/config.ts`
  - [x] Schema `caves` con validación completa
  - [x] Schema `canyons` con validación completa
  - [x] Schema `mountains` con validación completa
  - [x] Schema `climbing` con validación completa

- [x] Crear **1 entrada de ejemplo** por categoría en `/src/content/`
  - [x] `/content/caves/sima-san-martin.md` - Sima de San Martín (Larra)
  - [x] `/content/canyons/artazul.md` - Barranco de Artazul
  - [x] `/content/mountains/anie.md` - Pico Anie (2.504m)
  - [x] `/content/climbing/etxauri.md` - Escuela de Escalada de Etxauri

#### Entregables Fase 1

- ✅ Sistema de tipos completo y documentado.
- ✅ Schemas Zod funcionando con validación.
- ✅ 4 entradas de ejemplo (una por categoría).
- ✅ Documentación de estructura de datos inicial.

---

### Fase 2: UI Base y Componentes Compartidos (Semana 3-4) ✅ COMPLETADA

**Objetivo**: Crear componentes reutilizables y estructura visual base para las 4 categorías.

#### Tareas Fase 2

- [x] Landing `/navarra` – Página principal con hero y grid de 4 categorías
  - [x] Hero visual con imagen 16:9
  - [x] Grid de 4 categorías con imágenes y enlaces
  - [x] Sección de estadísticas dinámicas (conteo de colecciones)
  - [x] Variables CSS del sistema de diseño
  - [x] Responsive design (2x2 en desktop, 1 columna en móvil)

- [x] Funciones de utilidad (`/src/utils/navarra/`)
  - [x] `collection-stats.ts` – Funciones de conteo de colecciones
  - [x] `getNavarraStats()` – Obtener todas las estadísticas

- [x] Componentes compartidos (React/Preact en `/src/components/navarra/shared/`)
  - [x] `<CoordinatesDisplay />` – Mostrar coordenadas UTM/WGS84 con formato
  - [x] `<DurationBadge />` – Badge de duración (formato normal y compacto)
  - [x] `<DifficultyBadge />` – Badge de dificultad adaptable por tipo de actividad
  - [x] `<ImageGallery />` – Galería con lightbox interactivo y navegación por teclado
  - [x] `<InfoCard />` – Card genérica con 3 variantes (default, highlight, warning)
  - [x] ~~`<Breadcrumb />`~~ – Se usa el componente existente en `/src/components/ui/`

- [x] Páginas de categoría básicas (sin mapa aún)
  - [x] `/navarra/cuevas` – Hero + breadcrumb + lista de cuevas con stats
  - [x] `/navarra/rios` – Hero + breadcrumb + lista de barrancos
  - [x] `/navarra/montañas` – Hero + breadcrumb + lista de montañas
  - [x] `/navarra/paredes` – Hero + breadcrumb + lista de escuelas de escalada

- [x] Templates de páginas individuales (sin mapa aún)
  - [x] `/navarra/cuevas/[slug].astro` – Detalle con sidebar (stats, coordenadas, acceso, restricciones)
  - [x] `/navarra/rios/[slug].astro` – Detalle con sidebar (stats, restricciones)
  - [x] `/navarra/montañas/[slug].astro` – Detalle con sidebar (stats, coordenadas, restricciones)
  - [x] `/navarra/paredes/[slug].astro` – Detalle con sidebar (coordenadas, acceso, orientaciones)

- [x] Mejoras adicionales
  - [x] Breadcrumb mejorado con decodificación de caracteres especiales (ñ, á, etc.)
  - [x] Tests añadidos para breadcrumb (30/30 pasando)
  - [x] Layout responsive 2 columnas (contenido + sidebar)
  - [x] Estilos markdown globales para contenido
  - [x] Integración de componentes React con `client:load`

#### Entregables Fase 2

- ✅ Landing `/navarra` funcional y atractiva con estadísticas dinámicas.
- ✅ 4 páginas de categoría con hero, breadcrumb y listas funcionales.
- ✅ 4 templates de páginas individuales con layout completo y sidebar.
- ✅ Biblioteca de componentes compartidos React/Preact.
- ✅ Sistema de navegación (breadcrumbs) funcionando con caracteres especiales.
- ✅ Funciones de utilidad para conteo de colecciones.
- ✅ Diseño responsive y consistente en todas las páginas.
- ✅ Integración completa con Content Collections de Astro.

**Fecha de completación**: 2 de diciembre de 2024.

---

### Fase 2b: Colecciones Avanzadas (Semana 4.5-5) ✅ COMPLETADA

**Objetivo**: Expandir las colecciones básicas de montaña y escalada a versiones completas con rutas, sectores y vías.

#### Tareas Fase 2b

- [x] Colección Mountains – Rutas
  - [x] Implementar colección `hikingRoutes` (rutas senderistas)
    - [x] Campos: startPoint, endPoint, duration, length, elevationGain/Loss
    - [x] Dificultad (Fácil, Moderada, Difícil, Muy Difícil)
    - [x] Ruta circular vs lineal
    - [x] Época recomendada y avisos
    - [x] Campo `location` (localidad)
    - [x] Campo `mountainReference` (referencia a montaña padre)
  - [x] Implementar colección `technicalRoutes` (rutas técnicas de alpinismo)
    - [x] Campos técnicos: requiredGear, difficulty (ClimbingGrade)
    - [x] Array de `ClimbingPitch` (largos de escalada)
    - [x] Descripción técnica detallada
    - [x] Campo `location` (localidad)
    - [x] Campo `mountainReference` (referencia a montaña padre)
  - [x] Añadir campo `mountainReference` como objeto `{name, slug}` en schemas
  - [x] Crear páginas individuales `/navarra/senderismo/[slug]` y `/navarra/largos/[slug]`

- [x] Colección Climbing – Sistema completo
  - [x] Implementar colección `climbingSectors` (sectores de escalada)
    - [x] Campos: name, description, orientation, height
    - [x] Array de `ClimbingRoute` (vías)
    - [x] Foto del sector y topo/croquis
    - [x] Coordenadas y ubicación
    - [x] Campo `climbingSchoolReference` como objeto `{name, slug}`
  - [x] Implementar tipo `ClimbingRoute` (vías individuales)
    - [x] Campos: name, description, heightMeters, difficulty
    - [x] Array de `ClimbingPitch` (largos)
    - [x] Style (Deportiva, Clásica, Mixta, Artificial, Boulder)
    - [x] Protection (Equipada, Parcialmente Equipada, Desequipada)
    - [x] Primera ascensión y material necesario
  - [x] Implementar tipo `ClimbingPitch` (largos de escalada)
    - [x] Campos: number, length, description, difficulty
    - [x] Array de `ClimbingAnchor` (anclajes intermedios)
    - [x] `Belay` (reunión al final del largo)
  - [x] Implementar tipo `ClimbingGrade` (graduación)
    - [x] number (1-9), letter (a/b/c), modifier (+/-)
  - [x] Implementar tipos de anclajes y reuniones
    - [x] `ClimbingAnchor` con tipos (Pb, Qm, Sp, Na)
    - [x] `Belay` con tipos (Equipada, Semi-equipada, Natural)
  - [x] Crear página individual `/navarra/sectores/[slug]`

- [x] Componentes de visualización
  - [x] `<RouteList />` – Lista de vías con filtros por dificultad
  - [x] `<PitchTable />` – Tabla de largos con detalles técnicos
  - [x] Componentes de cards laterales (sidebar):
    - [x] `<SectorLocationCard />` – Ubicación y coordenadas con toggle UTM/Lat-Long
    - [x] `<SectorPhotoCard />` – Foto del sector con caption
    - [x] `<SectorReferenceCard />` – Card clickeable para escuela relacionada
    - [x] `<TechnicalRouteLocationCard />` – Puntos inicio/fin con coordenadas
    - [x] `<TechnicalRouteGearCard />` – Lista de material necesario
    - [x] `<HikingRouteLocationCard />` – Puntos inicio/fin para senderismo
    - [x] `<RouteReferenceCard />` – Card clickeable para montaña relacionada

- [x] Actualizar páginas individuales
  - [x] Crear página `/navarra/sectores/[slug]` con información técnica completa
  - [x] Crear página `/navarra/largos/[slug]` con información técnica completa
  - [x] Crear página `/navarra/senderismo/[slug]` con información completa
  - [x] Layout responsive 2 columnas (contenido + sidebar)
  - [x] Integración de componentes de cards laterales
  - [x] Sistema de referencias clickeables entre páginas

#### Entregables Fase 2b

- ✅ Schema completo de `hikingRoutes` con todas las propiedades.
- ✅ Schema completo de `technicalRoutes` con largos de escalada.
- ✅ Schema completo de `climbingSectors` con vías, largos y graduaciones.
- ✅ Sistema de referencias padre-hijo con objetos `{name, slug}`.
- ✅ Páginas individuales `/navarra/sectores/[slug]`, `/navarra/largos/[slug]`, `/navarra/senderismo/[slug]`.
- ✅ Componentes de visualización: `<RouteList />`, `<PitchTable />`.
- ✅ Biblioteca de componentes de cards laterales reutilizables.
- ✅ Sistema de navegación clickeable entre entidades relacionadas.
- ✅ Archivos de contenido de ejemplo actualizados.

**Fecha de completación**: 5 de diciembre de 2024.

---

### Fase 2c: Migración a la arquitectura modular de colecciones ✅ COMPLETADA

**Objetivo**: Migrar desde el esquema monolítico en `src/content/config.ts` a la
arquitectura modular de `src/schemas`, separando Locations y Activities y
alineando las colecciones con la jerarquía de `navarraZones`.

#### Tareas Fase 2c

- [x] Crear estructura de directorios de schemas
  - [x] `src/schemas/shared` – Bloques reutilizables (coordenadas, duración, imágenes, restricciones, acceso, escalada común).
  - [x] `src/schemas/locations` – Colecciones de lugares físicos (caves, canyons, mountains, climbingCrags, climbingSectors, etc.).
  - [x] `src/schemas/activities` – Colecciones de actividades (hikings, canyoningDescents, cavingRoutes, climbingRoutes, boulderProblems, multiPitchRoutes, throughTripCavings, trekkings, viaFerratas).

- [x] Definir schemas modulares para Locations
  - [x] `navarraZones`, `massifs`, `karstAreas`, `caveSystems` como data collections.
  - [x] `caves`, `canyons`, `mountains`, `climbingCrags`, `climbingSectors` como content collections.
  - [x] Alinear todos los schemas con las secciones de UI (Hero, LocationsCard, Properties, Logistics, Multimedia, Restrictions).

- [x] Definir schemas modulares para Activities
  - [x] `hikings` y `trekkings` anclados a `mountains` y jerarquía opcional (`massif`, `navarraZone`).
  - [x] `canyoningDescents` anclados a `canyons` y `navarraZone`.
  - [x] `cavingRoutes` y `throughTripCavings` anclados a `caves`/`caveSystems`, `karstAreas` y `navarraZones`.
  - [x] `climbingRoutes`, `boulderProblems`, `multiPitchRoutes` anclados a `climbingSectors` (y, opcionalmente, `climbingCrags`, `mountains`, `navarraZones`).

- [x] Integrar schemas en `src/content/config.ts`
  - [x] Reemplazar definiciones inline por llamadas a los factories de `src/schemas`.
  - [x] Mantener los nombres de colección (`"caves"`, `"canyons"`, etc.) para compatibilidad con páginas existentes.

- [x] Migrar contenido de ejemplo
  - [x] Adaptar frontmatter de las entradas de ejemplo al nuevo formato.
  - [x] Verificar que las páginas de `/navarra` y plantillas individuales siguen funcionando.

#### Entregables Fase 2c

- ✅ Arquitectura modular de colecciones implementada en `src/schemas`.
- ✅ Separación clara de Locations y Activities en el código.
- ✅ Jerarquía de Navarra (`navarraZones`, `massifs`, `karstAreas`, `caveSystems`) reflejada en los schemas.
- ✅ Páginas existentes funcionando sobre la nueva arquitectura.
- ✅ Documentación de alto nivel en `docs/Colecciones.md`.

---

### Fase 3: Mapas Interactivos (Semana 5-6) ⏳ PENDIENTE

**Objetivo**: Integrar mapas basados en Leaflet.js en las páginas de listas y detalle,
utilizando las coordenadas definidas en los schemas de Locations y Activities.

#### Tareas Fase 3

- [ ] Configurar Leaflet.js
  - [ ] Instalar dependencias (`leaflet`, `@types/leaflet`).
  - [ ] Crear componente base `<LeafletMap />`.
  - [ ] Configurar tiles (OpenStreetMap, topográfico, etc.).

- [ ] Componentes de mapa especializados
  - [ ] `<CategoryMap />` – Mapa con múltiples waypoints para páginas de categoría.
    - Usa las collections de Locations (`caves`, `canyons`, `mountains`, `climbingCrags`, `climbingSectors`) y sus coordenadas principales.
  - [ ] `<LocationMap />` – Mapa centrado en una location concreta.
  - [ ] `<ActivityMap />` – Mapa centrado en la activity (cuando tenga startPoint/endPoint).
  - [ ] `<ClusterMarkers />` – Agrupación de marcadores cercanos.
  - [ ] `<MapTooltip />` y `<MapPopup />` – Tooltips y popups personalizados.

- [ ] Integrar mapas en páginas de categoría
  - [ ] `/navarra/cuevas`: mapa con todas las `caves` agrupadas por `navarraZone`.
  - [ ] `/navarra/rios`: mapa con todos los `canyons`.
  - [ ] `/navarra/montañas`: mapa con todas las `mountains`.
  - [ ] `/navarra/paredes`: mapa con todas las `climbingCrags`.

- [ ] Integrar mapas en páginas individuales
  - [ ] Páginas de Locations: mapa centrado en la entidad (`entryPoint`, `coordinates`, etc.).
  - [ ] Páginas de Activities: mapa con puntos de inicio/fin (`startPoint`, `endPoint`) cuando existan.

#### Entregables Fase 3

- ✅ Sistema de mapas Leaflet funcionando.
- ✅ Mapas interactivos en las páginas de categoría basados en Locations.
- ✅ Mapas de ubicación en páginas individuales de Locations y Activities.
- ✅ Tooltips y popups operativos.

---

### Fase 4: Búsqueda, Filtros y Tablas (Semana 7-8) ⏳ PENDIENTE

**Objetivo**: Añadir funcionalidades de búsqueda y filtrado aprovechando la separación
Locations/Activities y la jerarquía de `navarraZones`.

#### Tareas Fase 4

- [ ] Componentes de búsqueda y filtrado
  - [ ] `<SearchBar />` – Búsqueda en tiempo real sobre colecciones.
  - [ ] `<FilterPanel />` – Panel de filtros adaptable por tipo de colección.
  - [ ] `<SortControls />` – Controles de ordenación.
  - [ ] `<ResultsTable />` – Tabla responsive con datos técnicos.
  - [ ] `<ResultsGrid />` – Vista en grid alternativa.
  - [ ] `<Pagination />` – Paginación de resultados.

- [ ] Filtros específicos por dominio
  - [ ] Cuevas / espeleología:
    - [ ] Filtros por `navarraZone`, `karstArea`, `caveSystem`, profundidad, longitud.
  - [ ] Barrancos / canyoning:
    - [ ] Filtros por `navarraZone`, río, graduación (`canyoningDescents`), época recomendada.
  - [ ] Montañas / senderismo / alpinismo:
    - [ ] Filtros por `navarraZone`, `massif`, altitud, dificultad (`hikings`, `multiPitchRoutes`).
  - [ ] Paredes / escalada:
    - [ ] Filtros por `navarraZone`, orientación, estilo, dificultad (`climbingRoutes`, `boulderProblems`).

- [ ] Integrar en páginas de categoría
  - [ ] Barra de búsqueda visible para cada tipo de contenido relevante.
  - [ ] Panel de filtros colapsable.
  - [ ] Tabla/grid con resultados provenientes de las colecciones correspondientes.
  - [ ] Paginación funcional.
  - [ ] Sincronización con los mapas de la Fase 3 (filtros ↔ markers).

#### Entregables Fase 4

- ✅ Sistema de búsqueda y filtrado operativo.
- ✅ Filtros específicos por categoría usando los campos de los schemas.
- ✅ Tablas/grids responsive alimentadas desde las colecciones.
- ✅ Paginación e integración con mapas.

---

### Fase 5: Fichas de Instalación (Semana 9-10) ⏳ PENDIENTE

**Objetivo**: Visualizar fichas técnicas de instalación para cuevas y barrancos
(apoyándose en los tipos comunes definidos para instalaciones) sin mezclar esta lógica
con la creación/edición de fichas.

#### Tareas Fase 5

- [ ] Componentes de visualización de fichas
  - [ ] `<InstallationSheet />` – Contenedor principal.
  - [ ] `<RopeList />` – Lista de cuerdas con detalles.
  - [ ] `<ObstacleCard />` – Card de obstáculo (P26, R15, etc.).
  - [ ] `<InstallationPoint />` – Punto de instalación (cabecera, fraccionamiento, etc.).
  - [ ] `<AnchorDisplay />` – Visualización de anclajes.
  - [ ] `<InstallationDiagram />` – Diagrama visual (opcional, SVG).

- [ ] Componentes específicos por dominio
  - [ ] Fichas para cuevas (cuerdas, pozos, instalaciones), asociadas a `cavingRoutes`.
  - [ ] Fichas para barrancos (obstáculos, rápeles, saltos), asociadas a `canyoningDescents`.

- [ ] Funcionalidades adicionales
  - [ ] Export a PDF de fichas.
  - [ ] Vista imprimible optimizada.
  - [ ] Descarga de datos en formato estructurado.

- [ ] Integrar en páginas individuales
  - [ ] Sección "Recorridos" con accordion/tabs.
  - [ ] Fichas de instalación expandibles.
  - [ ] Visualización clara de material necesario.

#### Entregables Fase 5

- ✅ Sistema de visualización de fichas funcionando.
- ✅ Fichas de instalación para cuevas y barrancos conectadas a Activities.
- ✅ Export a PDF y vistas imprimibles.
- ✅ Integración en páginas individuales.

---

### Fase 6: Multimedia y Contenido Enriquecido (Semana 11-12) ⏳ PENDIENTE

**Objetivo**: Añadir galerías, topografías y contenido multimedia a todas las
categorías, reutilizando los schemas de `imageAsset` y `topographyAsset`.

#### Tareas Fase 6

- [ ] Componentes multimedia
  - [ ] `<PhotoGallery />` – Galería de fotos con lightbox avanzado.
  - [ ] `<TopographyViewer />` – Visor de topografías (PDF, SVG, imágenes).
  - [ ] `<VideoEmbed />` – Embeds de YouTube/Vimeo.
  - [ ] `<DownloadButton />` – Botón de descarga de recursos.

- [ ] Sistema de assets
  - [ ] Estructura de carpetas para imágenes por dominio (cuevas, barrancos, montañas, paredes).
  - [ ] Optimización automática de imágenes (Astro Image).
  - [ ] Lazy loading de imágenes y vídeos.
  - [ ] Placeholder mientras carga.

- [ ] Integrar en páginas individuales
  - [ ] Galería de fotos adicionales.
  - [ ] Visor de topografías cuando existan.
  - [ ] Vídeos embebidos opcionales.
  - [ ] Sección de descargas (GPX, PDF, topografías).

- [ ] Añadir más datos de ejemplo
  - [ ] Varias entries por colección con multimedia realista.

#### Entregables Fase 6

- ✅ Galerías multimedia funcionando.
- ✅ Visor de topografías operativo.
- ✅ Sistema de descargas implementado.
- ✅ Entradas de ejemplo con multimedia.

---

### Fase 7: Funcionalidades Avanzadas (Semana 13-14) ⏳ PENDIENTE

**Objetivo**: Implementar sistema de "actividades cercanas" y mejoras de UX sobre
la base de las colecciones existentes.

#### Tareas Fase 7

- [ ] Sistema "Actividades Cercanas"
  - [ ] Función de cálculo de distancia (Haversine) entre coordenadas.
  - [ ] Algoritmo de búsqueda de actividades próximas (por tipo y por zona).
  - [ ] Pre-cálculo en build time cuando sea posible.
  - [ ] Componente `<NearbyActivities />` reutilizable.

- [ ] Mejoras de UX
  - [ ] Animaciones y transiciones suaves.
  - [ ] Loading states en componentes interactivos.
  - [ ] Error boundaries y manejo de errores.
  - [ ] Skeleton loaders.

- [ ] Export y compartir
  - [ ] Export de coordenadas a GPX.
  - [ ] Botones de compartir en redes sociales.
  - [ ] Copiar enlace directo.
  - [ ] (Opcional) QR code de ubicación.

- [ ] Sección de información adicional
  - [ ] Enlaces externos relevantes (Subterra.app, etc.).
  - [ ] Información de colaboradores.
  - [ ] Fecha de última actualización.
  - [ ] Botón "Reportar error".

#### Entregables Fase 7

- ✅ Sistema de actividades cercanas funcionando.
- ✅ Export a GPX implementado.
- ✅ Mejoras de UX desplegadas.
- ✅ Funcionalidades de compartir operativas.

---

### Fase 8: Sistema de Comentarios (Semana 15-16) ⏳ PENDIENTE

**Objetivo**: Implementar un sistema de comentarios basado en PostgreSQL y Clerk
para las páginas de detalle de Locations y Activities.

#### Tareas Fase 8

- [ ] Configurar base de datos
  - [ ] Setup PostgreSQL (Vercel Postgres o similar).
  - [ ] Crear tablas (`location_comments`, `comment_reactions`, `user_profiles_cache`).
  - [ ] Configurar ORM (Prisma o Drizzle).
  - [ ] Crear migraciones.

- [ ] API Endpoints
  - [ ] `GET /api/comments` – Obtener comentarios.
  - [ ] `POST /api/comments` – Crear comentario.
  - [ ] `PATCH /api/comments/[id]` – Editar comentario.
  - [ ] `DELETE /api/comments/[id]` – Eliminar comentario.
  - [ ] Middleware de autenticación con Clerk.

- [ ] Componentes de comentarios
  - [ ] `<CommentsSection />` – Contenedor principal.
  - [ ] `<CommentForm />` – Formulario de nuevo comentario.
  - [ ] `<CommentThread />` – Hilo de comentarios anidados.
  - [ ] `<Comment />` – Comentario individual.
  - [ ] `<CommentActions />` – Acciones (editar, eliminar, responder).

- [ ] Funcionalidades
  - [ ] Comentarios anidados (hasta 3 niveles).
  - [ ] Edición y eliminación (solo autor).
  - [ ] Markdown básico en comentarios.
  - [ ] Sanitización XSS.
  - [ ] Rate limiting (5 comentarios/hora).
  - [ ] Ordenación por recientes/antiguos.

- [ ] Integrar en páginas individuales
  - [ ] Sección de comentarios al final de cada página de detalle.
  - [ ] Lazy loading de comentarios.
  - [ ] Optimistic updates.

#### Entregables Fase 8

- ✅ Base de datos PostgreSQL configurada.
- ✅ API de comentarios funcionando.
- ✅ Sistema de comentarios anidados operativo.
- ✅ Integración con Clerk completa.
- ✅ Moderación básica implementada.

---

### Fase 9: Optimización y Pulido (Semana 17-18) ⏳ PENDIENTE

**Objetivo**: Optimizar performance, SEO y accesibilidad para la sección Navarra.

#### Tareas Fase 9

- [ ] Performance
  - [ ] Optimización de imágenes (WebP, AVIF).
  - [ ] Code splitting agresivo.
  - [ ] Lazy loading de componentes pesados.
  - [ ] Preload de recursos críticos.
  - [ ] Análisis con Lighthouse (objetivo > 90).

- [ ] SEO
  - [ ] Meta tags específicos por página.
  - [ ] Open Graph tags completos.
  - [ ] Structured data (JSON-LD) para locations y activities.
  - [ ] Sitemap automático.
  - [ ] Robots.txt optimizado.

- [ ] Accesibilidad
  - [ ] Auditoría WCAG 2.1 AA.
  - [ ] ARIA labels en componentes interactivos.
  - [ ] Navegación por teclado completa.
  - [ ] Contraste de colores adecuado.
  - [ ] Alt text en todas las imágenes.

- [ ] Testing
  - [ ] Tests unitarios de componentes críticos.
  - [ ] Tests de integración de formularios.
  - [ ] Tests E2E de flujos principales.
  - [ ] Testing en múltiples dispositivos.

- [ ] Documentación
  - [ ] Documentar la estructura final de Content Collections (referencia a `docs/Colecciones.md`).
  - [ ] Guía para añadir nuevas entradas de contenido.
  - [ ] Documentación de componentes.
  - [ ] README actualizado.

#### Entregables Fase 9

- ✅ Lighthouse score > 90 en todas las métricas clave.
- ✅ SEO completo y optimizado.
- ✅ Accesibilidad adecuada en páginas principales.
- ✅ Suite de tests funcionando.
- ✅ Documentación de la sección Navarra actualizada.

---

## Resumen de Fases

| Fase | Duración  | Enfoque Principal         | Estado        |
| ---- | --------- | ------------------------- | ------------- |
| 1    | 2 semanas | Tipos y datos base        | ✅ Completada |
| 2    | 2 semanas | UI y componentes          | ✅ Completada |
| 2b   | 1 semana  | Colecciones avanzadas     | ✅ Completada |
| 2c   | 1 semana  | Arquitectura modular      | ✅ Completada |
| 3    | 2 semanas | Mapas interactivos        | ⏳ Pendiente  |
| 4    | 2 semanas | Búsqueda y filtros        | ⏳ Pendiente  |
| 5    | 2 semanas | Fichas de instalación     | ⏳ Pendiente  |
| 6    | 2 semanas | Multimedia                | ⏳ Pendiente  |
| 7    | 2 semanas | Funcionalidades avanzadas | ⏳ Pendiente  |
| 8    | 2 semanas | Comentarios (PostgreSQL)  | ⏳ Pendiente  |
| 9    | 2 semanas | Optimización y pulido     | ⏳ Pendiente  |

Este documento sirve como referencia viva para la persona que esté desarrollando
la sección Navarra. Para detalles de los tipos y colecciones, acudir a
`docs/Colecciones.md` y a los archivos de `src/schemas`.
