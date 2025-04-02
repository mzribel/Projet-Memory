<script lang="ts" setup>
import { useThemeStore } from '@/stores/themeStore';
import ThemeList from '@/components/lists/ThemeList.vue';
import type { Theme } from '@/types/Theme.ts';
import LayoutDefault from "@/layouts/LayoutDefault.vue";

const themeStore = useThemeStore();

const themes = themeStore.themes;

const addThemeToCategory = (theme: Theme, categorieId: number) => {
  // themeStore.addTheme(theme);
};
</script>

<template>
  <layout-default>
    <div>
      <h1 >Thèmes</h1>

      <ThemeList :themes="themes" />
    </div>
  </layout-default>
</template>

<style scoped>
</style>