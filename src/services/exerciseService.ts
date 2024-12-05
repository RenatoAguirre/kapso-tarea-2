import axios from "axios";

const API_BASE_URL = "https://wger.de/api/v2/exercise/";

export const fetchExercises = async () => {
  const API_KEY = import.meta.env.VITE_WGER_API_KEY;
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Token ${API_KEY}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
};
