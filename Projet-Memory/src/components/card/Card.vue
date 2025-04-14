<script lang="ts" setup>
import {ref} from "vue";
import type {Card as CardData} from "@/types/Card.ts";
import CardFace from "@/components/card/CardFace.vue";
import Modal from "@/components/modal/Modal.vue";

const isFlipped = ref(false)
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
}

const {cardData, showOptions} = defineProps<{
  cardData: CardData,
  showOptions?: boolean
}>();

const currentCard = ref<CardData | null>(null);

// const editCard = () => {
//   currentCard.value = cardData;
//   modalRef.value?.openModal();
// }


const emit = defineEmits(['editCard', "deleteCard"]);
const editCard = () => { emit("editCard"); }
const deleteCard = () => { emit("deleteCard"); }
</script>

<template>
  <div :class="isFlipped ? 'flipped' : ''" class="flip-card" @click="flipCard">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <CardFace :card="cardData" @edit-card="editCard" @delete-card="deleteCard" :is-question="true" :show-options="showOptions"></CardFace>
      </div>
      <div class="flip-card-back">
        <CardFace :card="cardData" :is-question="false" @delete-card="deleteCard" :show-options="showOptions"></CardFace>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flip-card {
  background-color: transparent;
  width: 100%;
  max-width: min(100%, 500px);
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.3s;
  transform-style: preserve-3d;
}

.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  cursor: pointer;
}

.flip-card-front {
  border-radius: 8px;
  background-color: #ececec;
  color: black;
}

.flip-card-back {
  border-radius: 8px;
  background-color: black;
  color: white;
  transform: rotateY(180deg);
}
</style>