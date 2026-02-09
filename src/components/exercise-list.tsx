import { PlayCircle } from "lucide-react";
import type { Exercise } from "@/types";

interface ExerciseListProps {
  exercises: Exercise[];
}

export default function ExerciseList({ exercises }: ExerciseListProps) {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Exercises</div>
      <div style={styles.listContainer}>
        {exercises.map((exercise) => (
          <a
            key={exercise.name}
            href={exercise.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
            className="exercise-link"
          >
            <PlayCircle size={18} color="var(--rp-color)" style={{ flexShrink: 0, marginRight: 8 }} />
            {exercise.name}
          </a>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    width: "100%",
    flexBasis: "30%",
    flexGrow: 1,
    padding: 16,
    minWidth: 300,
    maxHeight: 425,
  },
  title: {
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "var(--text-primary)",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: "1px solid var(--border)",
  },
  listContainer: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "100%",
    maxHeight: 390,
  },
  link: {
    display: "flex",
    alignItems: "center",
    padding: "8px 4px",
    textDecoration: "none",
    color: "var(--text-primary)",
    borderRadius: 4,
    fontSize: "0.9rem",
    transition: "background-color 0.15s ease",
  },
};
