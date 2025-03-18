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
  currentCard.value = null; // Nouveau formulaire
  isFormOpen.value = true;
};

const editCard = (card: Card) => {
  currentCard.value = card; // Charger une carte existante
  isFormOpen.value = true;
};

const saveCard = (card: Card) => {
  if (card.id) {
    // Mise à jour
    const index = cards.value.findIndex((c) => c.id === card.id);
    if (index !== -1) cards.value[index] = card;
  } else {
    // Ajout
    cards.value.push({
      ...card,
      id: Date.now().toString(), // Générer un ID fictif
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
    <h2 class="text-2xl font-bold mb-4">Cartes de révision</h2>
    <button @click="openForm()" class="bg-blue-600 text-white px-4 py-2 rounded mb-4">
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
      <p>Aucune carte disponible. Créez-en une !</p>
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
/* Ajoute des styles si nécessaire */
</style>