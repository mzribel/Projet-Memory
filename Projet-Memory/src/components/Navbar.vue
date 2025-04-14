<script lang="ts" setup>

import {useSettingsStore} from "@/stores/settingsStore.ts";
import {computed} from "vue";
import {useFileStore} from "@/stores/fileStore.ts";
import Button from "@/components/buttons/Button.vue";

const settingsStore = useSettingsStore();
const fileStore = useFileStore();
const settings = computed(()=>settingsStore.settings);

const profilePictureURL = computed(()=> {
  if (!settings.value) return '';
  return fileStore.getFileURLById(settings.value.profilePicture);
})

const emit = defineEmits(['toggleBurger']);
defineProps<{
  showBurger?: boolean;
  isOpen: boolean;
}>();
</script>

<template>
  <header>
    <nav>
      <div class="left">
        <Button v-if="showBurger" @click='emit("toggleBurger")' :icon="`fa-solid ${isOpen ? 'fa-bars' : 'fa-close'}`" class="menu-burger-btn"/>
      </div>
      <div class="right">
        <div class="user-data">
          <span v-if="settings && settings.displayName" class="username">{{ settings.displayName }}</span>
          <span v-else class="username">Utilisateur anonyme</span>
          <div class="user-pfp">
            <img v-if="profilePictureURL" :src="profilePictureURL" alt="Photo de profil">
            <img v-else src="../assets/img/peuchere.png" alt="Photo de profil par défaut">
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<style scoped lang="scss">
header {
  position: fixed;
  height: 50px;
  width: 100%;
  background-color: #211F21;
  color:white;
  z-index:200;
  padding: 8px 16px;

  .json-import-btn {
    font-size: 12px;
    opacity: .8;
    &:hover {
      opacity: 1;
    }
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    .right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .user-data {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-pfp {
      height: 40px;
      aspect-ratio: 1;
      border-radius: 50%;
      overflow: hidden;
      img {
        display: block;
        height: 100%;
      }
    }
    .username {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      opacity: .8;
    }
  }

  .menu-burger-btn {
    font-size: 20px;
  }
}
</style>