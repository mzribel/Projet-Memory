<script setup lang="ts">
import { ref } from 'vue';
let isOpen = ref(false);
import Button from "@/components/buttons/Button.vue";

const openModal = () => (isOpen.value = true);
const closeModal = () => {
  (isOpen.value = false);
}
defineProps<{
  title?: string;
  description?: string;
  hideCloseBtn?: boolean;
}>();
defineExpose({openModal, closeModal});
</script>

<template>
<transition name="modal">
  <div v-if="isOpen" class="modal-container">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal">
      <div class="modal-top-bar">
        <div class="left">
          <div v-if="title" class="title">{{ title }}</div>
          <div v-if="description" class="description">{{ description }}</div>
        </div>
        <div class="right">
          <Button v-if="!hideCloseBtn" @click="closeModal" icon="fa-solid fa-xmark" type="fab-btn" variant="filled" color="secondary"></Button>
        </div>
      </div>
      <div class="modal-header">
        <slot name="header"></slot>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</transition>
</template>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s ease-in-out ;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(33, 31, 33, 0.3);
  backdrop-filter: blur(3px);
  opacity: 1;
}
.hidden .modal-background {
  opacity: 0;
}

.modal {
  background-color: white;
  padding: 16px 24px;
  border-radius: 8px;
  z-index: 1;
  min-width: min(95%, 600px);
}

.modal-top-bar {
  display: flex;
  gap: 16px;
  padding: 0 32px;
  justify-content: space-between;
  margin-bottom: 16px;
  .left {
    display: flex;
    flex: 1;
    flex-direction: column;
    .title {
      font-weight: 500;
      font-size:x-large;
    }
    .description {
      font-size: 14px;
    }
  }
}
button.close {
  width: 32px;
  font-size: 20px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  &:hover {
    background-color: rgba(33, 31, 33, 0.05);
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.15s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>