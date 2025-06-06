<script lang="ts" setup>
import {computed, ref} from 'vue';
import type { Card as CardType } from '@/types/Card.ts';
import CardItem from '../items/CardItem.vue';
import CardForm from '../forms/CardForm.vue';
import {useCardStore} from "@/stores/cardStore.ts";
import {useThemeStore} from "@/stores/themeStore.ts";
import Modal from "@/components/modal/Modal.vue";
import Button from "@/components/buttons/Button.vue";
import Card from "@/components/card/Card.vue";

const {cards, themeId} = defineProps<{
  cards: CardType[];
  themeId: string;
}>();

const cardStore = useCardStore();
const themeStore = useThemeStore();

const isFormOpen = ref(false);
const currentCard = ref<CardType | null>(null);

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const openForm = () => {
  currentCard.value = null;
  modalRef.value?.openModal();
};

const editCard = (card: CardType) => {
  currentCard.value = card;
  modalRef.value?.openModal();
};

const saveCard = (card: CardType, multimediaFront?:File, multimediaBack?:File) => {
  card.themeId = themeId;
  themeStore.setLatestActivity(card.themeId);
  cardStore.addCardOrUpdateIt(card, multimediaFront, multimediaBack);
  modalRef.value?.closeModal();
};

const deleteCard = (cardId: string) => {
  themeStore.setLatestActivity(themeId);
  cardStore.deleteCardById(cardId);
};


</script>

<template>
  <Button @click="openForm()" icon="fa-solid fa-plus" label="Ajouter une carte" variant="outlined" color="secondary"></Button>

  <div v-if="cards.length" class="card-list flex column gap-8">
      <div class="cards-ctn flex gap-8">
        <Card @edit-card="editCard(card)" @delete-card="deleteCard(card.id)" v-for="card in cards" :show-options="true" :card-data="card"></Card>
      </div>
    </div>
    <div v-else class="no-content">
      <p>Aucune carte disponible. Créez-en une !</p>
    </div>
  <Modal ref="modalRef"
         title="Carte">
    <template #body>
      <CardForm :card="currentCard" @save="saveCard" @close="modalRef?.closeModal"/>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.cards-ctn {
  display: flex;
  flex-wrap: wrap;
}
</style>