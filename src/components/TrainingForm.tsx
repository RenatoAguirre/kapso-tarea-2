import React, { useState } from "react";
import { Training, Exercise } from "../types";
import Modal from "./Modal";
import ExerciseForm from "./ExerciseForm";

interface TrainingFormProps {
  onAddTraining: (training: Training) => void;
}

const TrainingForm: React.FC<TrainingFormProps> = ({ onAddTraining }) => {
  const [trainingName, setTrainingName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExercise = (exercise: Exercise) => {
    setExercises((prev) => [...prev, exercise]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingName || exercises.length === 0) return;

    const newTraining: Training = {
      id: Date.now().toString(),
      name: trainingName,
      exercises,
    };

    onAddTraining(newTraining);
    setTrainingName("");
    setExercises([]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">
        Agregar Entrenamiento
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del entrenamiento"
          value={trainingName}
          onChange={(e) => setTrainingName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Agregar Ejercicio
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Ejercicios Agregados</h3>
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-2 rounded-lg bg-gray-50"
            >
              <span>
                <strong>{exercise.name}</strong>: {exercise.sets} series x{" "}
                {exercise.reps} reps @ {exercise.weight}kg
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
          >
            Guardar Entrenamiento
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ExerciseForm
          onAddExercise={handleAddExercise}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TrainingForm;
