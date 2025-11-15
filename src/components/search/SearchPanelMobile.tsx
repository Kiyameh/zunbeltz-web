import { Dialog } from "radix-ui";
import s from "./SearchPanelMobile.module.css";
import Search from "@/icons/search.svg?react";
import { useState, useEffect } from "react";

export const SearchPanelMobile = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => {
      setOpen(true);
    };

    window.addEventListener("open-mobile-search", handleOpenSearch);

    return () => {
      window.removeEventListener("open-mobile-search", handleOpenSearch);
    };
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.Overlay} />
        <Dialog.Content className={s.Content}>
          <div>
            <Dialog.Title className="title-1">Buscar</Dialog.Title>
            <Dialog.Description className="paragraph">
              Busca contenido en el sitio web
            </Dialog.Description>
          </div>

          <div className="input">
            <Search className="icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar..."
              autoFocus
            />
          </div>

          <div className={s.Results}>
            <p className={s.ResultsPlaceholder}>
              Los resultados aparecerán aquí
            </p>
          </div>

          <Dialog.Close className={s.CloseButton} aria-label="Cerrar">
            ×
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
