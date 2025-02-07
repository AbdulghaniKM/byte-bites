<template>
  <Button
    :class="[
      'rounded-lg border-none bg-hippie-blue-50 shadow-none transition-all',
      `bg-${themeStore.getThemeColor('900')}`,
      `hover:bg-${themeStore.getThemeColor('900')}`,
      `dark:bg-${themeStore.getThemeColor('200')}/10`,
      `dark:hover:bg-${themeStore.getThemeColor('400')}/20`,
    ]"
    :iconClass="[
      'h-5 w-5',
      `text-${themeStore.getThemeColor('100')}`,
      `dark:text-${themeStore.getThemeColor('300')}`,
    ]"
    :icon="icon"
  />
</template>
<script setup>
  import Button from '@/components/ui/button/Button.vue';
  import { useThemeStore } from '@/stores/useThemeStore';
  const themeStore = useThemeStore();
  defineProps({
    icon: {
      type: String,
      required: true,
    },
  });
</script>
