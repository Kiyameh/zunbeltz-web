import type { ReactNode } from "react";
import styles from "./InfoCard.module.css";

interface InfoCardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  variant?: "default" | "highlight" | "warning";
}

export default function InfoCard({
  title,
  icon,
  children,
  variant = "default",
}: InfoCardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      {(title || icon) && (
        <div className={styles.header}>
          {icon && <div className={styles.icon}>{icon}</div>}
          {title && <h3 className={styles.title}>{title}</h3>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
