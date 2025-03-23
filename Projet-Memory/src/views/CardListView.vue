<script lang="ts" setup>
import { ref } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { useCardStore } from '@/stores/cardStore';
import { useRoute } from 'vue-router';
import CardList from '@/components/lists/CardList.vue';
import CardForm from '@/components/forms/CardForm.vue';
import type { Card } from '@/types/Card.ts';

const route = useRoute();
const categoryId = route.params.id as string;

const categoryStore = useCategoryStore();
const cardStore = useCardStore();

const categories = categoryStore.categories;
const category = categories.find((cat) => cat.id === categoryId);
const cards = ref(cardStore.getCardsByThemeId(categoryId));

const addCardToCategory = (card: Card) => {
  // cardStore.addCard(card);
};
</script>

<template>
  <div>
    <h1 class="">Thèmes dans {{ category?.name }}</h1>
    <p class="">{{ category?.description }}</p>

    <CardList :cards="cards" />
    <CardForm :categoryId="categoryId" @addCard="addCardToCategory"  :card="null"/>
  </div>
</template>

<style scoped>
</style>