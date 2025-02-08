import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMealByCat = defineStore(
  'mealByCat',
  () => {
    const meals = ref([]);
    const categoryMeals = ref({});
    const isLoading = ref(false);
    const error = ref(null);
    const currentCategory = ref('Beef');

    const fetchMealsByCategory = async (category) => {
      // For single category view (home page)
      isLoading.value = true;
      error.value = null;
      meals.value = [];

      try {
        // If we already have this category cached, use it
        if (categoryMeals.value[category]) {
          meals.value = categoryMeals.value[category];
          currentCategory.value = category;
          return meals.value;
        }

        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );

        // Store in both places
        meals.value = response.data.meals;
        categoryMeals.value[category] = response.data.meals;
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
      categoryMeals,
      isLoading,
      error,
      currentCategory,
      fetchMealsByCategory,
    };
  },
  {
    persist: {
      paths: ['categoryMeals', 'currentCategory'] // Persist both category meals and current selection
    }
  }
);
