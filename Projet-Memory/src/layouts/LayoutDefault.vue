<script lang="ts" setup>
import Navbar from './../components/Navbar.vue';
import NavDrawer from "@/components/nav_drawer/NavDrawer.vue";
import Footer from "@/components/Footer.vue";
import {useThemeStore} from "@/stores/themeStore.ts";
import {useCardStore} from "@/stores/cardStore.ts";
import {useCategoryStore} from "@/stores/categoryStore.ts";
import {onBeforeUnmount, onMounted, ref, useTemplateRef} from "vue";
import Modal from "@/components/modal/Modal.vue";

const navIsHidden = ref(false);

const toggleNavDrawer = () => {
  navIsHidden.value = !navIsHidden.value;
}

const handleResize = () => {
  if (window.innerWidth < 1000) {
    navIsHidden.value = true;
    showToggleButton.value = true;
  } else {
    showToggleButton.value = false;
  }
}

const showToggleButton = ref(false);

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const closeDrawer = () => {
  navIsHidden.value = true;
}

</script>
<template v-if="isLoaded">
  <Navbar @toggle-burger="toggleNavDrawer" :show-burger="showToggleButton" :is-open="navIsHidden"/>
  <main>
    <div class="nav-ctn" :class="navIsHidden ? 'hidden' : ''">
      <NavDrawer @is-clicked="closeDrawer" ref="navDrawerRef"></NavDrawer>
    </div>
    <div class="content-ctn">
      <div id="content">
        <slot/>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<style scoped>
main {
  padding-top: 50px;
  position: relative;
}
.nav-ctn {
  width: 360px;
  max-width: 100%;
  flex-shrink: 0;
}

@media screen and (max-width: 1000px) {
  .nav-ctn {
    position: absolute;
    z-index: 10;
    height: 100%;
    padding-bottom: 50px;
    width: 360px;
    overflow: hidden;
    transition: width .2s ease-in-out;
    &.hidden {
      width: 0;
    }
  }
}

</style>