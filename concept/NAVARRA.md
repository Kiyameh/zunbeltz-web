# Concepto: Sección Navarra

## 📍 Introducción

### Propósito

La sección **Navarra** es el núcleo geográfico y temático de Zunbeltz.org, dedicada a catalogar, documentar y compartir información detallada sobre las actividades de aventura que se pueden realizar en el territorio navarro. Esta sección funciona como una base de datos exhaustiva y accesible para deportistas, exploradores y aficionados que deseen descubrir y disfrutar de los recursos naturales de Navarra.

### Alcance

La sección abarca cuatro grandes categorías de actividades outdoor:

1. **Cuevas** - Cavidades y actividades espeleológicas
2. **Ríos** - Ríos, barrancos y actividades de canyoning/barranquismo
3. **Montañas** - Montañas, senderismo y alpinismo _(pendiente de desarrollo)_
4. **Paredes** - Roquedos, paredes y actividades de escalada _(pendiente de desarrollo)_

### Características Principales

- **Información técnica detallada**: Fichas técnicas con datos precisos sobre localización, características, dificultad y equipamiento
- **Fichas de instalación**: Documentación completa de las instalaciones existentes en cavidades y barrancos
- **Sistema de catalogación**: Organización estructurada por tipo de actividad y zona geográfica
- **Integración con bases de datos externas**: Enlaces a recursos como Subterra.app para espeleología
- **Fotografías y topografías**: Material visual para facilitar la planificación y reconocimiento

---

## 🏗️ Tipos y Colecciones

### 1. Cuevas (Espeleología)

#### 1.1. Tipo: `Cave` (Cavidad)

Representa una cavidad natural en el terreno kárstico.

**Propiedades:**

| Propiedad          | Tipo                | Descripción                       | Obligatorio |
| ------------------ | ------------------- | --------------------------------- | ----------- |
| `id`               | `string`            | Identificador único               | ✅          |
| `name`             | `string`            | Nombre de la cavidad              | ✅          |
| `coordinates`      | `UTMCoordinates`    | Coordenadas UTM de la entrada     | ✅          |
| `location`         | `string`            | Localidad o municipio             | ✅          |
| `catalogCode`      | `string`            | Sigla del catálogo (ej: "NA-01")  | ❌          |
| `subterraUrl`      | `string`            | URL a la ficha en Subterra.app    | ❌          |
| `length`           | `number`            | Longitud en metros                | ❌          |
| `depth`            | `number`            | Desarrollo/profundidad en metros  | ❌          |
| `description`      | `string`            | Descripción general de la cavidad | ✅          |
| `entrancePhoto`    | `ImageAsset`        | Fotografía de la entrada          | ❌          |
| `additionalPhotos` | `ImageAsset[]`      | Fotografías adicionales           | ❌          |
| `topographies`     | `TopographyAsset[]` | Topografías de la cavidad         | ❌          |
| `routes`           | `CaveRoute[]`       | Recorridos espeleológicos         | ✅          |
| `access`           | `AccessInfo`        | Información de acceso             | ❌          |
| `restrictions`     | `Restrictions`      | Restricciones y protecciones      | ❌          |
| `permits`          | `string`            | Permisos necesarios               | ❌          |
| `lastUpdate`       | `Date`              | Última actualización              | ❌          |
| `contributors`     | `string[]`          | Colaboradores/fuentes             | ❌          |

#### 1.2. Tipo: `CaveRoute` (Recorrido Espeleológico)

Representa un recorrido dentro de una cavidad.

**Propiedades:**

| Propiedad            | Tipo                      | Descripción               | Obligatorio |
| -------------------- | ------------------------- | ------------------------- | ----------- |
| `id`                 | `string`                  | Identificador único       | ✅          |
| `name`               | `string`                  | Nombre del recorrido      | ✅          |
| `description`        | `string`                  | Descripción del recorrido | ✅          |
| `duration`           | `Duration`                | Duración estimada         | ✅          |
| `risks`              | `string`                  | Riesgos y precauciones    | ❌          |
| `requiredGear`       | `string[]`                | Material necesario        | ✅          |
| `installationSheets` | `CaveInstallationSheet[]` | Fichas de instalación     | ❌          |

#### 1.3. Tipo: `CaveInstallationSheet` (Ficha de Instalación)

Documenta la instalación de cuerdas y anclajes en una cavidad.

**Propiedades:**

| Propiedad | Tipo     | Descripción         | Obligatorio |
| --------- | -------- | ------------------- | ----------- |
| `id`      | `string` | Identificador único | ✅          |
| `ropes`   | `Rope[]` | Cuerdas utilizadas  | ✅          |

#### 1.4. Tipo: `Rope` (Cuerda)

Representa una cuerda en la instalación.

> [!NOTE]
> **Relación Cuerdas-Obstáculos (Muchos-a-Muchos):**
>
> - Una cuerda puede superar **uno o más obstáculos** (ej: una cuerda de 50m puede superar un P15 y un P20 consecutivos)
> - Un obstáculo puede requerir **una o más cuerdas** (ej: un P80 puede requerir dos cuerdas de 50m empatadas)
>
> Esta relación se modela mediante el array `obstacles` en cada `Rope`, que contiene los obstáculos que esa cuerda específica supera. Si un obstáculo requiere múltiples cuerdas, aparecerá en el array `obstacles` de cada una de esas cuerdas.

**Propiedades:**

| Propiedad       | Tipo             | Descripción                       | Obligatorio |
| --------------- | ---------------- | --------------------------------- | ----------- |
| `id`            | `string`         | Identificador único               | ✅          |
| `length`        | `number`         | Longitud en metros                | ✅          |
| `obstacles`     | `Obstacle[]`     | Obstáculos que supera esta cuerda | ✅          |
| `installations` | `Installation[]` | Instalaciones en esta cuerda      | ✅          |

#### 1.5. Tipo: `Obstacle` (Obstáculo)

Representa un obstáculo vertical en una cavidad.

**Propiedades:**

| Propiedad | Tipo           | Descripción                      | Obligatorio |
| --------- | -------------- | -------------------------------- | ----------- |
| `id`      | `string`       | Identificador único              | ✅          |
| `name`    | `string`       | Nombre del obstáculo (ej: "P26") | ✅          |
| `type`    | `ObstacleType` | Tipo de obstáculo                | ✅          |

**Enum: `ObstacleType`**

```typescript
enum ObstacleType {
  Pozo = "Pozo",
  Resalte = "Resalte",
  Escalada = "Escalada",
  Pasamanos = "Pasamanos",
  Otros = "Otros",
}
```

#### 1.6. Tipo: `Installation` (Instalación)

Representa un punto de instalación en una cuerda.

**Propiedades:**

| Propiedad | Tipo               | Descripción                          | Obligatorio |
| --------- | ------------------ | ------------------------------------ | ----------- |
| `id`      | `string`           | Identificador único                  | ✅          |
| `type`    | `InstallationType` | Tipo de instalación                  | ✅          |
| `anchors` | `Anchor[]`         | Anclajes que componen la instalación | ✅          |

**Enum: `InstallationType`**

```typescript
enum InstallationType {
  Cabecera = "Cabecera",
  CabeceraRecuperable = "Cabecera Recuperable",
  Fraccionamiento = "Fraccionamiento",
  Desviador = "Desviador",
  PuntoIntermedio = "Punto Intermedio",
  Otros = "Otros",
}
```

#### 1.7. Tipo: `Anchor` (Anclaje)

Representa un anclaje individual.

**Propiedades:**

| Propiedad  | Tipo         | Descripción                    | Obligatorio         |
| ---------- | ------------ | ------------------------------ | ------------------- |
| `id`       | `string`     | Identificador único            | ✅                  |
| `type`     | `AnchorType` | Tipo de anclaje                | ✅                  |
| `quantity` | `number`     | Cantidad (para grupos: 2x, 3x) | ✅ (default: 1)     |
| `hasChain` | `boolean`    | ¿Tiene cadena?                 | ✅ (default: false) |
| `notes`    | `string`     | Notas adicionales              | ❌                  |

**Enum: `AnchorType`**

```typescript
enum AnchorType {
  Spitinox = "Spx",
  Spit = "Sp",
  Parabolt8 = "Pb8",
  Parabolt10 = "Pb10",
  Parabolt12 = "Pb12",
  Quimico = "Qm",
  Natural = "Na",
  Multimonti6 = "Mm6",
  Multimonti10 = "Mm10",
}
```

---

### 2. Ríos (Barranquismo/Canyoning)

> [!NOTE]
> **Estado de Implementación:**
>
> - ✅ **Colección `canyons`**: Implementada con frontmatter completo (localidad, río, características técnicas, tiempos, graduación, coordenadas, fotos)
> - ⏳ **Fichas de instalación**: Pendiente de implementación (obstáculos, instalaciones, anclajes)

#### 2.1. Colección: `canyons` (Barrancos) - IMPLEMENTADO

Representa un barranco o descenso de barranquismo en Navarra.

**Implementación:** Astro Content Collection con frontmatter YAML y contenido Markdown.

**Archivo de configuración:** `src/content/config.ts`  
**Directorio de contenido:** `src/content/canyons/`

**Propiedades del Frontmatter:**

