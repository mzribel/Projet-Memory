
<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Theme } from '@/types/Theme.ts';

const props = defineProps<{
  theme: Theme;
}>();
</script>

<template>
  <div class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow mb-2">
    <div>
      <h3 class="text-lg font-semibold">{{ theme.name }}</h3>
      <p class="text-sm text-gray-600">
        {{ theme.description || 'Pas de description' }} - {{ theme.cardCount }} carte(s)
      </p>
    </div>
    <div class="flex items-center space-x-2">
      <button @click="$emit('edit', theme)" class="text-blue-600 hover:underline">Modifier</button>
      <button @click="$emit('delete', theme.id)" class="text-red-600 hover:underline">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
/* Ajoute des styles si nécessaire */
</style>