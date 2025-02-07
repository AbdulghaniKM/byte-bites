import { ref } from 'vue';

// Initialize dark mode based on system preference or stored value
const isDarkMode = ref(
  localStorage.getItem('dark-mode') === 'true' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
);

function initTheme() {
  updateTheme(); // Apply theme immediately on init

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    isDarkMode.value = e.matches;
    updateTheme();
  });
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  updateTheme();
}

function updateTheme() {
  localStorage.setItem('dark-mode', isDarkMode.value);

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
}

// Initialize theme on import
initTheme();

export { initTheme, isDarkMode, toggleTheme };
