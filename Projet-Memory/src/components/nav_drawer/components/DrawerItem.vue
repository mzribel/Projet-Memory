<script setup lang="ts">

export interface IDrawerItem {
  title:string,
  subtitle?:string,
  icon?:string,
  details?:string,
  link?:string
}

defineProps<{ item: IDrawerItem, isTitle?:boolean }>();

</script>

<template>
  <div v-if="isTitle" class="nav-element title">
    {{ item.title }}
  </div>
<!--   here -->
  <component
    v-else class="nav-element item"
    :is="item.link ? 'router-link' : 'div'"
    v-bind="item.link ? { to: item.link } : {}">
    <div class="left">
      <i v-if="item.icon" :class="item.icon"></i>
      <div>
        <span class="item-title">{{ item.title }}</span>
        <div v-if="item.subtitle" class="item-details">
          {{ item.subtitle }}
        </div>
      </div>
    </div>
    <div class="right">{{ item.details }}</div>
<!--    here -->
  </component>
</template>

<style scoped>
.nav-element {
  padding: 8px 16px;
  display: flex;
  align-items: center;
}

.title {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: .05em;
}

.item {
  min-height: 56px;
  justify-content: space-between;
  gap: 16px;
  border-radius: 100px;
  cursor:pointer;
  font-weight: 500;
  i {
    font-size: 24px;
    width: 24px;
    aspect-ratio: 1;
    text-align: center;
  }

  .item-details {
    font-size: 12px;
    font-weight: 500;
    font-style: italic;
    opacity: 0.8;
  }

  &:hover {
    background-color: #E6E1E9
  }

  &.router-link-active {
    background-color: #E8DEF8;
    &:hover {
      background-color: #DCD2EC;
    }
  }

  .left {
    display:flex;
    align-items: center;
    gap:16px;
  }
  .right {
    opacity: 0.8;
    font-size:14px;
    font-weight: normal;
    margin-top: 3px;
  }
}
</style>