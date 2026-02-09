"use client";

import { Chart } from "react-chartjs-2";
import { buildChartData, chartOptions } from "@/lib/chart-utils";
import type { VolumeLandmark } from "@/types";

interface VolumeChartProps {
  muscleGroup: VolumeLandmark;
}

export default function VolumeChart({ muscleGroup }: VolumeChartProps) {
  const data = buildChartData(muscleGroup);

  return (
    <div style={styles.container}>
      <Chart type="bar" data={data} options={chartOptions} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    flexBasis: "60%",
    flexGrow: 1,
    minWidth: 300,
    background: "var(--surface)",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    padding: 16,
  },
};
