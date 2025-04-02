
<script lang="ts" setup>
import type { Theme } from '@/types/Theme.ts';

const props = defineProps<{
  theme: Theme;
}>();
</script>

<template>
  <div class="">
    <div>
      <router-link :to="`/themes/${theme.id}`"><h3 class="">{{ theme.name }}</h3></router-link>
      <p>ID : {{ theme.id }}</p>
      <p>Catégorie : {{ theme.categoryId ? theme.categoryId : "Pas de catégorie associée"}}</p>
      <p class="">
        {{ theme.description || 'Pas de description' }} - {{ theme.cardCount }} carte(s)
      </p>
    </div>
    <div >
      <router-link :to="`/themes/${theme.id}`"><button>Détails</button></router-link>
      <button @click="$emit('edit', theme)" >Modifier</button>
      <button @click="$emit('delete', theme.id)" >Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
</style>