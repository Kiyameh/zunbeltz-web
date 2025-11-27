import { expect, test, describe } from "vitest";
import TwitterCardTags from "./TwitterCardTags.astro";
import { renderAstroComponent } from "@/test/astro-container";
import type { MetaInfo } from "./MetaInfo";

const mockMetaInfo: MetaInfo = {
  pageTitle: "Test Post Title",
  pageDescription: "This is a test post description",
  pageImage: "https://zunbeltz.org/images/test.jpg",
  twitterCard: "summary_large_image",
  twitterSite: "@zunbeltz",
  twitterCreator: "@johndoe",
};

const mockMetaInfoMinimal: MetaInfo = {
  pageTitle: "Test Title",
  pageDescription: "Test description",
};

describe("TwitterCardTags", () => {
  describe("Basic Twitter Card Tags", () => {
    test("Should render twitter:card meta tag", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('name="twitter:card"');
      expect(html).toContain('content="summary_large_image"');
    });

    test("Should render twitter:site meta tag", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('name="twitter:site"');
      expect(html).toContain('content="@zunbeltz"');
    });

    test("Should render twitter:title meta tag", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('name="twitter:title"');
      expect(html).toContain('content="Test Post Title"');
    });

    test("Should render twitter:description meta tag when provided", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('name="twitter:description"');
      expect(html).toContain('content="This is a test post description"');
    });

    test("Should render twitter:image meta tag when provided", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('name="twitter:image"');
      expect(html).toContain('content="https://zunbeltz.org/images/test.jpg"');
    });

    test("Should render twitter:image:alt meta tag when image is provided", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('name="twitter:image:alt"');
      expect(html).toContain('content="Test Post Title"');
    });

    test("Should render twitter:creator when provided", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('name="twitter:creator"');
      expect(html).toContain('content="@johndoe"');
    });
  });

  describe("Default values", () => {
    test("Should use default card type 'summary' when not provided", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfoMinimal },
      });
      expect(html).toContain('name="twitter:card"');
      expect(html).toContain('content="summary"');
    });

    test("Should use default site '@zunbeltz' when not provided", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfoMinimal },
      });
      expect(html).toContain('name="twitter:site"');
      expect(html).toContain('content="@zunbeltz"');
    });
  });

  describe("Optional fields", () => {
    test("Should not render twitter:creator when not provided", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfoMinimal },
      });
      expect(html).not.toContain('name="twitter:creator"');
    });

    test("Should not render twitter:description when not provided", async () => {
      const metaWithoutDescription: MetaInfo = {
        pageTitle: "Test",
        pageDescription: "",
      };
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: metaWithoutDescription },
      });
      expect(html).not.toContain('name="twitter:description"');
    });

    test("Should not render twitter:image when not provided", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfoMinimal },
      });
      expect(html).not.toContain('name="twitter:image"');
    });

    test("Should not render twitter:image:alt when image is not provided", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfoMinimal },
      });
      expect(html).not.toContain('name="twitter:image:alt"');
    });
  });

  describe("Card types", () => {
    test("Should support 'summary' card type", async () => {
      const metaWithSummary: MetaInfo = {
        ...mockMetaInfoMinimal,
        twitterCard: "summary",
      };
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: metaWithSummary },
      });
      expect(html).toContain('content="summary"');
    });

    test("Should support 'summary_large_image' card type", async () => {
      const metaWithLargeImage: MetaInfo = {
        ...mockMetaInfoMinimal,
        twitterCard: "summary_large_image",
      };
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: metaWithLargeImage },
      });
      expect(html).toContain('content="summary_large_image"');
    });
  });

  describe("HTML structure", () => {
    test("Should render all meta tags as self-closing", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      const metaTags = html.match(/<meta[^>]*>/g);
      expect(metaTags).toBeTruthy();
      expect(metaTags!.length).toBeGreaterThan(0);
    });

    test("Should use name attribute for Twitter Card tags", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('name="twitter:');
      expect(html).not.toContain('property="twitter:');
    });
  });

  describe("Image alt text", () => {
    test("Should use pageTitle as image alt text", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      expect(html).toContain('name="twitter:image:alt"');
      expect(html).toContain('content="Test Post Title"');
    });

    test("Should match image alt with title", async () => {
      const customTitle = "Custom Title for Testing";
      const metaWithCustomTitle: MetaInfo = {
        ...mockMetaInfo,
        pageTitle: customTitle,
      };
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: metaWithCustomTitle },
      });
      expect(html).toContain(`content="${customTitle}"`);
      const altMatch = html.match(
        /name="twitter:image:alt"[^>]*content="([^"]*)"/,
      );
      const titleMatch = html.match(
        /name="twitter:title"[^>]*content="([^"]*)"/,
      );
      expect(altMatch?.[1]).toBe(titleMatch?.[1]);
    });
  });

  describe("Integration with Open Graph", () => {
    test("Should work alongside Open Graph tags", async () => {
      const html = await renderAstroComponent(TwitterCardTags, {
        props: { metaInfo: mockMetaInfo },
      });
      // Twitter Cards usa 'name' mientras Open Graph usa 'property'
      expect(html).toContain('name="twitter:');
      expect(html).not.toContain('property="og:');
    });
  });
});
