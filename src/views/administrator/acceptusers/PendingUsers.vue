<template>
  <v-main class="background darken-1">
    <PendingUsersList />
  </v-main>
</template>

<script>
import PendingUsersList from '@/components/application/administrator/acceptusers/PendingUsersList.vue';

export default {
  components: {
    PendingUsersList,
  },
};
</script>
