import type { Duration } from "@/types/navarra/shared.types";
import styles from "./DurationBadge.module.css";

interface DurationBadgeProps {
  duration: Duration;
  label?: string;
  variant?: "default" | "compact";
}

export default function DurationBadge({
  duration,
  label,
  variant = "default",
}: DurationBadgeProps) {
  const formatDuration = () => {
    if (duration.hours === 0) {
      return `${duration.minutes} min`;
    }
    if (duration.minutes === 0) {
      return `${duration.hours} h`;
    }
    return `${duration.hours}h ${duration.minutes}min`;
  };

  const formatDurationCompact = () => {
    const h = duration.hours.toString().padStart(2, "0");
    const m = duration.minutes.toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  return (
    <div className={`${styles.badge} ${styles[variant]}`}>
      {label && <span className={styles.label}>{label}:</span>}
      <span className={styles.duration}>
        {variant === "compact" ? formatDurationCompact() : formatDuration()}
      </span>
    </div>
  );
}
