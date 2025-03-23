<script lang="ts" setup>
import Navbar from './components/Navbar.vue';
</script>
<template>
  <Navbar />
  <router-view class="main-ctn"/>
</template>

<style scoped>

.main-ctn {
  margin-top: 20px;
}
</style>
