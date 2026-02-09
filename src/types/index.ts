export interface Exercise {
  name: string;
  url: string;
}

export interface VolumeLandmark {
  Muscle: string;
  MV: string;
  MEV: string;
  MAV: string;
  MRV: string;
  Freq: string;
  url: string;
  exercises: Exercise[];
}
