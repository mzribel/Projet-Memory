<script lang="ts" setup>
import {ref, watch} from 'vue';
import type {Card} from '@/types/Card.ts';
import {cardMultimediaComposable} from '@/composables/cardmultimedia.composable.ts';

const props = defineProps<{ card: Card | null }>();
const emit = defineEmits(['save', 'close']);

const form = ref<Card>({
  id: '',
  themeId: '',
  front: '',
  back: '',
  multimediaFront: '',
  multimediaBack: '',
  currentLevel: 0,
});

watch(
    () => props.card,
    (newCard) => {
      form.value = newCard
          ? {...newCard}
          : {id: '', themeId: '', front: '', back: '', multimediaFront: '', multimediaBack: '', currentLevel: 0};
    },
    {immediate: true}
);

const {newFrontFile, newBackFile, handleFileUpload} = cardMultimediaComposable();

const save = () => emit('save', form.value, newFrontFile.value, newBackFile.value);
</script>

<template>
  <div>
    <h2>{{ card ? 'Modifier la carte' : 'Ajouter une carte' }}</h2>
    <form @submit.prevent="save">
      <div>
        <label for="front">Recto</label>
        <textarea id="front" v-model="form.front" required rows="3"></textarea>
        <div>
          <label for="multimediaFront">Média côté recto</label>
          <input id="multimediaFront" accept="image/*,video/*,audio/*" type="file"
                 @change="handleFileUpload($event, true)">
          <p v-if="form.multimediaFront">Fichier actuel : {{ form.multimediaFront }}</p>
        </div>
      </div>

      <div>
        <label for="back">Verso</label>
        <textarea id="back" v-model="form.back" required rows="3"></textarea>
        <div>
          <label for="multimediaBack">Média côté verso</label>
          <input id="multimediaBack" accept="image/*,video/*,audio/*" type="file"
                 @change="handleFileUpload($event, false)">
          <p v-if="form.multimediaBack">Fichier actuel : {{ form.multimediaBack }}</p>
        </div>
      </div>

      <div>
        <button type="button" @click="$emit('close')">Annuler</button>
        <button type="submit">Sauvegarder</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>