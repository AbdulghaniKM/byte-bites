<template>
  <div
    :class="[
      'flex min-h-screen flex-col items-center p-8',
      'transition-colors duration-300 ease-in-out',
      `bg-${themeStore.getThemeColor('100')}`,
      `dark:bg-${themeStore.getThemeColor('950')}`,
    ]"
  >
    <h1
      class="mb-8 text-3xl font-bold"
      :class="[
        'transition-colors duration-300 ease-in-out',
        `text-${themeStore.getThemeColor('950')}`,
        `dark:text-${themeStore.getThemeColor('50')}`,
      ]"
    >
      All Categories & Meals
    </h1>
    <div
      v-if="isLoading"
      :class="[
        'text-xl',
        `text-${themeStore.getThemeColor('800')}`,
        `dark:text-${themeStore.getThemeColor('100')}`,
      ]"
    >
      Loading categories and meals...
    </div>
    <div
      v-else-if="error"
      class="p-4 text-red-800 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100"
    >
      Failed to load content. Please try again.
    </div>
    <div
      v-else
      class="w-full space-y-12 max-w-7xl"
    >
      <div
        v-for="category in filteredCategories"
        :key="category.strCategory"
        class="space-y-6"
      >
        <h2
          class="text-2xl font-bold"
          :class="[
            'transition-colors duration-300 ease-in-out',
            `text-${themeStore.getThemeColor('950')}`,
            `dark:text-${themeStore.getThemeColor('50')}`,
          ]"
        >
          {{ category.strCategory }}
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="meal in categoryMeals[category.strCategory]"
            :key="meal.idMeal"
            :title="meal.strMeal"
            :image="meal.strMealThumb"
            :id="meal.idMeal"
            class="transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
          >
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import Card from '@/components/Card.vue';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { computed, onMounted, ref } from 'vue';
  import { useMealsCat } from '../stores/useMealsCat';
  import { useMealByCat } from '../stores/useMealByCat';
  const mealsCat = useMealsCat();
  const mealStore = useMealByCat();
  const themeStore = useThemeStore();
  const isLoading = ref(true);
  const error = ref(false);
  const categoryMeals = ref({});
  const filteredCategories = computed(() => {
    return mealsCat.categories.filter((cat) => cat.strCategory !== 'Pork');
  });
  const fetchAllCategoryMeals = async () => {
    try {
      isLoading.value = true;
      error.value = false;
      await mealsCat.fetchCategory();
      for (const category of filteredCategories.value) {
        const meals = await mealStore.fetchMealsByCategory(category.strCategory);
        categoryMeals.value[category.strCategory] = meals;
      }
    } catch (err) {
      error.value = true;
      console.error('Error fetching meals:', err);
    } finally {
      isLoading.value = false;
    }
  };
  onMounted(() => {
    fetchAllCategoryMeals();
  });
</script>
