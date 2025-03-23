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
  <div class="">
    <h2 class="">Carte de révision</h2>
    <div v-if="showBack">
      <p class="">{{ card?.back }}</p>
      <div v-if="card?.multimedia">
        <p class="">Multimédia :</p>
        <a :href="card?.multimedia" target="_blank" class="">
          Voir le fichier
        </a>
      </div>
      <div class="">
        <button @click="markMemorized" class="">
          Mémorisé
        </button>
        <button @click="nextCard" class="">
          À revoir
        </button>
      </div>
    </div>
    <div v-else>
      <p class="">{{ card?.front }}</p>
      <button @click="flipCard" class="">
        Retourner
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>