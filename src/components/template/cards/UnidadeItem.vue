<template>
  <v-card
    data-testid="unidade-option"
    elevation="2"
    width="300"
    class="pa-4 d-flex flex-column"
  >
    <v-card
      flat
      class="py-6 d-flex flex-column align-center justify-center info"
    >
      <v-icon data-testid="unidade-icon" class="white--text" size="80">
        mdi-office-building-outline
      </v-icon>
    </v-card>
    <v-card-subtitle class="pa-0 mt-4 text-center text-sm-left">
      <h6 data-testid="unidade-nome" class="info--text text-h6">
        {{ hospital.nome }}
      </h6>

      <p data-testid="unidade-endereco" class="text-body-2">
        {{ hospital.endereco }}
      </p>
    </v-card-subtitle>
    <v-spacer></v-spacer>
    <v-card-actions class="d-flex align-center justify-center">
      <v-btn
        data-testid="unidade-button"
        text
        color="primary"
        @click="onClick(hospital)"
      >
        Selecionar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'UnidadeItem',
  props: {
    hospital: {
      type: Object,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style>
</style>