| Propiedad           | Tipo               | Descripción                          | Obligatorio |
| ------------------- | ------------------ | ------------------------------------ | ----------- |
| `name`              | `string`           | Nombre del barranco                  | ✅          |
| `description`       | `string`           | Descripción general                  | ✅          |
| `location`          | `string`           | Localidad o municipio                | ✅          |
| `river`             | `string`           | Río al que pertenece el barranco     | ✅          |
| `highestRappel`     | `number`           | Rápel más alto en metros             | ❌          |
| `numberOfRappels`   | `number`           | Número total de rápeles              | ❌          |
| `verticalDrop`      | `number`           | Desnivel total en metros             | ❌          |
| `length`            | `number`           | Longitud del descenso en km          | ❌          |
| `approachTime`      | `Duration`         | Tiempo de aproximación desde parking | ❌          |
| `descentTime`       | `Duration`         | Duración estimada del descenso       | ❌          |
| `returnTime`        | `Duration`         | Tiempo de retorno hasta parking      | ❌          |
| `grading`           | `CanyoningGrading` | Graduación del barranco              | ❌          |
| `recommendedMonths` | `number[]`         | Meses recomendados (1-12)            | ❌          |
| `entryPoint`        | `UTMCoordinates`   | Coordenadas del punto de entrada     | ❌          |
| `exitPoint`         | `UTMCoordinates`   | Coordenadas del punto de salida      | ❌          |
| `catchmentArea`     | `number`           | Cuenca de captación en km²           | ❌          |
| `normalFlow`        | `number`           | Caudal normal en m³/s                | ❌          |
| `mainPhoto`         | `ImageAsset`       | Foto de portada                      | ❌          |
| `additionalPhotos`  | `ImageAsset[]`     | Fotografías adicionales              | ❌          |
| `restrictions`      | `Restrictions`     | Restricciones y protecciones         | ❌          |

**Ejemplo de uso:**

```yaml
---
name: "Barranco de Artazul"
description: "Barranco acuático clásico del Pirineo Navarro"
location: "Isaba"
river: "Río Belagua"
highestRappel: 15
numberOfRappels: 6
verticalDrop: 280
length: 3.5
approachTime:
  hours: 0
  minutes: 20
descentTime:
  hours: 3
  minutes: 30
returnTime:
  hours: 0
  minutes: 30
grading:
  vertical: 3
  aquatic: 3
  commitment: "III"
recommendedMonths: [6, 7, 8, 9]
entryPoint:
  zone: 30
  hemisphere: "N"
  easting: 672500
  northing: 4750800
  latitude: 42.9234
  longitude: -0.8567
  altitude: 1380
exitPoint:
  zone: 30
  hemisphere: "N"
  easting: 672800
  northing: 4750200
  latitude: 42.9180
  longitude: -0.8532
  altitude: 1100
catchmentArea: 12.5
normalFlow: 0.8
restrictions:
  hasRestrictions: true
  protectionStatus: ["ZEPA"]
  requiresPermit: false
---
## Descripción del descenso

Contenido en Markdown con información detallada del barranco...
```

#### 2.2. Tipo: `CanyoningGrading` (Graduación) - IMPLEMENTADO

Sistema de graduación de barrancos.

**Propiedades:**

| Propiedad    | Tipo              | Descripción                     | Obligatorio |
| ------------ | ----------------- | ------------------------------- | ----------- |
| `vertical`   | `number`          | Dificultad vertical (v1-v7)     | ✅          |
| `aquatic`    | `number`          | Dificultad acuática (a1-a7)     | ✅          |
| `commitment` | `CommitmentLevel` | Compromiso y envergadura (I-VI) | ✅          |

**Tipo: `CommitmentLevel`**

```typescript
type CommitmentLevel = "I" | "II" | "III" | "IV" | "V" | "VI";
```

**Ejemplos de graduación:** `v3 a2 IV`, `v4 a3 III`, `v4 a5 III`

---

#### 2.3. Tipo: `CanyoningInstallationSheet` (Ficha de Instalación Barranquista) - PENDIENTE

Documenta los obstáculos y su equipamiento en un barranco.

**Propiedades:**

| Propiedad   | Tipo                  | Descripción             | Obligatorio |
| ----------- | --------------------- | ----------------------- | ----------- |
| `id`        | `string`              | Identificador único     | ✅          |
| `obstacles` | `CanyoningObstacle[]` | Obstáculos concatenados | ✅          |

#### 2.4. Tipo: `CanyoningObstacle` (Obstáculo Barranquista) - PENDIENTE

Representa un obstáculo en un barranco.

**Propiedades:**

| Propiedad       | Tipo                      | Descripción                             | Obligatorio |
| --------------- | ------------------------- | --------------------------------------- | ----------- |
| `id`            | `string`                  | Identificador único                     | ✅          |
| `name`          | `string`                  | Nombre (ej: "R15", "P26")               | ✅          |
| `types`         | `CanyoningObstacleType[]` | Tipos de obstáculo (puede tener varios) | ✅          |
| `length`        | `number`                  | Longitud/altura en metros               | ❌          |
| `notes`         | `string`                  | Notas (para saltos/toboganes)           | ❌          |
| `installations` | `CanyoningInstallation[]` | Instalaciones (si aplica)               | ❌          |

**Enum: `CanyoningObstacleType`**

```typescript
enum CanyoningObstacleType {
  Rapel = "Rapel",
  Resalte = "Resalte",
  Escalada = "Escalada",
  Pasamanos = "Pasamanos",
  Salto = "Salto",
  Tobogan = "Tobogan",
}
```

> [!NOTE]
> Un obstáculo puede tener múltiples tipos. Por ejemplo: `[Rapel, Salto, Tobogan]` indica que se puede superar de tres formas diferentes.

#### 2.6. Tipo: `CanyoningInstallation` (Instalación Barranquista)

Representa una instalación en un obstáculo de barranco.

**Propiedades:**

| Propiedad | Tipo                        | Descripción         | Obligatorio |
| --------- | --------------------------- | ------------------- | ----------- |
| `id`      | `string`                    | Identificador único | ✅          |
| `type`    | `CanyoningInstallationType` | Tipo de instalación | ✅          |
| `anchors` | `CanyoningAnchor[]`         | Anclajes            | ✅          |

**Enum: `CanyoningInstallationType`**

```typescript
enum CanyoningInstallationType {
  Cabecera = "Cabecera",
  Fraccionamiento = "Fraccionamiento",
  Desviador = "Desviador",
  PuntoIntermedio = "Punto Intermedio",
  Otros = "Otros",
}
```

#### 2.6. Tipo: `CanyoningAnchor` (Anclaje Barranquista) - PENDIENTE

Similar al anclaje de cavidades, pero con tipos ligeramente diferentes.

**Propiedades:**

| Propiedad  | Tipo                  | Descripción                    | Obligatorio         |
| ---------- | --------------------- | ------------------------------ | ------------------- |
| `id`       | `string`              | Identificador único            | ✅                  |
| `type`     | `CanyoningAnchorType` | Tipo de anclaje                | ✅                  |
| `quantity` | `number`              | Cantidad (para grupos: 2x, 3x) | ✅ (default: 1)     |
| `hasChain` | `boolean`             | ¿Tiene cadena?                 | ✅ (default: false) |
| `notes`    | `string`              | Notas adicionales              | ❌                  |

**Enum: `CanyoningAnchorType`**

```typescript
enum CanyoningAnchorType {
  Spitinox = "Spx",
  Spit = "Sp",
  Parabolt8 = "Pb8",
  Parabolt10 = "Pb10",
  Parabolt12 = "Pb12",
  Quimico = "Qm",
  Natural = "Na",
}
```

---

### 3. Montañas (Senderismo/Alpinismo)

#### 3.1. Tipo: `Mountain` (Montaña)

Representa una montaña o cumbre.

**Propiedades:**

| Propiedad          | Tipo               | Descripción                                              | Obligatorio |
| ------------------ | ------------------ | -------------------------------------------------------- | ----------- |
| `id`               | `string`           | Identificador único                                      | ✅          |
| `name`             | `string`           | Nombre de la montaña                                     | ✅          |
| `description`      | `string`           | Descripción general                                      | ✅          |
| `altitude`         | `number`           | Altitud en metros s.n.m.                                 | ✅          |
| `coordinates`      | `UTMCoordinates`   | Coordenadas de la cumbre                                 | ✅          |
| `massif`           | `string`           | Macizo o cordillera (ej: "Pirineos", "Sierra de Urbasa") | ❌          |
| `restrictions`     | `Restrictions`     | Restricciones y protecciones                             | ❌          |
| `hikingRoutes`     | `HikingRoute[]`    | Rutas senderistas                                        | ❌          |
| `technicalRoutes`  | `TechnicalRoute[]` | Rutas técnicas de alpinismo                              | ❌          |
| `mainPhoto`        | `ImageAsset`       | Fotografía principal                                     | ❌          |
| `additionalPhotos` | `ImageAsset[]`     | Fotografías adicionales                                  | ❌          |

#### 3.2. Tipo: `HikingRoute` (Ruta Senderista)

Representa una ruta de senderismo no técnica.

**Propiedades:**

| Propiedad              | Tipo               | Descripción                           | Obligatorio         |
| ---------------------- | ------------------ | ------------------------------------- | ------------------- |
| `id`                   | `string`           | Identificador único                   | ✅                  |
| `name`                 | `string`           | Nombre de la ruta                     | ✅                  |
| `description`          | `string`           | Descripción del recorrido             | ✅                  |
| `startPoint`           | `UTMCoordinates`   | Coordenadas del punto de inicio       | ✅                  |
| `endPoint`             | `UTMCoordinates`   | Coordenadas del punto final           | ✅                  |
| `duration`             | `Duration`         | Duración estimada                     | ✅                  |
| `length`               | `number`           | Longitud en kilómetros                | ✅                  |
| `elevationGain`        | `number`           | Desnivel positivo acumulado en metros | ✅                  |
| `elevationLoss`        | `number`           | Desnivel negativo acumulado en metros | ❌                  |
| `difficulty`           | `HikingDifficulty` | Dificultad de la ruta                 | ✅                  |
| `circularRoute`        | `boolean`          | ¿Es ruta circular?                    | ✅ (default: false) |
| `seasonRecommendation` | `string`           | Época recomendada                     | ❌                  |
| `warnings`             | `string`           | Avisos y precauciones                 | ❌                  |

**Enum: `HikingDifficulty`**

```typescript
enum HikingDifficulty {
  Facil = "Fácil",
  Moderada = "Moderada",
  Dificil = "Difícil",
  MuyDificil = "Muy Difícil",
}
```

#### 3.3. Tipo: `TechnicalRoute` (Ruta Técnica)

