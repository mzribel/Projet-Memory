<script lang="ts" setup>
import type { Card } from '@/types/Card.ts';

const props = defineProps<{ card: Card }>();
const emit = defineEmits(['edit', 'delete']);



// const getMediaType = (file?: File): 'image' | 'video' | 'audio' | 'unknown' => {
//   if (!file) return 'unknown';
//
//   const extension = file.name.split('.').pop()?.toLowerCase();
//   if (!extension) return 'unknown';
//
//   if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(extension)) return 'image';
//   if (['mp4', 'webm', 'ogg'].includes(extension)) return 'video';
//   if (['mp3', 'wav', 'ogg', 'flac'].includes(extension)) return 'audio';
//
//   return 'unknown';
// };
</script>

<template>
  <div>
    <div>
      <p>Recto:</p>
      <p>{{ card.front }}</p>

      <template v-if="card.multimediaFront">
        <p>feur</p>
<!--        <p>{{ getMediaType(card.multimediaFront) }}</p>-->
      </template>

      <p>Verso:</p>
      <p>{{ card.back }}</p>

      <template v-if="card.multimediaBack">
        {{card.multimediaBack.name}}
<!--        {{getMediaType(card.multimediaBack)}}-->
      </template>
    </div>

    <div>
      <button @click="$emit('edit', card)">Modifier</button>
      <button @click="$emit('delete', card.id)">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
</style>
