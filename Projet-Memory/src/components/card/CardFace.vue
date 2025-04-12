<script setup lang="ts">

import Button from "@/components/buttons/Button.vue";

defineProps<{
  showOptions?:boolean,
  isQuestion:boolean,
  level?: number,
}>();

const emit = defineEmits(['editCard', 'deleteCard']);
const editCard = () => { emit("editCard"); }
const deleteCard = () => { emit("deleteCard"); }

</script>

<template>
<div class="card-face" :class="isQuestion ? 'question':'answer'" >
  <div class="header">
    <div class="left">
      <span class="face-type">{{ isQuestion ? "Q" : "A"}}</span>
    </div>
    <div class="right" style="display: flex; gap: 8px">
      <Button @click.stop.prevent='editCard' v-if="showOptions" type="icon-btn" icon="fa-solid fa-pen" variant="outlined" color="secondary"></Button>
      <Button @click.stop.prevent='deleteCard' v-if="showOptions" type="icon-btn" icon="fa-solid fa-trash" variant="outlined" color="secondary"></Button>
    </div>
  </div>
  <div class="body vertical">
    <div class="multimedia">
<!--      <img src="../../assets/img/peuchere.png" alt="">-->
<!--      <audio controls src="/shared-assets/audio/t-rex-roar.mp3"></audio>-->
<!--      <video controls><source src="" type="video/mp4" /></video>-->
    </div>
    <div class="text"><slot></slot></div>

  </div>
  <div class="footer">
    <div class="left">
      <div class="level" v-if="level">Niveau {{ level }}</div>
    </div>
    <div class="right" v-if="showOptions">
      <span>Dernière révision : </span>
      <span>Prochaine révision : </span>
    </div>
  </div>
</div>
</template>

<style scoped>
.card-face {
  &.question{
    color: black;
    .level {
      color: white;
      background-color: black !important;
    }
  }
  &.answer{
    color: white;
    .level {
      color: black;

    }
  }

  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: auto 1fr auto;
  padding: 16px 24px ;
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