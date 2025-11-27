import { useState } from "react";
import { Toast } from "radix-ui";
import FacebookIcon from "@/icons/brand-facebook.svg?raw";
import XIcon from "@/icons/brand-x.svg?raw";
import WhatsAppIcon from "@/icons/brand-whatsapp.svg?raw";
import LinkIcon from "@/icons/link.svg?raw";
import "@/styles/components/button.css";
import s from "./ShareButtons.module.css";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({
  url,
  title,
  description = "",
}: ShareButtonsProps) {
  const [showToast, setShowToast] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowToast(true);
    } catch (error) {
      console.error("Error al copiar el enlace:", error);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <Toast.Provider swipeDirection="right" duration={3000}>
      <div className={s.shareButtons}>
        <button
          className="icon-button secondary"
          onClick={() => handleShare("facebook")}
          aria-label="Compartir en Facebook"
          title="Compartir en Facebook"
        >
          <span dangerouslySetInnerHTML={{ __html: FacebookIcon }} />
        </button>

        <button
          className="icon-button secondary"
          onClick={() => handleShare("x")}
          aria-label="Compartir en X (Twitter)"
          title="Compartir en X (Twitter)"
        >
          <span dangerouslySetInnerHTML={{ __html: XIcon }} />
        </button>

        <button
          className="icon-button secondary"
          onClick={() => handleShare("whatsapp")}
          aria-label="Compartir en WhatsApp"
          title="Compartir en WhatsApp"
        >
          <span dangerouslySetInnerHTML={{ __html: WhatsAppIcon }} />
        </button>

        <button
          className="icon-button secondary"
          onClick={handleCopyLink}
          aria-label="Copiar enlace"
          title="Copiar enlace"
        >
          <span dangerouslySetInnerHTML={{ __html: LinkIcon }} />
        </button>
      </div>

      <Toast.Root
        className={s.toastRoot}
        open={showToast}
        onOpenChange={setShowToast}
      >
        <Toast.Description className={s.toastDescription}>
          ¡Enlace copiado al portapapeles!
        </Toast.Description>
        <Toast.Close className={s.toastClose} aria-label="Cerrar">
          <span aria-hidden>×</span>
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className={s.toastViewport} />
    </Toast.Provider>
  );
}
