<script lang="ts" setup>
import { computed, ref } from 'vue';
import CategoryItem from '../items/CategoryItem.vue';
import CategoryForm from '../forms/CategoryForm.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import type { Category } from '@/types/Category.ts';
import Button from "@/components/buttons/Button.vue";

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

const isLoaded = computed(() => categoryStore.isLoaded);
const addCategory = categoryStore.addCategory;
const deleteCategory = categoryStore.deleteCategoryById;
defineProps<{
  categories:Category[]}>
()

</script>

<template>
  <div class="container">
    <Button @click="openFormToCreateCategory()" icon="fa-solid fa-plus" label="Ajouter une catégorie" variant="tonal" size="large"></Button>


    <div v-if="categories" class="mescouillesenski">
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