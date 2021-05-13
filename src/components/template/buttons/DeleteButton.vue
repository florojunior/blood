<template>
  <v-btn
    data-testid="delete-button"
    class="red py-4"
    depressed
    x-small
    :disabled="disabled"
    @click="onClick"
  >
    <v-icon color="tertiary lighten-2" small> mdi-delete </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    disabled: Boolean,
  },
};
</script>

