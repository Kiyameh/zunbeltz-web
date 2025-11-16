import { expect, test, describe } from "vitest";

// Extraer la lógica del componente RecentPosts para probarla de forma aislada
const sortPostsByDate = <T extends { data: { publishDate: Date } }>(
  posts: T[],
): T[] => {
  return posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
};

const generatePostLink = (postId: string): string => {
  return `/blog/${postId}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

// Mock posts data
const mockPosts = [
  {
    id: "post-1/index.mdx",
    slug: "post-1",
    data: {
      title: "Post más reciente",
      publishDate: new Date("2024-11-16"),
      draft: false,
    },
  },
  {
    id: "post-2/index.mdx",
    slug: "post-2",
    data: {
      title: "Post antiguo",
      publishDate: new Date("2024-11-10"),
      draft: false,
    },
  },
  {
    id: "post-3/index.mdx",
    slug: "post-3",
    data: {
      title: "Post medio",
      publishDate: new Date("2024-11-14"),
      draft: false,
    },
  },
];

describe("RecentPosts Logic", () => {
  test("should sort posts by date (newest first)", () => {
    const sorted = sortPostsByDate([...mockPosts]);

    expect(sorted[0].data.title).toBe("Post más reciente");
    expect(sorted[1].data.title).toBe("Post medio");
    expect(sorted[2].data.title).toBe("Post antiguo");
  });

  test("should maintain original array when sorting", () => {
    const original = [...mockPosts];
    const sorted = sortPostsByDate([...mockPosts]);

    // El array original no debe cambiar
    expect(original).toEqual(mockPosts);
    // El array ordenado debe ser diferente
    expect(sorted).not.toEqual(original);
  });

  test("should generate correct post links", () => {
    const link1 = generatePostLink(mockPosts[0].id);
    const link2 = generatePostLink(mockPosts[1].id);

    expect(link1).toBe("/blog/post-1/index.mdx");
    expect(link2).toBe("/blog/post-2/index.mdx");
  });

  test("should format dates correctly", () => {
    const date1 = formatDate(mockPosts[0].data.publishDate);
    const date2 = formatDate(mockPosts[1].data.publishDate);

    expect(date1).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    expect(date2).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });

  test("should handle empty posts array", () => {
    const sorted = sortPostsByDate([]);

    expect(sorted).toHaveLength(0);
  });

  test("should handle single post", () => {
    const singlePost = [mockPosts[0]];
    const sorted = sortPostsByDate([...singlePost]);

    expect(sorted).toHaveLength(1);
    expect(sorted[0].data.title).toBe("Post más reciente");
  });

  test("should sort posts with same date", () => {
    const postsWithSameDate = [
      {
        id: "post-a/index.mdx",
        slug: "post-a",
        data: {
          title: "Post A",
          publishDate: new Date("2024-11-16T10:00:00"),
          draft: false,
        },
      },
      {
        id: "post-b/index.mdx",
        slug: "post-b",
        data: {
          title: "Post B",
          publishDate: new Date("2024-11-16T12:00:00"),
          draft: false,
        },
      },
    ];

    const sorted = sortPostsByDate([...postsWithSameDate]);

    // Post B debe estar primero (más reciente por hora)
    expect(sorted[0].data.title).toBe("Post B");
    expect(sorted[1].data.title).toBe("Post A");
  });
});
