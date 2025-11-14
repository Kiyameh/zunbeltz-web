import type { ButtonProps } from "./types";
import styles from "./Button.module.css";

/**
 * Componente Button
 * @param variant - Variante del botón: "primary" | "secondary" | "ghost"
 * @param className - Clases CSS adicionales
 * @param children - Contenido del botón
 * @param disabled - Estado deshabilitado del botón
 */

export const Button = ({
  variant = "primary",
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  const buttonClass = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClass} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
