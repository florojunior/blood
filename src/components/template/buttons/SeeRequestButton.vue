<template>
  <v-btn
    data-testid="visibility-button"
    class="secondary darken-3 py-4"
    depressed
    x-small
    :loading="loading"
    :disabled="disabled"
    @click="onClick"
  >
    <v-icon color="tertiary lighten-2 mr-2" small> visibility </v-icon>
    <span class="ml-2 text-caption font-weight-bold"> VER </span>
  </v-btn>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    loading: {
      required: false,
    },
    disabled: Boolean,
  },
};
</script>

