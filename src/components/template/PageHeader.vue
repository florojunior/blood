<template>
  <v-row no-gutters align="center" justify="space-between">
    <v-col class="d-none d-sm-flex" cols="12" sm="6">
      <PageTitle />
    </v-col>
    <v-col cols="12" sm="auto" class="d-flex">
      <slot name="header-extra-content"></slot>
    </v-col>
  </v-row>
</template>

<script>
import PageTitle from '@/components/template/PageTitle.vue';

export default {
  components: {
    PageTitle,
  },
};
</script>

<style>
</style>
