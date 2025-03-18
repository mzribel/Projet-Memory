<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { Category } from '@/types/Category.ts';

const props = defineProps<{
  category: Category;
}>();

const emit = defineEmits(['edit', 'delete']);

const goToLocation = (id: string) => {
  window.location.href = '/category/' + id;
};
</script>

<template>
  <div class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow mb-2">
    <div>
      <h3 class="text-lg font-semibold">{{ category.name }}</h3>
      <p class="text-sm text-gray-600">{{ category.description || 'Pas de description' }}</p>
    </div>
    <div class="flex items-center space-x-2">
      <button @click="goToLocation(category.id)" class="text-blue-600 hover:underline">Voir détails</button>
      <button @click="emit('edit', category)" class="text-blue-600 hover:underline">Modifier</button>
      <button @click="emit('delete', category.id)" class="text-red-600 hover:underline">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
</style>