Representa una ruta de alpinismo que requiere técnicas de escalada.

**Propiedades:**

| Propiedad              | Tipo              | Descripción                     | Obligatorio |
| ---------------------- | ----------------- | ------------------------------- | ----------- |
| `id`                   | `string`          | Identificador único             | ✅          |
| `name`                 | `string`          | Nombre de la ruta               | ✅          |
| `description`          | `string`          | Descripción del recorrido       | ✅          |
| `startPoint`           | `UTMCoordinates`  | Coordenadas del punto de inicio | ✅          |
| `endPoint`             | `UTMCoordinates`  | Coordenadas del punto final     | ✅          |
| `duration`             | `Duration`        | Duración estimada               | ✅          |
| `length`               | `number`          | Longitud en kilómetros          | ✅          |
| `elevationGain`        | `number`          | Desnivel positivo en metros     | ✅          |
| `elevationLoss`        | `number`          | Desnivel negativo en metros     | ❌          |
| `requiredGear`         | `string[]`        | Material técnico necesario      | ✅          |
| `difficulty`           | `ClimbingGrade`   | Dificultad de escalada          | ✅          |
| `technicalDescription` | `string`          | Descripción técnica detallada   | ✅          |
| `climbingPitches`      | `ClimbingPitch[]` | Largos de escalada (si aplica)  | ❌          |
| `seasonRecommendation` | `string`          | Época recomendada               | ❌          |
| `warnings`             | `string`          | Avisos y precauciones           | ❌          |

---

### 4. Paredes (Escalada)

#### 4.1. Tipo: `ClimbingSchool` (Escuela de Escalada)

Representa una escuela o zona de escalada que agrupa varios sectores.

**Propiedades:**

| Propiedad          | Tipo               | Descripción                      | Obligatorio |
| ------------------ | ------------------ | -------------------------------- | ----------- |
| `id`               | `string`           | Identificador único              | ✅          |
| `name`             | `string`           | Nombre de la escuela             | ✅          |
| `description`      | `string`           | Descripción general              | ✅          |
| `coordinates`      | `UTMCoordinates`   | Coordenadas del acceso principal | ✅          |
| `location`         | `string`           | Localidad o municipio            | ✅          |
| `restrictions`     | `Restrictions`     | Restricciones y protecciones     | ❌          |
| `sectors`          | `ClimbingSector[]` | Sectores de escalada             | ✅          |
| `access`           | `string`           | Descripción del acceso           | ❌          |
| `orientation`      | `Orientation[]`    | Orientaciones de los sectores    | ❌          |
| `mainPhoto`        | `ImageAsset`       | Fotografía principal             | ❌          |
| `additionalPhotos` | `ImageAsset[]`     | Fotografías adicionales          | ❌          |

**Enum: `Orientation`**

```typescript
enum Orientation {
  Norte = "N",
  Sur = "S",
  Este = "E",
  Oeste = "O",
  Noreste = "NE",
  Noroeste = "NO",
  Sureste = "SE",
  Suroeste = "SO",
}
```

#### 4.2. Tipo: `ClimbingSector` (Sector de Escalada)

Representa un sector específico dentro de una escuela de escalada.

**Propiedades:**

| Propiedad     | Tipo              | Descripción                 | Obligatorio |
| ------------- | ----------------- | --------------------------- | ----------- |
| `id`          | `string`          | Identificador único         | ✅          |
| `name`        | `string`          | Nombre del sector           | ✅          |
| `description` | `string`          | Descripción del sector      | ❌          |
| `routes`      | `ClimbingRoute[]` | Vías de escalada            | ✅          |
| `orientation` | `Orientation`     | Orientación del sector      | ❌          |
| `height`      | `number`          | Altura aproximada en metros | ❌          |
| `photo`       | `ImageAsset`      | Fotografía del sector       | ❌          |
| `topoImage`   | `ImageAsset`      | Croquis/topo del sector     | ❌          |

#### 4.3. Tipo: `ClimbingRoute` (Vía de Escalada)

Representa una vía de escalada individual.

> [!NOTE]
> Las vías pueden estar en sectores/escuelas O en montañas como parte de rutas técnicas.

**Propiedades:**

| Propiedad      | Tipo              | Descripción                         | Obligatorio |
| -------------- | ----------------- | ----------------------------------- | ----------- |
| `id`           | `string`          | Identificador único                 | ✅          |
| `name`         | `string`          | Nombre de la vía                    | ✅          |
| `description`  | `string`          | Descripción de la vía               | ✅          |
| `heightMeters` | `number`          | Altura total de la vía en metros    | ❌          |
| `difficulty`   | `ClimbingGrade`   | Dificultad de la vía (grado máximo) | ✅          |
| `pitches`      | `ClimbingPitch[]` | Largos de escalada                  | ✅          |
| `style`        | `ClimbingStyle`   | Estilo de escalada                  | ✅          |
| `protection`   | `ProtectionType`  | Tipo de protección                  | ✅          |
| `firstAscent`  | `string`          | Información de primera ascensión    | ❌          |
| `requiredGear` | `string`          | Material necesario                  | ❌          |

**Enum: `ClimbingStyle`**

```typescript
enum ClimbingStyle {
  Deportiva = "Deportiva",
  Clasica = "Clásica",
  Mixta = "Mixta",
  Artificial = "Artificial",
  Boulder = "Boulder",
}
```

**Enum: `ProtectionType`**

```typescript
enum ProtectionType {
  Equipada = "Equipada",
  Parcialmente = "Parcialmente Equipada",
  Desequipada = "Desquipada",
}
```

#### 4.4. Tipo: `ClimbingPitch` (Largo de Escalada)

Representa un tramo o "largo" de una vía de escalada.

**Propiedades:**

| Propiedad     | Tipo               | Descripción                                      | Obligatorio |
| ------------- | ------------------ | ------------------------------------------------ | ----------- |
| `id`          | `string`           | Identificador único                              | ✅          |
| `number`      | `number`           | Número de largo (1, 2, 3...)                     | ✅          |
| `length`      | `number`           | Longitud en metros                               | ✅          |
| `description` | `string`           | Descripción del largo                            | ✅          |
| `difficulty`  | `ClimbingGrade`    | Dificultad del largo                             | ✅          |
| `anchors`     | `ClimbingAnchor[]` | Anclajes a lo largo del tramo                    | ❌          |
| `belay`       | `Belay`            | Reunión al final del largo                       | ✅          |
| `inclination` | `number`           | Inclinación en grados (opcional, para alpinismo) | ❌          |

#### 4.5. Tipo: `ClimbingGrade` (Graduación de Escalada)

Sistema de graduación de dificultad en escalada.

**Propiedades:**

| Propiedad  | Tipo            | Descripción                  | Obligatorio |
| ---------- | --------------- | ---------------------------- | ----------- |
| `number`   | `number`        | Número del 1 al 9            | ✅          |
| `letter`   | `GradeLetter`   | Letra: a, b, o c             | ✅          |
| `modifier` | `GradeModifier` | Modificador: +, -, o ninguno | ❌          |

**Enum: `GradeLetter`**

```typescript
enum GradeLetter {
  A = "a",
  B = "b",
  C = "c",
}
```

**Enum: `GradeModifier`**

```typescript
enum GradeModifier {
  Plus = "+",
  Minus = "-",
}
```

**Ejemplos de graduación:** `4c+`, `6b`, `9a-`, `7a`

**Helper para representación:**

```typescript
function formatClimbingGrade(grade: ClimbingGrade): string {
  return `${grade.number}${grade.letter}${grade.modifier || ""}`;
}
```

#### 4.6. Tipo: `ClimbingAnchor` (Anclaje de Escalada)

Representa un anclaje en una vía de escalada.

**Propiedades:**

| Propiedad  | Tipo                 | Descripción                                           | Obligatorio |
| ---------- | -------------------- | ----------------------------------------------------- | ----------- |
| `id`       | `string`             | Identificador único                                   | ✅          |
| `type`     | `ClimbingAnchorType` | Tipo de anclaje                                       | ✅          |
| `position` | `number`             | Posición aproximada en el largo (metros desde inicio) | ❌          |
| `notes`    | `string`             | Notas adicionales                                     | ❌          |

**Enum: `ClimbingAnchorType`**

```typescript
enum ClimbingAnchorType {
  Parabolt = "Pb",
  Quimico = "Qm",
  Spit = "Sp",
  Natural = "Na",
}
```

#### 4.7. Tipo: `Belay` (Reunión)

Representa la reunión al final de un largo.

**Propiedades:**

| Propiedad | Tipo               | Descripción                       | Obligatorio |
| --------- | ------------------ | --------------------------------- | ----------- |
| `id`      | `string`           | Identificador único               | ✅          |
| `anchors` | `ClimbingAnchor[]` | Anclajes de la reunión (mínimo 2) | ✅          |
| `type`    | `BelayType`        | Tipo de reunión                   | ✅          |
| `notes`   | `string`           | Notas sobre la reunión            | ❌          |

**Enum: `BelayType`**

```typescript
enum BelayType {
  Equipada = "Equipada",
  Semiequipada = "Semi-equipada",
  Natural = "Natural",
}
```

### Tipos Compartidos

#### Tipo: `UTMCoordinates` (Coordenadas UTM)

> [!NOTE]
> El sistema UTM es el estándar en el territorio, pero también se almacenan las coordenadas geográficas (latitud/longitud) en WGS84 para facilitar la integración con servicios externos, exportación a GPX, y visualización en mapas web.

**Propiedades:**

| Propiedad    | Tipo         | Descripción                              | Obligatorio |
| ------------ | ------------ | ---------------------------------------- | ----------- |
| `zone`       | `number`     | Zona UTM (ej: 30 para Navarra)           | ✅          |
| `hemisphere` | `"N" \| "S"` | Hemisferio                               | ✅          |
| `easting`    | `number`     | Coordenada Este (X)                      | ✅          |
| `northing`   | `number`     | Coordenada Norte (Y)                     | ✅          |
| `latitude`   | `number`     | Latitud en WGS84 (grados decimales)      | ✅          |
| `longitude`  | `number`     | Longitud en WGS84 (grados decimales)     | ✅          |
| `altitude`   | `number`     | Altitud en metros sobre el nivel del mar | ❌          |

