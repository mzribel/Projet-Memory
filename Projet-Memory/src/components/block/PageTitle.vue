<script setup lang="ts">
defineProps<{ alignCenter?: boolean}>();
</script>

<template>
<div class="page-title" :class="alignCenter ? 'align-center' : ''">
  <div class="left"><slot name="left"></slot></div>
  <div class="right"><slot name="right"></slot></div>
</div>
</template>

<style scoped>
.page-title {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  &.align-center {
    align-items: center;
  }
  .left {
    align-self: center;
  }
}
</style>