<script setup lang="ts">

import Block from "@/components/block/Block.vue";
import PageTitle from "@/components/block/PageTitle.vue";
import PageSubtitle from "@/components/block/PageSubtitle.vue";

defineProps<{ alignCenterTitle?:boolean }>();
</script>

<template>
<Block type="title">
  <PageTitle :align-center="alignCenterTitle">
    <template #left>
      <slot name="title-left"></slot>
    </template>
    <template #right>
      <slot name="title-right"></slot>
    </template>
  </PageTitle>
  <div class="page-subtitle-ctn">
    <slot name="subtitle"></slot>
  </div>
</Block>
</template>

<style scoped>
.page-subtitle-ctn {
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: .7;
}
</style>