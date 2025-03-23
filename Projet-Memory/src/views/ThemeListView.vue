<script lang="ts" setup>
import { ref } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { useThemeStore } from '@/stores/themeStore';
import { useRoute } from 'vue-router';
import ThemeList from '@/components/lists/ThemeList.vue';
import ThemeForm from '@/components/forms/ThemeForm.vue';
import type { Theme } from '@/types/Theme.ts';

const route = useRoute();
const categoryId = route.params.id as string;

const categoryStore = useCategoryStore();
const themeStore = useThemeStore();

const categories = categoryStore.categories;
const category = categories.find((cat) => cat.id === categoryId);
const themes = themeStore.themes;

const addThemeToCategory = (theme: Theme, categorieId: number) => {
  // themeStore.addTheme(theme);
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Thèmes</h1>

    <ThemeList :themes="themes" />
    <ThemeForm :categoryId="categoryId" @addTheme="addThemeToCategory"  :theme="null"/>
  </div>
</template>

<style scoped>
</style>