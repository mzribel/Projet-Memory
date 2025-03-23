<script lang="ts" setup>
import { ref } from 'vue';
import type { Theme } from '@/types/Theme.ts';
import ThemeItem from '../items/ThemeItem.vue';
import ThemeForm from '../forms/ThemeForm.vue';
import { useThemeStore } from "@/stores/themeStore.ts";

const themeStore = useThemeStore();
const themes = themeStore.themes;

const isFormOpen = ref(false);
const currentTheme = ref<Theme | null>(null);

const openForm = () => {
  currentTheme.value = null;
  isFormOpen.value = true;
};

const editTheme = (theme: Theme) => {
  currentTheme.value = theme;
  isFormOpen.value = true;
};

const saveTheme = (theme: Theme) => {
  themeStore.addThemeOrUpdateIt(theme);
  closeForm();
};

const deleteTheme = (themeId: string) => {
  themeStore.deleteThemeById(themeId);
};

const closeForm = () => {
  isFormOpen.value = false;
};
</script>

<template>
  <div>
    <h2 class="">Thèmes de la catégorie</h2>
    <button @click="openForm()" class="">
      Ajouter un thème
    </button>
    <div v-if="themes.length">
      <ThemeItem
          v-for="theme in themes"
          :key="theme.id"
          :theme="theme"
          @edit="editTheme"
          @delete="deleteTheme"
      />
    </div>
    <div v-else>
      <p>Aucun thème disponible. Créez-en un !</p>
    </div>
    <ThemeForm
        v-if="isFormOpen"
        :theme="currentTheme"
        @save="saveTheme"
        @close="closeForm"
    />
  </div>
</template>

<style scoped>
</style>