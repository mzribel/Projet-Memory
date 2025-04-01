<script setup lang="ts">

import Button from "@/components/buttons/Button.vue";

defineProps<{
  showOptions?:boolean,
  isQuestion:boolean,
  level?: [number, number],
}>();
</script>

<template>
<div class="card-face" >
  <div class="header">
    <div class="left">
      <span class="face-type">{{ isQuestion ? "Q" : "A"}}</span>
    </div>
    <div class="right">
<!--      <Button type="icon-btn" icon="fa-solid fa-pen" variant="outlined" color="secondary"></Button>-->
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
    <div v-if="level" class="level">
      Level {{ level[0] }} / {{ level[1]}}
    </div>
  </div>
</div>
</template>

<style scoped>
.card-face {
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
    justify-content: flex-end;
    font-size: 14px;
    margin-top: 8px;
    .level {
      opacity: .5;
    }
  }
}
</style>