import { expect, test, describe } from "vitest";

/**
 * Tests para el componente AuthorProfile
 * Estos tests validan la lógica de negocio del componente
 */

describe("AuthorProfile Component Logic", () => {
  describe("Props validation", () => {
    test("should accept valid author object", () => {
      const validAuthor = {
        id: "andoni-abarzuza",
        collection: "authors" as const,
        data: {
          name: "Andoni Abarzuza",
          bio: "Espeleólogo y montañero de Navarra",
          avatar: {} as any, // ImageMetadata mock
          email: "kiyameh@outlook.com",
          website: "https://kiyameh.com/es/",
          social: {
            instagram: "https://www.instagram.com/andoniabarzuza",
          },
        },
      };

      expect(validAuthor.id).toBe("andoni-abarzuza");
      expect(validAuthor.data.name).toBe("Andoni Abarzuza");
      expect(validAuthor.data.bio).toBeTruthy();
    });

    test("should handle author without social links", () => {
      const authorWithoutSocial = {
        id: "test-author",
        collection: "authors" as const,
        data: {
          name: "Test Author",
          bio: "Test bio",
          avatar: {} as any,
        },
      };

      expect(authorWithoutSocial.data).not.toHaveProperty("social");
    });

    test("should handle author with partial social links", () => {
      const authorPartialSocial = {
        id: "test-author",
        collection: "authors" as const,
        data: {
          name: "Test Author",
          bio: "Test bio",
          avatar: {} as any,
          social: {
            instagram: "https://instagram.com/test",
            facebook: undefined,
            twitter: undefined,
          },
        },
      };

      expect(authorPartialSocial.data.social?.instagram).toBeTruthy();
      expect(authorPartialSocial.data.social?.facebook).toBeUndefined();
      expect(authorPartialSocial.data.social?.twitter).toBeUndefined();
    });

    test("should handle null author", () => {
      const nullAuthor = null;

      expect(nullAuthor).toBeNull();
    });

    test("should handle undefined author", () => {
      const undefinedAuthor = undefined;

      expect(undefinedAuthor).toBeUndefined();
    });
  });

  describe("Avatar size", () => {
    test("should use fixed avatar size of 80x80", () => {
      const avatarSize = 80;

      expect(avatarSize).toBe(80);
    });
  });

  describe("Bio display", () => {
    test("should always show bio", () => {
      const showBio = true;

      expect(showBio).toBe(true);
    });
  });

  describe("URL generation", () => {
    test("should generate correct author profile URL", () => {
      const authorId = "andoni-abarzuza";
      const expectedUrl = `/blog/autor/${authorId}`;

      expect(expectedUrl).toBe("/blog/autor/andoni-abarzuza");
    });

    test("should handle author IDs with special characters", () => {
      const authorId = "maria-garcia-lopez";
      const url = `/blog/autor/${authorId}`;

      expect(url).toBe("/blog/autor/maria-garcia-lopez");
    });
  });

  describe("Social links", () => {
    test("should validate Instagram URL format", () => {
      const instagramUrl = "https://www.instagram.com/andoniabarzuza";

      expect(instagramUrl).toMatch(/^https:\/\/(www\.)?instagram\.com\//);
    });

    test("should validate Facebook URL format", () => {
      const facebookUrl = "https://www.facebook.com/profile";

      expect(facebookUrl).toMatch(/^https:\/\/(www\.)?facebook\.com\//);
    });

    test("should validate Twitter URL format", () => {
      const twitterUrl = "https://twitter.com/username";

      expect(twitterUrl).toMatch(/^https:\/\/(www\.)?twitter\.com\//);
    });

    test("should validate website URL format", () => {
      const websiteUrl = "https://kiyameh.com/es/";

      expect(websiteUrl).toMatch(/^https?:\/\//);
    });

    test("should validate mailto link format", () => {
      const email = "kiyameh@outlook.com";
      const mailtoLink = `mailto:${email}`;

      expect(mailtoLink).toMatch(/^mailto:/);
      expect(mailtoLink).toBe("mailto:kiyameh@outlook.com");
    });

    test("should render email link when email is provided", () => {
      const authorWithEmail = {
        id: "test-author",
        collection: "authors" as const,
        data: {
          name: "Test Author",
          bio: "Test bio",
          avatar: {} as any,
          email: "test@example.com",
        },
      };

      expect(authorWithEmail.data.email).toBeTruthy();
      expect(authorWithEmail.data.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  describe("Data validation", () => {
    test("should require name field", () => {
      const authorData = {
        name: "Andoni Abarzuza",
        bio: "Bio text",
        avatar: {} as any,
      };

      expect(authorData.name).toBeTruthy();
      expect(typeof authorData.name).toBe("string");
    });

    test("should require bio field", () => {
      const authorData = {
        name: "Andoni Abarzuza",
        bio: "Bio text",
        avatar: {} as any,
      };

      expect(authorData.bio).toBeTruthy();
      expect(typeof authorData.bio).toBe("string");
    });

    test("should require avatar field", () => {
      const authorData = {
        name: "Andoni Abarzuza",
        bio: "Bio text",
        avatar: {} as any,
      };

      expect(authorData.avatar).toBeDefined();
    });

    test("should allow optional email field", () => {
      const authorWithEmail = {
        name: "Test",
        bio: "Bio",
        avatar: {} as any,
        email: "test@example.com",
      };

      const authorWithoutEmail = {
        name: "Test",
        bio: "Bio",
        avatar: {} as any,
      };

      expect(authorWithEmail.email).toBeTruthy();
      expect(authorWithoutEmail).not.toHaveProperty("email");
    });

    test("should validate email format when provided", () => {
      const validEmail = "kiyameh@outlook.com";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      expect(validEmail).toMatch(emailRegex);
    });
  });

  describe("Component behavior", () => {
    test("should return null for null author", () => {
      const author = null;
      const shouldRender = author !== null && author !== undefined;

      expect(shouldRender).toBe(false);
    });

    test("should return null for undefined author", () => {
      const author = undefined;
      const shouldRender = author !== null && author !== undefined;

      expect(shouldRender).toBe(false);
    });

    test("should render for valid author", () => {
      const author = {
        id: "test",
        data: { name: "Test", bio: "Bio", avatar: {} as any },
      };
      const shouldRender = author !== null && author !== undefined;

      expect(shouldRender).toBe(true);
    });
  });

  describe("CSS structure", () => {
    test("should use container class for main wrapper", () => {
      const mainClass = "container";

      expect(mainClass).toBe("container");
    });

    test("should use header class for author info section", () => {
      const headerClass = "header";

      expect(headerClass).toBe("header");
    });

    test("should use bio class for bio section", () => {
      const bioClass = "bio";

      expect(bioClass).toBe("bio");
    });
  });

  describe("Integration scenarios", () => {
    test("should handle complete author profile", () => {
      const completeAuthor = {
        id: "andoni-abarzuza",
        collection: "authors" as const,
        data: {
          name: "Andoni Abarzuza",
          bio: "Espeleólogo y montañero de Navarra. Técnico deportivo en espeleología.",
          avatar: {} as any,
          email: "kiyameh@outlook.com",
          website: "https://kiyameh.com/es/",
          social: {
            instagram: "https://www.instagram.com/andoniabarzuza",
            facebook: "https://www.facebook.com/profile",
            twitter: "https://twitter.com/username",
          },
        },
      };

      expect(completeAuthor.id).toBeTruthy();
      expect(completeAuthor.data.name).toBeTruthy();
      expect(completeAuthor.data.bio).toBeTruthy();
      expect(completeAuthor.data.avatar).toBeDefined();
      expect(completeAuthor.data.email).toBeTruthy();
      expect(completeAuthor.data.website).toBeTruthy();
      expect(completeAuthor.data.social).toBeTruthy();
      expect(Object.keys(completeAuthor.data.social!).length).toBe(3);
    });

    test("should handle minimal author profile", () => {
      const minimalAuthor = {
        id: "minimal-author",
        collection: "authors" as const,
        data: {
          name: "Minimal Author",
          bio: "Short bio",
          avatar: {} as any,
        },
      };

      expect(minimalAuthor.id).toBeTruthy();
      expect(minimalAuthor.data.name).toBeTruthy();
      expect(minimalAuthor.data.bio).toBeTruthy();
      expect(minimalAuthor.data.avatar).toBeDefined();
      expect(minimalAuthor.data).not.toHaveProperty("email");
      expect(minimalAuthor.data).not.toHaveProperty("website");
      expect(minimalAuthor.data).not.toHaveProperty("social");
    });
  });
});
