<template>
  <v-card
    data-testid="card-unidade-add"
    elevation="2"
    width="300"
    class="pa-4 info d-flex flex-column align-center justify-center"
  >
    <v-icon data-testid="card-icon" class="white--text pb-4" size="80">
      mdi-plus-circle-outline
    </v-icon>
    <div class="text-center">
      <h6 data-testid="card-title" class="white--text text-h6 pb-4 pb-sm-0">
        Adicionar unidade
      </h6>
      <p data-testid="card-description" class="text-body-2 surface--text">
        Solicite aqui acesso a uma nova unidade.
      </p>
    </div>
  </v-card>
</template>
