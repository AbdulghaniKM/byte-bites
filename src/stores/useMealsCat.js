import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMealsCat = defineStore(
  'mealsCat',
  () => {
    const categories = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchCategory = async () => {
      if (categories.value.length > 0) {
        return categories.value;
      }

      isLoading.value = true;
      error.value = null;
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
        categories.value = response.data.meals;
        return categories.value;
      } catch (err) {
        error.value = err.message; // Only store error message
        return [];
      } finally {
        isLoading.value = false;
      }
    };

    return {
      categories,
      isLoading,
      error,
      fetchCategory,
    };
  },
  {
    persist: {
      paths: ['categories'] // Only persist categories data
    }
  }
);
