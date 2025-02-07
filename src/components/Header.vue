<template>
  <header
    :class="[
      'sahdow-lg sticky top-0 z-50 py-4',
      'border-b transition-colors duration-300 ease-in-out',
      `bg-${themeStore.getThemeColor('900')}`,
      `dark:bg-${themeStore.getThemeColor('950')}`,
      `border-${themeStore.getThemeColor('800')} dark:border-${themeStore.getThemeColor('300')}`,
    ]"
  >
    <div class="container mx-auto px-4">
      <!-- Desktop Menu -->
      <div class="hidden items-center justify-between sm:flex">
        <div class="flex items-center space-x-8">
          <router-link
            to="/"
            class="transform text-2xl font-bold text-white transition-transform duration-200 hover:scale-105"
          >
            Byte-Bites
          </router-link>
          <nav class="flex items-center space-x-6">
            <router-link
              v-for="link in navigationLinks"
              :key="link.path"
              :to="link.path"
              class="font-medium text-gray-300 transition-colors hover:text-white"
              :class="{ 'text-white': route.path === link.path }"
            >
              {{ link.name }}
            </router-link>
          </nav>
        </div>
        <ThemeControls />
      </div>

      <!-- Mobile Menu -->
      <div class="flex items-center justify-between sm:hidden">
        <router-link
          to="/"
          class="transform text-xl font-bold text-white transition-transform duration-200 hover:scale-105"
        >
          AnimalLens
        </router-link>
        <button
          @click="toggleMenu"
          class="relative z-50 rounded-lg p-2 text-white"
          aria-label="Toggle menu"
        >
          <div class="relative h-6 w-6">
            <div
              :class="[
                'absolute h-0.5 w-6 transform bg-current transition-all duration-300',
                isMenuOpen ? 'top-3 rotate-45' : 'top-1',
              ]"
            />
            <div
              :class="[
                'absolute top-3 h-0.5 w-6 transform bg-current transition-all duration-300',
                isMenuOpen ? 'opacity-0' : 'opacity-100',
              ]"
            />
            <div
              :class="[
                'absolute h-0.5 w-6 transform bg-current transition-all duration-300',
                isMenuOpen ? 'top-3 -rotate-45' : 'top-5',
              ]"
            />
          </div>
        </button>
      </div>
      <div
        v-show="isMenuOpen"
        class="fixed inset-0 z-40 sm:hidden"
      >
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-sm"
          @click="toggleMenu"
        />
        <div
          :class="[
            'fixed inset-y-0 right-0 w-64 transform transition-transform duration-300',
            `bg-${themeStore.getThemeColor('900')}`,
            `dark:bg-${themeStore.getThemeColor('950')}`,
            isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          ]"
        >
          <div class="flex h-full flex-col p-6">
            <nav class="space-y-4">
              <router-link
                v-for="link in navigationLinks"
                :key="link.path"
                :to="link.path"
                class="block font-medium text-gray-300 transition-colors hover:text-white"
                :class="{ 'text-white': route.path === link.path }"
                @click="toggleMenu"
              >
                {{ link.name }}
              </router-link>
            </nav>
            <div class="mt-6 space-y-4">
              <p class="text-lg font-medium text-white">Theme Controls</p>
              <ThemeControls />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  import ThemeControls from '@/components/ThemeControls.vue';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const themeStore = useThemeStore();
  const isMenuOpen = ref(false);

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
  ];

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
    document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
  }

  watch(route, () => {
    if (isMenuOpen.value) {
      isMenuOpen.value = false;
      document.body.style.overflow = '';
    }
  });
</script>
