import React, { useState } from "react";
import TrainingForm from "./components/TrainingForm";
import TrainingList from "./components/TrainingList";
import { Training } from "./types/index.ts";

const App: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const handleAddTraining = (newTraining: Training) => {
    setTrainings((prev) => [...prev, newTraining]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        App de Entrenamiento
      </h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <TrainingForm onAddTraining={handleAddTraining} />
        <TrainingList trainings={trainings} />
      </div>
    </div>
  );
};

export default App;
