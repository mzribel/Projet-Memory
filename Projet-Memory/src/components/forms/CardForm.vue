<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { Card } from '@/types/Card.ts';

const props = defineProps<{ card: Card | null }>();
const emit = defineEmits(['save', 'close']);

const form = ref<Card>({
  id: '',
  themeId: '',
  front: '',
  back: '',
  multimediaFront: '',
  multimediaBack: '',
  level: 0,
});

watch(
    () => props.card,
    (newCard) => {
      if (newCard) {
        form.value = { ...newCard };
      } else {
        form.value = {
          id: '',
          themeId: '',
          front: '',
          back: '',
          multimediaFront: '',
          multimediaBack: '',
          level: 0,
        };
      }
    },
    { immediate: true }
);

const frontFile = ref<File | null>(null);
const backFile = ref<File | null>(null);

const handleFileUpload = (event: Event, isFront: boolean) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    if (isFront) {
      frontFile.value = file;
    } else {
      backFile.value = file;
    }
  }
};

const save = () => {
  emit('save', form.value, frontFile.value, backFile.value);
};
</script>
<template>
  <div>
    <h2>{{ card ? 'Modifier la carte' : 'Ajouter une carte' }}</h2>
    <form @submit.prevent="save">
      <div>
        <label for="front">Recto</label>
        <textarea v-model="form.front" id="front" rows="3" required></textarea>
        <div>
          <label for="multimediaFront">Média côté recto</label>
          <input type="file" id="multimediaFront" accept="image/*,video/*,audio/*" @change="handleFileUpload($event, true)">
          <p v-if="form.multimediaFront">Fichier actuel : {{ form.multimediaFront }}</p>
        </div>
      </div>

      <div>
        <label for="back">Verso</label>
        <textarea v-model="form.back" id="back" rows="3" required></textarea>
        <div>
          <label for="multimediaBack">Média côté verso</label>
          <input type="file" id="multimediaBack" accept="image/*,video/*,audio/*" @change="handleFileUpload($event, false)">
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