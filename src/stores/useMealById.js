import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMealById = defineStore('mealById', () => {
  const meal = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchMealById = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      meal.value = response.data.meals;
      return meal.value;
    } catch (err) {
      error.value = err;
      return [];
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
});