**Ejemplo:**

```typescript
{
  zone: 30,
  hemisphere: "N",
  easting: 612345,
  northing: 4712345,
  latitude: 42.9876,
  longitude: -1.2345,
  altitude: 850
}
```

#### Tipo: `Duration` (Duración)

**Propiedades:**

| Propiedad | Tipo     | Descripción | Obligatorio |
| --------- | -------- | ----------- | ----------- |
| `hours`   | `number` | Horas       | ✅          |
| `minutes` | `number` | Minutos     | ✅          |

---

#### Tipo: `ImageAsset` (Recurso de Imagen)

Representa una imagen (fotografía) en el sistema.

**Propiedades:**

| Propiedad      | Tipo     | Descripción                          | Obligatorio |
| -------------- | -------- | ------------------------------------ | ----------- |
| `url`          | `string` | URL o path de la imagen              | ✅          |
| `alt`          | `string` | Texto alternativo para accesibilidad | ✅          |
| `caption`      | `string` | Descripción o pie de foto            | ❌          |
| `photographer` | `string` | Autor de la fotografía               | ❌          |
| `date`         | `Date`   | Fecha de captura                     | ❌          |

**Ejemplo:**

```typescript
{
  url: "/images/caves/san-martin-entrance.jpg",
  alt: "Entrada a la Sima de San Martín",
  caption: "Vista de la boca de entrada en invierno",
  photographer: "Juan Pérez",
  date: new Date("2024-02-15")
}
```

---

#### Tipo: `TopographyAsset` (Recurso de Topografía)

Representa una topografía o plano de una cavidad, barranco, ruta, etc.

**Propiedades:**

| Propiedad | Tipo                               | Descripción                  | Obligatorio |
| --------- | ---------------------------------- | ---------------------------- | ----------- |
| `url`     | `string`                           | URL o path del archivo       | ✅          |
| `title`   | `string`                           | Título de la topografía      | ✅          |
| `author`  | `string`                           | Autor/topógrafo              | ❌          |
| `year`    | `number`                           | Año de realización           | ❌          |
| `format`  | `"pdf" \| "svg" \| "png" \| "jpg"` | Formato del archivo          | ✅          |
| `license` | `string`                           | Licencia o derechos de autor | ❌          |

**Ejemplo:**

```typescript
{
  url: "/topographies/san-martin-topo.pdf",
  title: "Topografía Sima de San Martín",
  author: "G.E. Edelweiss",
  year: 2020,
  format: "pdf",
  license: "CC BY-NC-SA 4.0"
}
```

---

#### Tipo: `AccessInfo` (Información de Acceso)

Información sobre cómo acceder a una localización (cueva, río, montaña, pared).

**Propiedades:**

| Propiedad      | Tipo             | Descripción                                  | Obligatorio |
| -------------- | ---------------- | -------------------------------------------- | ----------- |
| `description`  | `string`         | Descripción textual del acceso               | ✅          |
| `parking`      | `UTMCoordinates` | Coordenadas del aparcamiento/punto de inicio | ❌          |
| `difficulty`   | `string`         | Dificultad del acceso                        | ❌          |
| `time`         | `Duration`       | Tiempo desde parking hasta inicio actividad  | ❌          |
| `distance`     | `number`         | Distancia en kilómetros desde parking        | ❌          |
| `restrictions` | `string`         | Restricciones, permisos, avisos              | ❌          |
| `4x4Required`  | `boolean`        | ¿Requiere vehículo 4x4?                      | ❌          |

**Ejemplo:**

```typescript
{
  description: "Desde Isaba tomar la pista hacia el refugio de Belagua. En el km 8 encontramos el desvío señalizado.",
  parking: {
    zone: 30,
    hemisphere: "N",
    easting: 678234,
    northing: 4745123,
    latitude: 42.8765,
    longitude: -0.8901,
    altitude: 1250
  },
  difficulty: "Moderado",
  time: { hours: 0, minutes: 45 },
  distance: 2.3,
  restrictions: "Cerrado durante la temporada de caza (noviembre-diciembre)",
  "4x4Required": false
}
```

---

#### Tipo: `Restrictions` (Restricciones)

Información sobre restricciones, protecciones o prohibiciones en una localización.

**Propiedades:**

| Propiedad          | Tipo                 | Descripción                               | Obligatorio         |
| ------------------ | -------------------- | ----------------------------------------- | ------------------- |
| `hasRestrictions`  | `boolean`            | ¿Existen restricciones activas?           | ✅                  |
| `protectionStatus` | `ProtectionStatus[]` | Estado(s) de protección aplicables        | ❌                  |
| `closureSeasons`   | `ClosurePeriod[]`    | Períodos de cierre temporal               | ❌                  |
| `requiresPermit`   | `boolean`            | ¿Requiere permiso especial?               | ✅ (default: false) |
| `permitInfo`       | `string`             | Información sobre cómo obtener el permiso | ❌                  |
| `prohibitions`     | `string[]`           | Lista de actividades prohibidas           | ❌                  |
| `additionalInfo`   | `string`             | Información adicional sobre restricciones | ❌                  |

**Tipo: `ProtectionStatus`**

```typescript
type ProtectionStatus =
  | "LIC" // Lugar de Importancia Comunitaria
  | "ZEPA" // Zona de Especial Protección para las Aves
  | "Parque Natural"
  | "Reserva Natural"
  | "Monumento Natural"
  | "Zona Protegida Fauna" // Por murciélagos, águilas, etc.
  | "Propiedad Privada"
  | "Otros";
```

**Tipo: `ClosurePeriod`**

```typescript
type ClosurePeriod = {
  startDate: string; // Formato: "MM-DD" (ej: "11-01" para 1 de noviembre)
  endDate: string; // Formato: "MM-DD" (ej: "03-31" para 31 de marzo)
  reason: string; // Motivo del cierre (ej: "Protección de murciélagos", "Temporada de caza")
  isAnnual: boolean; // ¿Se repite anualmente?
};
```

**Ejemplo:**

```typescript
{
  hasRestrictions: true,
  protectionStatus: ["Zona Protegida Fauna", "LIC"],
  closureSeasons: [
    {
      startDate: "11-01",
      endDate: "03-31",
      reason: "Hibernación de murciélagos",
      isAnnual: true
    }
  ],
  requiresPermit: true,
  permitInfo: "Solicitar autorización al Departamento de Medio Ambiente del Gobierno de Navarra con 15 días de antelación",
  prohibitions: ["Uso de carburo", "Grupos mayores de 10 personas"],
  additionalInfo: "Especialmente sensible durante el período de cría (mayo-julio)"
}
```

---

## �️ Arquitectura de Páginas

### Estructura de Navegación

```text
/navarra (Landing principal)
├── /navarra/cuevas (Categoría: Cuevas)
│   ├── /navarra/cuevas/[slug] (Localización individual)
│   └── ...
├── /navarra/rios (Categoría: Ríos)
│   ├── /navarra/rios/[slug] (Localización individual)
│   └── ...
├── /navarra/montañas (Categoría: Montañas)
│   ├── /navarra/montañas/[slug] (Localización individual)
│   └── ...
└── /navarra/paredes (Categoría: Paredes)
    ├── /navarra/paredes/[slug] (Localización individual)
    └── ...
```

---

### 1. Landing Principal: `/navarra`

**Propósito**: Página de entrada a la sección Navarra que presenta las cuatro categorías de actividades.

#### Componentes y Secciones del Landing

##### Hero Section

- **Diseño**: Hero visual a pantalla completa
- **Contenido**:
  - Título principal: "Descubre Navarra"
  - Subtítulo descriptivo del propósito de la sección
  - Imagen de fondo de alta calidad (paisaje navarro representativo)
  - CTA principal para explorar categorías

##### Sección de Categorías

- **Layout**: Grid responsive (2x2 en desktop, 1 columna en móvil)
- **Cards de categoría**:
  - **Cuevas**: Imagen representativa, icono, título, descripción breve, enlace a `/navarra/cuevas`
  - **Ríos**: Imagen representativa, icono, título, descripción breve, enlace a `/navarra/rios`
  - **Montañas**: Imagen representativa, icono, título, descripción breve, enlace a `/navarra/montañas`
  - **Paredes**: Imagen representativa, icono, título, descripción breve, enlace a `/navarra/paredes`

##### Estadísticas

- Número de localizaciones documentadas por categoría
- Métricas destacadas (total de cavidades, km de barrancos, etc.)

---

### 2. Páginas de Categoría: `/navarra/[categoria]`

**Rutas**: `/navarra/cuevas`, `/navarra/rios`, `/navarra/montañas`, `/navarra/paredes`

#### Componentes y Secciones de Categoría

##### 2.1. Hero Section

- **Diseño**: Hero visual atractivo
- **Contenido**:
  - Título de la categoría (ej: "Cuevas de Navarra")
  - Breve descripción de la actividad
  - Imagen de fondo temática
  - Breadcrumb: Navarra > Cuevas

##### 2.2. Mapa Interactivo (Leaflet)

- **Posición**: Sección destacada después del hero
- **Características**:
  - Mapa de Navarra centrado
  - Waypoints/marcadores para cada localización
  - Clusters para zonas con alta densidad de puntos
  - Tooltip en hover con:
    - Nombre de la localización
    - Miniatura (si disponible)
    - Info básica (ej: profundidad, longitud)
    - Enlace a página individual
  - Popup en click con más detalles y botón "Ver ficha completa"
  - Controles de zoom y capas

##### 2.3. Lista/Tabla de Localizaciones

