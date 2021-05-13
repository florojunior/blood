<template>
  <v-dialog
    v-model="isOpen"
    persistent
    max-width="600"
    data-testid="base-modal"
  >
    <v-card flat>
      <v-card-title class="primary pa-8">
        <div
          class="d-flex flex-row flex-grow-1 align-center justify-space-between"
        >
          <div class="white--text text-h5" data-testid="title">
            <slot name="title"></slot>
          </div>
          <v-btn
            class="ml-2"
            icon
            :disabled="isCloseButtonDisabled"
            data-testid="close-button"
            @click="handleClose"
          >
            <v-icon large color="white">mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-card-text class="text-body-2 pa-4" data-testid="content">
        <slot name="content"></slot>
      </v-card-text>

      <v-card-actions class="pa-4" data-testid="actions">
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    isCloseButtonDisabled: {
      type: Boolean,
      default: false,
    },
    handleClose: {
      type: Function,
      required: true,
    },
  },
};
</script>
