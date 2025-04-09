<script setup lang="ts">
defineProps<{
  showBar?: boolean;
}>();
</script>

<template>
<div class="note" :class="showBar ? 'show-bar' : ''">
  <slot></slot>
</div>
</template>

<style scoped>
.note {
  padding-left: 40px;
  &.show-bar {
    position: relative;
    &:before {
      position: absolute;
      content: '';
      top: 0;
      left: 20px;
      height: 100%;
      width: 1px;
      background-color: black;
    }
  }

}
</style>