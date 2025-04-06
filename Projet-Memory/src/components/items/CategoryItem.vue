<script lang="ts" setup>
import type { Category } from '@/types/Category.ts';

const props = defineProps<{
  category: Category;
}>();

const emit = defineEmits(['edit', 'delete']);

</script>

<template>
  <div >
    <div>
      <h3 >{{ category.name }}</h3>
      <p >{{ category.description || 'Pas de description' }}</p>
    </div>
    <div >
      <router-link :to="`/categories/${category.id}`"><button>Voir détails</button></router-link>
      <button @click="emit('edit', category)">Modifier</button>
      <button @click="emit('delete', category.id)">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
</style>