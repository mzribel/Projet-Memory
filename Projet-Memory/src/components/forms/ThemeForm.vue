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

      <div class="form-actions">
        <button type="button" @click="$emit('close')" class="btn cancel">Annuler</button>
        <button type="submit" @click="save" class="btn save">Sauvegarder</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 0 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  max-width: 600px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #6366f1;
  outline: none;
  background-color: #fff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.cancel {
  background-color: #e5e7eb;
  color: #374151;
}

.btn.cancel:hover {
  background-color: #d1d5db;
}

.btn.save {
  background-color: #6366f1;
  color: white;
}

.btn.save:hover {
  background-color: #4f46e5;
}
</style>