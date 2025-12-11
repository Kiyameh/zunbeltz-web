/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly CLERK_SECRET_KEY: string;
  readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  readonly STRAPI_URL: string;
  readonly STRAPI_TOKEN: string;
}
