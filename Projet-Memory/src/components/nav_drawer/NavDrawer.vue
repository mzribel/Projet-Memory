<script setup lang="ts">
import Drawer from "@/components/nav_drawer/components/Drawer.vue";

const { categories, themes } = defineProps<{ categories:any[], themes:any[] }>();

const menu = [{
  options: [
    {
      title:"Accueil",
      icon: "fa-solid fa-house",
      link: "/"
    },
    {
      title:"Réviser",
      icon: "fa-solid fa-book",
      subtitle: "24 cartes aujourd'hui",
      link: "/practice"
    },
    {
      title:"Mes catégories",
      icon: "fa-solid fa-box-archive",
      link: "/categories"
    },
    {
      title:"Mes thèmes",
      icon: "fa-solid fa-layer-group",
      link: "/themes"
    },
    {
      title:"Test",
      icon: "fa-solid fa-gear",
      link: "/test"
    }
  ]},
  {
    title: "Catégories",
    options: categories,
    empty_msg: "Aucune catégorie définie !"
  },
  {
    title: "Thèmes",
    options: themes,
    empty_msg: "Aucun thème défini !"
  },
]

</script>

<template>
  <Drawer :categories="menu"></Drawer>
</template>

<style scoped>

</style>