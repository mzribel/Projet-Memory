<script setup lang="ts">
import {computed, ref} from "vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import DrawerCategory from "@/components/nav_drawer/components/DrawerCategory.vue";
import DrawerItem from "@/components/nav_drawer/components/DrawerItem.vue";
import Modal from "@/components/modal/Modal.vue";
import Button from "@/components/buttons/Button.vue";
import {notificationComposable} from "@/composables/notification.composable.ts";
const { notifyUser } = notificationComposable();
import {importDataComposable} from "@/composables/importdata.composable.ts";

const { jsonImport } = importDataComposable();
// Base Menu
const baseMenu = ref([
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
]);

const themesStore = useThemeStore();
const themes = computed(() => themesStore.themes.slice(0, 5));

const parametersModalRef = ref<InstanceType<typeof Modal> | null>(null);
const openParameters = () => {
  parametersModalRef.value?.openModal();
}
</script>

<template>
  <div class="nav-drawer">
    <DrawerCategory>
      <DrawerItem
        v-for="item of baseMenu"
        :title="item.title"
        :icon="item.icon"
        :link="item.link"
      ></DrawerItem>
      <DrawerItem @click="openParameters" title="Paramètres" icon="fa-solid fa-gear"></DrawerItem>
    </DrawerCategory>
    <DrawerCategory title="Thèmes" empty_message="Aucun thème">
      <template v-if="themes">
        <DrawerItem
          v-for="theme of themes"
          :title="theme.name"
          :link="`/themes/${theme.id}`">
          ></DrawerItem>
        <router-link to="/themes/" class="see-more">Voir tout</router-link>
      </template>
    </DrawerCategory>
  </div>
  <Modal title="Paramètres" ref="parametersModalRef">
  <template #body>
    <div class="form-content">
      <div class="form-group">
        <label for="import-data">Importer des données</label>
        <input id='import-data' type="file" accept=".json" @change="jsonImport" />
      </div>
      <div class="form-group">
        <label>Tester les notifications</label>
        <Button @click="notifyUser" icon="fa-solid fa-envelope" label="SEEEEEEEND IT !" variant="filled" color="secondary"></Button>
      </div>
    </div>
  </template>
  </Modal>
</template>

<style scoped lang="scss">
@use "./../../assets/css/form.scss";

.nav-drawer {
  background-color: #FEF7FF;
  font-family: "Roboto", sans-serif;
  padding: 12px;
  height: 100%;
  width: 360px;
  color: #49454F;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.see-more {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  font-style: italic;
  margin-top: 8px;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>