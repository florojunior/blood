<template>
  <PageWrapper>
    <PageHeader />
    <PageContent>
      <v-data-table
        :headers="headers"
        :items="getPendingUsersList"
        :items-per-page="5"
        loading-text="Carregando..."
      >
        <template v-slot:item.dados="{ item }">
          <span>
            {{ `${item}` | VMask('###.###.###-##') }}
          </span>
        </template>

        <template v-slot:item.acoes="{ item }">
          <EditButton class="mr-1" :onClick="() => acceptUser(item)" />

          <v-btn
            v-if="item.status == 'desbloqueado'"
            class="mx-2"
            fab
            icon
            small
            color="red"
          >
            <v-icon dark color="red" @click="declineUser(item)">
              mdi-delete
            </v-icon>
          </v-btn>

          <v-btn
            v-if="item.status == 'bloqueado' || item.status == 'bloquiado'"
            class="mx-2"
            fab
            icon
            small
            color="red"
          >
            <v-icon dark color="red" @click="unblockUser(item)">
              mdi-lock-open
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip small :color="customColorStatus(item)">
            <v-icon
              left
              class="pa-0 ma-0 text--darken-4"
              :class="customColorStatus(item)"
              small
            >
              mdi-circle-small
            </v-icon>
            <span>{{ item.status }}</span>
          </v-chip>
        </template>
      </v-data-table>
      <AcceptUserModal
        v-if="getModalAcceptUsers.show"
        :user-selected="userSelected"
      />
      <UnblockUserModal
        v-if="getUnblockUserModal.show"
        :user-selected="userSelected"
      />
      <BlockUserModal
        v-if="getBlockUserModal.show"
        :user-selected="userSelected"
      />
    </PageContent>
  </PageWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PageHeader from '@/components/template/PageHeader.vue';
import PageWrapper from '@/components/template/PageWrapper.vue';
import PageContent from '@/components/template/PageContent.vue';
import AcceptUserModal from './AcceptUserModal';
import BlockUserModal from './BlockUserModal';
import UnblockUserModal from './UnblockUserModal';
import EditButton from '@/components/template/buttons/EditButton.vue';

export default {
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
    AcceptUserModal,
    BlockUserModal,
    UnblockUserModal,
    EditButton,
  },
  data() {
    return {
      userSelected: {},
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'dados.nome',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Ocupação',
          value: 'dados.ocupacao_descricao',
          align: 'start',
          sortable: true,
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'CPF',
          value: 'dados.cpf',
          align: 'start',
          sortable: true,
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'TELEFONE',
          value: 'dados.telefone1',
          align: 'start',
          sortable: true,
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'STATUS',
          value: 'status',
          align: 'center',
          sortable: true,
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Ações',
          value: 'acoes',
          align: 'center',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('administration', ['getPendingUsersList']),
    ...mapGetters('modal', [
      'getModalAcceptUsers',
      'getModalDeclineUsers',
      'getBlockUserModal',
      'getUnblockUserModal',
    ]),
  },
  async created() {
    await this.fetchListUsers('F');
  },
  methods: {
    ...mapActions('administration', ['fetchListUsers']),
    ...mapActions('modal', [
      'setModalAcceptUsers',
      'setModalDeclineUsers',
      'setModalBlockUserModal',
      'setModalUnblockUserModal',
    ]),
    unblockUser(item) {
      this.userSelected = item;
      this.setModalUnblockUserModal({ show: true });
    },
    acceptUser(item) {
      this.userSelected = item;
      this.setModalAcceptUsers({
        title: item.dados.nome,
        message: 'Deseja realmente dar acesso a este usuário?',
        buttonText: 'Aceitar',
        show: true,
      });
    },
    declineUser(item) {
      this.userSelected = item;
      this.setModalBlockUserModal({ show: true });
    },
    customColorStatus(item) {
      if (item.status == 'pendente') return 'orange';
      else if (
        item.status == 'bloqueado' ||
        item.status == 'bloquiado' ||
        item.status == 'rejeitado'
      )
        return 'red';
      else return 'green';
    },
  },
};
</script>