- **Diseño**: Tabla responsive o lista de cards
- **Funcionalidades**:
  - **Filtros**:
    - Por zona/comarca
    - Por dificultad
    - Por características (ej: longitud > 500m)
  - **Búsqueda**: Campo de búsqueda en tiempo real
  - **Ordenación**: Por nombre, longitud, dificultad, etc.
  - **Paginación**: 20-30 elementos por página

- **Datos mostrados en tabla**:
  - Nombre (con enlace a ficha)
  - Localidad
  - Característica principal (longitud/profundidad/altura)
  - Dificultad (si aplica)
  - Estado de equipamiento (si aplica)

##### 2.4. Sección Informativa

- Introducción a la actividad en Navarra
- Mejores épocas para practicarla
- Recomendaciones de seguridad
- Enlaces a cursos relacionados

---

### 3. Páginas Individuales: `/navarra/[categoria]/[slug]`

**Rutas ejemplo**: `/navarra/cuevas/sima-san-martin`, `/navarra/rios/artazul`

#### Componentes y Secciones de Páginas Individuales

##### 3.1. Header Principal

- **Diseño**: Header visual impactante
- **Contenido**:
  - Imagen principal de alta calidad (foto de entrada/paisaje)
  - Overlay con información general:
    - Nombre de la localización
    - Localidad/municipio
    - Coordenadas
    - Datos principales en badges:
      - Profundidad/longitud
      - Dificultad
      - Estado de equipamiento
  - Breadcrumb: Navarra > Cuevas > Sima San Martín

##### 3.2. Información Extendida

- **Layout**: Sección estructurada con subsecciones
- **Contenido**:
  - **Descripción general**: Texto largo con markdown support
  - **Acceso**: Cómo llegar, parking, permisos necesarios
  - **Características técnicas**:
    - Datos específicos según tipo (profundidad, caudal, altura, etc.)
    - Catálogo/código de referencia
    - Época recomendada
  - **Material necesario**: Lista de equipamiento
  - **Riesgos y precauciones**: Avisos importantes

##### 3.3. Mapa de Ubicación (Leaflet)

- **Características**:
  - Mapa centrado en la localización exacta
  - Marcador en las coordenadas precisas
  - Capa topográfica
  - Indicación de accesos/parking si disponible
  - Export a GPX para GPS

##### 3.4. Sección de Recorridos

- **Diseño**: Accordion o tabs para múltiples recorridos
- **Contenido por recorrido**:
  - Nombre del recorrido
  - Descripción detallada
  - Duración estimada
  - Dificultad/graduación
  - Material específico
  - **Ficha de instalación** (componente interactivo):
    - Visualización de cuerdas, obstáculos, instalaciones
    - Listado detallado de anclajes
    - Diagrama visual (si disponible)
    - Opción de descarga en PDF

##### 3.5. Topografías

- Visualizador de topografías (si disponibles)
- Galería de topografías con zoom
- Descarga de archivos

##### 3.6. Galería Multimedia

- **Fotos**: Galería lightbox con imágenes adicionales
- **Videos**: Embeds de YouTube/Vimeo si disponibles
- **Layout**: Grid responsivo con lazy loading

##### 3.7. Información Adicional

- Enlaces externos (Subterra.app, bases de datos, etc.)
- Fecha de última actualización
- Autor/colaboradores
- Botón para reportar errores o sugerir cambios

##### 3.8. Contenido Relacionado

- Otras localizaciones cercanas
- Posts del blog relacionados
- Cursos relacionados con esta actividad

---

### Consideraciones de Diseño

#### Responsive Design

- Mobile-first approach
- Breakpoints estándar: 640px, 768px, 1024px, 1280px
- Mapas adaptables con controles touch-friendly
- Tablas que se convierten en cards en móvil

#### Performance

- Lazy loading de imágenes
- Code splitting para componentes React
- Mapas que se cargan solo cuando están en viewport
- Optimización de imágenes con Astro Image

#### Accesibilidad

- Semántica HTML correcta
- Alt text en todas las imágenes
- ARIA labels en componentes interactivos
- Contraste adecuado en texto sobre imágenes
- Navegación por teclado funcional

#### SEO

- Meta tags específicos por página
- Open Graph tags para compartir en redes
- Structured data (JSON-LD) para localizaciones
- URLs semánticas y limpias
- Sitemap automático

---

## 💬 Funcionalidades Interactivas

### 1. Sistema de Actividades Cercanas

#### Conceptualización

Sistema automático que calcula y muestra actividades próximas basándose en la distancia geográfica entre coordenadas, permitiendo a los usuarios descubrir oportunidades de combinar múltiples actividades en una misma visita.

#### Especificación Técnica

**Algoritmo de Búsqueda:**

```typescript
type NearbyActivity = {
  id: string;
  name: string;
  type: "cave" | "river" | "mountain" | "climbing";
  category: string; // "Cuevas", "Ríos", "Montañas", "Paredes"
  coordinates: UTMCoordinates;
  distance: number; // Distancia en kilómetros
  difficulty?: string; // Dificultad general
  duration?: Duration; // Duración estimada
  thumbnailUrl?: string;
  slug: string; // Para enlace directo
};

type NearbyActivitiesConfig = {
  maxDistance: number; // Distancia máxima en km (default: 10)
  maxResults: number; // Número máximo de resultados (default: 6)
  includeCategories: string[]; // Categorías a incluir en búsqueda
  excludeCurrentId: string; // Excluir la actividad actual
};

function findNearbyActivities(
  currentLocation: UTMCoordinates,
  config: NearbyActivitiesConfig,
): NearbyActivity[] {
  // 1. Convertir coordenadas de todas las actividades
  // 2. Calcular distancia usando fórmula Haversine
  // 3. Filtrar por distancia máxima
  // 4. Ordenar por distancia (más cercana primero)
  // 5. Limitar a maxResults
  // 6. Retornar array de actividades cercanas
}
```

**Fórmula de Distancia:**

- Usar fórmula de Haversine para calcular distancia entre coordenadas lat/long
- Precisión suficiente para distancias cortas (<100km)

**Coordenadas de Referencia:**
Para cada tipo de actividad, usar la coordenada más relevante:

- **Cuevas**: Coordenada de entrada (`coordinates`)
- **Ríos/Barrancos**: Coordenada de entrada del recorrido (`entryPoint` del CanyoningRoute)
- **Montañas (Senderismo)**: Coordenada de inicio de ruta (`startPoint` del HikingRoute/TechnicalRoute)
- **Escalada**: Coordenada de acceso de la escuela (`coordinates` del ClimbingSchool)

#### Componente UI: "Combínalo con..."

**Ubicación**: Sección destacada en páginas individuales de localizaciones

**Diseño Visual:**

- Título: "Combínalo con actividades cercanas"
- Grid responsivo de cards (2-3 por fila en desktop, 1 en móvil)
- Cada card muestra:
  - Icono de tipo de actividad
  - Nombre de la actividad
  - Categoría (badge)
  - Distancia ("A 3.2 km")
  - Dificultad (si aplica)
  - Duración estimada (si aplica)
  - Imagen miniatura
  - Enlace a ficha completa

**Comportamiento:**

- Carga lazy (solo cuando sección visible)
- Actualización dinámica al cambiar de ruta dentro de una montaña/río
- Posibilidad de filtrar por tipo de actividad
- Ordenamiento: por distancia (default) o por dificultad

**Configuración por Categoría:**

| Categoría Actual | Max Distancia | Max Resultados | Incluye Categorías |
| ---------------- | ------------- | -------------- | ------------------ |
| Cuevas           | 15 km         | 6              | Todas              |
| Ríos             | 10 km         | 6              | Todas              |
| Montañas         | 20 km         | 6              | Todas              |
| Paredes          | 15 km         | 6              | Todas              |

#### Implementación Técnica

**Build-time Processing:**

- Pre-calcular distancias entre todas las actividades
- Generar índice de actividades cercanas en build time
- Almacenar en formato JSON optimizado

**Runtime:**

- Cargar datos de actividades cercanas desde JSON
- Renderizar componente React/Preact
- Lazy loading de imágenes

**Alternativa: API Endpoint (Si base de datos está disponible):**

```typescript
// GET /api/nearby-activities?id={locationId}&type={type}&maxDistance=10
{
  currentActivity: {...},
  nearbyActivities: [...]
}
```

---

### 2. Sistema de Comentarios

#### Conceptualización Sistema de Comentarios

Sistema de comentarios anidados (threaded comments) que permite a usuarios autenticados compartir experiencias, condiciones actuales, avisos y consejos sobre localizaciones específicas. Integrado con Clerk para autenticación y PostgreSQL para almacenamiento persistente.

#### Especificación Técnica Sistema de Comentarios

**Modelo de Datos (PostgreSQL):**

```sql
-- Tabla principal de comentarios
CREATE TABLE location_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id VARCHAR(255) NOT NULL,      -- ID de la localización (cave-id, river-id, etc.)
  location_type VARCHAR(50) NOT NULL,      -- 'cave', 'river', 'mountain', 'climbing'
  user_id VARCHAR(255) NOT NULL,           -- ID de usuario de Clerk
  parent_id UUID,                          -- ID del comentario padre (NULL si es raíz)
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,        -- Soft delete

  FOREIGN KEY (parent_id) REFERENCES location_comments(id) ON DELETE CASCADE
);

-- Índices para optimizar queries
CREATE INDEX idx_location_comments_location ON location_comments(location_id, location_type);
CREATE INDEX idx_location_comments_user ON location_comments(user_id);
CREATE INDEX idx_location_comments_parent ON location_comments(parent_id);
CREATE INDEX idx_location_comments_created ON location_comments(created_at DESC);

-- Tabla de reacciones/likes (opcional, para futuro)
CREATE TABLE comment_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  reaction_type VARCHAR(20) DEFAULT 'like',  -- 'like', 'helpful', etc.
  created_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (comment_id) REFERENCES location_comments(id) ON DELETE CASCADE,
  UNIQUE(comment_id, user_id)  -- Un usuario solo puede reaccionar una vez
);

-- Tabla para información de usuario en caché (optimización)
CREATE TABLE user_profiles_cache (
  user_id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(100),
  avatar_url TEXT,
  last_updated TIMESTAMP DEFAULT NOW()
);
```

