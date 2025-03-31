<script lang="ts" setup>
import { useCategoryStore } from '@/stores/categoryStore';
import { useThemeStore } from '@/stores/themeStore';
import { useRoute } from 'vue-router';
import ThemeList from '@/components/lists/ThemeList.vue';
import ThemeForm from '@/components/forms/ThemeForm.vue';
import type { Theme } from '@/types/Theme.ts';
import LayoutDefault from "@/layouts/LayoutDefault.vue";

const route = useRoute();
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