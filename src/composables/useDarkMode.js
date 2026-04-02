import { ref, watch } from 'vue'

const isDarkMode = ref(false)

// Load initial dark mode state from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('darkMode')
  isDarkMode.value = saved ? JSON.parse(saved) : false
}

// Watch for changes and save to localStorage
watch(isDarkMode, (newValue) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('darkMode', JSON.stringify(newValue))
  }
})

export function useDarkMode() {
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  return {
    isDarkMode,
    toggleDarkMode
  }
}