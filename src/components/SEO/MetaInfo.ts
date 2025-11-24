export interface MetaInfo {
  // Meta tags básicos
  pageTitle: string;
  pageDescription: string;
  pageTags?: string[];
  pageAuthor?: string;
  pageImage?: string;
  pageUrl?: string;
  pageType?: "website" | "article";

  // Open Graph - Article (para posts de blog)
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];

  // Twitter Cards
  twitterCard?: "summary" | "summary_large_image";
  twitterSite?: string;
  twitterCreator?: string;
}
