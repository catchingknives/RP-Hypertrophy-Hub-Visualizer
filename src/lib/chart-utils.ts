import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import type { VolumeLandmark } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

export function buildChartData(muscleGroup: VolumeLandmark) {
  const defaultLabels = ["MV", "MEV", "MAV", "MRV"] as const;
  const actualLabels: string[] = [];
  const volumeData: number[] = [];

  for (const label of defaultLabels) {
    actualLabels.push(label);
    const value = muscleGroup[label];
    const isRange = value.includes("-");
    if (isRange) {
      const [min, max] = value.split("-").map((s) => parseInt(s, 10));
      volumeData.push(min);
      volumeData.push(max);
      const idx = actualLabels.indexOf(label);
      actualLabels[idx] = `Min ${label}`;
      actualLabels.push(`Max ${label}`);
    } else {
      volumeData.push(parseInt(value, 10) || 0);
    }
  }

  return {
    labels: actualLabels,
    datasets: [
      {
        type: "bar" as const,
        label: `${muscleGroup.Muscle} Volume`,
        data: volumeData,
        backgroundColor: "#ee2d37",
        hoverBackgroundColor: "#c41e27",
        order: 2,
      },
      {
        type: "line" as const,
        label: "Volume Curve",
        data: volumeData,
        borderColor: "#6c757d",
        pointBackgroundColor: "#6c757d",
        fill: false,
        order: 1,
      },
    ],
  };
}

export const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Sets per week",
      },
    },
  },
};
