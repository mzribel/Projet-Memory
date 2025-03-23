<script lang="ts" setup>
import { ref } from 'vue';
import type { Card } from '@/types/Card';

const props = defineProps<{
  card: Card;
}>();

const emit = defineEmits<{
  (e: 'memorized'): void;
  (e: 'next'): void;
}>();

const showBack = ref(false);

const flipCard = () => {
  showBack.value = true;
};

const markMemorized = () => {
  emit('memorized');
};

const nextCard = () => {
  emit('next');
};
</script>

<template>
  <div class="bg-white p-6 shadow-lg rounded-lg text-center">
    <h2 class="text-xl font-bold mb-4">Carte de révision</h2>
    <div v-if="showBack">
      <p class="text-gray-800 mb-4">{{ card?.back }}</p>
      <div v-if="card?.multimedia">
        <p class="text-sm font-medium mb-2">Multimédia :</p>
        <a :href="card?.multimedia" target="_blank" class="text-blue-600 hover:underline">
          Voir le fichier
        </a>
      </div>
      <div class="mt-4 flex justify-center space-x-4">
        <button @click="markMemorized" class="px-4 py-2 bg-green-600 text-white rounded">
          Mémorisé
        </button>
        <button @click="nextCard" class="px-4 py-2 bg-gray-400 text-white rounded">
          À revoir
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-800 mb-4">{{ card?.front }}</p>
      <button @click="flipCard" class="px-4 py-2 bg-blue-600 text-white rounded">
        Retourner
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>