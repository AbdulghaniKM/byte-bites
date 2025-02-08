<template>
  <div
    :class="[
      'min-h-screen px-4 py-8 md:px-6',
      'transition-colors duration-300 ease-in-out',
      `bg-${themeStore.getThemeColor('100')}`,
      `dark:bg-${themeStore.getThemeColor('950')}`,
    ]"
  >
    <div
      v-if="isLoading"
      class="flex min-h-[80vh] items-center justify-center"
    >
      <div
        :class="[
          'h-16 w-16 animate-spin rounded-full border-4 border-opacity-30',
          `border-${themeStore.getThemeColor('500')}`,
          `border-t-${themeStore.getThemeColor('500')}`,
        ]"
      ></div>
    </div>
    <div
      v-else-if="error"
      class="p-8 text-center"
    >
      <p :class="['text-lg font-medium', `text-${themeStore.getThemeColor('600')}`]">
        {{ error }}
      </p>
    </div>
    <div
      v-else-if="meal"
      class="max-w-6xl mx-auto"
    >
      <Button
        @click="router.back()"
        :class="[
          'mb-6 flex items-center gap-2 rounded-lg px-4 py-2',
          `bg-${themeStore.getThemeColor('600')}`,
          `dark:bg-${themeStore.getThemeColor('800')}`,
          `text-${themeStore.getThemeColor('50')}`,
          `dark:text-${themeStore.getThemeColor('50')}`,
          'shadow-lg transition-transform hover:scale-[1.02]',
        ]"
      >
        <Icon
          icon="material-symbols:arrow-back-rounded"
          class="w-5 h-5"
        />
        <span>Back to recipes</span>
      </Button>
      <div class="grid gap-8 lg:grid-cols-12">
        <div
          :class="[
            'overflow-hidden rounded-xl shadow-xl lg:col-span-4',
            `bg-${themeStore.getThemeColor('50')}`,
            `dark:bg-${themeStore.getThemeColor('900')}`,
          ]"
        >
          <div class="p-6">
            <img
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
              class="object-cover w-full mb-6 rounded-lg shadow-lg aspect-square"
            />
            <h1
              :class="[
                'mb-4 text-2xl font-bold',
                `text-${themeStore.getThemeColor('900')}`,
                `dark:text-${themeStore.getThemeColor('50')}`,
              ]"
            >
              {{ meal.strMeal }}
            </h1>
            <div class="flex flex-wrap gap-3 mb-6">
              <span
                v-for="(tag, index) in [
                  { icon: 'material-symbols:category', text: meal.strCategory },
                  { icon: 'material-symbols:location-on', text: meal.strArea },
                ]"
                :key="index"
                :class="[
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
                  `bg-${themeStore.getThemeColor('200')}`,
                  `dark:bg-${themeStore.getThemeColor('800')}`,
                  `text-${themeStore.getThemeColor('800')}`,
                  `dark:text-${themeStore.getThemeColor('100')}`,
                ]"
              >
                <Icon :icon="tag.icon" />
                {{ tag.text }}
              </span>
            </div>
            <a
              v-if="meal.strYoutube"
              :href="meal.strYoutube"
              target="_blank"
              :class="[
                'flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white',
                `bg-${themeStore.getThemeColor('600')}`,
                `dark:bg-${themeStore.getThemeColor('800')}`,
                `hover:bg-red-600 dark:hover:bg-red-600`,
                'transition-all hover:scale-[1.02]',
              ]"
            >
              <Icon
                icon="mdi:youtube"
                class="text-xl"
              />
              Watch on YouTube
            </a>
          </div>
        </div>
        <div class="space-y-8 lg:col-span-8">
          <div
            :class="[
              'overflow-hidden rounded-xl shadow-xl',
              `bg-${themeStore.getThemeColor('50')}`,
              `dark:bg-${themeStore.getThemeColor('900')}`,
            ]"
          >
            <div class="p-6">
              <h2
                :class="[
                  'mb-6 flex items-center gap-2 text-2xl font-bold',
                  `text-${themeStore.getThemeColor('900')}`,
                  `dark:text-${themeStore.getThemeColor('50')}`,
                ]"
              >
                <Icon icon="material-symbols:restaurant" />
                Ingredients
              </h2>
              <div class="grid gap-4 sm:grid-cols-2">
                <div
                  v-for="i in getIngredients(meal)"
                  :key="i.ingredient"
                  :class="[
                    'flex items-center gap-3 rounded-lg p-3',
                    `bg-${themeStore.getThemeColor('100')}`,
                    `dark:bg-${themeStore.getThemeColor('800')}`,
                  ]"
                >
                  <img
                    :src="`https://www.themealdb.com/images/ingredients/${i.ingredient}-Small.png`"
                    :alt="i.ingredient"
                    class="object-cover w-12 h-12 rounded"
                  />
                  <div>
                    <span class="font-medium">{{ i.ingredient }}</span>
                    <span
                      :class="[
                        'block text-sm',
                        `text-${themeStore.getThemeColor('600')}`,
                        `dark:text-${themeStore.getThemeColor('400')}`,
                      ]"
                    >
                      {{ i.measure }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="[
              'overflow-hidden rounded-xl shadow-xl',
              `bg-${themeStore.getThemeColor('50')}`,
              `dark:bg-${themeStore.getThemeColor('900')}`,
            ]"
          >
            <div class="p-6">
              <h2
                :class="[
                  'mb-6 flex items-center gap-2 text-2xl font-bold',
                  `text-${themeStore.getThemeColor('900')}`,
                  `dark:text-${themeStore.getThemeColor('50')}`,
                ]"
              >
                <Icon icon="material-symbols:menu-book" />
                Instructions
              </h2>
              <div
                :class="[
                  'rounded-lg p-6',
                  `bg-${themeStore.getThemeColor('100')}`,
                  `dark:bg-${themeStore.getThemeColor('800')}`,
                ]"
              >
                <p
                  :class="[
                    'whitespace-pre-line leading-relaxed',
                    `text-${themeStore.getThemeColor('700')}`,
                    `dark:text-${themeStore.getThemeColor('300')}`,
                  ]"
                >
                  {{ meal.strInstructions }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import Button from '@/components/ui/button/Button.vue';
  import { useMealById } from '@/stores/useMealById';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { Icon } from '@iconify/vue';
  import { onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute();
  const router = useRouter();
  const mealStore = useMealById();
  const themeStore = useThemeStore();
  const { meal, isLoading, error } = mealStore;
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient,
          measure: measure || '',
        });
      }
    }
    return ingredients;
  };
  onMounted(async () => {
    if (!meal.value && route.params.id) {
      await mealStore.fetchMealById(route.params.id);
    }
  });
</script>
