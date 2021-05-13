<template>
  <v-btn
    data-testid="unblock-button"
    depressed
    class="unblocked v-btn"
    x-small
    @click="onClick"
  >
    <v-icon color="surface" small> mdi-check-circle-outline </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-btn {
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
}
</style>
