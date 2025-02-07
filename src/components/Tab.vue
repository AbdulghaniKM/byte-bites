<template>
  <button
    :class="[
      'rounded-lg px-4 py-2 transition-all duration-300',
      isActive
        ? `bg-${themeColor('600')} text-white`
        : `bg-${themeColor('200')} dark:bg-${themeColor('800')}`,
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/useThemeStore';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);

const themeStore = useThemeStore();
const themeColor = (shade) => themeStore.getThemeColor(shade);
</script>
