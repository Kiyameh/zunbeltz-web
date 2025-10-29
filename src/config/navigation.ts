import fileText from "@/assets/icons/file-text.svg";
import notebookPen from "@/assets/icons/notebook-pen.svg";
import squareUserRound from "@/assets/icons/square-user-round.svg";
import userPen from "@/assets/icons/user-pen.svg";
import shoppingBag from "@/assets/icons/shopping-bag.svg";
import bookOpenText from "@/assets/icons/book-open-text.svg";
import table from "@/assets/icons/table.svg";
import pencilRuler from "@/assets/icons/pencil-ruler.svg";
import rss from "@/assets/icons/rss.svg";
import database from "@/assets/icons/database.svg";
import compass from "@/assets/icons/compass.svg";
import mountainSnow from "@/assets/icons/mountain-snow.svg";
import waves from "@/assets/icons/waves.svg";
import bat from "@/assets/icons/bat.svg";
import trekking from "@/assets/icons/trekking.svg";
import type { NavigationStack } from "@/components/organism/SidebarNav/SidebarNav";


export const navigation: NavigationStack = [
  {
    icon: fileText.src,
    name: "La falla de Zunbeltz",
    tag: "Blog",
    href: "/blog",
  },
  {
    icon: trekking.src,
    name: "Actividades Navarra",
    href: "/navarra",
    childrens: [
      {
        icon: bat.src,
        name: "Las Cuevas",
        href: "/navarra/cuevas",
      },
      {
        icon: waves.src,
        name: "Los ríos",
        href: "/navarra/rios",
      },
      {
        icon: mountainSnow.src,
        name: "Los montes",
        href: "/navarra/montes",
      },
    ],
  },
  {
    icon: compass.src,
    name: "Exploración",
    href: "/exploracion",
    childrens: [
      {
        icon: database.src,
        name: "Base de datos",
        href: "/exploracion/subterra",
      },
      {
        icon: rss.src,
        name: "Últimas exploraciones",
        href: "/exploracion/novedades",
      },
      {
        icon: pencilRuler.src,
        name: "El método",
        href: "/exploracion/metodo",
      },
      {
        icon: table.src,
        name: "Generador de fichas",
        href: "/exploracion/fichas-tecnicas",
        tag: "Tool"
      },
    ],
  },
  {
    icon: bookOpenText.src,
    name: "Escuela Zunbeltz",
    href: "/escuela",
  },
  {
    icon: shoppingBag.src,
    name: "Tienda",
    href: "/tienda",
  },
  {
    icon: squareUserRound.src,
    name: "Área personal",
    href: "/personal",
    childrens: [
      {
        icon: notebookPen.src,
        name: "Diario de aventura",
        href: "/personal/diario",
      },
      {
        icon: userPen.src,
        name: "Perfil",
        href: "/personal/perfil",
      },
    ],
  },
];