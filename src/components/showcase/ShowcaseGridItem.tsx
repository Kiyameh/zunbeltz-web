import type { ReactNode } from "react";
import s from "./ShowcaseGridItem.module.css";

interface ShowcaseGridItemProps {
  classes: string;
  children: ReactNode;
}

export default function ShowcaseGridItem({
  classes,
  children,
}: ShowcaseGridItemProps) {
  return (
    <div className={s.item}>
      <div className={s.preview}>{children}</div>
      <div className={s.classes}>
        <code>{classes}</code>
      </div>
    </div>
  );
}
