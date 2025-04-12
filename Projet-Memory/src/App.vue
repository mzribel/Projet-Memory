<script lang="ts" setup>
import {onMounted} from "vue";
import {notificationComposable} from "@/composables/notification.composable.ts";

const { requestNotificationPermission, notifyUser } = notificationComposable()

onMounted(async () => {
  const granted = await requestNotificationPermission()
  if (granted) {
    setTimeout(() => {
      notifyUser()
    }, 5000)
  }
})
</script>
<template>
    <router-view/>
</template>

<style scoped>

</style>
