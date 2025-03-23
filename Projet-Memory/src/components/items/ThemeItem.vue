
<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Theme } from '@/types/Theme.ts';

const props = defineProps<{
  theme: Theme;
}>();
</script>

<template>
  <div class="">
    <div>
      <h3 class="">{{ theme.name }}</h3>
      <p class="">
        {{ theme.description || 'Pas de description' }} - {{ theme.cardCount }} carte(s)
      </p>
    </div>
    <div >
      <button @click="$emit('edit', theme)" >Modifier</button>
      <button @click="$emit('delete', theme.id)" >Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
/* Ajoute des styles si nécessaire */
</style>