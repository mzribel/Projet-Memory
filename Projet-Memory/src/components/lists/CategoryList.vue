<script lang="ts" setup>
import { computed, ref } from 'vue';
import CategoryItem from '../items/CategoryItem.vue';
import CategoryForm from '../forms/CategoryForm.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import type { Category } from '@/types/Category.ts';
import Modal from "@/components/modal/Modal.vue";

const categoryStore = useCategoryStore();

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const currentCategory = ref<Category | null>(null);

const openFormToCreateCategory = () => {
  currentCategory.value = null;
  modalRef.value?.openModal();
};

const editCategory = (category: Category) => {
  currentCategory.value = category;
  modalRef.value?.openModal();
};

const saveCategory = async (category: Category) => {
  await categoryStore.addCategory(category);
  closeForm();
};

const closeForm = () => {
  modalRef.value?.closeModal();
  currentCategory.value = null;
};

const categories = computed(() => categoryStore.categories);
const isLoaded = computed(() => categoryStore.isLoaded);
const deleteCategory = categoryStore.deleteCategoryById;
</script>

<template>
  <div>
    <h2 class="">Liste des catégories</h2>
    <button @click="openFormToCreateCategory()"
            class="">
      Ajouter une catégorie
    </button>

    <div v-if="!isLoaded">Chargement...</div>
    <div v-else-if="categories.length">
      <CategoryItem
          v-for="category in categories"
          :key="category.id"
          :category="category"
          @edit="editCategory"
          @delete="deleteCategory"
      />
    </div>
    <div v-else>
      <p>Aucune catégorie disponible .</p>
    </div>

    <Modal
        ref="modalRef"
        :title="currentCategory ? 'Modifier la catégorie' : 'Créer une nouvelle catégorie'"
    >
      <template #body>
        <CategoryForm
            :category="currentCategory"
            @save="saveCategory"
            @close="closeForm"
        />
      </template>
    </Modal>
  </div>
</template>

<style scoped>
</style>