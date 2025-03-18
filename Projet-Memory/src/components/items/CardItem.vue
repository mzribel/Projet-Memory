<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { Card } from '@/types/Card.ts';

const props = defineProps<{
  card: Card;
}>();

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow mb-2">
    <div>
      <p class="font-semibold">Recto:</p>
      <p class="text-gray-800">{{ card.front }}</p>
      <p class="font-semibold mt-2">Verso:</p>
      <p class="text-gray-800">{{ card.back }}</p>
      <div v-if="card.multimedia" class="mt-2">
        <p class="font-semibold">Multimédia :</p>
        <a :href="card.multimedia" target="_blank" class="text-blue-600 hover:underline">
          Voir le fichier
        </a>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <button @click="$emit('edit', card)" class="text-blue-600 hover:underline">Modifier</button>
      <button @click="$emit('delete', card.id)" class="text-red-600 hover:underline">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
/* Ajoute des styles si nécessaire */
</style>