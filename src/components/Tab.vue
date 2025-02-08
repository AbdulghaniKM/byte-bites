<template>
  <button
    :class="[
      'rounded-lg px-4 py-2 transition-all duration-300',
      isActive
        ? `bg-${themeColor('600')} text-white`
        : `bg-${themeColor('200')} dark:bg-${themeColor('800')}`,
      isLoading && 'cursor-not-allowed opacity-50',
    ]"
    @click="$emit('click')"
    :disabled="isLoading"
  >
    <div class="flex items-center gap-2">
      <slot></slot>
      <div
        v-if="isLoading"
        :class="[
          'h-4 w-4 animate-spin rounded-full border-2 border-opacity-30',
          `border-${themeColor('500')}`,
          `border-t-${themeColor('500')}`,
        ]"
      ></div>
    </div>
  </button>
</template>
<script setup>
  import { useThemeStore } from '@/stores/useThemeStore';
  const props = defineProps({
    isActive: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  });
  defineEmits(['click']);
  const themeStore = useThemeStore();
  const themeColor = (shade) => themeStore.getThemeColor(shade);
</script>
