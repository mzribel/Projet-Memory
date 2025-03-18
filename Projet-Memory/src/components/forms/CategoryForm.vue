<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Category } from '@/types/Category.ts';

const props = defineProps<{
  category: Category | null;
}>();

const emit = defineEmits(['save', 'close']);

const form = ref<Category>({
  id: '',
  name: '',
  description: '',
});

watch(
    () => props.category,
    (newCategory) => {
      if (newCategory) {
        form.value = { ...newCategory };
      } else {
        form.value = { id: '', name: '', description: '' };
      }
    },
    { immediate: true }
);

const save = () => {
  emit('save', form.value);
};
</script>

<template>
  <div class="bg-white shadow-lg p-6 rounded-lg">
    <h2 class="text-lg font-bold mb-4">
      {{ category ? 'Modifier la catégorie' : 'Ajouter une catégorie' }}
    </h2>
    <form @submit.prevent="save">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
        <input
            v-model="form.name"
            type="text"
            id="name"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
            v-model="form.description"
            id="description"
            rows="3"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        ></textarea>
      </div>
      <div class="flex justify-end space-x-2">
        <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded">
          Annuler
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
          Sauvegarder
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Ajoute des styles ici si nécessaire */
</style>