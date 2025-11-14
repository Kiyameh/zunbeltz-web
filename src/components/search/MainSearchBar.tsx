import Search from "@/icons/search.svg?react";
import s from "./MainSearchBar.module.css";

export const MainSearchBar = () => {
  return (
    <div className={s.search} role="search" >
      <Search
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