<template>
  <v-container class="black-background">
    <v-row justify="center" class="mt-4">
      <v-col cols="auto">
        <h3
          data-testid="page-title"
          class="white--text font-weight-bold text-h4 text-sm-h3"
        >
          Escolha a unidade
        </h3>
      </v-col>
    </v-row>

    <v-container>
      <v-row data-testid="unidade-list" class="pt-4">
        <v-col
          v-for="hospital in hospitalsUser"
          :key="hospital.id"
          class="d-flex"
          cols="6"
          sm="4"
          md="3"
          lg="2"
          xl="2"
        >
          <UnidadeItem
            data-testid="unidade-list-item"
            :hospital="hospital"
            :onClick="loadMenuByUser"
          />
        </v-col>

        <v-col
          data-testid="unidade-list-add-button"
          class="d-flex"
          cols="6"
          sm="4"
          md="3"
          lg="2"
          xl="2"
        >
          <UnidadeAdd />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UnidadeItem from '@/components/template/cards/UnidadeItem.vue';
import UnidadeAdd from '@/components/template/cards/UnidadeAdd.vue';

export default {
  name: 'ChooseUnidade',
  components: {
    UnidadeItem,
    UnidadeAdd,
  },
  computed: {
    ...mapGetters('authentication', ['hospitalsUser']),
  },
  methods: {
    ...mapActions('authentication', ['setMenu']),
    ...mapActions('main', ['setAuthenticated']),
    async loadMenuByUser(hospital) {
      const result = await this.$http.get(
        `/profile-user/?idEmpresa=${hospital.idempresa}`
      );
      const menu = result.data.result.menuPrimario;
      const newToken = result.data.token;
      localStorage.setItem('token_blood', newToken);
      this.setAuthenticated(true);
      this.setMenu(menu);
      this.$router.push('/pendingUsers', {});
    },
  },
};
</script>

<style>
.black-background {
  background-color: #1b1b1b;
  max-width: 100%;
}
</style>


