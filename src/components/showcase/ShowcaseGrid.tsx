import type { ReactNode } from "react";
import s from "./ShowcaseGrid.module.css";

interface ShowcaseGridProps {
  title?: string;
  children: ReactNode;
}

export default function ShowcaseGrid({ title, children }: ShowcaseGridProps) {
  return (
    <div className={s.container}>
      {title && <h3 className={s.title}>{title}</h3>}
      <div className={s.grid}>{children}</div>
    </div>
  );
}
