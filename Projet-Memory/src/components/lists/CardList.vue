<script lang="ts" setup>
import { ref } from 'vue';
import type { Card } from '@/types/Card.ts';
import CardItem from '../items/CardItem.vue';
import CardForm from '../forms/CardForm.vue';

const cards = ref<Card[]>([
  {
    id: '1',
    themeId: '1',
    front: 'Chat',
    back: 'Cat',
    multimedia: '',
    level: 1,
  },
  {
    id: '2',
    themeId: '1',
    front: 'Chien',
    back: 'Dog',
    multimedia: '',
    level: 1,
  },
]);

const isFormOpen = ref(false);
const currentCard = ref<Card | null>(null);

const openForm = () => {
  currentCard.value = null;
  isFormOpen.value = true;
};

const editCard = (card: Card) => {
  currentCard.value = card;
  isFormOpen.value = true;
};

const saveCard = (card: Card) => {
  if (card.id) {
    const index = cards.value.findIndex((c) => c.id === card.id);
    if (index !== -1) cards.value[index] = card;
  } else {
    cards.value.push({
      ...card,
      id: Date.now().toString(), // Générer un ID unique
    });
  }
  closeForm();
};

const deleteCard = (cardId: string) => {
  cards.value = cards.value.filter((c) => c.id !== cardId);
};

const closeForm = () => {
  isFormOpen.value = false;
};
</script>

<template>
  <div>
    <h2 class="">Cartes de révision</h2>
    <button @click="openForm()" class="">
      Ajouter une carte
    </button>
    <div v-if="cards.length">
      <CardItem
          v-for="card in cards"
          :key="card.id"
          :card="card"
          @edit="editCard"
          @delete="deleteCard"
      />
    </div>
    <div v-else>
      <p>Aucune carte disponible. Créez-en une !</p>
    </div>
    <CardForm
        v-if="isFormOpen"
        :card="currentCard"
        @save="saveCard"
        @close="closeForm"
    />
  </div>
</template>

<style scoped>
</style>