import { Dialog } from "radix-ui";
import { useState } from "react";
import Search from "@/icons/search.svg?react";
import X from "@/icons/x.svg?react";
import s from "./SearchUtility.module.css";

export const SearchUtility = () => {
  const [searchOpen, setSearchOpen] = useState(false);

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

            <div className="input">
              <Search className="icon" aria-hidden="true" />
              <input type="search" placeholder="Buscar..." autoFocus />
            </div>

            <div className={s.Results}>
              <p className={s.ResultsPlaceholder}>
                Los resultados aparecerán aquí
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
