<template>
  <Card
    :class="`bg-${themeStore.getThemeColor('400')} hover:bg-${themeStore.getThemeColor('800')} dark:bg-${themeStore.getThemeColor('800')} dark:hover:bg-${themeStore.getThemeColor('900')} border-${themeStore.getThemeColor('800')} dark:border-${themeStore.getThemeColor('300')}`"
  >
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="flex flex-row items-center gap-4">
        <div class="flex items-center gap-2 p-2">
          <img
            class="h-28 w-28 rounded-xl"
            :src="image"
            alt="image"
          />
        </div>
        <CardTitle class="flex-1 leading-normal tracking-normal">
          {{ title }}
        </CardTitle>
      </div>
      <CardContent>
        <IconButton
          icon="mingcute:external-link-line"
          @click="goToDetails"
        />
      </CardContent>
    </CardHeader>
  </Card>
</template>

<script setup>
  import IconButton from '@/components/IconButton.vue';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  const goToDetails = () => {
    router.push(`/details/${props.id}`);
  };
</script>
