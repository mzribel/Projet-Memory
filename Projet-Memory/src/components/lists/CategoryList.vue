<script lang="ts" setup>
import { computed, ref } from 'vue';
import CategoryItem from '../items/CategoryItem.vue';
import CategoryForm from '../forms/CategoryForm.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import type { Category } from '@/types/Category.ts';

const categoryStore = useCategoryStore();

const isFormOpen = ref(false);
const currentCategory = ref<Category | null>(null);

const openFormToCreateCategory = () => {
  currentCategory.value = null;
  isFormOpen.value = true;
};

const editCategory = (category: Category) => {
  currentCategory.value = category;
  isFormOpen.value = true;
};

const saveCategory = async (category: Category) => {
  await categoryStore.addCategory(category);
  closeForm();
};

const closeForm = () => {
  isFormOpen.value = false;
};

const categories = computed(() => categoryStore.categories);
const isLoaded = computed(() => categoryStore.isLoaded);
const addCategory = categoryStore.addCategory;
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


    <CategoryForm
        v-if="isFormOpen"
        :category="currentCategory"
        @save="saveCategory"
        @close="closeForm"
    />
  </div>
</template>

<style scoped>
</style>