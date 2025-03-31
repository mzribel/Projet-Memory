<script setup lang="ts">

import DrawerCategory, {type IDrawerCategory} from "@/components/nav_drawer/components/DrawerCategory.vue";

defineProps<{ categories: IDrawerCategory[] }>();

</script>

<template>
<nav class="nav-drawer">
  <DrawerCategory v-for="category in categories" :category="category"></DrawerCategory>
</nav>
</template>

<style scoped lang="scss">
.nav-drawer {
  background-color: #FEF7FF;
  font-family: "Roboto", sans-serif;
  padding: 12px;
  height: 100%;
  width: 360px;
  color: #49454F;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

</style>