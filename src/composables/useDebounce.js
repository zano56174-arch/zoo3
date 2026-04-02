import { ref, watch } from 'vue'

export function useDebounce(value, delay = 300) {
  const debouncedValue = ref(value.value)

  watch(value, (newValue) => {
    setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  return debouncedValue
}