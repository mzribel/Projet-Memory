<script lang="ts" setup>
import {computed, ref} from 'vue';
import type { Card } from '@/types/Card.ts';
import CardItem from '../items/CardItem.vue';
import CardForm from '../forms/CardForm.vue';
import {useCardStore} from "@/stores/cardStore.ts";
import {useThemeStore} from "@/stores/themeStore.ts";

const props = defineProps<{
  themeId: string;
}>();

const cardStore = useCardStore();
const themeStore = useThemeStore();
const cards = computed(() => cardStore.getCardsByThemeId(props.themeId));

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

const saveCard = (card: Card, multimediaFront?:File, multimediaBack?:File) => {
  card.themeId = props.themeId;
  cardStore.addCardOrUpdateIt(card, multimediaFront, multimediaBack);
  closeForm();
};

const deleteCard = (cardId: string) => {
  cardStore.deleteCardById(cardId);
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
    <CardForm
      v-if="isFormOpen && !currentCard?.id"
      :card="currentCard"
      @save="saveCard"
      @close="closeForm"
    />
    <div v-if="cards">
      <template v-for="card in cards">
        <CardForm
          v-if="isFormOpen && currentCard?.id == card.id"
          :card="currentCard"
          @save="saveCard"
          @close="closeForm"
        />
      <CardItem
          v-else
          :card="card"
          @edit="editCard"
          @delete="deleteCard"
      />
      </template>
    </div>
    <div v-else>
      <p>Aucune carte disponible. Créez-en une !</p>
    </div>

  </div>
</template>

<style scoped>
</style>