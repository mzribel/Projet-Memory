<script setup lang="ts">

import DrawerItem, {type IDrawerItem} from "@/components/nav_drawer/components/DrawerItem.vue";

export interface IDrawerCategory {
  title?:string,
  options:IDrawerItem[],
  empty_msg?:string
}
defineProps<{ category: IDrawerCategory }>();
</script>

<template>
  <div class="nav-category">
    <DrawerItem v-if="category.title" :item="{title: category.title}" :is-title="true"></DrawerItem>
    <div v-if="category.options.length > 0" class="item-ctn">
      <DrawerItem v-for="item in category.options" :item="item"></DrawerItem>
    </div>
    <div v-else-if="category.empty_msg" class="no-item">
      {{ category.empty_msg }}
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