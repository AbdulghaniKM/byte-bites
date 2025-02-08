import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMealByCat = defineStore(
  'mealByCat',
  () => {
    const meals = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const currentCategory = ref('Beef');

    const fetchMealsByCategory = async (category) => {
      // Remove the caching check to always fetch fresh data
      isLoading.value = true;
      error.value = null;
      meals.value = []; // Clear current meals while loading

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        meals.value = response.data.meals;
        currentCategory.value = category;
        return meals.value;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        isLoading.value = false;
      }
    };

    return {
      meals,
      isLoading,
      error,
      currentCategory,
      fetchMealsByCategory,
    };
  },
  {
    persist: {
      paths: ['currentCategory'] // Only persist the selected category, not the meals
    }
  }
);
