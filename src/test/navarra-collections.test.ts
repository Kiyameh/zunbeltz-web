/**
 * Test de verificación de Content Collections de Navarra
 * Verifica que las 4 colecciones se cargan correctamente
 */

import { describe, it, expect } from "vitest";
import { getCollection } from "astro:content";

describe("Navarra Content Collections", () => {
  it("should load caves collection", async () => {
    const caves = await getCollection("caves");
    expect(caves).toBeDefined();
    expect(caves.length).toBeGreaterThan(0);

    // Verificar que la entrada de ejemplo existe
    const simaSanMartin = caves.find((cave) => cave.id === "sima-san-martin");
    expect(simaSanMartin).toBeDefined();
    expect(simaSanMartin?.data.name).toBe("Sima de San Martín");
    expect(simaSanMartin?.data.depth).toBe(320);
  });

  it("should load canyons collection", async () => {
    const canyons = await getCollection("canyons");
    expect(canyons).toBeDefined();
    expect(canyons.length).toBeGreaterThan(0);

    // Verificar que la entrada de ejemplo existe
    const artazul = canyons.find((canyon) => canyon.id === "artazul");
    expect(artazul).toBeDefined();
    expect(artazul?.data.name).toBe("Barranco de Artazul");
  });

  it("should load mountains collection", async () => {
    const mountains = await getCollection("mountains");
    expect(mountains).toBeDefined();
    expect(mountains.length).toBeGreaterThan(0);

    // Verificar que la entrada de ejemplo existe
    const anie = mountains.find((mountain) => mountain.id === "anie");
    expect(anie).toBeDefined();
    expect(anie?.data.name).toBe("Pico Anie (Auñamendi)");
    expect(anie?.data.altitude).toBe(2504);
  });

  it("should load climbing collection", async () => {
    const climbing = await getCollection("climbing");
    expect(climbing).toBeDefined();
    expect(climbing.length).toBeGreaterThan(0);

    // Verificar que la entrada de ejemplo existe
    const etxauri = climbing.find((school) => school.id === "etxauri");
    expect(etxauri).toBeDefined();
    expect(etxauri?.data.name).toBe("Escuela de Escalada de Etxauri");
  });

  it("should validate UTM coordinates schema", async () => {
    const caves = await getCollection("caves");
    const simaSanMartin = caves.find((cave) => cave.id === "sima-san-martin");

    expect(simaSanMartin?.data.coordinates).toBeDefined();
    expect(simaSanMartin?.data.coordinates.zone).toBe(30);
    expect(simaSanMartin?.data.coordinates.hemisphere).toBe("N");
    expect(simaSanMartin?.data.coordinates.latitude).toBeDefined();
    expect(simaSanMartin?.data.coordinates.longitude).toBeDefined();
  });
});
