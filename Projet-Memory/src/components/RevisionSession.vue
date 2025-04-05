<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ProgressTracker from './ProgressTracker.vue';
import RevisionCard from './RevisionCard.vue';
import { useCardStore } from "@/stores/cardStore.ts";
import { useThemeStore } from "@/stores/themeStore.ts";
import type {Card} from "@/types/Card.ts";

const cardStore = useCardStore();
const themeStore = useThemeStore();

const selectedThemes = themeStore.getSelectedThemes();
const allCards = cardStore.getCardsByThemeList(selectedThemes);

const dailyNewCardLimit = 5; // TODO mettre une prop
const reviewQueue = ref([] as Card[]);
const currentIndex = ref(0);

const reviewIntervals = [1, 3, 7, 14, 30];

const getDueCards = () => {
  const today = new Date().setHours(0, 0, 0, 0);

  return allCards.filter(card => {
    if (!card.nextReviewAt) return true;
    return new Date(card.nextReviewAt).getTime() <= today;
  });
};

const initializeSession = () => {
  let dueCards = getDueCards();
  let newCards = allCards.filter(card => card.level === 1 && !card.nextReviewAt).slice(0, dailyNewCardLimit);

  dueCards.sort((a, b) => b.level - a.level);
  reviewQueue.value = [...dueCards, ...newCards];
  currentIndex.value = 0;
  console.log("initializeSession", reviewQueue.value);
};

const getNextReviewDate = (level: number) => {
  let daysToAdd = reviewIntervals[level - 1] || 1;
  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  return nextDate.toISOString().split('T')[0];
};

const nextCard = () => {
  if (currentIndex.value < reviewQueue.value.length - 1) {
    currentIndex.value++;
  } else {
    alert('Session terminée !');
  }
};

const markMemorized = () => {
  let currentCard = reviewQueue.value[currentIndex.value];
  if (currentCard.level < 5) {
    currentCard.level++;
  }
  currentCard.nextReviewAt = getNextReviewDate(currentCard.level);
  cardStore.addCardOrUpdateIt(currentCard);
  nextCard();
};

const markForgotten = () => {
  let currentCard = reviewQueue.value[currentIndex.value];
  currentCard.level = Math.max(1, currentCard.level - 1);
  currentCard.nextReviewAt = getNextReviewDate(1);
  cardStore.addCardOrUpdateIt(currentCard);
  nextCard();
};

onMounted(() => {
  initializeSession();
});
</script>

<template>
  <div>
    <h1>Session de révision</h1>
    <ProgressTracker :current="currentIndex" :total="reviewQueue.length" />
    <RevisionCard
        v-if="reviewQueue.length > 0 && currentIndex < reviewQueue.length"
        :card="reviewQueue[currentIndex]"
        @memorized="markMemorized"
        @forgotten="markForgotten"
        @next="nextCard"
    />
    <p v-else>Aucune carte à réviser aujourd'hui !</p>
  </div>
</template>

<style scoped>
</style>
