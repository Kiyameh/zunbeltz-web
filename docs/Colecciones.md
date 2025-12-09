# Colecciones de Contenido en Zunbeltz Web

## Objetivo del sistema de colecciones

El sistema de colecciones de Zunbeltz Web busca resolver tres problemas a la vez:

- **Modelar el territorio y las actividades outdoor de Navarra** de forma coherente y extensible.
- **Ofrecer tipos estáticos fuertes** (TypeScript + Zod) para minimizar errores al consultar contenido.
- **Mantener las páginas de Astro simples de leer**, delegando la complejidad al nivel de schemas.

Esta guía no documenta cada campo de cada schema (para eso están los archivos en `src/schemas`).
Su objetivo es dar el **modelo mental** que necesita una persona desarrolladora para trabajar cómoda
con las colecciones.

---

## Modelo mental: Locations vs Activities

La arquitectura se basa en separar claramente dos conceptos:

- **Locations**: Lugares físicos del territorio.
  - Tienen coordenadas, descripciones relativamente estáticas y restricciones.
  - Ejemplos: una cueva concreta, un barranco, una montaña, una escuela de escalada.

- **Activities**: Actividades concretas que se realizan sobre una o varias locations.
  - Tienen duración, parámetros técnicos y logística específica del recorrido.
  - Ejemplos: una ruta espeleológica por una cueva, un descenso concreto de barranquismo,
    una ruta senderista, una vía de escalada.

Regla clave:

- **Las activities referencian a las locations**, nunca al revés.
  - Esto simplifica las consultas con `getCollection` y evita ciclos.
  - Una página de actividad siempre puede recuperar su location principal y opcionales
    (zona, macizo, sistema de cuevas, etc.).

---

## Jerarquía geográfica de Navarra

Todo el dominio de Navarra se organiza alrededor de una jerarquía geográfica fija:

- `navarraZones` (data): 6 zonas fijas.
- A partir de ahí cuelgan distintas colecciones de locations según el contexto:

### Cuevas y karst

- `navarraZones`
  - `karstAreas`
    - `caveSystems`
      - `caves`

Las **activities espeleológicas** (`cavingRoutes`, `throughTripCavings`) referencian a estas
locations en distintos niveles, según convenga a las queries:

- Location principal: normalmente `cave` o `caveSystem`.
- Jerarquía opcional: `karstArea`, `navarraZone`.

### Barrancos y ríos

- `navarraZones`
  - `canyons`

Los **descensos de barranquismo** (`canyoningDescents`) referencian a `canyons` como
location principal y opcionalmente a `navarraZone` para atajos en las consultas.

### Montañas y senderismo/alpinismo

- `navarraZones`
  - `massifs`
    - `mountains`

Las **activities asociadas a montañas** incluyen:

- `hikings`: rutas de senderismo asociadas a una `mountain`.
- `multiPitchRoutes`: rutas de varios largos que pueden asociarse a una `mountain`
  (o a un sector de escalada, según el caso).

De nuevo, las activities guardan referencias a la location principal (`mountain`) y
opcionalmente a `massif` y `navarraZone`.

### Escalada deportiva y boulder

- `navarraZones`
  - `climbingCrags` (escuelas de escalada)
    - `climbingSectors` (sectores dentro de una escuela)

Las **activities de escalada** (`climbingRoutes`, `boulderProblems`, `multiPitchRoutes`)
se anclan a los sectores:

- Location principal: `climbingSector`.
- Jerarquía opcional: `climbingCrag`, `navarraZone`.

---

## Listado conceptual de colecciones

### Locations (lugares físicos)

Estas colecciones representan entidades relativamente estáticas en el territorio.

- **Zonas y estructura territorial**
  - `navarraZones` (data)
  - `massifs` (data)
  - `karstAreas` (data)
  - `caveSystems` (data)

- **Lugares con contenido (Markdown)**
  - `caves`: cavidades individuales.
  - `canyons`: barrancos individuales.
  - `mountains`: cumbres y picos.
  - `climbingCrags`: escuelas de escalada.
  - `climbingSectors`: sectores dentro de las escuelas.

Cada una de estas colecciones sigue el mismo patrón de UI (ver más abajo):

