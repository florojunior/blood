<template>
  <div style="height: 100px">
    <div style="height: 100px"></div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-group v-for="itemMenu in menu" v-bind:key="itemMenu.descricao">
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>dynamic_feed</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                v-text="itemMenu.descricao"
              ></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="itemSubMenu in itemMenu.menu"
            v-bind:key="itemSubMenu.descricao"
            :href="'#' + itemSubMenu.path"
          >
            <v-list-item-action>
              <v-icon>how_to_reg</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ itemSubMenu.descricao }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="teal secondary" dark justify="space-between">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-row>
          <v-col>
            <p class="white--text">Blood</p>
          </v-col>
        </v-row>
      </v-toolbar-title>

      <div color="white" style="flex-grow: 1" class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon color="white" @click="logout()" v-on="on">
              <v-icon>mdi-keyboard-return</v-icon>
            </v-btn>
          </template>
          <span>Log out</span>
        </v-tooltip>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import router from '../../router';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('authentication', ['menu']),
  },
  data: () => ({
    drawer: false,
    itemMenu: true,
  }),
  created: function () {
    var usrAdm = false;
    if (usrAdm) {
      this.menu.push(
        {
          descricao: 'Sangue Nativo',
          menu: [
            {
              descricao: 'Transfusões realizadas',
              path: '/transfusoes',
            },
            {
              descricao: 'Produtos em estoque',
              path: '/estoque',
            },
            {
              descricao: 'Produtos Distribuidos',
              path: '/distribuidos',
            },
            {
              descricao: 'Descartados',
              path: '/descartados',
            },
          ],
        },
        {
          descricao: 'Hemoam',
          menu: [
            {
              descricao: 'Doadores',
              path: '/doadorouro',
            },
            {
              descricao: 'Faturamento',
              path: '/faturamento',
            },
          ],
        }
      );
    }
  },
  methods: {
    logout() {
      localStorage.setItem('token_hemoam', null);
      localStorage.setItem('perfil', null);
      router.push({ name: 'login' }, {});
    },
  },
};
</script>

<style>
</style>