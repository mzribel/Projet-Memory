<script setup lang="ts">
import { ref } from "vue";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import Modal from "@/components/modal/Modal.vue";
import type { ComponentPublicInstance } from 'vue';
import Button from "@/components/buttons/Button.vue";
import Card from "@/components/card/Card.vue";
import Block from "@/components/block/Block.vue";

const modalRef = ref<ComponentPublicInstance<{ openModal: () => void }> | null>(null);
const showModal = () => { modalRef?.value?.openModal(); };
const card = {
  id: "1",
  themeId: "1",
  front: "Capitale de mon cul",
  back: "Back",
  level: 2
}
</script>

<template>
  <layout-default>
    <Button label="Open modal" @click="showModal" variant="outlined"></Button>
    <Modal ref="modalRef" title="Mes couilles en ski" description="c'est nike">
      <template #body>
        <Card :card-data="card"/>
      </template>
    </Modal>
    <Block>
      hehe
    </Block>
  </layout-default>
</template>

<style scoped>
</style>