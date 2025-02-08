<template>
  <footer
    :class="[
      'mt-auto w-full px-8 py-6',
      'transition-colors duration-300 ease-in-out',
      `bg-${themeStore.getThemeColor('200')}`,
      `dark:bg-${themeStore.getThemeColor('900')}`,
    ]"
  >
    <div class="mx-auto max-w-7xl space-y-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="space-y-4">
          <div
            :class="[
              'text-xl font-bold',
              `text-${themeStore.getThemeColor('950')}`,
              `dark:text-${themeStore.getThemeColor('50')}`,
            ]"
          >
            Byte-Bites
          </div>
          <p
            :class="[
              'text-sm',
              `text-${themeStore.getThemeColor('600')}`,
              `dark:text-${themeStore.getThemeColor('400')}`,
            ]"
          >
            Discover delicious recipes from around the world. Our platform brings you a curated
            collection of meals, making cooking an enjoyable adventure for everyone.
          </p>
        </div>
        <div class="space-y-4">
          <div
            :class="[
              'font-semibold',
              `text-${themeStore.getThemeColor('950')}`,
              `dark:text-${themeStore.getThemeColor('50')}`,
            ]"
          >
            Quick Links
          </div>
          <nav class="flex flex-col gap-2">
            <router-link
              v-for="link in links"
              :key="link.path"
              :to="link.path"
              :class="[
                'text-sm transition-colors duration-200',
                `text-${themeStore.getThemeColor('600')}`,
                `hover:text-${themeStore.getThemeColor('800')}`,
                `dark:text-${themeStore.getThemeColor('400')}`,
                `dark:hover:text-${themeStore.getThemeColor('200')}`,
              ]"
            >
              {{ link.name }}
            </router-link>
          </nav>
        </div>
        <div class="space-y-4">
          <div
            :class="[
              'font-semibold',
              `text-${themeStore.getThemeColor('950')}`,
              `dark:text-${themeStore.getThemeColor('50')}`,
            ]"
          >
            Powered By
          </div>
          <a
            href="https://www.themealdb.com/api.php"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'inline-flex items-center gap-2 text-sm transition-colors duration-200',
              `text-${themeStore.getThemeColor('600')}`,
              `hover:text-${themeStore.getThemeColor('800')}`,
              `dark:text-${themeStore.getThemeColor('400')}`,
              `dark:hover:text-${themeStore.getThemeColor('200')}`,
            ]"
          >
            <Icon
              icon="simple-icons:themealdb"
              class="h-5 w-5"
            />
            TheMealDB API
          </a>
        </div>
      </div>
      <div
        class="border-t pt-4"
        :class="[
          `border-${themeStore.getThemeColor('300')}`,
          `dark:border-${themeStore.getThemeColor('800')}`,
        ]"
      >
        <div
          :class="[
            'text-center text-sm',
            `text-${themeStore.getThemeColor('600')}`,
            `dark:text-${themeStore.getThemeColor('400')}`,
          ]"
        >
          © {{ new Date().getFullYear() }} Byte-Bites. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
  import { useThemeStore } from '@/stores/useThemeStore';
  import { Icon } from '@iconify/vue';
  const themeStore = useThemeStore();
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
  ];
</script>
