<script lang="ts" setup>
</script>
<template>
  <header>
    <nav>
      <div class="left"><router-link to="/">Tony Memory</router-link></div>
      <div class="right">
        <span class="username">Utilisateur anonyme</span>
        <div class="user-pfp">
          <img src="../assets/img/peuchere.png" alt="Aidez-le">
        </div>
      </div>
    </nav>
  </header>
<!--  <nav class="">-->
<!--      <router-link to="/">Accueil</router-link>-->

<!--      <router-link to="/categories">Catégories</router-link>-->

<!--      <router-link to="/themes">Thèmes</router-link>-->

<!--      <router-link to="/revision">Révisions</router-link>-->

<!--      <router-link to="/settings">Paramètres</router-link>-->

<!--  </nav>-->
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

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    .right {
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
}
</style>