**Tipos TypeScript:**

```typescript
type Comment = {
  id: string;
  locationId: string;
  locationType: "cave" | "river" | "mountain" | "climbing";
  userId: string;
  parentId: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  isDeleted: boolean;

  // Datos del usuario (de Clerk o caché)
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };

  // Comentarios hijos (para estructura anidada)
  replies?: Comment[];

  // Metadatos
  replyCount?: number;
  hasReplies?: boolean;
};

type CommentInput = {
  locationId: string;
  locationType: "cave" | "river" | "mountain" | "climbing";
  parentId?: string;
  content: string;
};
```

#### API Endpoints

**Obtener comentarios de una localización:**

```typescript
// GET /api/comments?locationId={id}&locationType={type}
// Response: Comment[] (estructura jerárquica)
```

**Crear comentario:**

```typescript
// POST /api/comments
// Body: CommentInput
// Headers: Authorization (Clerk JWT)
// Response: Comment
```

**Editar comentario:**

```typescript
// PATCH /api/comments/{commentId}
// Body: { content: string }
// Headers: Authorization (Clerk JWT)
// Response: Comment
```

**Eliminar comentario:**

```typescript
// DELETE /api/comments/{commentId}
// Headers: Authorization (Clerk JWT)
// Response: { success: boolean }
// Nota: Soft delete, marca is_deleted = true
```

#### Componente UI

**Ubicación**: Sección al final de páginas individuales de localizaciones

**Características:**

1. **Autenticación:**
   - Solo usuarios logueados pueden comentar
   - Botón "Iniciar sesión para comentar" si no está autenticado
   - Integración con Clerk para login/signup

2. **Comentarios Anidados:**
   - Máximo 3 niveles de anidamiento (raíz → respuesta → sub-respuesta)
   - Indentación visual para jerarquía
   - Botón "Responder" en cada comentario

3. **Edición y Eliminación:**
   - Solo el autor puede editar/eliminar sus comentarios
   - Marca visual "editado" si fue modificado
   - Eliminados muestran "[Comentario eliminado]"

4. **Ordenación:**
   - Por defecto: Más recientes primero
   - Opción: Más antiguos primero
   - Futuro: Más útiles (por reacciones)

5. **Moderación (Webmaster):**
   - Panel admin para eliminar comentarios inapropiados
   - Banear usuarios si necesario
   - Ver todos los comentarios del sitio

6. **Validaciones:**
   - Longitud mínima: 10 caracteres
   - Longitud máxima: 2000 caracteres
   - Markdown básico: **negrita**, _cursiva_, enlaces
   - Prevención XSS: sanitización de HTML

7. **Performance:**
   - Lazy loading: cargar comentarios solo cuando sección visible
   - Paginación: 10-20 comentarios iniciales
   - "Cargar más" para siguientes páginas
   - Cache de usuarios para evitar queries repetidas

#### Tecnologías del Sistema de Comentarios

**Frontend:**

- React para componente interactivo
- Editor de texto con soporte Markdown (react-markdown)
- Clerk React SDK para autenticación
- Optimistic updates para mejor UX

**Backend:**

- API Routes de Astro (o endpoints serverless)
- PostgreSQL con Prisma o Drizzle ORM
- Clerk Backend SDK para validar tokens
- Rate limiting para prevenir spam

**Seguridad:**

- Validación de JWT de Clerk en cada request
- Sanitización de contenido (DOMPurify)
- Rate limiting: máximo 5 comentarios por hora por usuario
- SQL Injection prevention (usar ORM)

#### Notificaciones (Futuro)

- Email cuando alguien responde a tu comentario
- Notificación in-app de nuevas respuestas
- Suscripción a comentarios de una localización

---

## 📋 Planificación en Fases

> **Principios de Desarrollo:**
>
> - **Desarrollo paralelo** de las 4 categorías (Cuevas, Ríos, Montañas, Paredes)
> - **Iteración incremental**: Cada fase añade funcionalidad a todas las categorías simultáneamente
> - **Content Collections** para datos + PostgreSQL solo para comentarios (fase final)
> - **Datos de ejemplo** que se irán reemplazando por datos reales
> - **Clerk ya implementado** (se aprovechará en fase de comentarios)

---

### Fase 1: Fundamentos y Tipos (Semana 1-2)

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

- ✅ Sistema de tipos completo y documentado
- ✅ Schemas Zod funcionando con validación
- ✅ 4 entradas de ejemplo (una por categoría)
- ✅ Documentación de estructura de datos

---

### Fase 2: UI Base y Componentes Compartidos (Semana 3-4) ✅ COMPLETADA

**Objetivo**: Crear componentes reutilizables y estructura visual base para las 4 categorías.

#### Tareas Fase 2

- [x] **Landing `/navarra`** - Página principal con hero y grid de 4 categorías
  - [x] Hero visual con imagen 16:9
  - [x] Grid de 4 categorías con imágenes y enlaces
  - [x] Sección de estadísticas dinámicas (conteo de colecciones)
  - [x] Variables CSS del sistema de diseño
  - [x] Responsive design (2x2 en desktop, 1 columna en móvil)

- [x] **Funciones de utilidad** (`/src/utils/navarra/`)
  - [x] `collection-stats.ts` - Funciones de conteo de colecciones
  - [x] `getNavarraStats()` - Obtener todas las estadísticas

- [x] **Componentes compartidos** (React/Preact en `/src/components/navarra/shared/`)
  - [x] `<CoordinatesDisplay />` - Mostrar coordenadas UTM/WGS84 con formato
  - [x] `<DurationBadge />` - Badge de duración (formato normal y compacto)
  - [x] `<DifficultyBadge />` - Badge de dificultad adaptable por tipo de actividad
  - [x] `<ImageGallery />` - Galería con lightbox interactivo y navegación por teclado
  - [x] `<InfoCard />` - Card genérica con 3 variantes (default, highlight, warning)
  - [x] ~~`<Breadcrumb />`~~ - Se usa el componente existente en `/src/components/ui/`

- [x] **Páginas de categoría básicas** (sin mapa aún)
  - [x] `/navarra/cuevas` - Hero + breadcrumb + lista de cuevas con stats
  - [x] `/navarra/rios` - Hero + breadcrumb + lista de barrancos
  - [x] `/navarra/montañas` - Hero + breadcrumb + lista de montañas
  - [x] `/navarra/paredes` - Hero + breadcrumb + lista de escuelas de escalada

- [x] **Templates de páginas individuales** (sin mapa aún)
  - [x] `/navarra/cuevas/[slug].astro` - Detalle con sidebar (stats, coordenadas, acceso, restricciones)
  - [x] `/navarra/rios/[slug].astro` - Detalle con sidebar (stats, restricciones)
  - [x] `/navarra/montañas/[slug].astro` - Detalle con sidebar (stats, coordenadas, restricciones)
  - [x] `/navarra/paredes/[slug].astro` - Detalle con sidebar (coordenadas, acceso, orientaciones)

- [x] **Mejoras adicionales**
  - [x] Breadcrumb mejorado con decodificación de caracteres especiales (ñ, á, etc.)
  - [x] Tests añadidos para breadcrumb (30/30 pasando)
  - [x] Layout responsive 2 columnas (contenido + sidebar)
  - [x] Estilos markdown globales para contenido
  - [x] Integración de componentes React con `client:load`

#### Entregables Fase 2

- ✅ Landing `/navarra` funcional y atractiva con estadísticas dinámicas
- ✅ 4 páginas de categoría con hero, breadcrumb y listas funcionales
- ✅ 4 templates de páginas individuales con layout completo y sidebar
- ✅ Biblioteca de 5 componentes compartidos React/Preact
- ✅ Sistema de navegación (breadcrumbs) funcionando con caracteres especiales
- ✅ Funciones de utilidad para conteo de colecciones
- ✅ Diseño responsive y consistente en todas las páginas
- ✅ Integración completa con Content Collections de Astro

**Fecha de completación**: 2 de diciembre de 2024

---

### Fase 2b: Colecciones Avanzadas (Semana 4.5-5)

**Objetivo**: Expandir las colecciones básicas de `mountains` y `climbing` a sus versiones completas con rutas, sectores y vías.

#### Tareas Fase 2b

- [ ] **Colección Mountains - Rutas**
  - [ ] Implementar tipo `HikingRoute` (rutas senderistas)
    - [ ] Campos: startPoint, endPoint, duration, length, elevationGain/Loss
    - [ ] Dificultad (Fácil, Moderada, Difícil, Muy Difícil)
    - [ ] Ruta circular vs lineal
    - [ ] Época recomendada y avisos
  - [ ] Implementar tipo `TechnicalRoute` (rutas técnicas de alpinismo)
    - [ ] Campos técnicos: requiredGear, difficulty (ClimbingGrade)
    - [ ] Array de `ClimbingPitch` (largos de escalada)
    - [ ] Descripción técnica detallada
  - [ ] Añadir campos `hikingRoutes` y `technicalRoutes` al schema de `mountains`
  - [ ] Crear componentes de visualización de rutas

