import { expect, test, describe } from "vitest";
import PostHeader from "./PostHeader.astro";
import { renderAstroComponent } from "@/test/astro-container";

const mockPost = {
  id: "test-post",
  slug: "test-post",
  collection: "posts" as const,
  data: {
    title: "Test Post Header Title",
    description: "This is a test post header description with more details",
    publishDate: new Date("2024-03-20"),
    categories: ["Espeleología", "Aventura", "Naturaleza"],
    heroImage: {} as any,
    author: {} as any,
  },
};

describe("PostHeader", () => {
  describe("Rendering", () => {
    test("Should render post title", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain("Test Post Header Title");
    });

    test("Should render post description", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain("This is a test post header description with more details");
    });

    test("Should render formatted date", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain("20 de marzo de 2024");
    });

    test("Should render all categories", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain("Espeleología");
      expect(html).toContain("Aventura");
      expect(html).toContain("Naturaleza");
    });

    test("Should render header element", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain('class="post-header"');
    });

    test("Should render meta section", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain('class="post-meta"');
    });

    test("Should render categories container", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain('class="post-categories"');
    });
  });

  describe("Accessibility", () => {
    test("Should use semantic header element", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain("<header");
    });

    test("Should use h1 for main title", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain("<h1");
      expect(html).toMatch(/<h1[^>]*>Test Post Header Title<\/h1>/);
    });

    test("Should have time element with datetime attribute", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain("<time");
      expect(html).toContain('datetime="2024-03-20');
    });

    test("Should use paragraph for description", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain("<p");
    });

    test("Should have descriptive class names", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toContain('class="post-header-title');
      expect(html).toContain('class="post-header-description');
      expect(html).toContain('class="post-meta-time"');
    });

    test("Title should have title-1 class for styling", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toMatch(/class="post-header-title title-1"/);
    });

    test("Description should have paragraph class for styling", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toMatch(/class="post-header-description paragraph"/);
    });
  });

  describe("Structure", () => {
    test("Should have correct header structure", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toMatch(/<header[^>]*class="post-header"[^>]*>.*<\/header>/s);
    });

    test("Title should be first element", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      const titleIndex = html.indexOf("<h1");
      const descriptionIndex = html.indexOf("<p");
      const metaIndex = html.indexOf('class="post-meta"');
      expect(titleIndex).toBeLessThan(descriptionIndex);
      expect(titleIndex).toBeLessThan(metaIndex);
    });

    test("Description should be before meta", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      const descriptionIndex = html.indexOf('class="post-header-description');
      const metaIndex = html.indexOf('class="post-meta"');
      expect(descriptionIndex).toBeLessThan(metaIndex);
    });

    test("Meta should contain time and categories", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toMatch(/<div[^>]*class="post-meta"[^>]*>.*<time.*<\/time>.*<div[^>]*class="post-categories".*<\/div>.*<\/div>/s);
    });

    test("Categories should be in chip elements", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      expect(html).toMatch(/<span[^>]*class="chip secondary"[^>]*>Espeleología<\/span>/);
      expect(html).toMatch(/<span[^>]*class="chip secondary"[^>]*>Aventura<\/span>/);
      expect(html).toMatch(/<span[^>]*class="chip secondary"[^>]*>Naturaleza<\/span>/);
    });

    test("Should render correct number of categories", async () => {
      const html = await renderAstroComponent(PostHeader, { props: { post: mockPost }});
      const chips = html.match(/class="chip secondary"/g);
      expect(chips?.length).toBe(3);
    });
  });
});
