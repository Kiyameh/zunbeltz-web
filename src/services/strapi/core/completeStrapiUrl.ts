export default function completeStrapiUrl(path: string) {
  const baseUrl = import.meta.env.STRAPI_URL;
  if (!baseUrl) throw new Error("Strapi URL not defined in env");
  return new URL(path, baseUrl);
}