- [ ] **Colección Climbing - Sistema completo**
  - [ ] Implementar tipo `ClimbingSector` (sectores dentro de escuelas)
    - [ ] Campos: name, description, orientation, height
    - [ ] Array de `ClimbingRoute` (vías)
    - [ ] Foto del sector y topo/croquis
  - [ ] Implementar tipo `ClimbingRoute` (vías individuales)
    - [ ] Campos: name, description, heightMeters, difficulty
    - [ ] Array de `ClimbingPitch` (largos)
    - [ ] Style (Deportiva, Clásica, Mixta, Artificial, Boulder)
    - [ ] Protection (Equipada, Parcialmente, Desequipada)
    - [ ] Primera ascensión y material necesario
  - [ ] Implementar tipo `ClimbingPitch` (largos de escalada)
    - [ ] Campos: number, length, description, difficulty
    - [ ] Array de `ClimbingAnchor` (anclajes intermedios)
    - [ ] `Belay` (reunión al final del largo)
    - [ ] Inclinación (para alpinismo)
  - [ ] Implementar tipo `ClimbingGrade` (graduación)
    - [ ] number (1-9), letter (a/b/c), modifier (+/-)
    - [ ] Helper para formatear (ej: "6b+", "7a")
  - [ ] Implementar tipos de anclajes y reuniones
    - [ ] `ClimbingAnchor` con tipos (Pb, Qm, Sp, Na)
    - [ ] `Belay` con tipos (Equipada, Semi-equipada, Natural)
  - [ ] Añadir campo `sectors` al schema de `climbing`
  - [ ] Crear componentes de visualización de sectores y vías

- [ ] **Componentes de visualización**
  - [ ] `<RouteCard />` - Tarjeta de ruta (senderista o técnica)
  - [ ] `<SectorViewer />` - Visualizador de sectores de escalada
  - [ ] `<RouteList />` - Lista de vías con filtros por dificultad
  - [ ] `<GradeDisplay />` - Componente para mostrar graduaciones
  - [ ] `<PitchTable />` - Tabla de largos con detalles técnicos

- [ ] **Actualizar páginas individuales**
  - [ ] Integrar rutas en páginas de montañas
  - [ ] Integrar sectores y vías en páginas de escalada
  - [ ] Añadir secciones de información técnica

#### Entregables Fase 2b

- ✅ Schema completo de `mountains` con rutas senderistas y técnicas
- ✅ Schema completo de `climbing` con sectores, vías, largos y graduaciones
- ✅ Componentes de visualización para rutas y vías
- ✅ Páginas individuales actualizadas con información técnica completa

---

### Fase 3: Mapas Interactivos (Semana 5-6)

**Objetivo**: Integrar Leaflet.js en todas las páginas de las 4 categorías.

#### Tareas Fase 3

- [ ] **Configurar Leaflet.js**
  - [ ] Instalar dependencias (`leaflet`, `@types/leaflet`)
  - [ ] Crear componente base `<LeafletMap />`
  - [ ] Configurar tiles (OpenStreetMap, topográfico)

- [ ] **Componentes de mapa especializados**
  - [ ] `<CategoryMap />` - Mapa con múltiples waypoints para páginas de categoría
  - [ ] `<LocationMap />` - Mapa centrado en una ubicación para páginas individuales
  - [ ] `<ClusterMarkers />` - Agrupación de marcadores cercanos
  - [ ] `<MapTooltip />` - Tooltips personalizados en hover
  - [ ] `<MapPopup />` - Popups con información detallada

- [ ] **Integrar mapas en páginas de categoría**
  - [ ] Mapa en `/navarra/cuevas` con waypoints de todas las cuevas
  - [ ] Mapa en `/navarra/rios` con waypoints de todos los ríos
  - [ ] Mapa en `/navarra/montañas` con waypoints de todas las montañas
  - [ ] Mapa en `/navarra/paredes` con waypoints de todas las paredes

- [ ] **Integrar mapas en páginas individuales**
  - [ ] Mapa centrado en ubicación exacta (4 categorías)
  - [ ] Marcador con información
  - [ ] Indicación de parking/acceso (si disponible)

#### Entregables Fase 3

- ✅ Sistema de mapas Leaflet funcionando
- ✅ Mapas interactivos en las 4 páginas de categoría
- ✅ Mapas de ubicación en las 4 páginas individuales
- ✅ Tooltips y popups funcionando correctamente

---

### Fase 4: Búsqueda, Filtros y Tablas (Semana 7-8)

**Objetivo**: Añadir funcionalidades de búsqueda y filtrado a las 4 categorías.

#### Tareas Fase 4

- [ ] **Componentes de búsqueda y filtrado**
  - [ ] `<SearchBar />` - Búsqueda en tiempo real
  - [ ] `<FilterPanel />` - Panel de filtros adaptable
  - [ ] `<SortControls />` - Controles de ordenación
  - [ ] `<ResultsTable />` - Tabla responsive con datos
  - [ ] `<ResultsGrid />` - Vista en grid (alternativa a tabla)
  - [ ] `<Pagination />` - Paginación de resultados

- [ ] **Filtros específicos por categoría**
  - [ ] **Cuevas**: Por zona, profundidad, longitud, dificultad
  - [ ] **Ríos**: Por zona, graduación (v/a/compromiso), época
  - [ ] **Montañas**: Por zona, altitud, dificultad, tipo de ruta
  - [ ] **Paredes**: Por zona, orientación, estilo, dificultad

- [ ] **Integrar en páginas de categoría**
  - [ ] Barra de búsqueda visible (4 categorías)
  - [ ] Panel de filtros colapsable (4 categorías)
  - [ ] Tabla/grid con resultados (4 categorías)
  - [ ] Paginación funcional (4 categorías)
  - [ ] Sincronización con mapa (filtros afectan waypoints)

#### Entregables Fase 4

- ✅ Sistema de búsqueda funcionando en las 4 categorías
- ✅ Filtros específicos por categoría operativos
- ✅ Tablas/grids responsive con datos
- ✅ Paginación implementada
- ✅ Sincronización filtros ↔ mapa

---

### Fase 5: Fichas de Instalación (Semana 9-10)

**Objetivo**: Desarrollar visualización de fichas técnicas de instalación para cuevas y barrancos.

> [!IMPORTANT]
> **Alcance de las Fichas Técnicas:**
>
> Las fichas técnicas de instalación tienen tipos de datos bien definidos para todas las categorías (cuevas, barrancos, montañas, paredes). Esta sección de **Navarra** es responsable únicamente de **visualizar** estas fichas en formato de tabla/interfaz de lectura.
>
> La funcionalidad para que los usuarios **creen y generen** sus propias fichas técnicas se implementará en otras secciones de la web (ver sección **Exploración** o herramientas de generación). Este documento no cubre dicha funcionalidad de creación.

#### Tareas Fase 5

- [ ] **Componentes de visualización de fichas**
  - [ ] `<InstallationSheet />` - Contenedor principal de ficha
  - [ ] `<RopeList />` - Lista de cuerdas con detalles
  - [ ] `<ObstacleCard />` - Card de obstáculo (P26, R15, etc.)
  - [ ] `<InstallationPoint />` - Punto de instalación (cabecera, fracc, etc.)
  - [ ] `<AnchorDisplay />` - Visualización de anclajes (Spx, Pb, etc.)
  - [ ] `<InstallationDiagram />` - Diagrama visual (opcional, SVG)

- [ ] **Componentes específicos por tipo**
  - [ ] Fichas para **cuevas** (cuerdas, pozos, instalaciones)
  - [ ] Fichas para **barrancos** (obstáculos, rápeles, saltos)

- [ ] **Funcionalidades adicionales**
  - [ ] Export a PDF de fichas
  - [ ] Vista imprimible optimizada
  - [ ] Descarga de datos en formato estructurado

- [ ] **Integrar en páginas individuales**
  - [ ] Sección "Recorridos" con accordion/tabs
  - [ ] Fichas de instalación expandibles
  - [ ] Visualización clara de material necesario

#### Entregables Fase 5

- ✅ Sistema de visualización de fichas funcionando
- ✅ Fichas de instalación para cuevas y barrancos
- ✅ Export a PDF implementado
- ✅ Integración en páginas individuales

---

### Fase 6: Multimedia y Contenido Enriquecido (Semana 11-12)

**Objetivo**: Añadir galerías, topografías y contenido multimedia a las 4 categorías.

#### Tareas Fase 6

- [ ] **Componentes multimedia**
  - [ ] `<PhotoGallery />` - Galería de fotos con lightbox avanzado
  - [ ] `<TopographyViewer />` - Visor de topografías (PDF, SVG, imágenes)
  - [ ] `<VideoEmbed />` - Embeds de YouTube/Vimeo
  - [ ] `<DownloadButton />` - Botón de descarga de recursos

- [ ] **Sistema de assets**
  - [ ] Estructura de carpetas para imágenes por categoría
  - [ ] Optimización automática de imágenes (Astro Image)
  - [ ] Lazy loading de imágenes y videos
  - [ ] Placeholder mientras carga

- [ ] **Integrar en páginas individuales**
  - [ ] Galería de fotos adicionales (4 categorías)
  - [ ] Visor de topografías (si disponibles)
  - [ ] Videos embebidos (si disponibles)
  - [ ] Sección de descargas (GPX, PDF, topografías)

- [ ] **Añadir más datos de ejemplo**
  - [ ] 3-5 entradas por categoría con fotos
  - [ ] Al menos 2 entradas con topografías
  - [ ] Al menos 1 entrada con video

#### Entregables Fase 6

- ✅ Galerías multimedia funcionando
- ✅ Visor de topografías operativo
- ✅ Sistema de descargas implementado
- ✅ 12-20 entradas de ejemplo con multimedia

---

### Fase 7: Funcionalidades Avanzadas (Semana 13-14)

**Objetivo**: Implementar sistema de actividades cercanas y mejoras UX para las 4 categorías.

#### Tareas Fase 7

- [ ] **Sistema "Actividades Cercanas"**
  - [ ] Función de cálculo de distancia (Haversine)
  - [ ] Algoritmo de búsqueda de actividades próximas
  - [ ] Pre-cálculo en build time
  - [ ] Componente `<NearbyActivities />`

- [ ] **Mejoras de UX**
  - [ ] Animaciones y transiciones suaves
  - [ ] Loading states en componentes interactivos
  - [ ] Error boundaries y manejo de errores
  - [ ] Skeleton loaders

- [ ] **Export y compartir**
  - [ ] Export de coordenadas a GPX
  - [ ] Botones de compartir en redes sociales
  - [ ] Copiar enlace directo
  - [ ] QR code de ubicación (opcional)

