import { expect, test, describe, vi } from "vitest";
import RecentPosts from "./RecentPosts.astro";
import { renderAstroComponent } from "@/test/astro-container";

// Mock de getCollection
vi.mock("astro:content", () => ({
  getCollection: vi.fn(() => Promise.resolve([
    {
      id: "post-1",
      slug: "post-1",
      collection: "posts",
      data: {
        title: "Post más reciente",
        publishDate: new Date("2024-03-15"),
        description: "Descripción del post 1",
        heroImage: {} as any,
        categories: ["Test"],
        author: {} as any,
      },
    },
    {
      id: "post-2",
      slug: "post-2",
      collection: "posts",
      data: {
        title: "Segundo post reciente",
        publishDate: new Date("2024-03-10"),
        description: "Descripción del post 2",
        heroImage: {} as any,
        categories: ["Test"],
        author: {} as any,
      },
    },
    {
      id: "post-3",
      slug: "post-3",
      collection: "posts",
      data: {
        title: "Tercer post reciente",
        publishDate: new Date("2024-03-05"),
        description: "Descripción del post 3",
        heroImage: {} as any,
        categories: ["Test"],
        author: {} as any,
      },
    },
  ])),
}));

describe("RecentPosts", () => {
  describe("Rendering", () => {
    test("Should render widget title", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain("Artículos recientes");
    });

    test("Should render all posts", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain("Post más reciente");
      expect(html).toContain("Segundo post reciente");
      expect(html).toContain("Tercer post reciente");
    });

    test("Should render post dates", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain('class="recent-post-date"');
    });

    test("Should render posts list", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain('class="recent-posts-list"');
    });

    test("Should render post items", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      const postItems = html.match(/class="recent-post-item"/g);
      expect(postItems).toBeTruthy();
      expect(postItems!.length).toBe(3);
    });

    test("Should render widget container", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain('class="recent-posts-widget"');
    });
  });

  describe("Functionality - Links", () => {
    test("Title link should point to home", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain('href="/"');
    });

    test("Post links should have correct hrefs", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain('href="/blog/post-1"');
      expect(html).toContain('href="/blog/post-2"');
      expect(html).toContain('href="/blog/post-3"');
    });

    test("Post links should have primary anchor class", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toMatch(/class="anchor primary"[^>]*href="\/blog\/post-1"/);
      expect(html).toMatch(/class="anchor primary"[^>]*href="\/blog\/post-2"/);
      expect(html).toMatch(/class="anchor primary"[^>]*href="\/blog\/post-3"/);
    });

    test("Title link should have neutral anchor class", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toMatch(/href="\/"[^>]*class="anchor neutral"/);
    });
  });

  describe("Accessibility", () => {
    test("Should use semantic HTML (aside, header, ul)", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain("<aside");
      expect(html).toContain("<header");
      expect(html).toContain("<ul");
    });

    test("Should have proper heading hierarchy with h3", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain("<h3");
      expect(html).toMatch(/<h3[^>]*>.*Artículos recientes.*<\/h3>/s);
    });

    test("Should use list structure for posts", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain("<ul");
      expect(html).toContain("<li");
    });

    test("Should have descriptive link text", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain("Post más reciente");
      expect(html).toContain("Segundo post reciente");
      expect(html).toContain("Tercer post reciente");
    });

    test("Widget should have descriptive class name", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain('class="recent-posts-widget"');
    });

    test("Header should have descriptive class name", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain('class="recent-posts-header"');
    });

    test("Title should have descriptive class name", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toContain('class="recent-posts-title');
    });
  });

  describe("Structure", () => {
    test("List should be inside aside element", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toMatch(/<aside[^>]*>.*<ul[^>]*class="recent-posts-list".*<\/aside>/s);
    });

    test("Header should be inside aside element", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toMatch(/<aside[^>]*>.*<header[^>]*class="recent-posts-header".*<\/aside>/s);
    });

    test("Each post item should contain date and title", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      expect(html).toMatch(/<li[^>]*class="recent-post-item"[^>]*>.*<span[^>]*class="recent-post-date".*<\/span>.*<a.*<\/a>.*<\/li>/s);
    });

    test("Date should be in span element", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      const dateSpans = html.match(/<span[^>]*class="recent-post-date"/g);
      expect(dateSpans?.length).toBe(3);
    });

    test("Posts should be in chronological order (newest first)", async () => {
      const html = await renderAstroComponent(RecentPosts, {});
      const post1Index = html.indexOf("Post más reciente");
      const post2Index = html.indexOf("Segundo post reciente");
      const post3Index = html.indexOf("Tercer post reciente");
      expect(post1Index).toBeLessThan(post2Index);
      expect(post2Index).toBeLessThan(post3Index);
    });
  });
});
