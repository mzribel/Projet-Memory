<script lang="ts" setup>
import {ref, watch} from 'vue';
import type {Card} from '@/types/Card.ts';
import {cardMultimediaComposable} from '@/composables/cardmultimedia.composable.ts';
import Button from "@/components/buttons/Button.vue";

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
  <div class="form-container">
    <form @submit.prevent="save" class="form-content">
      <div class="form-group">
        <label for="front">Recto</label>
        <textarea id="front" v-model="form.front" required rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="multimediaFront">Média côté recto</label>
        <input id="multimediaFront" accept="image/*,video/*,audio/*" type="file"
               @change="handleFileUpload($event, true)">
        <p v-if="form.multimediaFront">Fichier actuel : {{ form.multimediaFront }}</p>
      </div>
      <div class="form-group">
        <label for="back">Verso</label>
        <textarea id="back" v-model="form.back" required rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="multimediaBack">Média côté verso</label>
        <input id="multimediaBack" accept="image/*,video/*,audio/*" type="file"
               @change="handleFileUpload($event, false)">
        <p v-if="form.multimediaBack">Fichier actuel : {{ form.multimediaBack }}</p>
      </div>
      <div class="form-actions">
        <Button @click="$emit('close')" label="Annuler" variant="outlined"></Button>
        <Button @click="save" label="Sauvegarder" variant="filled" color="secondary"></Button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use "./../../assets/css/buttons.scss";
@use "./../../assets/css/form.scss";
</style>