<script setup lang="ts">

</script>

<template>
<div class="section-title">
  <div class="left">
    <slot name="left"></slot>
  </div>
  <div class="right">
    <slot name="right"></slot>
  </div>
</div>
</template>

<style scoped>
.section-title {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 40px;
  justify-content: space-between;
  position: relative;
  &:before {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: black;
  }
  .left, .right {
    display: flex;
    gap: 8px;
    align-items: center;
    position: relative;
    z-index: 2;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -8px;
      z-index: -1;
      width: calc(100% + 16px);
      height: 100%;
      background-color: white;
    }
  }
}
</style>