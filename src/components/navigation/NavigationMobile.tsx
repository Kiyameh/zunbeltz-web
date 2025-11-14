import s from "./NavigationMobile.module.css";
import { NavigationMenu } from "radix-ui";
import Caret from "@/icons/caret-down.svg?react";
import Navarra from "./assets/navarra.png";
import BgBlue from "./assets/grid-bg-blue.svg";
import BgGreen from "./assets/grid-bg-green.svg";

export const NavigationMobile = () => {
  const handleLinkClick = () => {
    // Llamar a la función global expuesta por HeaderLayout
    if (typeof window !== "undefined" && (window as any).closeMobileMenu) {
      (window as any).closeMobileMenu();
    }
  };

  return (
    <NavigationMenu.Root className={s.MenuContainer} orientation="vertical">
      <NavigationMenu.List className={s.MenuList}>
        {/* La falla */}
        <NavigationMenu.Item className={s.MenuItem}>
          <NavigationMenu.Link
            className={s.MenuLink}
            href="/"
            onClick={handleLinkClick}
          >
            La falla
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* Navarra */}
        <NavigationMenu.Item className={s.MenuItem}>
          <NavigationMenu.Trigger className={s.MenuTrigger}>
            Navarra
            <Caret className={s.CaretDown} aria-hidden />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className={s.Content}>
            <ul className={s.SubmenuList}>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/navarra"
                    className={s.NavarraCallout}
                    onClick={handleLinkClick}
                  >
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
                  <a
                    href="/navarra/cuevas"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
                    <p className={s.title}>Cuevas</p>
                    <p className={s.desc}>
                      Zonas kársticas de Navarra y sus cavidades
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/navarra/montañas"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
                    <p className={s.title}>Montañas</p>
                    <p className={s.desc}>
                      Las montañas y paisajes de la provincia
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/navarra/rios"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
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
        <NavigationMenu.Item className={s.MenuItem}>
          <NavigationMenu.Trigger className={s.MenuTrigger}>
            Exploración
            <Caret className={s.CaretDown} aria-hidden />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className={s.Content}>
            <ul className={s.SubmenuList}>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/exploracion/novedades"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
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
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
                    <p className={s.title}>Subterra.app</p>
                    <p className={s.desc}>
                      Base de datos espeleológica para grupos de exploración
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/exploracion/topografia"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
                    <p className={s.title}>Topografía</p>
                    <p className={s.desc}>
                      Método, herramientas y software de topografía de cavidades
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/exploracion/fichas"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
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
        <NavigationMenu.Item className={s.MenuItem}>
          <NavigationMenu.Trigger className={s.MenuTrigger}>
            Escuela
            <Caret className={s.CaretDown} aria-hidden />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className={s.Content}>
            <ul className={s.SubmenuList}>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/aprende"
                    className={s.LearnCallout}
                    onClick={handleLinkClick}
                  >
                    <p>Escuela Zunbeltz</p>
                    <img src={BgBlue.src} aria-hidden className={s.BgBlue} />
                    <img src={BgGreen.src} aria-hidden className={s.BgGreen} />
                  </a>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/aprende/recorrido"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
                    <p className={s.title}>Recorrido de aprendizaje</p>
                    <p className={s.desc}>
                      El camino del buen amante de la aventura
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/aprende/online"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
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
                  <a
                    href="/aprende/cursos"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
                    <p className={s.title}>Cursos presenciales</p>
                    <p className={s.desc}>
                      Pon en práctica tus deportes favoritos en Navarra
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link asChild>
                  <a
                    href="/aprende/biblioteca"
                    className={s.SubmenuLink}
                    onClick={handleLinkClick}
                  >
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
        <NavigationMenu.Item className={s.MenuItem}>
          <NavigationMenu.Link
            className={s.MenuLink}
            href="/tienda"
            onClick={handleLinkClick}
          >
            Tienda
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
