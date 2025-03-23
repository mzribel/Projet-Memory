<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  current: number;
  total: number;
}>();

const progress = computed(() => (props.current / props.total) * 100);
</script>

<template>
  <div class="">
    <div
        class=""
        :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<style scoped>
</style>