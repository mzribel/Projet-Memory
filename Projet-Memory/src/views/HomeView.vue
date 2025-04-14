<script setup lang="ts">

import LayoutDefault from "@/layouts/LayoutDefault.vue";
import Section from "@/components/block/Section.vue"
import Block from "@/components/block/Block.vue";

const tutorials:{title:string, description:string}[] = [
  {
    title: "Créez vos catégories et thèmes",
    description: "Chaque catégorie peut contenir des thèmes, qui contiendront des cartes afin de mieux organiser vos connaissances."
  },
  {
    title: "Créez vos cartes",
    description: "Définissez les connaissances que vous souhaitez retenir grâce à des cartes questions/réponses, pouvant contenir texte, image, vidéo ou audio !"
  },
  {
    title: "Révisez chaque jour",
    description: "L’application vous propose chaque jour les cartes à revoir selon un algorithme de répétition espacée. Plus la carte est retenue, moins elle est révisée souvent !"
  },
  {
    title: "Mémorisez plus longtemps",
    description: "Les cartes que vous connaissez bien s’espacent de plus en plus jusqu’à atteindre le niveau maximal défini dans leur thème, vous permettant d’optimiser vos efforts !"
  }
]

</script>

<template>
<layout-default>
  <div class="app-title">
    <div class="title">
      <span>Projet Memory</span>
    </div>
    <div class="subtitle">Un projet proposé par Tony de Donato et Marianne Corbel</div>
  </div>
<!--  <Section class="flex column row-gap-16">-->
<!--    &lt;!&ndash; TODO : Utiliser le username &ndash;&gt;-->
<!--    <template #title-left><h2>Bienvenue !</h2></template>-->
<!--    <template #content>-->
<!--      hehe-->
<!--    </template>-->
<!--  </Section>-->
  <Section class="flex column row-gap-16">
    <!-- TODO : Utiliser le username -->
    <template #title-left><h2>Comment ça marche ?</h2></template>
    <template #content>
      <div class="tutorial-ctn">
        <Block type="normal" class="tutorial-item" v-for="(tutorial, index) in tutorials" :key="tutorial.title">
          <div class="header">
            <div class="pastille">{{ index+1 }}</div>
            <div class="title">
              <span>{{ tutorial.title }}</span>
              <div class="decoration"></div>
            </div>

          </div>
          <div class="content">{{ tutorial.description }}</div>
        </Block>
      </div>
    </template>
  </Section>
</layout-default>
</template>

<style scoped>
.app-title {
  margin: 62px 0 48px;
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  .title {
    width: fit-content;
    font-size: 44px;
    font-weight: 400;
    padding: 0 32px;
    position: relative;
    z-index: 1;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      height: 1px;
      width: 100%;
      background-color: black;
      z-index: -1;
    }

    span {
      z-index: 1;
      background-color: white;
      padding: 0 16px;
    }


  }
  .subtitle {
    font-size: 12px;
    opacity: .75;
  }
}

.tutorial-ctn {
  display: grid;
  width: fit-content;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  gap: 16px;
  margin: auto;
}

.tutorial-item {
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  max-width: 450px;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    .pastille {
      height: 35px;
      width: 35px;
      border-radius: 4px;
      background-color: #211F21;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .title {
      font-weight: 500;
      display: flex;
      flex-direction: column;
      gap: 3px;
      align-items: center;
      text-align: center;
      .decoration {
        height: 1px;
        width: 150px;
        background-color: #211F21;
        bottom: -3px;
        left: 0;

      }
    }


  }
  .content {
    font-size: 12px;
    font-style: italic;
    opacity: .75;
    text-align: center;
  }
}
@media screen and (max-width: 700px) {
  .tutorial-ctn {
    grid-template-columns: 1fr;
  }
}
</style>