<template>
  <v-btn
    data-testid="block-button"
    depressed
    class="blocked py-4"
    x-small
    :disabled="disabled"
    @click="onClick"
  >
    <v-icon color="surface" small> mdi-block-helper </v-icon>
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

