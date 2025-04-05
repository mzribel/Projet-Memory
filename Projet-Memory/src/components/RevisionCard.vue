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
  showBack.value = false;
  emit('memorized');
};

const nextCard = () => {
  showBack.value = false;
  emit('next');
};
</script>

<template>
  <div class="">
    <h2 class="">Carte de révision</h2>
    <div v-if="!card">pas de carte</div>
    <div v-else-if="!showBack">
      <p class="">{{ card?.front }}</p>
      <button @click="flipCard" class="">
        Retourner
      </button>
    </div>
    <div v-else-if="showBack">
      <p class="">{{ card?.back }}</p>
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