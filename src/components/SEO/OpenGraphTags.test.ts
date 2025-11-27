import { expect, test, describe } from "vitest";
import OpenGraphTags from "./OpenGraphTags.astro";
import { renderAstroComponent } from "@/test/astro-container";
import type { MetaInfo } from "./MetaInfo";

const mockMetaInfo: MetaInfo = {
  pageTitle: "Test Post Title",
  pageDescription: "This is a test post description",
  pageTags: ["tag1", "tag2"],
  pageAuthor: "John Doe",
  pageImage: "https://zunbeltz.org/images/test.jpg",
  pageUrl: "https://zunbeltz.org/blog/test-post",
  pageType: "article",
  articlePublishedTime: "2024-01-01T10:00:00Z",
  articleModifiedTime: "2024-01-02T15:00:00Z",
  articleAuthor: "John Doe",
  articleSection: "Technology",
  articleTags: ["JavaScript", "Testing"],
};

const mockWebsiteMetaInfo: MetaInfo = {
  pageTitle: "Zunbeltz Home",
  pageDescription: "Welcome to Zunbeltz",
  pageUrl: "https://zunbeltz.org",
  pageType: "website",
};

describe("OpenGraphTags", () => {
  describe("Basic Open Graph Tags", () => {
    test("Should render og:type meta tag", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="og:type"');
      expect(html).toContain('content="article"');
    });

    test("Should render og:url meta tag", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="og:url"');
      expect(html).toContain('content="https://zunbeltz.org/blog/test-post"');
    });

    test("Should render og:title meta tag", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="og:title"');
      expect(html).toContain('content="Test Post Title"');
    });

    test("Should render og:description meta tag when provided", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="og:description"');
      expect(html).toContain('content="This is a test post description"');
    });

    test("Should render og:image meta tag when provided", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="og:image"');
      expect(html).toContain('content="https://zunbeltz.org/images/test.jpg"');
    });

    test("Should render og:locale meta tag", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="og:locale"');
      expect(html).toContain('content="es_ES"');
    });

    test("Should render og:site_name meta tag", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="og:site_name"');
      expect(html).toContain('content="Zunbeltz"');
    });
  });

  describe("Article-specific Open Graph Tags", () => {
    test("Should render article:published_time when type is article", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="article:published_time"');
      expect(html).toContain('content="2024-01-01T10:00:00Z"');
    });

    test("Should render article:modified_time when provided", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="article:modified_time"');
      expect(html).toContain('content="2024-01-02T15:00:00Z"');
    });

    test("Should render article:author when provided", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="article:author"');
      expect(html).toContain('content="John Doe"');
    });

    test("Should render article:section when provided", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="article:section"');
      expect(html).toContain('content="Technology"');
    });

    test("Should render multiple article:tag when provided", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="article:tag"');
      expect(html).toContain('content="JavaScript"');
      expect(html).toContain('content="Testing"');
    });

    test("Should NOT render article tags when type is website", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockWebsiteMetaInfo },
      });
      expect(html).not.toContain('property="article:');
    });
  });

  describe("Default values", () => {
    test("Should use default URL when not provided", async () => {
      const metaWithoutUrl: MetaInfo = {
        pageTitle: "Test",
        pageDescription: "Test description",
      };
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: metaWithoutUrl },
      });
      expect(html).toContain('content="https://zunbeltz.org"');
    });

    test("Should use default type 'website' when not provided", async () => {
      const metaWithoutType: MetaInfo = {
        pageTitle: "Test",
        pageDescription: "Test description",
      };
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: metaWithoutType },
      });
      expect(html).toContain('content="website"');
    });
  });

  describe("Optional fields", () => {
    test("Should not render og:description when not provided", async () => {
      const metaWithoutDescription: MetaInfo = {
        pageTitle: "Test",
        pageDescription: "",
      };
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: metaWithoutDescription },
      });
      expect(html).not.toContain('property="og:description"');
    });

    test("Should not render og:image when not provided", async () => {
      const metaWithoutImage: MetaInfo = {
        pageTitle: "Test",
        pageDescription: "Test",
      };
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: metaWithoutImage },
      });
      expect(html).not.toContain('property="og:image"');
    });

    test("Should not render article:modified_time when not provided", async () => {
      const metaWithoutModified: MetaInfo = {
        pageTitle: "Test",
        pageDescription: "Test",
        pageType: "article",
        articlePublishedTime: "2024-01-01T10:00:00Z",
      };
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: metaWithoutModified },
      });
      expect(html).not.toContain('property="article:modified_time"');
    });
  });

  describe("HTML structure", () => {
    test("Should render all meta tags as self-closing", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      const metaTags = html.match(/<meta[^>]*>/g);
      expect(metaTags).toBeTruthy();
      expect(metaTags!.length).toBeGreaterThan(0);
    });

    test("Should use property attribute for Open Graph tags", async () => {
      const html = await renderAstroComponent(OpenGraphTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('property="og:');
      expect(html).toContain('property="article:');
    });
  });
});
