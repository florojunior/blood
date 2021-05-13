<template>
  <v-btn
    data-testid="edit-button"
    depressed
    color="secondary darken-3 py-4"
    x-small
    @click="onClick"
  >
    <v-icon left small color="tertiary lighten-2"> mdi-pencil </v-icon>
    <span class="text-caption font-weight-bold"> Editar </span>
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

