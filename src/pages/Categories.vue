<template>
  <div
    :class="[
      'min-h-screen p-8',
      'transition-colors duration-300 ease-in-out',
      `bg-${themeStore.getThemeColor('100')}`,
      `dark:bg-${themeStore.getThemeColor('950')}`,
    ]"
  >
    <div class="mx-auto w-full">
      <h1
        class="mb-12 text-center text-3xl font-bold"
        :class="[
          'transition-colors duration-300 ease-in-out',
          `text-${themeStore.getThemeColor('950')}`,
          `dark:text-${themeStore.getThemeColor('50')}`,
        ]"
      >
        All Categories
      </h1>

      <div
        v-if="isLoading"
        class="space-y-8"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="animate-pulse space-y-6"
        >
          <div :class="[`bg-${themeStore.getThemeColor('200')}`, 'h-8 w-48 rounded-lg']"></div>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="j in 6"
              :key="j"
              class="h-40 rounded-lg bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
        </div>
      </div>

      <div
        v-else-if="error"
        class="rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-100"
      >
        {{ error }}
      </div>

      <div
        v-else
        class="space-y-12"
      >
        <div
          v-for="category in filteredCategories"
          :key="category.strCategory"
          class="space-y-6"
        >
          <h2
            :class="[
              'text-2xl font-bold',
              `text-${themeStore.getThemeColor('900')}`,
              `dark:text-${themeStore.getThemeColor('100')}`,
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
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Card from '@/components/Card.vue';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { computed, onMounted } from 'vue';
  import { useMealByCat } from '../stores/useMealByCat';
  import { useMealsCat } from '../stores/useMealsCat';

  const mealsCat = useMealsCat();
  const mealStore = useMealByCat();
  const themeStore = useThemeStore();

  const isLoading = computed(() => mealsCat.isLoading || mealStore.isLoading);
  const error = computed(() => mealsCat.error || mealStore.error);

  const filteredCategories = computed(() => {
    return mealsCat.categories.filter((cat) => cat.strCategory !== 'Pork');
  });

  const categoryMeals = computed(() => mealStore.categoryMeals);

  onMounted(async () => {
    if (mealsCat.categories.length === 0) {
      await mealsCat.fetchCategory();
    }

    if (Object.keys(mealStore.categoryMeals).length === 0) {
      await Promise.all(
        filteredCategories.value.map((category) =>
          mealStore.fetchMealsByCategory(category.strCategory)
        )
      );
    }
  });
</script>
