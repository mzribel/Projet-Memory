<script lang="ts" setup>
import type { Card } from '@/types/Card.ts';
import { practiceComposable } from '@/composables/practice.composable.ts';
import { cardMultimediaComposable } from '@/composables/cardmultimedia.composable.ts';
import {onMounted, watch} from "vue";

const props = defineProps<{ card: Card }>();
const emit = defineEmits(['edit', 'delete']);

const { resetCardLevel } = practiceComposable();

const { fileUrl: cardFileFrontUrl, fileType: cardFileFrontType, loadFile: loadFrontFile } = cardMultimediaComposable();
const { fileUrl: cardFileBackUrl, fileType: cardFileBackType, loadFile: loadBackFile } = cardMultimediaComposable();

watch(
  () => props.card,
  (newCard) => {
    if (newCard.multimediaFront) {
      loadFrontFile(newCard.multimediaFront);
    }
    if (newCard.multimediaBack) {
      loadBackFile(newCard.multimediaBack);
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await loadFrontFile(props.card.multimediaFront);
  await loadBackFile(props.card.multimediaBack);
});
</script>

<template>
  <div >
    <div>
      <p>Recto:</p>
      <p>{{ card.front }}</p>

      <template v-if="cardFileFrontUrl">
        <p>Fichier attaché :</p>
        <img v-if="cardFileFrontType.startsWith('image')" :src="cardFileFrontUrl" alt="Recto image" />
        <video v-else-if="cardFileFrontType.startsWith('video')" :src="cardFileFrontUrl" controls />
        <audio v-else-if="cardFileFrontType.startsWith('audio')" :src="cardFileFrontUrl" controls />
      </template>

      <p>Verso:</p>
      <p>{{ card.back }}</p>

      <template v-if="cardFileBackUrl">
        <p>Fichier attaché :</p>
        <img v-if="cardFileBackType.startsWith('image')" :src="cardFileBackUrl" alt="Verso image" />
        <video v-else-if="cardFileBackType.startsWith('video')" :src="cardFileBackUrl" controls />
        <audio v-else-if="cardFileBackType.startsWith('audio')" :src="cardFileBackUrl" controls />
      </template>
    </div>

    <div style="font-size: 12px">
      <p v-if="card.firstReviewedAt">First reviewed : {{ new Date(card.firstReviewedAt).toLocaleString("fr-FR") }}</p>
      <p v-if="card.lastReviewedAt">Last reviewed : {{ new Date(card.lastReviewedAt).toLocaleString("fr-FR") }}</p>
      <p v-if="card.nextReviewAt">Next review : {{ new Date(card.nextReviewAt).toLocaleDateString("fr-FR") }}</p>
    </div>
    <div>
      <button v-if="card.currentLevel" @click="resetCardLevel(card)">Reset</button>
    </div>
    <div>
      <button @click="$emit('edit', card)">Modifier</button>
      <button @click="$emit('delete', card.id)">Supprimer</button>
    </div>
    <br>
  </div>
</template>

<style scoped>
img, video {
  max-width: 200px;
  height: auto;
  display: block;
  margin-top: 10px;
}
</style>
