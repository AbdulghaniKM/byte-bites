import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // Theme state
  const currentTheme = ref(localStorage.getItem('color-theme') || 'hippieBlue');
  const isDarkMode = ref(
    localStorage.getItem('dark-mode') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Theme definitions
  const themes = {
    slate: {
      name: 'slate',
      color: 'bg-slate-500',
      from: 'slate',
    },
    zinc: {
      name: 'zinc',
      color: 'bg-zinc-500',
      from: 'zinc',
    },
    rose: {
      name: 'rose',
      color: 'bg-rose-500',
      from: 'rose',
    },
    orange: {
      name: 'orange',
      color: 'bg-orange-500',
      from: 'orange',
    },
    yellow: {
      name: 'yellow',
      color: 'bg-yellow-500',
      from: 'yellow',
    },
    lime: {
      name: 'lime',
      color: 'bg-lime-500',
      from: 'lime',
    },
    emerald: {
      name: 'emerald',
      color: 'bg-emerald-500',
      from: 'emerald',
    },
    cyan: {
      name: 'cyan',
      color: 'bg-cyan-500',
      from: 'cyan',
    },
    sky: {
      name: 'sky',
      color: 'bg-sky-500',
      from: 'sky',
    },
    blue: {
      name: 'blue',
      color: 'bg-blue-500',
      from: 'blue',
    },
    indigo: {
      name: 'indigo',
      color: 'bg-indigo-500',
      from: 'indigo',
    },
    purple: {
      name: 'purple',
      color: 'bg-purple-500',
      from: 'purple',
    },
    hippieBlue: {
      name: 'hippieBlue',
      color: 'bg-hippieBlue-500',
      from: 'hippieBlue',
    },
  };

  // Theme functions
  function setTheme(theme) {
    if (!themes[theme]) {
      console.error('Invalid theme:', theme);
      return;
    }
    currentTheme.value = theme;
    localStorage.setItem('color-theme', theme);
  }

  function getThemeColor(shade = '500') {
    const theme = themes[currentTheme.value];
    if (!theme) {
      console.error('Theme not found:', currentTheme.value);
      return 'gray';
    }
    return `${theme.from}-${shade}`;
  }

  // Dark mode functions
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    updateDarkMode();
  }

  function updateDarkMode() {
    localStorage.setItem('dark-mode', isDarkMode.value);
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }

  // Initialize
  function init() {
    updateDarkMode();
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      isDarkMode.value = e.matches;
      updateDarkMode();
    });
  }

  // Initialize on store creation
  init();

  return {
    currentTheme,
    isDarkMode,
    themes,
    setTheme,
    getThemeColor,
    toggleDarkMode,
  };
});
