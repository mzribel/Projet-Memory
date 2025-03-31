<script lang="ts" setup>
import type { Card } from '@/types/Card.ts';

const props = defineProps<{
  card: Card;
}>();

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
  <div >
    <div>
      <p>Recto:</p>
      <p>{{ card.front }}</p>
      <p>Verso:</p>
      <p>{{ card.back }}</p>
      <div v-if="card.multimedia">
        <p>Multimédia :</p>
        <a :href="card.multimedia" target="_blank" >
          Voir le fichier
        </a>
      </div>
    </div>
    <div >
      <button @click="$emit('edit', card)">Modifier</button>
      <button @click="$emit('delete', card.id)">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
</style>