"use client";

import dynamic from "next/dynamic";
import type { VolumeLandmark } from "@/types";

const VolumeChart = dynamic(() => import("@/components/volume-chart"), {
  ssr: false,
});

interface Props {
  muscleGroup: VolumeLandmark;
}

export default function VolumeChartWrapper({ muscleGroup }: Props) {
  return <VolumeChart muscleGroup={muscleGroup} />;
}
