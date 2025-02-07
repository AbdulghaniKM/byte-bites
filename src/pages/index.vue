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
      Welcome to Byte-Bites, your go-to destination for delicious recipes!
    </h1>
    <!-- Category Tabs -->
    <div class="relative w-full max-w-full mb-8">
      <div
        ref="tabsContainer"
        class="flex overflow-x-auto scrollbar-hide"
        style="scroll-behavior: smooth"
      >
        <div class="flex w-full px-4 space-x-4">
          <Tab
            v-for="category in filteredCategories"
            :key="category"
            :is-active="activeCategory === category.strCategory"
            @click="selectCategory(category.strCategory)"
            class="flex-shrink-0"
          >
            {{ category.strCategory }}
          </Tab>
        </div>
      </div>
      <!-- Refined Gradient Shadows -->
      <div
        class="absolute inset-y-0 left-0 w-16 pointer-events-none bg-gradient-to-r opacity-90"
        :class="[
          `from-${themeStore.getThemeColor('100')}`,
          `dark:from-${themeStore.getThemeColor('950')}`,
          'via-transparent to-transparent',
        ]"
      ></div>
      <div
        class="absolute inset-y-0 right-0 w-16 pointer-events-none bg-gradient-to-l opacity-90"
        :class="[
          `from-${themeStore.getThemeColor('100')}`,
          `dark:from-${themeStore.getThemeColor('950')}`,
          'via-transparent to-transparent',
        ]"
      ></div>
    </div>

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
        :id="meal.idMeal"
        class="transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
      >
      </Card>
    </div>
  </div>
</template>

<script setup>
  import Card from '@/components/Card.vue';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { onMounted, ref, computed } from 'vue';
  import { useMealByCat } from '../stores/useMealByCat';
  import { useMealsCat } from '../stores/useMealsCat';
  import Tab from '@/components/Tab.vue';

  const store = useMealByCat();
  const mealsCat = useMealsCat();
  const meals = ref([]);
  const themeStore = useThemeStore();

  // Add these new refs
  const categories = ref([]);
  const activeCategory = ref('Beef');

  // Add computed property for filtered categories
  const filteredCategories = computed(() => {
    return categories.value.filter((cat) => cat.strCategory !== 'Pork');
  });

  // Add this new method
  const selectCategory = async (category) => {
    activeCategory.value = category;
    meals.value = await store.fetchMealsByCategory(category);
  };

  onMounted(async () => {
    // If initial category is 'Pork', change it to 'Beef'
    if (activeCategory.value === 'Pork') {
      activeCategory.value = 'Beef';
    }
    meals.value = await store.fetchMealsByCategory(activeCategory.value);
    categories.value = await mealsCat.fetchCategory();
  });
</script>

<style scoped>
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
</style>
