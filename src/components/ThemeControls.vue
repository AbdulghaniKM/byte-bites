<template>
  <div class="flex items-center space-x-4">
    <!-- Theme Selector -->
    <button
      @click="isThemeMenuOpen = !isThemeMenuOpen"
      class="flex items-center space-x-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20"
    >
      <Icon
        icon="solar:palette-bold"
        class="h-4 w-4"
      />
      <span class="capitalize">{{ themeStore.currentTheme }}</span>
    </button>

    <!-- Dark Mode Toggle -->
    <IconButton
      @click="themeStore.toggleDarkMode"
      :icon="themeStore.isDarkMode ? 'solar:moon-bold' : 'solar:sun-bold'"
      class="rounded-lg bg-white/10 px-4 py-2 font-medium text-white transition-all hover:bg-white/20"
    />

    <!-- Theme Menu -->
    <div
      v-if="isThemeMenuOpen"
      ref="themeMenuRef"
      class="absolute right-4 top-16 z-50 w-48 rounded-lg bg-white shadow-lg dark:bg-gray-800"
    >
      <div class="space-y-1 p-2">
        <button
          v-for="theme in Object.values(themeStore.themes)"
          :key="theme.name"
          @click="handleThemeSelect(theme.name)"
          class="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
          :class="{
            'bg-gray-100 dark:bg-gray-700': themeStore.currentTheme === theme.name,
          }"
        >
          <div :class="`h-4 w-4 rounded-full ${theme.color}`" />
          <span class="capitalize text-gray-900 dark:text-white">{{ theme.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { onClickOutside } from '@vueuse/core';
import IconButton from '@/components/IconButton.vue';
import { useThemeStore } from '@/stores/useThemeStore';

const themeStore = useThemeStore();
const isThemeMenuOpen = ref(false);
const themeMenuRef = ref(null);

function handleThemeSelect(theme) {
  themeStore.setTheme(theme);
  isThemeMenuOpen.value = false;
}

onClickOutside(themeMenuRef, () => {
  if (isThemeMenuOpen.value) {
    isThemeMenuOpen.value = false;
  }
});
</script>
