<script setup lang="ts">

import Button from "@/components/buttons/Button.vue";
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <div style="display: flex; gap: 8px;">
      <Button label="Transparent" icon="fa-solid fa-plus" size="large"></Button>
      <Button label="Outlined" variant="outlined" color="secondary" icon="fa-solid fa-plus" size="large"></Button>
      <Button label="Tonal 1" icon="fa-solid fa-plus" variant="tonal" size="large"></Button>
      <Button label="Tonal 2" icon="fa-solid fa-plus" variant="tonal" color="secondary" size="large"></Button>
      <Button label="Filled" variant="filled" icon="fa-solid fa-plus" size="large"></Button>
      <Button label="Filled" variant="filled" color="secondary" icon="fa-solid fa-plus" size="large"></Button>
    </div>
    <div style="display: flex; gap: 8px;">
      <Button label="Transparent" icon="fa-solid fa-plus"></Button>
      <Button label="Outlined" variant="outlined" color="secondary" icon="fa-solid fa-plus"></Button>
      <Button label="Tonal 1" icon="fa-solid fa-plus" variant="tonal"></Button>
      <Button label="Tonal 2" icon="fa-solid fa-plus" variant="tonal" color="secondary"></Button>
      <Button label="Filled" variant="filled" icon="fa-solid fa-plus"></Button>
      <Button label="Filled" variant="filled" color="secondary" icon="fa-solid fa-plus"></Button>
    </div>
    <div style="display: flex; gap: 8px;">
      <Button type="icon-btn" icon="fa-solid fa-plus" size="large"></Button>
      <Button type="icon-btn" variant="outlined" icon="fa-solid fa-plus" size="large"></Button>
      <Button icon="fa-solid fa-plus" variant="tonal" size="large"></Button>
      <Button icon="fa-solid fa-plus" variant="tonal" color="secondary" size="large"></Button>
      <Button type="icon-btn" variant="filled" icon="fa-solid fa-plus" size="large"></Button>
      <Button type="icon-btn" variant="filled" color="secondary" icon="fa-solid fa-plus" size="large"></Button>
    </div>
    <div style="display: flex; gap: 8px;">
      <Button type="icon-btn" icon="fa-solid fa-plus"></Button>
      <Button type="icon-btn" variant="outlined" icon="fa-solid fa-plus"></Button>
      <Button icon="fa-solid fa-plus" variant="tonal"></Button>
      <Button icon="fa-solid fa-plus" variant="tonal" color="secondary"></Button>
      <Button type="icon-btn" variant="filled" icon="fa-solid fa-plus"></Button>
      <Button type="icon-btn" variant="filled" color="secondary" icon="fa-solid fa-plus"></Button>
    </div>
    <div style="display: flex; gap: 8px;">
      <Button type="fab-btn" label="Transparent" icon="fa-solid fa-plus"></Button>
      <Button type="fab-btn" label="Outlined" variant="outlined" icon="fa-solid fa-plus"></Button>
      <Button type="fab-btn" label="Tonal 1" icon="fa-solid fa-plus" variant="tonal"></Button>
      <Button type="fab-btn" label="Tonal 2" icon="fa-solid fa-plus" variant="tonal" color="secondary"></Button>
      <Button type="fab-btn" label="Filled 1" variant="filled" icon="fa-solid fa-plus"></Button>
      <Button type="fab-btn" label="Filled 2" variant="filled" color="secondary" icon="fa-solid fa-plus"></Button>
    </div>
    <div style="display: flex; gap: 8px;">
      <Button type="fab-btn" icon="fa-solid fa-plus"></Button>
      <Button type="fab-btn" variant="outlined" icon="fa-solid fa-plus"></Button>
      <Button type="fab-btn" icon="fa-solid fa-plus" variant="tonal"></Button>
      <Button type="fab-btn" icon="fa-solid fa-plus" variant="tonal" color="secondary"></Button>
      <Button type="fab-btn" variant="filled" icon="fa-solid fa-plus"></Button>
      <Button type="fab-btn" variant="filled" color="secondary" icon="fa-solid fa-plus"></Button>
    </div>
  </div>
</template>

<style scoped>

</style>