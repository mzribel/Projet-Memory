<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { Category } from '@/types/Category.ts';
import Button from "@/components/buttons/Button.vue";

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
  <div class="form-container">
    <form @submit.prevent="save" class="form-content">
      <div class="form-group">
        <label for="name">Nom</label>
        <input v-model="form.name" type="text" id="name" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="form.description" id="description" rows="3"></textarea>
      </div>

      <div class="form-actions">
        <div class="form-actions">
          <Button @click="$emit('close')" label="Annuler" variant="outlined"></Button>
          <Button @click="save" label="Sauvegarder" variant="filled" color="secondary"></Button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use "./../../assets/css/buttons.scss";
@use "./../../assets/css/form.scss";
</style>