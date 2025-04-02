<script lang="ts" setup>
import type { Card } from '@/types/Card.ts';
import { useCardStore } from "@/stores/cardStore.ts";
import { onMounted, ref, computed } from "vue";

const props = defineProps<{ card: Card }>();
const emit = defineEmits(['edit', 'delete']);
const cardStore = useCardStore();

const cardFileFront = ref<Blob | null>(null);
const cardFileBack = ref<Blob | null>(null);
const cardFileFrontUrl = ref<string | null>(null);
const cardFileBackUrl = ref<string | null>(null);

onMounted(async () => {
  if (props.card.multimediaFront) {
    const file = await cardStore.getFileById(props.card.multimediaFront);
    if (file) {
      cardFileFront.value = file;
      cardFileFrontUrl.value = URL.createObjectURL(file);
    }
  }
  if (props.card.multimediaBack) {
    const file = await cardStore.getFileById(props.card.multimediaBack);
    if (file) {
      cardFileBack.value = file;
      cardFileBackUrl.value = URL.createObjectURL(file);
    }
  }
});

const cardFileFrontType = computed(() => cardFileFront.value?.type || '');
const cardFileBackType = computed(() => cardFileBack.value?.type || '');
</script>

<template>
  <div>
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

    <div>
      <button @click="$emit('edit', card)">Modifier</button>
      <button @click="$emit('delete', card.id)">Supprimer</button>
    </div>
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
