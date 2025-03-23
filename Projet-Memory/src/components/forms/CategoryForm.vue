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
  <div >
    <h2>
      {{ category ? 'Modifier la catégorie' : 'Ajouter une catégorie' }}
    </h2>
    <form @submit.prevent="save">
      <div >
        <label for="name">Nom</label>
        <input
            v-model="form.name"
            type="text"
            id="name"
            required
        />
      </div>
      <div >
        <label for="description">Description</label>
        <textarea
            v-model="form.description"
            id="description"
            rows="3"
        ></textarea>
      </div>
      <div >
        <button type="button" @click="$emit('close')" >
          Annuler
        </button>
        <button type="submit">
          Sauvegarder
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>