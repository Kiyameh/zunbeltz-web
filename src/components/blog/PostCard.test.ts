import { expect, test, describe, vi } from "vitest";
import PostCard from "./PostCard.astro";
import { renderAstroComponent } from "@/test/astro-container";

// Mock de getEntry
vi.mock("astro:content", async () => {
  const actual = await vi.importActual("astro:content");
  return {
    ...actual,
    getEntry: vi.fn(() =>
      Promise.resolve({
        id: "andoni-abarzuza",
        collection: "authors",
        data: {
          name: "Andoni Abarzuza",
          bio: "Espeleólogo y montañero",
          avatar: {
            src: "/_astro/test-avatar.jpg",
            width: 32,
            height: 32,
            format: "jpg",
          },
        },
      }),
    ),
  };
});

const mockPost = {
  id: "test-post",
  slug: "test-post",
  collection: "posts" as const,
  data: {
    title: "Test Post Title",
    description: "This is a test post description",
    publishDate: new Date("2024-01-15"),
    heroImage: {
      src: "/_astro/test-hero.jpg",
      width: 800,
      height: 250,
      format: "jpg",
    } as any,
    categories: ["Montañismo", "Fotografía"],
    author: {
      id: "andoni-abarzuza",
      collection: "authors" as const,
    },
  },
};

describe("PostCard", () => {
  describe("Rendering", () => {
    test("Should render post title", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain("Test Post Title");
    });

    test("Should render post description", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain("This is a test post description");
    });

    test("Should render formatted date", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain("15 de enero de 2024");
    });

    test("Should render categories", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain("Montañismo");
      expect(html).toContain("Fotografía");
    });

    test("Should render author name", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain("Andoni Abarzuza");
    });

    test("Should render hero image", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain('class="post-card-hero-image"');
    });

    test("Should render author avatar", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain('class="post-card-author-avatar"');
    });

    test("Should render all main sections", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain('class="post-card-image"');
      expect(html).toContain('class="post-card-content"');
      expect(html).toContain('class="post-card-meta"');
      expect(html).toContain('class="post-card-author"');
    });
  });

  describe("Functionality - Links", () => {
    test("Should have link to post", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain('href="/blog/test-post"');
    });

    test("Should wrap entire card in link", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toMatch(
        /<article[^>]*>.*<a[^>]*href="\/blog\/test-post".*<\/a>.*<\/article>/s,
      );
    });
  });

  describe("Accessibility", () => {
    test("Should use semantic article element", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain("<article");
    });

    test("Should use h2 for title", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain("<h2");
      expect(html).toMatch(/<h2[^>]*>Test Post Title<\/h2>/);
    });

    test("Should have time element with datetime", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain("<time");
      expect(html).toContain('datetime="2024-01-15');
    });

    test("Hero image should have alt text", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain('alt="Test Post Title"');
    });

    test("Author avatar should have alt text", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain('alt="Andoni Abarzuza"');
    });

    test("Should have descriptive class names", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toContain('class="post-card"');
      expect(html).toContain('class="post-card-title"');
      expect(html).toContain('class="post-card-description"');
      expect(html).toContain('class="post-card-author-name"');
    });
  });

  describe("Structure", () => {
    test("Should have correct card structure", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toMatch(
        /<article[^>]*class="post-card"[^>]*>.*<\/article>/s,
      );
    });

    test("Image should be before content", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      const imageIndex = html.indexOf('class="post-card-image"');
      const contentIndex = html.indexOf('class="post-card-content"');
      expect(imageIndex).toBeLessThan(contentIndex);
    });

    test("Meta should be before title", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      const metaIndex = html.indexOf('class="post-card-meta"');
      const titleIndex = html.indexOf('class="post-card-title"');
      expect(metaIndex).toBeLessThan(titleIndex);
    });

    test("Author section should be last", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      const authorIndex = html.indexOf('class="post-card-author"');
      const descriptionIndex = html.indexOf('class="post-card-description"');
      expect(authorIndex).toBeGreaterThan(descriptionIndex);
    });

    test("Categories should be in chip elements", async () => {
      const html = await renderAstroComponent(PostCard, {
        props: { post: mockPost },
      });
      expect(html).toMatch(
        /<span[^>]*class="chip secondary"[^>]*>Montañismo<\/span>/,
      );
      expect(html).toMatch(
        /<span[^>]*class="chip secondary"[^>]*>Fotografía<\/span>/,
      );
    });
  });
});
