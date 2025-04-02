<script lang="ts" setup>
import { useRoute } from 'vue-router';
import CardList from '@/components/lists/CardList.vue';
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import {useThemeStore} from "@/stores/themeStore.ts";

const route = useRoute();
const themeId = route.fullPath.split('/').pop();

const themeStore = useThemeStore();

const themes = themeStore.themes;
const theme = themes.find((cat) => cat.id === themeId);

</script>

<template>
  <layout-default>
    <div>
      <h1 class="">Cartes dans {{ theme?.name }}</h1>
      <p class="">{{ theme?.description }}</p>

      <CardList :theme-id="themeId" />
    </div>
  </layout-default>
</template>

<style scoped>
</style>