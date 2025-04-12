<script lang="ts" setup>
import {onMounted} from "vue";
import {notificationComposable} from "@/composables/notification.composable.ts";
const { requestNotificationPermission, notifyUser } = notificationComposable();
onMounted(async () => {
  await requestNotificationPermission();

  notifyUser();
})
</script>
<template>
    <router-view/>
</template>

<style scoped>

</style>
