<script lang="ts" setup>
import {ref, watch} from 'vue';
import type {Theme} from '@/types/Theme.ts';
import {useCategoryStore} from "@/stores/categoryStore.ts";

const props = defineProps<{
  theme: Theme | null;
}>();

const emit = defineEmits(['save', 'close']);

const form = ref<Theme>({
  id: '',
  categoryId: '',
  name: '',
  description: '',
  isThemeSelected: false,
  levelToReview: 5,
});

watch(
    () => props.theme,
    (newTheme) => {
      if (newTheme) {
        form.value = {...newTheme};
      } else {
        form.value = {
          id: '',
          categoryId: '',
          name: '',
          description: '',
          isThemeSelected: false,
          levelToReview: 5,
        };
      }
    },
    {immediate: true}
);

const categoryStore = useCategoryStore();

const save = () => {
  emit('save', form.value);
};
</script>
<template>
  <div>
    <h2>
      {{ theme ? 'Modifier le thème' : 'Ajouter un thème' }}
    </h2>
    <form @submit.prevent="save">
      <div>
        <label for="name">Nom</label>
        <input
            id="name"
            v-model="form.name"
            required
            type="text"
        />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea
            id="description"
            v-model="form.description"
            rows="3"
        ></textarea>
        <select id="category" v-model="form.categoryId">
          <option value="">Choisir une catégorie</option>
          <option v-for="category in categoryStore.categories" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div >
        <button type="button" @click="$emit('close')">
          Annuler
        </button>
        <button type="submit" @click="save">
          Sauvegarder
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>