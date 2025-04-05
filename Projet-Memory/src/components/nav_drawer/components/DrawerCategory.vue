<script setup lang="ts">
import DrawerItem from "@/components/nav_drawer/components/DrawerItem.vue";

defineProps<{
  title?:string
  empty_message?:string
}>();

</script>

<template>
  <div class="nav-category">
    <DrawerItem v-if="title" :title="title" :is-title="true"></DrawerItem>
    <div v-if="$slots.default" class="item-ctn">
      <slot></slot>
    </div>
    <div v-else-if="empty_message" class="no-item">
      {{ empty_message }}
      hiyo
    </div>
  </div>
</template>

<style scoped>
.nav-category {
  display: flex;
  flex-direction: column;
  &:not(:last-of-type) {
    margin-bottom: 1px;
    position:relative;
    &::after {
      //content:"";
      position:absolute;
      bottom:-1px;
      left:16px;
      height: 1px;
      width: calc(100% - 32px);
      background-color: #CAC4D0;
    }
  }

  .no-item {
    font-size: 14px;
    font-style: italic;
    opacity: .8;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>