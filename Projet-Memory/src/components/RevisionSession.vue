<script lang="ts" setup>
import { ref } from 'vue';
import ProgressTracker from './ProgressTracker.vue';
import RevisionCard from './RevisionCard.vue';
import { useCardStore } from "@/stores/cardStore.ts";

const cards = useCardStore().cards;
const currentIndex = ref(0);

const nextCard = () => {
  if (currentIndex.value < cards.length - 1) {
    currentIndex.value++;
  } else {
    alert('Session terminée !');
  }
};

const markMemorized = () => {
  cards[currentIndex.value].level++;
  nextCard();
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Session de révision</h1>
    <ProgressTracker :current="currentIndex" :total="cards.length" />
    <RevisionCard
        :card="cards[currentIndex]"
        @memorized="markMemorized"
        @next="nextCard"
    />
  </div>
</template>

<style scoped>
/* Ajoute des styles si nécessaire */
</style>