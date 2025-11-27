/**
 * Utilidades para compartir en redes sociales
 */

/**
 * Genera la URL de compartir para Facebook
 */
export function getFacebookShareUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
}

/**
 * Genera la URL de compartir para X (Twitter)
 */
export function getTwitterShareUrl(url: string, text: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
}

/**
 * Genera la URL de compartir para WhatsApp
 */
export function getWhatsAppShareUrl(url: string, text: string): string {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
}

/**
 * Genera todas las URLs de compartir para un post
 */
export function generateShareLinks(url: string, title: string) {
  return {
    facebook: getFacebookShareUrl(url),
    x: getTwitterShareUrl(url, title),
    whatsapp: getWhatsAppShareUrl(url, title),
  };
}
