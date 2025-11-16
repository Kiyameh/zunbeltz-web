import { expect, test, describe } from "vitest";

// Extraer la lógica del componente Breadcrumb para probarla de forma aislada
const generateBreadcrumbs = (pathname: string) => {
  // Dividir la ruta en segmentos
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Generar breadcrumbs
  const breadcrumbs = segments.map((segment, index) => {
    // Construir la ruta acumulada hasta este segmento
    const path = "/" + segments.slice(0, index + 1).join("/");

    // Formatear el nombre del segmento (capitalizar y reemplazar guiones)
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      label,
      path,
      isLast: index === segments.length - 1,
    };
  });

  // Agregar "Inicio" al principio
  const allBreadcrumbs = [
    { label: "Inicio", path: "/", isLast: false },
    ...breadcrumbs,
  ];

  return allBreadcrumbs;
};

describe("Breadcrumb Logic", () => {
  test("should always include 'Inicio' as first item", () => {
    const breadcrumbs = generateBreadcrumbs("/blog/test-post");

    expect(breadcrumbs[0]).toEqual({
      label: "Inicio",
      path: "/",
      isLast: false,
    });
  });

  test("should parse URL segments correctly", () => {
    const breadcrumbs = generateBreadcrumbs("/blog/test-post");

    expect(breadcrumbs).toHaveLength(3);
    expect(breadcrumbs[1].label).toBe("Blog");
    expect(breadcrumbs[2].label).toBe("Test Post");
  });

  test("should format segment labels (capitalize, replace hyphens)", () => {
    const breadcrumbs = generateBreadcrumbs("/my-awesome-post");

    // "my-awesome-post" debe convertirse en "My Awesome Post"
    expect(breadcrumbs[1].label).toBe("My Awesome Post");
  });

  test("should generate correct links for each segment", () => {
    const breadcrumbs = generateBreadcrumbs("/blog/category/test");

    expect(breadcrumbs[0].path).toBe("/");
    expect(breadcrumbs[1].path).toBe("/blog");
    expect(breadcrumbs[2].path).toBe("/blog/category");
    expect(breadcrumbs[3].path).toBe("/blog/category/test");
  });

  test("should mark last item as current page", () => {
    const breadcrumbs = generateBreadcrumbs("/blog/test-post");

    expect(breadcrumbs[breadcrumbs.length - 1].isLast).toBe(true);
    // Todos los demás no deben ser el último
    for (let i = 0; i < breadcrumbs.length - 1; i++) {
      expect(breadcrumbs[i].isLast).toBe(false);
    }
  });

  test("should handle single-level paths", () => {
    const breadcrumbs = generateBreadcrumbs("/blog");

    expect(breadcrumbs).toHaveLength(2);
    expect(breadcrumbs[0].label).toBe("Inicio");
    expect(breadcrumbs[1].label).toBe("Blog");
  });

  test("should handle multi-level paths", () => {
    const breadcrumbs = generateBreadcrumbs("/blog/category/test-post");

    expect(breadcrumbs).toHaveLength(4);
    expect(breadcrumbs[0].label).toBe("Inicio");
    expect(breadcrumbs[1].label).toBe("Blog");
    expect(breadcrumbs[2].label).toBe("Category");
    expect(breadcrumbs[3].label).toBe("Test Post");
  });

  test("should handle root path", () => {
    const breadcrumbs = generateBreadcrumbs("/");

    expect(breadcrumbs).toHaveLength(1);
    expect(breadcrumbs[0].label).toBe("Inicio");
    expect(breadcrumbs[0].path).toBe("/");
  });

  test("should handle paths with multiple hyphens", () => {
    const breadcrumbs = generateBreadcrumbs("/my-super-awesome-post");

    expect(breadcrumbs[1].label).toBe("My Super Awesome Post");
  });

  test("should build cumulative paths correctly", () => {
    const breadcrumbs = generateBreadcrumbs("/a/b/c/d");

    expect(breadcrumbs[1].path).toBe("/a");
    expect(breadcrumbs[2].path).toBe("/a/b");
    expect(breadcrumbs[3].path).toBe("/a/b/c");
    expect(breadcrumbs[4].path).toBe("/a/b/c/d");
  });
});
