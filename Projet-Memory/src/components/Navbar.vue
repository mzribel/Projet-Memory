<script lang="ts" setup>
import {importDataComposable} from "@/composables/importdata.composable.ts";

const { jsonImport } = importDataComposable();
</script>

<template>
  <header>
    <nav>
      <div class="left"><router-link to="/">Tony Memory</router-link></div>
      <div class="right">
        <input type="file" accept=".json" @change="jsonImport" />
        <div class="user-data">
          <span class="username">Utilisateur anonyme</span>
          <div class="user-pfp">
            <img src="../assets/img/peuchere.png" alt="Aidez-le" />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>