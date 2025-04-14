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
import {useSettingsStore} from "@/stores/settingsStore.ts";
import type { Settings} from "@/types/Settings.ts";
import {useFileStore} from "@/stores/fileStore.ts";

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

const fileStore = useFileStore();
const profilePictureURL = computed(()=> {
  if (!settings.value) return '';
  return fileStore.getFileURLById(settings.value.profilePicture);
})

const parametersModalRef = ref<InstanceType<typeof Modal> | null>(null);
const openParameters = () => {
  if (!settings.value) return;
  settingsForm.value = {... settings.value};
  parametersModalRef.value?.openModal();
}

const settingStore = useSettingsStore();
const settings = computed(() => settingStore.settings)

const settingsForm = ref<Settings>({
  id:"1",
  displayName:'',
  useDailyNotification:false,
  profilePicture:''
});

const saveSettings = async () => {
  if (imagePreview.value) {
    settingsForm.value.profilePicture = imagePreview.value;
  }
  await settingStore.updateSettings(settingsForm.value, selectedFile.value);
  parametersModalRef.value?.closeModal();
}

const selectedFile = ref();
const handleFileChange = (e:Event) => {
  let file = (<HTMLInputElement>e.target).files?.[0];
  if (file) {
    selectedFile.value = file;
  }

}
const imagePreview = computed(() => {
  return selectedFile.value ?
    URL.createObjectURL(selectedFile.value) :
    null
})

const importData = async (e: Event) => {
  if (await jsonImport(e)) {
    await settingStore.setLastNotificationDate("");
    window.location.reload();
  }
}

const emit = defineEmits(["isClicked"])

</script>

<template>
  <div class="nav-drawer">
    <DrawerCategory>
      <DrawerItem
        v-for="item of baseMenu"
        :title="item.title"
        :icon="item.icon"
        :link="item.link"
        @click="emit('isClicked')"
      ></DrawerItem>
      <DrawerItem @click="openParameters" title="Paramètres" icon="fa-solid fa-gear"></DrawerItem>
    </DrawerCategory>
    <DrawerCategory title="Thèmes" empty_message="Aucun thème" class="padding-left">
      <template v-slot:default>
        <DrawerItem
          v-if="themes"
          v-for="theme of themes"
          :title="theme.name"
          :link="`/themes/${theme.id}`">
          ></DrawerItem>
        <div v-else class="no-content">Hehe</div>
      </template>
      <template #details v-if="themes">
        <router-link to="/themes/" class="see-more">Voir tout</router-link>
      </template>

    </DrawerCategory>
  </div>
  <Modal title="Paramètres" ref="parametersModalRef">
  <template #body>
    <div class="form-content">
      <div class="form-group">
        <label for="">Photo de profil</label>
        <input id="new-pfp" type="file" accept="image/*" @change="handleFileChange" />
        <label for="new-pfp" class="pfp-preview">
          <img v-if="imagePreview" :src="imagePreview" alt="Photo de profil">
          <img v-else-if="settings?.profilePicture" :src="profilePictureURL" alt="Photo de profil">
          <img v-else src="../../assets/img/peuchere.png" alt="Photo de profil par défaut">
        </label>
      </div>
      <div class="form-group">
        <label for="">Nom d'utilisateur</label>
        <input type="text" min="2" max="20" placeholder="Utilisateur Anonyme" v-model="settingsForm.displayName">
      </div>
      <div class="form-group">
        <label for="import-data">Importer des données</label>
        <input id='import-data' type="file" accept=".json" @change="importData" />
      </div>
      <div class="form-group inline">
        <label class="switch">
          <input type="checkbox" v-model="settingsForm.useDailyNotification"><span class="slider"></span>
        </label>
        <label for="daily-notifications">Activer les notifications journalières</label>
      </div>
      <div class="form-group inline">
        <Button @click="notifyUser" type="icon-btn" icon="fa-solid fa-envelope" size="small" variant="outlined" color="secondary"></Button>
        <label>Tester les notifications</label>
      </div>
      <div class="form-actions">
        <Button @click="parametersModalRef?.closeModal" label="Annuler" variant="outlined"></Button>
        <Button @click="saveSettings" label="Sauvegarder" variant="filled" color="secondary"></Button>
      </div>
    </div>
  </template>
  </Modal>
</template>

<style scoped lang="scss">
@use "./../../assets/css/form.scss";
#new-pfp {
  display: none;
}
.nav-drawer {
  background-color: white;
  font-family: "Roboto", sans-serif;
  padding: 12px;
  height: 100%;
  width: 100%;
  color: #49454F;
  border-right: 2px solid #49454F;
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

.pfp-preview {
  align-self: center;
  height: 125px;
  width: 125px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.7);
  display: block;
  transition: all .1s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: .9;
    border-color: black;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>