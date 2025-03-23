
<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Card } from '@/types/Card.ts';

const props = defineProps<{
  card: Card | null;
}>();

const emit = defineEmits(['save', 'close']);

const form = ref<Card>({
  id: '',
  themeId: '',
  front: '',
  back: '',
  multimedia: '',
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
          multimedia: '',
          level: 0,
        };
      }
    },
    { immediate: true }
);

const save = () => {
  emit('save', form.value);
};
</script>

<template>
  <div >
    <h2 >
      {{ card ? 'Modifier la carte' : 'Ajouter une carte' }}
    </h2>
    <form @submit.prevent="save">
      <div >
        <label for="front">Recto</label>
        <textarea
            v-model="form.front"
            id="front"
            rows="3"
            required
        ></textarea>
      </div>
      <div >
        <label for="back">Verso</label>
        <textarea
            v-model="form.back"
            id="back"
            rows="3"
            required
        ></textarea>
      </div>
      <div >
        <label for="multimedia">Média (URL)</label>
        <input
            v-model="form.multimedia"
            type="url"
            id="multimedia"
        />
      </div>
      <div >
        <button type="button" @click="$emit('close')" >
          Annuler
        </button>
        <button type="submit" >
          Sauvegarder
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>