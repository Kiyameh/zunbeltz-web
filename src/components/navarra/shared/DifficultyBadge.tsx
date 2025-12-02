import styles from "./DifficultyBadge.module.css";

interface DifficultyBadgeProps {
  difficulty: string | number;
  type?: "cave" | "canyon" | "hiking" | "climbing";
  label?: string;
}

export default function DifficultyBadge({
  difficulty,
  type = "cave",
  label,
}: DifficultyBadgeProps) {
  const getDifficultyLevel = (): "easy" | "moderate" | "hard" | "extreme" => {
    if (type === "hiking") {
      const diff = difficulty.toString().toLowerCase();
      if (diff.includes("fácil")) return "easy";
      if (diff.includes("moderada")) return "moderate";
      if (diff.includes("difícil") && !diff.includes("muy")) return "hard";
      return "extreme";
    }

    if (type === "climbing") {
      const grade = typeof difficulty === "string" ? difficulty : "";
      const num = parseInt(grade.charAt(0));
      if (num <= 4) return "easy";
      if (num <= 6) return "moderate";
      if (num <= 7) return "hard";
      return "extreme";
    }

    // Default para cave y canyon
    return "moderate";
  };

  const level = getDifficultyLevel();

  return (
    <div className={`${styles.badge} ${styles[level]}`}>
      {label && <span className={styles.label}>{label}:</span>}
      <span className={styles.difficulty}>{difficulty}</span>
    </div>
  );
}
