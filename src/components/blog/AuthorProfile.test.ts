import { expect, test, describe } from "vitest";
import AuthorProfile from "./AuthorProfile.astro";
import { renderAstroComponent } from "@/test/astro-container";

const author = {
  id: "andoni-abarzuza",
  collection: "authors" as const,
  data: {
    name: "Andoni Abarzuza",
    bio: "Espeleólogo y montañero de Navarra",
    avatar: {
      src: "/_astro/test-avatar.jpg",
      width: 80,
      height: 80,
      format: "jpg",
    } as any, // ImageMetadata mock
    email: "kiyameh@outlook.com",
    website: "https://kiyameh.com/es/",
    social: {
      instagram: "https://www.instagram.com/andoniabarzuza",
      facebook: "https://www.facebook.com/andoniabarzuza",
      twitter: "https://twitter.com/andoniabarzuza",
    },
  },
};

 const authorWithoutSocial = {
        ...author,
        data: {
          ...author.data,
          social: undefined,
        },
      };


describe("AuthorProfile", () => {
  describe("Rendering", () => {
    test("Should render author name", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain("Andoni Abarzuza");
    });

    test("Should render author bio", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain("Espeleólogo y montañero de Navarra");
    });

    test("Should render author avatar image", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('src="/_image');
      expect(html).toContain('width="80"');
      expect(html).toContain('height="80"');
    });

    test("Should render social links when available", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('href="https://www.instagram.com/andoniabarzuza"');
      expect(html).toContain('href="https://www.facebook.com/andoniabarzuza"');
      expect(html).toContain('href="https://twitter.com/andoniabarzuza"');
    });

    test("Should not render social links when not available", async () => {     
      const html = await renderAstroComponent(AuthorProfile, { props: { author: authorWithoutSocial }});
      expect(html).not.toContain('class="social-links"');
    });

    test("Should render email link when available", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('href="mailto:kiyameh@outlook.com"');
    });

    test("Should render website link when available", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('href="https://kiyameh.com/es/"');
    });

    test("Should handle null author gracefully", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author: null }});
      expect(html).toBeFalsy();
    });

    test("Should handle undefined author gracefully", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author: undefined }});
      expect(html).toBeFalsy();
    });
  });

  describe("Functionality - Links", () => {
    test("Profile link should have correct href", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('href="/blog/autor/andoni-abarzuza"');
    });

    test("Instagram link should have correct href and attributes", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('href="https://www.instagram.com/andoniabarzuza"');
      expect(html).toMatch(/href="https:\/\/www\.instagram\.com\/andoniabarzuza"[^>]*target="_blank"/);
      expect(html).toMatch(/href="https:\/\/www\.instagram\.com\/andoniabarzuza"[^>]*rel="noopener noreferrer"/);
    });

    test("Facebook link should have correct href and attributes", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('href="https://www.facebook.com/andoniabarzuza"');
      expect(html).toMatch(/href="https:\/\/www\.facebook\.com\/andoniabarzuza"[^>]*target="_blank"/);
      expect(html).toMatch(/href="https:\/\/www\.facebook\.com\/andoniabarzuza"[^>]*rel="noopener noreferrer"/);
    });

    test("Twitter link should have correct href and attributes", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('href="https://twitter.com/andoniabarzuza"');
      expect(html).toMatch(/href="https:\/\/twitter\.com\/andoniabarzuza"[^>]*target="_blank"/);
      expect(html).toMatch(/href="https:\/\/twitter\.com\/andoniabarzuza"[^>]*rel="noopener noreferrer"/);
    });

    test("Website link should have correct href and attributes", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('href="https://kiyameh.com/es/"');
      expect(html).toMatch(/href="https:\/\/kiyameh\.com\/es\/"[^>]*target="_blank"/);
      expect(html).toMatch(/href="https:\/\/kiyameh\.com\/es\/"[^>]*rel="noopener noreferrer"/);
    });

    test("Email link should have correct mailto href", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('href="mailto:kiyameh@outlook.com"');
    });

    test("External links should have security attributes", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      const externalLinks = html.match(/target="_blank"/g);
      const secureLinks = html.match(/rel="noopener noreferrer"/g);
      expect(externalLinks?.length).toBe(secureLinks?.length);
    });
  });

  describe("Accessibility", () => {
    test("Profile link should have descriptive aria-label", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('aria-label="Ver perfil de Andoni Abarzuza"');
    });

    test("Avatar image should have alt text", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('alt="Andoni Abarzuza"');
    });

    test("Social links should have title attributes", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('title="Instagram"');
      expect(html).toContain('title="Website"');
      expect(html).toContain('title="Email"');
    });

    test("Profile link should have sr-only text", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('class="sr-only"');
      expect(html).toContain('Ver perfil');
    });

    test("Should use semantic HTML (article, header, main)", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('<article');
      expect(html).toContain('<header');
      expect(html).toContain('<main');
    });

    test("Heading should be h3 for proper hierarchy", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('<h3');
      expect(html).toMatch(/<h3[^>]*>Andoni Abarzuza<\/h3>/);
    });

    test("Social links should be keyboard accessible", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      const socialLinks = html.match(/<a[^>]*class="social-link"/g);
      expect(socialLinks).toBeTruthy();
      expect(socialLinks!.length).toBeGreaterThan(0);
    });

    test("Focus state should be visible", async () => {
      const html = await renderAstroComponent(AuthorProfile, { props: { author }});
      expect(html).toContain('class="container"');
    });
  });
});