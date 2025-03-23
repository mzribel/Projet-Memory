<script lang="ts" setup>
</script>
<template>
  <nav class="bg-blue-600 text-white p-4 fixed top-0 left-0 right-0 z-10">
    <ul class="flex justify-between">
      <li>
        <router-link to="/" class="hover:underline">Accueil</router-link>
      </li>
      <li>
        <router-link to="/categories" class="hover:underline">Catégories</router-link>
      </li>
      <li>
        <router-link to="/themes" class="hover:underline">Thèmes</router-link>
      </li>
      <li>
        <router-link to="/revision" class="hover:underline">Révisions</router-link>
      </li>
      <li>
        <router-link to="/settings" class="hover:underline">Paramètres</router-link>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
</style>