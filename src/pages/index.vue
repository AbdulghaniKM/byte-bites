<template>
  <div
    :class="[
      'flex min-h-screen flex-col items-center justify-center p-8',
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
      Meal by Category
    </h1>

    <!-- Loading State -->
    <div
      v-if="store.isLoading"
      :class="[
        'text-xl',
        `text-${themeStore.getThemeColor('800')}`,
        `dark:text-${themeStore.getThemeColor('100')}`,
      ]"
    >
      Loading meals...
    </div>

    <!-- Error State -->
    <div
      v-else-if="store.error"
      class="p-4 text-red-800 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100"
    >
      Failed to load meals. Please try again.
    </div>

    <!-- Meals Grid -->
    <div
      v-else
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <Card
        v-for="meal in meals"
        :key="meal.idMeal"
        :title="meal.strMeal"
        :image="meal.strMealThumb"
        class="transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <!-- Add any additional meal info here -->
      </Card>
    </div>
  </div>
</template>

<script setup>
  import Card from '@/components/Card.vue';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { onMounted, ref } from 'vue';
  import { useMealByCat } from '../stores/useMealByCat';

  const store = useMealByCat();
  const meals = ref([]);
  const themeStore = useThemeStore();

  onMounted(async () => {
    meals.value = await store.fetchMealsByCategory('Seafood');
  });
</script>
