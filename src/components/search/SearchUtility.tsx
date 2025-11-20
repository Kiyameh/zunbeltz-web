import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";
import Search from "@/icons/search.svg?react";
import X from "@/icons/x.svg?react";
import s from "./SearchUtility.module.css";

export const SearchUtility = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (searchOpen) {
      const initPagefind = () => {
        const container = document.querySelector("#pagefind-search");

        // Verificamos:
        // 1. Que Pagefind esté cargado en window
        // 2. Que el contenedor exista (Radix ya lo haya renderizado)
        // 3. Que no hayamos inyectado ya el buscador (para evitar duplicados en re-renders)
        // @ts-ignore
        if (window.PagefindUI && container && container.innerHTML === "") {
          try {
            // @ts-ignore
            new window.PagefindUI({
              element: "#pagefind-search",
              showSubResults: true,
              showImages: true,
              autofocus: true,
            });
          } catch (e) {
            console.error("Error al iniciar Pagefind:", e);
          }
        }
      };
      // requestAnimationFrame asegura que el DOM esté listo.
      requestAnimationFrame(initPagefind);
    }
  }, [searchOpen]);

  return (
    <>
      {/* Botón de búsqueda */}
      <button
        className="button secondary"
        onClick={() => setSearchOpen(true)}
        aria-label="Abrir búsqueda"
      >
        <Search aria-hidden="true" className="icon" />
        <span>Buscar</span>
      </button>

      {/* Dialog de búsqueda */}
      <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={s.Overlay} />
          <Dialog.Content className={s.Content}>
            <header className={s.Header}>
              <div>
                <Dialog.Title className="title-1">Buscar</Dialog.Title>
                <Dialog.Description className="paragraph">
                  Busca contenido en el sitio web
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="icon-button secondary"
                aria-label="Cerrar"
              >
                <X aria-hidden="true" className="icon" />
              </Dialog.Close>
            </header>

            <div id="pagefind-search" className={s.PagefindSearch}></div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
