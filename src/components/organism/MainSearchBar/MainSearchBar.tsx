import search from "@/assets/icons/search.svg";
import s from "./MainSearchBar.module.css";

export const MainSearchBar = () => {
  return (
    <div className={s.search} role="search">
      <img
        src={search.src}
        alt=""
        aria-hidden="true"
        className={s.icon}
      />
      <input
        type="text"
        placeholder="Buscar"
        aria-label="Buscar"
        className={s.input}
      />
    </div>
  );
};