- Hero con `name` y `description`.
- Card de localización con referencias jerárquicas (`navarraZone`, `massif`, etc.).
- Propiedades técnicas básicas (altitud, tipo de cavidad, río, etc.).
- Información de acceso cuando aplica.
- Multimedia (foto principal, adicionales, topografías).
- Restricciones y protecciones.

### Activities (actividades realizadas en esos lugares)

Todas las activities son **content collections** (frontmatter + Markdown):

- **Montaña y senderismo**
  - `hikings`: rutas senderistas.
  - `trekkings`: travesías de varios días.

- **Barranquismo y agua**
  - `canyoningDescents`: descensos de barrancos.
  - `viaFerratas`: recorridos de vía ferrata.

- **Espeleología**
  - `cavingRoutes`: rutas espeleológicas en cuevas concretas.
  - `throughTripCavings`: travesías de cueva a cueva o sistema.

- **Escalada y boulder**
  - `climbingRoutes`: vías deportivas de un largo.
  - `multiPitchRoutes`: rutas de varios largos (en pared o montaña).
  - `boulderProblems`: bloques de boulder.

Todas comparten la misma estructura de secciones:

- Hero (`name`, `description`).
- Card de locations: referencias a las locations relevantes.
- Sección de propiedades técnicas.
- Card de graduación/dificultad (cuando aplica).
- Card de logística (puntos de inicio/fin, accesos, retornos).
- Multimedia.

---

## Patrones de schema compartidos

Para evitar duplicar lógica y asegurar consistencia visual, los schemas reutilizan
bloques comunes definidos en `src/schemas/shared`:

- `utmCoordinatesSchema`: coordenadas UTM (y en algunos casos lat/long) para
  puntos de interés (cimas, entradas de cuevas, parkings, etc.).
- `durationSchema`: duración normalizada (días, horas, minutos).
- `imageAssetSchema` y `topographyAssetSchema`: representación común de imágenes
  y topografías.
- `accessInfoSchema`: descripción de accesos y retornos.
- `restrictionsSchema`: restricciones, protecciones, cierres temporales.
- Schemas de escalada (`climbing-common.ts`): grados, largos, reuniones, etc.

Estos bloques se ensamblan en cada colección siguiendo unas secciones de UI
claras. A nivel mental, puedes pensar en los schemas como **mapeos directos
entre secciones de UI y frontmatter**.

---

## Secciones de UI y cómo se reflejan en los schemas

Aunque cada colección tiene sus campos concretos, casi todas las entries siguen
un layout coherente. Al diseñar nuevas colecciones o consultar las existentes,
piensa en estas secciones:

### HeroSection

- Campos mínimos: `name` y, casi siempre, `description`.
- Objetivo: dar contexto inmediato al usuario (qué es y por qué importa).

### LocationsCard

- Para locations: referencias jerárquicas hacia arriba (`navarraZone`, `massif`,
  `karstArea`, `caveSystem`, etc.).
- Para activities: referencia a la location principal (`cave`, `canyon`,
  `mountain`, `climbingSector`…) y, opcionalmente, jerarquía adicional para
  queries rápidas.

### PropertiesSection

- Propiedades "técnicas" clave de la entidad:
  - En locations: altitud, tipo de cavidad, río, morfología, etc.
  - En activities: dificultad, desniveles, número de rápeles, etc.

### LogisticsCard

- Campos relacionados con cómo llegar y recorrer:
  - Puntos de inicio/fin (`utmCoordinatesSchema`).
  - Tiempos (`durationSchema`).
  - Información de acceso (`accessInfoSchema`).
  - Opcionalmente retorno (`returnInfo`).

### MultimediaSection

- Imágenes y topografías relevantes.
- Mismo modelo (`imageAssetSchema`, `topographyAssetSchema`) en todas las
  colecciones para simplificar las galerías y visores.

### RestrictionsCard / GradingCard

- `restrictionsSchema` para cualquier entidad afectada por cierres o figuras
  de protección.
- Schemas de grado (barranquismo, escalada, etc.) para mostrar de forma
  homogénea la dificultad.

---

## Relaciones y principios de diseño

### 1. Referencias unidireccionales

