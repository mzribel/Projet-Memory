<script lang="ts" setup>
import { computed, ref } from 'vue';
import ThemeItem from '../items/ThemeItem.vue';
import ThemeForm from '../forms/ThemeForm.vue';
import { useThemeStore } from '@/stores/themeStore';
import type { Theme } from '@/types/Theme.ts';
import {useCardStore} from "@/stores/cardStore.ts";
import Button from "@/components/buttons/Button.vue";

const cardStore = useCardStore();
const themeStore = useThemeStore();

const isFormOpen = ref(false);
const currentTheme = ref<Theme | null>(null);

const openFormToCreateTheme = () => {
  currentTheme.value = null;
  isFormOpen.value = true;
};

const editTheme = (theme: Theme) => {
  currentTheme.value = theme;
  isFormOpen.value = true;
};

const saveTheme = async (theme: Theme) => {
  await themeStore.addThemeOrUpdateIt(theme);
  closeForm();
};

const closeForm = () => {
  isFormOpen.value = false;
};

const isLoaded = computed(() => themeStore.isLoaded);
const deleteTheme = themeStore.deleteThemeById;

const themes = ref(themeStore.themes);
</script>

<template>
  <div class="container">
    <Button @click="openFormToCreateTheme()" icon="fa-solid fa-plus" label="Ajouter un thème" variant="tonal" size="large"></Button>

    <div v-if="!isLoaded">Chargement... {{ isLoaded }}</div>
    <div class="mescouillesenski"  v-else-if="themes.length">
      <ThemeItem
          v-for="theme in themes"
          :key="theme.id"
          :theme="theme"
          @edit="editTheme"
          @delete="deleteTheme"
      />
    </div>
    <div v-else>
      <p>Aucun theme disponible.</p>
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
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.mescouillesenski {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>