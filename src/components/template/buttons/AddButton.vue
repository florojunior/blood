<template>
  <v-btn
    depressed
    block
    class="secondary lighten-2 text-caption onPrimaryHighEmphasis--text"
    data-testid="add-button"
    :loading="loading"
    @click="onClick"
  >
    <slot></slot>
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
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>
