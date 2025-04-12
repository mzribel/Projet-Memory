<script lang="ts" setup>
import {ref, watch} from 'vue';
import type {Theme} from '@/types/Theme.ts';
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {practiceComposable} from "@/composables/practice.composable.ts";
import Button from "@/components/buttons/Button.vue";
const { generateReviewInterval } = practiceComposable();
const props = defineProps<{
  theme: Theme | null;
}>();

const emit = defineEmits(['save', 'close', 'resetProgression']);

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
  <div class="form-container">
    <form @submit.prevent="save" class="form-content">
      <div class="form-group">
        <label for="name">Nom</label>
        <input id="name" v-model="form.name" required type="text" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="form.description" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label for="category">Catégorie</label>
        <select id="category" v-model="form.categoryId">
          <option value="">Choisir une catégorie</option>
          <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="levelToReview">Niveaux de révision</label>
        <select id="levelToReview" v-model="form.maxLevel">
          <option v-for="n in 7" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="newCardsPerDay">Nouvelles cartes par jour :</label>
        <input id="newCardsPerDay" type="number" min="0" v-model="form.newCardsPerDay" />
      </div>

      <div class="form-group">
        <label for="">Réinitialiser la progression</label>
        <Button @click="emit('resetProgression')" icon="fa-solid fa-arrow-rotate-left" label="Réinitialiser" variant="tonal"></Button>
      </div>

      <div class="form-actions">
        <Button @click="$emit('close')" label="Annuler" variant="outlined"></Button>
        <Button @click="save" label="Sauvegarder" variant="filled" color="secondary"></Button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use "./../../assets/css/buttons.scss";
@use "./../../assets/css/form.scss";
</style>