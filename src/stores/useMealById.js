import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMealById = defineStore(
  'mealById',
  () => {
    const meal = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchMealById = async (id) => {
      if (!id) return;

      isLoading.value = true;
      error.value = null;
      meal.value = null; // Reset meal before fetching

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const fetchedMeal = response.data.meals?.[0] || null;
        meal.value = fetchedMeal;
      } catch (err) {
        console.error('Error fetching meal:', err);
        error.value = err.message; // Only store error message
        meal.value = null;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      meal,
      isLoading,
      error,
      fetchMealById,
    };
  },
  {
    persist: {
      paths: ['meal'], // Only persist the meal data
    },
  }
);
