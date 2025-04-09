<script setup lang="ts">
defineProps<{ type: "normal" | "title" }>();
</script>

<template>
<div class="block" :class="type == 'title' ? 'title' : ''">
  <slot></slot>
</div>
</template>

<style scoped>
.block {
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;

  &.title {
    padding: 32px 40px;
    gap: 12px;
    margin-bottom: 32px;
  }
}
</style>