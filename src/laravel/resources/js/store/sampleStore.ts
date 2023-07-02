import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSampleStore = defineStore("sample", () => {
  const defaultCount = 0;
  const originalCount = ref(defaultCount);
  const count = computed(() => originalCount.value);
  const setCount = (newCount: number) => (originalCount.value = newCount);
  const increment = () => originalCount.value++;
  const reset = () => (originalCount.value = defaultCount);
  return {
    count,
    setCount,
    increment,
    reset,
  };
});
