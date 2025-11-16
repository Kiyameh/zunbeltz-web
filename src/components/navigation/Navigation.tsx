import s from "./Navigation.module.css";
import { NavigationMenu } from "radix-ui";
import Caret from "@/icons/caret-down.svg?react";
import Navarra from "./assets/navarra.png";
import BgBlue from "./assets/grid-bg-blue.svg";
import BgGreen from "./assets/grid-bg-green.svg";
import Search from "@/icons/search.svg?react";
import { SearchPanel } from "@/components/search/SearchPanel";
import { useState } from "react";

export const Navigation = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <NavigationMenu.Root className={s.Root}>
        <NavigationMenu.List className={s.MenuList}>
          {/* La falla */}
          <NavigationMenu.Item value="home">
            <NavigationMenu.Link className={s.Link} href="/">
              La falla
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          {/* Navarra */}
          <NavigationMenu.Item value="navarra">
            <NavigationMenu.Trigger className={s.Trigger}>
              Navarra <Caret className={s.CaretDown} aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={s.Content}>
              <ul className={s.Grid1x3}>
                <li className={s.Span3}>
                  <NavigationMenu.Link asChild>
                    <a href="/navarra" className={s.Navarra}>
                      <p>Navarra</p>
                      <img
                        src={Navarra.src}
                        alt="Escudo de Navarra"
                        aria-hidden
                      />
                    </a>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/navarra/cuevas" className={s.GridLink}>
                      <p className={s.title}>Cuevas</p>
                      <p className={s.desc}>
                        Zonas kársticas de Navarra y sus cavidades
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>

                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/navarra/montañas" className={s.GridLink}>
                      <p className={s.title}>Montañas</p>
                      <p className={s.desc}>
                        Las montañas y paisajes de la provincia
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/navarra/rios" className={s.GridLink}>
                      <p className={s.title}>Ríos</p>
                      <p className={s.desc}>
                        Ríos, foces y cauces del territorio
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          {/* Exploración */}
          <NavigationMenu.Item value="exploracion">
            <NavigationMenu.Trigger className={s.Trigger}>
              Exploración <Caret className={s.CaretDown} aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={s.Content}>
              <ul className={s.Grid2x2}>
                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/exploracion/novedades" className={s.GridLink}>
                      <p className={s.title}>Ultimas exploraciones</p>
                      <p className={s.desc}>
                        Novedades en la exploración espeleológica Navarra
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <a
                      href="https://subterra.app"
                      target="_blank"
                      className={s.GridLink}
                    >
                      <p className={`${s.title} ${s.external}`}>
                        Subterra.app↗
                      </p>
                      <p className={s.desc}>
                        Base de datos espeleológica para grupos de exploración
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/exploracion/topografia" className={s.GridLink}>
                      <p className={s.title}>Topografía</p>
                      <p className={s.desc}>
                        Método, herramientas y software de topografía de
                        cavidades
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/exploracion/fichas" className={s.GridLink}>
                      <p className={s.title}>Generador de fichas</p>
                      <p className={s.desc}>
                        Herramienta para generar fichas técnicas de instalación
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          {/* Escuela */}
          <NavigationMenu.Item value="escuela">
            <NavigationMenu.Trigger className={s.Trigger}>
              Escuela <Caret className={s.CaretDown} aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={s.Content}>
              <NavigationMenu.Link asChild>
                <a href="/aprende" className={s.Learn}>
                  <p>Escuela Zunbeltz</p>
                  <img src={BgBlue.src} aria-hidden className={s.BgBlue} />
                  <img src={BgGreen.src} aria-hidden className={s.BgGreen} />
                </a>
              </NavigationMenu.Link>

              <ul className={s.Grid2x2}>
                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/aprende/recorrido" className={s.GridLink}>
                      <p className={s.title}>Recorrido de aprendizaje</p>
                      <p className={s.desc}>
                        El camino del buen amante de la aventura
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/aprende/online" className={s.GridLink}>
                      <p className={s.title}>Aprende online</p>
                      <p className={s.desc}>
                        Mejora tu conocimiento con cursos online en todas las
                        disciplinas
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/aprende/cursos" className={s.GridLink}>
                      <p className={s.title}>Cursos presenciales</p>
                      <p className={s.desc}>
                        Pon en práctica tus deportes favoritos en Navarra
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <a href="/aprende/biblioteca" className={s.GridLink}>
                      <p className={s.title}>Biblioteca técnica</p>
                      <p className={s.desc}>
                        Libros, revistas y documentos técnicos
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          {/* Tienda */}
          <NavigationMenu.Item value="tienda">
            <NavigationMenu.Link className={s.Link} href="/tienda">
              Tienda
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          {/* Búsqueda */}
          <NavigationMenu.Item value="search">
            <button
              className="button secondary"
              onClick={() => setSearchOpen(true)}
              aria-label="Abrir búsqueda"
            >
              <Search aria-hidden="true" className="icon" />
              <span>Buscar</span>
            </button>
          </NavigationMenu.Item>

          {/* Flecha decorativa */}
          <NavigationMenu.Indicator className={s.Indicator}>
            <div className={s.Arrow} />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
        {/* Viewport sobre el que se muestra el content */}
        <div className={s.ViewportPosition}>
          <NavigationMenu.Viewport className={s.Viewport} />
        </div>
      </NavigationMenu.Root>

      {/* Search Dialog */}
      <SearchPanel open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
