<script lang="ts" setup>
import {ref, watch} from 'vue';
import type {Theme} from '@/types/Theme.ts';
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {practiceComposable} from "@/composables/practice.composable.ts";
const { generateReviewInterval } = practiceComposable();
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
  maxLevel: 5,
  createdAt: "",
  lastActivityAt: "",
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
          maxLevel: 5,
          createdAt: "",
          newCardsPerDay: undefined,
          lastActivityAt: "",
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
        <br>
        <select id="category" v-model="form.categoryId">
          <option value="">Choisir une catégorie</option>
          <option v-for="category in categoryStore.categories" :value="category.id">{{ category.name }}</option>
        </select>
        <br>
        <label for="levelToReview">Niveaux de révision</label>
        <select id="levelToReview" v-model="form.maxLevel">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5" selected>5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        <br>

          <label for="newCardsPerDay">Nouvelles cartes par jour :</label>
          <input type="number" min="0" v-model="form.newCardsPerDay">
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