<script lang="ts" setup>
</script>
<template>
  <nav class="bg-blue-600 text-white p-4">
    <ul class="flex justify-between">
      <!-- Lien vers la page d'accueil, les catégories -->
      <li>
        <router-link to="/" class="hover:underline">Catégories</router-link>
      </li>
      <!-- Lien vers la page des révisions -->
      <li>
        <router-link to="/revision" class="hover:underline">Révisions</router-link>
      </li>
      <!-- Lien vers les paramètres -->
      <li>
        <router-link to="/settings" class="hover:underline">Paramètres</router-link>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
/* Styles personnalisés */
</style>