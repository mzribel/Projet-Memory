<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  current: number;
  total: number;
}>();

const progress = computed(() => (props.current / props.total) * 100);
</script>

<template>
  <div class="w-full bg-gray-300 rounded-full h-4 mb-4">
    <div
        class="bg-blue-600 h-4 rounded-full"
        :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<style scoped>
/* Ajoute des styles si nécessaire */
</style>