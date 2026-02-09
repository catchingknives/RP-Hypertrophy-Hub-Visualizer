import { notFound } from "next/navigation";
import { VOLUME_LANDMARKS } from "@/data/volume-landmarks";
import MuscleTable from "@/components/muscle-table";
import VolumeChart from "@/components/volume-chart";
import ExerciseList from "@/components/exercise-list";
import Disclaimer from "@/components/disclaimer";
import MuscleDetailHeader from "./header";

export function generateStaticParams() {
  return VOLUME_LANDMARKS.map((mg) => ({ muscle: mg.Muscle }));
}

function findMuscleGroup(slug: string) {
  return VOLUME_LANDMARKS.find(
    (mg) => mg.Muscle.toLowerCase() === slug.toLowerCase()
  );
}

interface PageProps {
  params: Promise<{ muscle: string }>;
}

export default async function MusclePage({ params }: PageProps) {
  const { muscle } = await params;
  const muscleGroup = findMuscleGroup(muscle);

  if (!muscleGroup) {
    notFound();
  }

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <MuscleDetailHeader muscleName={muscleGroup.Muscle} />
        <hr style={styles.divider} />
        <div style={styles.tableDescription}>
          {"Here is a link to the official RP documentation for this muscle group: "}
          <a href={muscleGroup.url} target="_blank" rel="noopener noreferrer">
            {muscleGroup.Muscle} Training Guide
          </a>
        </div>
      </div>
      <MuscleTable data={[muscleGroup]} />
      <div style={styles.flexManager}>
        <VolumeChart muscleGroup={muscleGroup} />
        <ExerciseList exercises={muscleGroup.exercises} />
      </div>
      <Disclaimer />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1200,
    minWidth: 300,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  card: {
    background: "var(--surface)",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    padding: "4px 0",
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--border)",
    margin: "0 10px",
  },
  tableDescription: {
    width: "90%",
    margin: "0 auto",
    padding: "10px 0",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
  },
  flexManager: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 12,
  },
};
