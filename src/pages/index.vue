<template>
  <div
    :class="[
      'flex min-h-screen flex-col items-center p-8',
      'transition-colors duration-300 ease-in-out',
      `bg-${themeStore.getThemeColor('100')}`,
      `dark:bg-${themeStore.getThemeColor('950')}`,
    ]"
  >
    <div class="w-full">
      <h1
        class="mb-8 text-center text-3xl font-bold"
        :class="[
          'transition-colors duration-300 ease-in-out',
          `text-${themeStore.getThemeColor('950')}`,
          `dark:text-${themeStore.getThemeColor('50')}`,
        ]"
      >
        Welcome to Byte-Bites, your go-to destination for delicious recipes!
      </h1>
      <div class="relative mb-8 w-full max-w-full">
        <div
          ref="tabsContainer"
          class="scrollbar-hide flex overflow-x-auto"
          style="scroll-behavior: smooth"
        >
          <div class="flex w-full space-x-4 px-4">
            <Tab
              v-for="category in filteredCategories"
              :key="category"
              :is-active="activeCategory === category.strCategory"
              :is-loading="store.isLoading"
              @click="selectCategory(category.strCategory)"
              class="flex-shrink-0"
            >
              {{ category.strCategory }}
            </Tab>
          </div>
        </div>
        <div
          class="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r opacity-90"
          :class="[
            `from-${themeStore.getThemeColor('100')}`,
            `dark:from-${themeStore.getThemeColor('950')}`,
            'via-transparent to-transparent',
          ]"
        ></div>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l opacity-90"
          :class="[
            `from-${themeStore.getThemeColor('100')}`,
            `dark:from-${themeStore.getThemeColor('950')}`,
            'via-transparent to-transparent',
          ]"
        ></div>
      </div>
    </div>
    <div class="w-full">
      <div
        v-if="store.isLoading"
        class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="i in 6"
          :key="i"
          :class="[
            'animate-pulse rounded-lg border shadow-sm',
            `bg-${themeStore.getThemeColor('100')}`,
            `dark:bg-${themeStore.getThemeColor('800')}`,
          ]"
        >
          <div class="flex flex-row items-center justify-between p-6">
            <div class="flex flex-row items-center gap-4">
              <div class="flex items-center gap-2 p-2">
                <div class="h-28 w-28 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div class="flex-1 space-y-2">
                <div class="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div class="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
            <div class="h-9 w-9 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
      <div
        v-else-if="store.error"
        class="rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-100"
      >
        Failed to load meals. Please try again.
      </div>
      <div
        v-else
        class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
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
  </div>
</template>
<script setup>
  import Card from '@/components/Card.vue';
  import Tab from '@/components/Tab.vue';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMealByCat } from '../stores/useMealByCat';
  import { useMealsCat } from '../stores/useMealsCat';
  const store = useMealByCat();
  const mealsCat = useMealsCat();
  const meals = computed(() => store.meals);
  const themeStore = useThemeStore();
  const router = useRouter();
  const activeCategory = computed({
    get: () => store.currentCategory,
    set: (value) => (store.currentCategory = value),
  });
  const filteredCategories = computed(() => {
    return mealsCat.categories.filter((cat) => cat.strCategory !== 'Pork');
  });
  const selectCategory = async (category) => {
    if (store.isLoading) return;
    activeCategory.value = category;
    await store.fetchMealsByCategory(category);
  };
  onMounted(async () => {
    if (mealsCat.categories.length === 0) {
      await mealsCat.fetchCategory();
    }
    if (store.meals.length === 0) {
      await store.fetchMealsByCategory(activeCategory.value);
    }
  });
</script>
<style scoped>
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
</style>
