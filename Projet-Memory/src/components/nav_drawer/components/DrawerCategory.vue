<script setup lang="ts">
import DrawerItem from "@/components/nav_drawer/components/DrawerItem.vue";

defineProps<{
  title?:string
}>();

</script>

<template>
  <div class="nav-category">
    <DrawerItem v-if="title" :title="title" :is-title="true"></DrawerItem>
    <div class="item-ctn">
      <slot></slot>
    </div>
    <slot name="details"></slot>
  </div>
</template>

<style scoped>
.nav-category {
  display: flex;
  flex-direction: column;
  &.padding-left .item-ctn {
    padding-left: 15px;
    position: relative;
    &:before {
      position: absolute;
      content: "";
      height: 100%;
      width: 1px;
      background-color: #000;
      top: 0;
      left: 15px;
    }
  }
  &:not(:last-of-type) {
    margin-bottom: 1px;
    position:relative;
  }
}
</style>