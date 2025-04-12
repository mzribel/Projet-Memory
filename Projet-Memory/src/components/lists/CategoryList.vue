<script lang="ts" setup>
import { computed, ref } from 'vue';
import CategoryItem from '../items/CategoryItem.vue';
import CategoryForm from '../forms/CategoryForm.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import type { Category } from '@/types/Category.ts';
import Modal from "@/components/modal/Modal.vue";
import Button from "@/components/buttons/Button.vue";

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

const isLoaded = computed(() => categoryStore.isLoaded);
const deleteCategory = (categoryId:string) => {
  categoryStore.deleteCategoryById(categoryId);
}

const categories = computed(() => {
  return categoryStore.categories;
})

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
          @delete="deleteCategory(category.id)"
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