import React, { useState, useEffect } from "react";
import { fetchExercises } from "../services/exerciseService";
import { Exercise } from "../types";

interface ExerciseFormProps {
  onAddExercise: (exercise: Exercise) => void;
  onClose: () => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  onAddExercise,
  onClose,
}) => {
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    sets: 0,
    reps: 0,
    weight: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      try {
        const results = await fetchExercises();
        console.log(results.map((item: any) => ({ name: item.name })));
        setSearchResults(results.map((item: any) => ({ name: item.name })));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    search();
  }, []);

  const filterSearch = (search: string, exercisesNames: Exercise[]) => {
    return exercisesNames.filter((exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredResults = filterSearch(searchTerm, searchResults);

  const handleSelectExercise = (selectedExercise: Exercise) => {
    setExercise({ ...exercise, name: selectedExercise.name });
    setSearchTerm(selectedExercise.name);
    setSearching(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(exercise);
    if (!exercise.name || exercise.sets <= 0 || exercise.reps <= 0) return;

    onAddExercise(exercise);
    setExercise({ name: "", sets: 0, reps: 0, weight: 0 });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Agregar Ejercicio</h2>

      <div>
        <label
          htmlFor="exercise-search"
          className="block text-sm font-medium text-gray-700"
        >
          Buscar Ejercicio
        </label>
        <input
          id="exercise-search"
          type="text"
          placeholder="Buscar ejercicio por nombre"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setExercise({ ...exercise, name: e.target.value });
            setSearching(true);
          }}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        {isLoading && <p className="text-sm text-gray-500">Buscando...</p>}
        {!isLoading && searchResults.length > 0 && searching && (
          <ul className="border border-gray-300 rounded-lg mt-2 max-h-40 overflow-auto">
            {filteredResults.map((result, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectExercise(result)}
              >
                {result.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label
          htmlFor="series"
          className="block text-sm font-medium text-gray-700"
        >
          Series
        </label>
        <input
          id="series"
          type="number"
          placeholder="Series"
          value={exercise.sets}
          onChange={(e) =>
            setExercise({ ...exercise, sets: parseInt(e.target.value) })
          }
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label
          htmlFor="reps"
          className="block text-sm font-medium text-gray-700"
        >
          Repeticiones
        </label>
        <input
          id="reps"
          type="number"
          placeholder="Reps"
          value={exercise.reps}
          onChange={(e) =>
            setExercise({ ...exercise, reps: parseInt(e.target.value) })
          }
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label
          htmlFor="weight"
          className="block text-sm font-medium text-gray-700"
        >
          Peso
        </label>
        <div className="relative">
          <input
            id="weight"
            type="number"
            placeholder="Peso"
            value={exercise.weight}
            onChange={(e) =>
              setExercise({ ...exercise, weight: parseFloat(e.target.value) })
            }
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <span className="absolute right-2 top-2 text-gray-500">kg</span>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;
