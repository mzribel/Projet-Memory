<script lang="ts" setup>
import { ref, computed } from 'vue';
import ThemeItem from '../items/ThemeItem.vue';
import ThemeForm from '../forms/ThemeForm.vue';
import Modal from '@/components/modal/Modal.vue';
import { useThemeStore } from '@/stores/themeStore';
import type { Theme } from '@/types/Theme.ts';
import {useCardStore} from "@/stores/cardStore.ts";
import Button from "@/components/buttons/Button.vue";

const cardStore = useCardStore();
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

const isLoaded = computed(() => themeStore.isLoaded);
const deleteTheme = (themeId:string) => {
  themeStore.deleteThemeById(themeId)
}

const themes = computed(()=> {
  return themeStore.themes
});
</script>

<template>
  <div class="container">
    <Button @click="openFormToCreateTheme()" icon="fa-solid fa-plus" label="Ajouter un thème" variant="outlined" color="secondary" size="large"></Button>

    <div v-if="!isLoaded">Chargement... {{ isLoaded }}</div>
    <div class="flex column gap-8"  v-else-if="themes.length">
      <ThemeItem
          v-for="theme in themes"
          :key="theme.id"
          :theme="theme"
          @edit="editTheme"
          @delete="deleteTheme(theme.id)"
      />
    </div>
    <div v-else class="no-content">
      <p>Aucun thème disponible. Créez-en un !</p>
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
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>