- Activities → Locations (nunca al revés).
- Ventajas:
  - Queries simples con `getCollection` y filtros sobre `data`.
  - Menos dependencias cruzadas.
  - Más fácil borrar o reestructurar locations sin romper activities antiguas.

### 2. Jerarquía opcional

- Una activity siempre referencia a su location principal.
- Además puede guardar referencias directas a niveles intermedios
  (`massif`, `navarraZone`, `karstArea`, etc.).
- Esto permite queries eficientes del tipo "todas las actividades en la Ribera"
  sin tener que resolver múltiples niveles en runtime.

### 3. Separación Location / Activity

- Locations representan el **lugar físico** (coordenadas, fotos generales,
  restricciones estructurales).
- Activities representan la **experiencia concreta** (recorrido, graduación,
  logística, material necesario).
- Un mismo lugar puede tener varias activities asociadas (varias rutas, varios
  descensos, varias vías…), sin duplicar datos de localización.

### 4. Modularidad

- Cada colección tiene su propio archivo de schema en `src/schemas`.
- Los schemas compartidos se agrupan en `src/schemas/shared`.
- Los index (`src/schemas/locations/index.ts`, `src/schemas/activities/index.ts`)
  actúan como puntos de entrada para importaciones limpias en el resto del
  proyecto.

---

## Cómo usar las colecciones en el código

### Importar schemas y colecciones

- Los schemas se exportan desde `src/schemas` y se usan para definir las
  colecciones en `src/content/config.ts`.
- Las páginas y componentes consumen el contenido mediante las APIs de Astro
  (`getCollection`, `getEntry`, etc.).

Patrón típico:

- Importar las colecciones desde los index de `schemas` cuando se necesita
  tipo estático o lógica asociada.
- Usar `getCollection("hikings")`, `getCollection("caves")`, etc., en las
  páginas para recuperar entries.
- Filtrar por referencias (`data.mountain`, `data.cave`, `data.navarraZone`,
  etc.) según el caso.

### Ejemplos de queries típicas (a nivel conceptual)

- Todas las rutas de senderismo en una montaña concreta.
- Todas las rutas de barranquismo en una zona de Navarra.
- Todas las rutas de escalada en un sector concreto.
- Todas las actividades (de cualquier tipo) dentro de una zona `navarraZone`.

Los detalles exactos de cada query dependen de los campos definidos en los
schemas; para implementarlas, consulta el archivo correspondiente en
`src/schemas`.

---

## Extender el sistema: añadir nuevas colecciones

Cuando se quiera añadir una nueva colección, sigue este flujo mental:

1. **Decidir si es Location o Activity**.
   - Location: describe un lugar relativamente estático.
   - Activity: describe un uso o recorrido concreto sobre una location.

2. **Definir la jerarquía geográfica**.
   - ¿De qué `navarraZone` depende?
   - ¿Tiene niveles intermedios (massif, karstArea, etc.)?

3. **Reutilizar bloques compartidos**.
   - Coordenadas (`utmCoordinatesSchema`).
   - Duración (`durationSchema`).
   - Multimedia (`imageAssetSchema`, `topographyAssetSchema`).
   - Restricciones (`restrictionsSchema`).

4. **Crear el schema en `src/schemas`**.
   - En `locations/` o `activities/` según corresponda.
   - Usar el patrón de secciones (Hero, LocationsCard, Properties, Logistics,
     Multimedia, Restrictions/Grading).

5. **Registrar la colección en `src/content/config.ts`**.
   - Definir la nueva colección de Astro y conectar el schema.

6. **Conectar la UI**.
   - Añadir la nueva colección a las páginas de lista (categoría, mapas,
     búsquedas) y a las rutas de detalle.

---

## Dónde profundizar

- **Schemas concretos**: `src/schemas/locations` y `src/schemas/activities`.
- **Arquitectura general**: `docs/COLLECTIONS-ARCHITECTURE.md`.
- **Guía de desarrollo de la sección Navarra** (fases y roadmap):
  `concept/NAVARRA.md`.

Esta página debería ser el punto de entrada para cualquiera que necesite
entender el "por qué" del modelo de colecciones antes de tocar schemas o
páginas.
