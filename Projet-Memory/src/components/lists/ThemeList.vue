<script lang="ts" setup>
import { ref, computed } from 'vue';
import ThemeItem from '../items/ThemeItem.vue';
import ThemeForm from '../forms/ThemeForm.vue';
import Modal from '@/components/modal/Modal.vue';
import { useThemeStore } from '@/stores/themeStore';
import type { Theme } from '@/types/Theme.ts';

const themeStore = useThemeStore();

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const currentTheme = ref<Theme | null>(null);

const openFormToCreateTheme = () => {
  currentTheme.value = null;
  modalRef.value?.openModal();
};

const editTheme = (theme: Theme) => {
  currentTheme.value = theme;
  modalRef.value?.openModal();
};

const saveTheme = async (theme: Theme) => {
  await themeStore.addThemeOrUpdateIt(theme);
  modalRef.value?.closeModal();
};

const themes = computed(() => themeStore.themes);
const isLoaded = computed(() => themeStore.isLoaded);
const deleteTheme = themeStore.deleteThemeById;
</script>

<template>
  <div>
    <h2>Liste des thèmes</h2>
    <button @click="openFormToCreateTheme">Ajouter un thème</button>

    <div v-if="!isLoaded">Chargement...</div>
    <div v-else-if="themes.length">
      <ThemeItem
          v-for="theme in themes"
          :key="theme.id"
          :theme="theme"
          @edit="editTheme"
          @delete="deleteTheme"
      />
    </div>
    <div v-else>
      <p>Aucun thème disponible.</p>
    </div>

    <Modal
        ref="modalRef"
        :title="currentTheme ? 'Modifier le thème' : 'Créer un nouveau thème'"
    >
      <template #body>
        <ThemeForm
            :theme="currentTheme"
            @save="saveTheme"
            @close="modalRef?.closeModal"
        />
      </template>
    </Modal>
  </div>
</template>

<style scoped>
</style>