<script lang="ts" setup>
import Navbar from './../components/Navbar.vue';
import NavDrawer from "@/components/nav_drawer/NavDrawer.vue";
import Footer from "@/components/Footer.vue";



</script>
<template>
  <Navbar />
  <main>
    <NavDrawer :categories="[]" :themes="[]"></NavDrawer>
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
}
</style>