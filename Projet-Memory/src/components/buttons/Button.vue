<script setup lang="ts">
defineProps<{
  type?: "icon-btn" | "fab-btn",
  size?: "medium" | "large" | "small",
  variant?: "outlined" | "filled" | "tonal",
  color?: "primary" | "secondary",
  icon?: string,
  label?: string,
}>();

</script>

<template>
<button :class="[type, size, variant, color, { 'square': !label}]">
  <i v-if="icon" :class="icon"></i>
  <label v-if="label">{{label}}</label>
  <slot></slot>
</button>
</template>

<style scoped lang="scss">
@use "./../../assets/css/buttons.scss";
</style>