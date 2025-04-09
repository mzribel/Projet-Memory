<script setup lang="ts">
defineProps<{ icon?:string, emptyIcon?:boolean }>();
</script>

<template>
<div class="page-subtitle">
  <div v-if="icon || emptyIcon" class="icon">
    <i v-if="icon" :class="icon"></i>
  </div>
  <div>
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.page-subtitle {
  font-size: 14px;
  padding: 0 16px;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  .icon {
    width: 20px;
    height: 20px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>