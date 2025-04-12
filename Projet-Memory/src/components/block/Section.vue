<script setup lang="ts">

import SectionTitle from "@/components/block/SectionTitle.vue";
</script>

<template>
  <section>
    <SectionTitle>
      <template #left>
        <slot name="title-left"></slot>
      </template>
      <template #right>
        <slot name="title-right"></slot>
      </template>
    </SectionTitle>
    <div class="section-ctn">
        <slot name="content"></slot>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}
</style>