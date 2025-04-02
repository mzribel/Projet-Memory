<script setup lang="ts">

import LayoutEmpty from "@/layouts/LayoutEmpty.vue";
</script>

<template>
<layout-empty>
  <div class="not-found-container">
    <span class="title">404 Pas trouvé MDR</span>
    <span class="subtitle">Petit <router-link to="/">retour à l'accueil</router-link> peut-être ?</span>
  </div>
</layout-empty>
</template>

<style scoped>
.not-found-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    font-size: 64px;
    text-transform: lowercase;
  }
  .subtitle {
    font-size: 14px;
    text-transform: uppercase;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}
</style>