import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMealByCat = defineStore('mealByCat', () => {
  const meals = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchMealsByCategory = async (category) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      meals.value = response.data.meals;
      return meals.value;
    } catch (err) {
      error.value = err;
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    meals,
    isLoading,
    error,
    fetchMealsByCategory,
  };
});
