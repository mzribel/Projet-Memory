<script lang="ts" setup>
import Button from "@/components/buttons/Button.vue";
import {db} from '@/database.ts';

const jsonImport = async (event:Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  try {
    const text = await file.text();
    const json = JSON.parse(text);

    await db.transaction('rw', db.categories, db.themes, db.cards, async () => {
      if (json.categories) await db.categories.bulkPut(json.categories as Category[]);
      if (json.themes) await db.themes.bulkPut(json.themes as Theme[]);
      if (json.cards) await db.cards.bulkPut(json.cards as Card[]);
    });
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
}
</script>
<template>
  <header>
    <nav>
      <div class="left"><router-link to="/">Tony Memory</router-link></div>
      <div class="right">
        <input type="file" accept=".json" @change="jsonImport"/>
        <div class="user-data">
          <span class="username">Utilisateur anonyme</span>
          <div class="user-pfp">
            <img src="../assets/img/peuchere.png" alt="Aidez-le">
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
}
</style>