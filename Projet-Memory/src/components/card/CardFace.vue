<script lang="ts" setup>

import Button from "@/components/buttons/Button.vue";
import type {Card} from "@/types/Card.ts";
import {onMounted, watch} from "vue";
import {cardMultimediaComposable} from "@/composables/cardmultimedia.composable.ts";


const props = defineProps<{
  showOptions?: boolean,
  isQuestion: boolean,
  card: Card
}>();

const emit = defineEmits(['editCard', 'deleteCard']);
const editCard = () => { emit("editCard"); }
const deleteCard = () => { emit("deleteCard"); }

const { fileUrl: cardFileFrontUrl, fileType: cardFileFrontType, loadFile: loadFrontFile } = cardMultimediaComposable();
const { fileUrl: cardFileBackUrl, fileType: cardFileBackType, loadFile: loadBackFile } = cardMultimediaComposable();

const loadMultimedia = async () => {
  if (props.isQuestion) {
    await loadFrontFile(props.card.multimediaFront);
  } else {
    await loadBackFile(props.card.multimediaBack);
  }
}

watch(
    () => [props.card, props.isQuestion],
    () => {
      loadMultimedia();
    },
    { immediate: true }
)

onMounted(() => {
  loadMultimedia();
});

</script>

<template>
  <div :class="isQuestion ? 'question':'answer'" class="card-face">
    <div class="header">
      <div class="left">
        <span class="face-type">{{ isQuestion ? "Q" : "A" }}</span>
      </div>
      <div class="right" style="display: flex; gap: 8px">
        <Button v-if="showOptions" color="secondary" icon="fa-solid fa-pen" type="icon-btn"
                variant="outlined" @click.stop.prevent='editCard'></Button>
        <Button v-if="showOptions" color="secondary" icon="fa-solid fa-trash" type="icon-btn"
                variant="outlined" @click.stop.prevent='deleteCard'></Button>
      </div>
    </div>
    <div class="body vertical">
      <div class="text">{{ isQuestion ? card.front : card.back }}</div>
      <div class="multimedia">
        <template v-if="cardFileFrontUrl && isQuestion">
          <img v-if="isQuestion && cardFileFrontType.startsWith('image')" :src="cardFileFrontUrl" alt="Recto image" class="multimedia-img" />
          <video v-else-if="isQuestion && cardFileFrontType.startsWith('video')" :src="cardFileFrontUrl" controls class="multimedia-video" />
          <audio v-else-if="isQuestion && cardFileFrontType.startsWith('audio')" :src="cardFileFrontUrl" controls class="multimedia-audio" />
        </template>
        <template v-else-if="cardFileBackUrl && !isQuestion">
          <img v-if="!isQuestion && cardFileBackType.startsWith('image')" :src="cardFileBackUrl" alt="Verso image" class="multimedia-img" />
          <video v-else-if="!isQuestion && cardFileBackType.startsWith('video')" :src="cardFileBackUrl" controls class="multimedia-video" />
          <audio v-else-if="!isQuestion && cardFileBackType.startsWith('audio')" :src="cardFileBackUrl" controls class="multimedia-audio" />
        </template>
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="level">Niveau {{ card.currentLevel }}</div>
      </div>
      <div v-if="showOptions" class="right">
        <span v-if="card.lastReviewedAt">Dernière révision : {{ card.lastReviewedAt.slice(0, 10) }}</span>
        <span v-if="card.nextReviewAt">Prochaine révision : {{ card.nextReviewAt.slice(0, 10) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.multimedia {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.multimedia-img {
  width: 100%;
  height: 100%;
  display: block;
}
.multimedia-video {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  display: block;
}
.multimedia-audio {
  display: block;
}

.card-face {
  &.question {
    color: black;

    .level {
      color: white;
      background-color: black !important;
    }
  }

  &.answer {
    color: white;

    .level {
      color: black;

    }
  }

  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: auto 1fr auto;
  padding: 16px 24px;
  position: relative;

  .header {
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .face-type {
      position: absolute;
      top: 8px;
      font-size: 64px;
      opacity: .1;
    }
  }

  .body {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;

    .multimedia {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      img {
        width: 100%;
        display: block;
      }
    }

    &.vertical {
      flex-direction: column;

      .multimedia {
        width: auto;
      }
    }

    .text {
      flex: 1;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 8px;
    font-size: 11px;

    .level {
      background-color: white;
      padding: 4px 8px;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 10px;
      border-radius: 4px;
      letter-spacing: .05em;
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      opacity: .7;
      font-size: 11px;
    }
  }
}
</style>