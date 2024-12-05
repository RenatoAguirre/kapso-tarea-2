import React, { useState } from "react";
import { Training } from "../types/index.ts";
import { Exercise } from "../types/index.ts";

interface TrainingListProps {
  trainings: Training[];
}

const TrainingList: React.FC<TrainingListProps> = ({ trainings }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const calculateVolume = (exercises: Exercise[]) => {
    return exercises.reduce(
      (total, exercise) =>
        total + exercise.sets * exercise.reps * exercise.weight,
      0
    );
  };

  const handleExportToJson = (training: Training) => {
    const dataToExport = {
      id: training.id,
      name: training.name,
      exercises: training.exercises,
    };

    const jsonBlob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${training.name || "training"}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const calculateMaxWeight = (exercises: Exercise[]) => {
    return exercises.reduce(
      (max, exercise) => (exercise.weight > max ? exercise.weight : max),
      0
    );
  };

  const sortedTrainings = [...trainings].sort((a, b) => {
    const volumeA = calculateVolume(a.exercises);
    const volumeB = calculateVolume(b.exercises);
    return sortOrder === "asc" ? volumeA - volumeB : volumeB - volumeA;
  });

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Entrenamientos Registrados
      </h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-gray-700"
        >
          Ordenar por Volumen (
          {sortOrder === "asc" ? "Ascendente" : "Descendente"})
        </button>
      </div>
      {sortedTrainings.map((training) => (
        <div
          key={training.id}
          className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm"
        >
          <h3 className="text-xl font-bold text-gray-800">{training.name}</h3>
          <ul className="mt-2 space-y-1">
            {training.exercises.map((exercise: Exercise, index: number) => (
              <li key={index} className="text-gray-700">
                <strong>{exercise.name}</strong> - {exercise.sets} series x{" "}
                {exercise.reps} reps @ {exercise.weight}kg
              </li>
            ))}
          </ul>
          <div className="mt-4 text-gray-800">
            <p>
              <strong>Volumen Total:</strong>{" "}
              {calculateVolume(training.exercises)} kg
            </p>
            <p>
              <strong>Peso Máximo:</strong>{" "}
              {calculateMaxWeight(training.exercises)} kg
            </p>
            <button
              type="button"
              onClick={() => handleExportToJson(training)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 w-full"
            >
              Exportar como JSON
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainingList;
