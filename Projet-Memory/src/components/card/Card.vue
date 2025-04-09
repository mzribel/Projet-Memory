<script lang="ts" setup>
import {ref} from "vue";
import type {Card as CardData} from "@/types/Card.ts";
import CardFace from "@/components/card/CardFace.vue";

const isFlipped = ref(false)
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
}

const {cardData, showOptions} = defineProps<{
  cardData: CardData,
  showOptions?: boolean
}>();


</script>

<template>
  <div :class="isFlipped ? 'flipped' : ''" class="flip-card" @click="flipCard">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <CardFace :is-question="true" :level="[cardData.currentLevel,3]" :show-options="showOptions">
          {{ cardData.front }}
        </CardFace>
      </div>
      <div class="flip-card-back">
        <CardFace :is-question="false" :level="[cardData.currentLevel,3]" :show-options="showOptions">
          {{ cardData.back }}
        </CardFace>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  width: 500px;
  height: 300px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.3s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
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

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  border-radius: 8px;
  background-color: #ececec;
  color: black;
}

/* Style the back side */
.flip-card-back {
  border-radius: 8px;
  background-color: black;
  color: white;
  transform: rotateY(180deg);
}
</style>