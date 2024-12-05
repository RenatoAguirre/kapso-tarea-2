export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface Training {
  id: string;
  name: string;
  exercises: Exercise[];
}