- [ ] **Sección de información adicional**
  - [ ] Enlaces externos (Subterra.app, etc.)
  - [ ] Información de colaboradores
  - [ ] Fecha de última actualización
  - [ ] Botón "Reportar error"

#### Entregables Fase 7

- ✅ Sistema de actividades cercanas funcionando
- ✅ Export a GPX implementado
- ✅ Animaciones y transiciones pulidas
- ✅ Funcionalidades de compartir operativas

---

### Fase 8: Sistema de Comentarios (Semana 15-16)

**Objetivo**: Implementar comentarios con PostgreSQL y Clerk para las 4 categorías.

#### Tareas Fase 8

- [ ] **Configurar base de datos**
  - [ ] Setup PostgreSQL (Vercel Postgres o similar)
  - [ ] Crear tablas (`location_comments`, `comment_reactions`, `user_profiles_cache`)
  - [ ] Configurar ORM (Prisma o Drizzle)
  - [ ] Crear migraciones

- [ ] **API Endpoints**
  - [ ] `GET /api/comments` - Obtener comentarios
  - [ ] `POST /api/comments` - Crear comentario
  - [ ] `PATCH /api/comments/[id]` - Editar comentario
  - [ ] `DELETE /api/comments/[id]` - Eliminar comentario
  - [ ] Middleware de autenticación con Clerk

- [ ] **Componentes de comentarios**
  - [ ] `<CommentsSection />` - Contenedor principal
  - [ ] `<CommentForm />` - Formulario de nuevo comentario
  - [ ] `<CommentThread />` - Hilo de comentarios anidados
  - [ ] `<Comment />` - Comentario individual
  - [ ] `<CommentActions />` - Acciones (editar, eliminar, responder)

- [ ] **Funcionalidades**
  - [ ] Comentarios anidados (3 niveles máximo)
  - [ ] Edición y eliminación (solo autor)
  - [ ] Markdown básico en comentarios
  - [ ] Sanitización XSS
  - [ ] Rate limiting (5 comentarios/hora)
  - [ ] Ordenación (recientes, antiguos)

- [ ] **Integrar en páginas individuales**
  - [ ] Sección de comentarios al final de cada página (4 categorías)
  - [ ] Lazy loading de comentarios
  - [ ] Optimistic updates

#### Entregables Fase 8

- ✅ Base de datos PostgreSQL configurada
- ✅ API de comentarios funcionando
- ✅ Sistema de comentarios anidados operativo
- ✅ Integración con Clerk completa
- ✅ Moderación básica implementada

---

### Fase 9: Optimización y Pulido (Semana 17-18)

**Objetivo**: Optimizar performance, SEO y accesibilidad en las 4 categorías.

#### Tareas Fase 9

- [ ] **Performance**
  - [ ] Optimización de imágenes (WebP, AVIF)
  - [ ] Code splitting agresivo
  - [ ] Lazy loading de componentes pesados
  - [ ] Preload de recursos críticos
  - [ ] Análisis con Lighthouse (objetivo: >90)

- [ ] **SEO**
  - [ ] Meta tags específicos por página
  - [ ] Open Graph tags completos
  - [ ] Structured data (JSON-LD) para localizaciones
  - [ ] Sitemap automático
  - [ ] Robots.txt optimizado

- [ ] **Accesibilidad**
  - [ ] Auditoría WCAG 2.1 AA
  - [ ] ARIA labels en componentes interactivos
  - [ ] Navegación por teclado completa
  - [ ] Contraste de colores adecuado
  - [ ] Alt text en todas las imágenes

- [ ] **Testing**
  - [ ] Tests unitarios de componentes críticos
  - [ ] Tests de integración de formularios
  - [ ] Tests E2E de flujos principales
  - [ ] Testing en múltiples dispositivos

- [ ] **Documentación**
  - [ ] Documentar estructura de Content Collections
  - [ ] Guía para añadir nuevas entradas
  - [ ] Documentación de componentes
  - [ ] README actualizado

#### Entregables Fase 9

- ✅ Lighthouse score >90 en todas las métricas
- ✅ SEO completo y optimizado
- ✅ Accesibilidad AAA en páginas principales
- ✅ Suite de tests funcionando
- ✅ Documentación completa

---

## 📊 Resumen de Fases

| Fase  | Duración  | Enfoque Principal         | Categorías    | Estado        |
| ----- | --------- | ------------------------- | ------------- | ------------- |
| **1** | 2 semanas | Tipos y datos base        | 4 en paralelo | ✅ Completada |
| **2** | 2 semanas | UI y componentes          | 4 en paralelo | ✅ Completada |
| **3** | 2 semanas | Mapas interactivos        | 4 en paralelo | ⏳ Pendiente  |
| **4** | 2 semanas | Búsqueda y filtros        | 4 en paralelo | ⏳ Pendiente  |
| **5** | 2 semanas | Fichas de instalación     | 4 en paralelo | ⏳ Pendiente  |
| **6** | 2 semanas | Multimedia                | 4 en paralelo | ⏳ Pendiente  |
| **7** | 2 semanas | Funcionalidades avanzadas | 4 en paralelo | ⏳ Pendiente  |
| **8** | 2 semanas | Comentarios (PostgreSQL)  | 4 en paralelo | ⏳ Pendiente  |
| **9** | 2 semanas | Optimización y pulido     | 4 en paralelo | ⏳ Pendiente  |

### Ventajas de esta Planificación

1. ✅ **Desarrollo paralelo real**: Cada fase añade funcionalidad a las 4 categorías simultáneamente
2. ✅ **Iteración incremental**: Cada fase construye sobre la anterior
3. ✅ **Feedback temprano**: Las 4 categorías son visibles y probables desde la Fase 2
4. ✅ **Flexibilidad**: Se pueden ajustar prioridades dentro de cada fase sin afectar la estructura
5. ✅ **Datos de ejemplo**: Se generan ejemplos que se pueden ir reemplazando progresivamente
6. ✅ **Comentarios al final**: PostgreSQL solo cuando todo lo demás está sólido y probado

---

## 🎯 Objetivos de Negocio

### Objetivos Principales

1. **Centralizar información**: Crear la referencia más completa de actividades outdoor en Navarra
2. **Facilitar el acceso**: Hacer la información accesible y comprensible para todos los niveles
3. **Promover la seguridad**: Proporcionar información técnica precisa sobre instalaciones
4. **Preservar el conocimiento**: Documentar instalaciones y recorridos para futuras generaciones
5. **Fomentar la comunidad**: Crear un espacio donde compartir experiencias y conocimiento

### Métricas de Éxito

- **Cobertura**: Número de localizaciones documentadas
- **Calidad**: Porcentaje de fichas con información completa
- **Uso**: Visitas mensuales a la sección
- **Engagement**: Fichas generadas con la herramienta
- **Contribución**: Usuarios que aportan información

---

## 🔗 Integraciones

### Externas

- **Subterra.app**: Base de datos espeleológica (enlaces a fichas)
- **Servicios meteorológicos**: Datos de precipitación y caudal
- **OpenStreetMap**: Cartografía base para tiles de mapas
- **Leaflet.js**: Biblioteca de mapas interactivos (usada en todas las visualizaciones)

### Internas

- **Content Collections**: Sistema de gestión de contenido de Astro
- **Sistema de usuarios (Clerk)**: Autenticación para funciones avanzadas
- **Blog**: Enlazar actividades con posts relacionados
- **Cursos**: Vincular localizaciones con cursos formativos

---

## 📝 Notas Técnicas

### Consideraciones de Implementación

1. **TypeScript estricto**: Todos los tipos deben ser fuertemente tipados
2. **Validación con Zod**: Todas las colecciones deben validarse con schemas
3. **Normalización**: Evitar duplicación de datos (ej: tipos de anclajes)
4. **Relaciones**: Gestionar correctamente relaciones muchos-a-muchos (cuerdas ↔ obstáculos)
5. **Assets**: Optimizar imágenes y PDFs para web
6. **SEO**: Cada localización debe tener metadata apropiada
7. **Accesibilidad**: Información técnica debe ser legible y comprensible

### Consideraciones de Contenido

1. **Precisión**: La información técnica debe ser exacta y actualizada
2. **Responsabilidad**: Incluir avisos sobre riesgos y necesidad de formación
3. **Actualización**: Establecer proceso para mantener información vigente
4. **Fuentes**: Citar fuentes de información cuando proceda
5. **Permisos**: Respetar derechos de autor en topografías y fotografías

---

## 📝 Historial de Cambios

### 2024-12-02: Actualización Colección Canyons

**Cambios implementados en `src/content/config.ts`:**

- ✅ Agregado campo `location` (localidad/municipio)
- ✅ Agregado campo `river` (río al que pertenece)
- ✅ Agregado campo `highestRappel` (rápel máximo en metros)
- ✅ Agregado campo `numberOfRappels` (número de rápeles)
- ✅ Agregado campo `verticalDrop` (desnivel en metros)
- ✅ Reestructurados tiempos con objetos `Duration`:
  - `approachTime` (tiempo de aproximación)
  - `descentTime` (tiempo de descenso)
  - `returnTime` (tiempo de retorno)
- ✅ Agregado schema `canyoningGradingSchema` con:
  - `vertical` (1-7)
  - `aquatic` (1-7)
  - `commitment` (I-VI)
- ✅ Agregado campo `recommendedMonths` (array de meses 1-12)
- ✅ Agregado campo `entryPoint` (coordenadas UTM de entrada)
- ✅ Agregado campo `exitPoint` (coordenadas UTM de salida)
- ✅ Agregado campo `mainPhoto` (foto de portada)
- ✅ Agregado campo `additionalPhotos` (array de fotos)

**Archivos actualizados:**

- `src/content/config.ts`: Schema completo de la colección
- `src/content/canyons/artazul/index.md`: Ejemplo actualizado con todos los campos

**Estado:** La colección `canyons` está completamente implementada con frontmatter. Las fichas de instalación (obstáculos, instalaciones, anclajes) quedan pendientes para una fase posterior.
