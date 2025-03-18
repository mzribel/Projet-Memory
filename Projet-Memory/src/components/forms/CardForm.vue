
<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Card } from '@/types/Card.ts';

const props = defineProps<{
  card: Card | null;
}>();

const emit = defineEmits(['save', 'close']);

const form = ref<Card>({
  id: '',
  themeId: '',
  front: '',
  back: '',
  multimedia: '',
  level: 0,
});

watch(
    () => props.card,
    (newCard) => {
      if (newCard) {
        form.value = { ...newCard };
      } else {
        form.value = {
          id: '',
          themeId: '',
          front: '',
          back: '',
          multimedia: '',
          level: 0,
        };
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
      {{ card ? 'Modifier la carte' : 'Ajouter une carte' }}
    </h2>
    <form @submit.prevent="save">
      <div class="mb-4">
        <label for="front" class="block text-sm font-medium text-gray-700">Recto</label>
        <textarea
            v-model="form.front"
            id="front"
            rows="3"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="back" class="block text-sm font-medium text-gray-700">Verso</label>
        <textarea
            v-model="form.back"
            id="back"
            rows="3"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="multimedia" class="block text-sm font-medium text-gray-700">Média (URL)</label>
        <input
            v-model="form.multimedia"
            type="url"
            id="multimedia"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
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
/* Ajoute des styles si nécessaire */
</style>