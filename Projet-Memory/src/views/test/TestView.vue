<script setup lang="ts">
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import Block from "@/components/block/Block.vue";
import PageSubtitle from "@/components/block/PageSubtitle.vue";
import TitleBlock from "@/components/block/TitleBlock.vue";
import Button from "@/components/buttons/Button.vue";
import SectionTitle from "@/components/block/SectionTitle.vue";
import Section from "@/components/block/Section.vue";

// const modalRef = ref<ComponentPublicInstance<{ openModal: () => void }> | null>(null);
// const showModal = () => { modalRef?.value?.openModal(); };
// const card = {
//   id: "1",
//   themeId: "1",
//   front: "Capitale de mon cul",
//   back: "Back",
//   level: 2
// }

</script>

<template>
  <layout-default>
<!--    <Button label="Open modal" @click="showModal" variant="outlined"></Button>-->
<!--    <Modal ref="modalRef" title="Mes couilles en ski" description="c'est nike">-->
<!--      <template #body>-->

<!--      </template>-->
<!--    </Modal>-->
    <h2>> Test de titre h1</h2>
    <h3>Test de titre h1</h3>
    <h4>Test de titre h1</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus magnam molestias obcaecati recusandae. Excepturi illo laboriosam nulla, officiis quas ratione repellat repellendus tempore temporibus veritatis. Aspernatur autem dicta hic quae.</p>

    <Block type="title">
      <h1>Test de titre h1</h1>
      <PageSubtitle icon="fa-solid fa-box-archive">hello</PageSubtitle>

    </Block>
    <Block type="normal">
      <h1>Test de titre h1</h1>
    </Block>
    <br>
    <TitleBlock>
      <template #title-left><h1>Test de titre h1</h1></template>
      <template #title-right>
        <Button size="large" label="heh" type="fab-btn" variant="filled" color="secondary"></Button>
      </template>
      <template #subtitle>
          <PageSubtitle icon="fa-solid fa-box-archive">Mes couilles</PageSubtitle>
          <PageSubtitle icon="fa-solid fa-box-archive">Mes couilles</PageSubtitle>
          <PageSubtitle icon="fa-solid fa-box-archive">Mes couilles</PageSubtitle>
      </template>
    </TitleBlock>
    <br>
    <Section>
      <template #title-left><h2>Test</h2></template>
      <template #content>
        melksd
      </template>
    </Section>
  </layout-default>
</template>

<style scoped lang="scss">
</style>