<template>
  <Card
    :class="[
      'transition-all duration-300',
      `bg-${themeStore.getThemeColor('400')}`,
      `hover:bg-${themeStore.getThemeColor('800')}`,
      `dark:bg-${themeStore.getThemeColor('800')}`,
      `dark:hover:bg-${themeStore.getThemeColor('900')}`,
      `border-${themeStore.getThemeColor('800')}`,
      `dark:border-${themeStore.getThemeColor('300')}`,
    ]"
  >
    <CardHeader class="p-0">
      <!-- Mobile Layout (Stack) -->
      <div class="block sm:hidden">
        <img
          class="h-40 w-full rounded-t-xl object-cover"
          :src="image"
          :alt="title"
        />
        <div class="space-y-3 p-4">
          <CardTitle>
            <span
              class="line-clamp-2 break-words text-lg"
              :title="title"
            >
              {{ title }}
            </span>
          </CardTitle>
          <IconButton
            icon="mingcute:external-link-line"
            @click="goToDetails"
            class="w-full justify-center"
          />
        </div>
      </div>

      <!-- Desktop Layout (Row) -->
      <div class="hidden flex-row items-center justify-between gap-4 sm:flex">
        <div class="flex items-center gap-4">
          <div class="p-2">
            <div class="relative h-28 w-28">
              <img
                class="absolute inset-0 h-full w-full rounded-xl object-cover"
                :src="image"
                :alt="title"
              />
            </div>
          </div>
          <CardTitle class="max-w-[200px] lg:max-w-[300px]">
            <span
              class="line-clamp-2 break-words"
              :title="title"
            >
              {{ title }}
            </span>
          </CardTitle>
        </div>
        <CardContent>
          <IconButton
            icon="mingcute:external-link-line"
            @click="goToDetails"
          />
        </CardContent>
      </div>
    </CardHeader>
  </Card>
</template>

<script setup>
  import IconButton from '@/components/IconButton.vue';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import { useMealById } from '@/stores/useMealById';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    image: {},
    id: {
      type: String,
      required: true,
    },
  });

  const themeStore = useThemeStore();
  const router = useRouter();
  const mealStore = useMealById();

  const goToDetails = async () => {
    await mealStore.fetchMealById(props.id);
    router.push(`/details/${props.id}`);
  };
</script>
