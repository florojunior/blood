<template>
  <v-form ref="steFour">
    <v-container class="pa-0">
      <v-row no-gutters>
        <template v-if="getItensRequisitionTemp.length === 0">
          <div>Nenhum item registrado na requisição!</div>
        </template>
        <template else>
          <v-col
            v-for="item in getItensRequisitionTemp"
            :key="item.iditensrequisicao"
            cols="12"
          >
            <v-card
              flat
              class="d-flex flex-row align-center justify-space-between"
            >
              <div>
                <v-card-title class="text-subtitle-2 pb-0">
                  {{ item.productDescription }}
                </v-card-title>

                <v-card-text class="text-caption">
                  <div>
                    <span>
                      {{
                        `${item.abo}${item.rhd} | ${
                          item.quantidade_unidade
                            ? item.quantidade_unidade + ' uni.'
                            : ''
                        }
                    ${item.quantidade_ml ? item.quantidade_ml + ' ml.' : ''}`
                      }}
                    </span>
                    <span>
                      {{
                        `${
                          item.fenotipado === 'S'
                            ? 'Produto fenotipado.'
                            : 'Produto não fenotipado.'
                        }`
                      }}
                    </span>
                  </div>
                </v-card-text>
              </div>

              <v-card-actions>
                <v-btn
                  icon
                  data-testid="delete-button"
                  @click="deleteItemSelected(item)"
                >
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-divider></v-divider>
          </v-col>
        </template>
      </v-row>

      <v-row class="pt-4 pb-4">
        <v-col cols="auto">
          <AddItemButton />
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      depressed
      color="primary"
      class="mr-2 px-8 text-button"
      @click="submitItensRequisitionFormThenGoNext"
    >
      Continuar
    </v-btn>
    <v-btn depressed text @click="goBackStep"> Voltar </v-btn>
  </v-form>
</template>

<script>
import {} from '@/validations';
import date from '@/utils/date';
import { mapActions, mapGetters } from 'vuex';
import AddItemButton from '@/components/application/administrator/pretransfusion/AddItemButton.vue';

export default {
  components: { AddItemButton },
  props: {
    goNextStep: {
      type: Function,
      required: true,
    },
    goBackStep: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      items: {
        list: [],
        loading: false,
      },
    };
  },
  computed: {
    ...mapGetters('requisition', [
      'getEditRequisition',

      //REQUISIION
      'getRequisition',

      //ITENS_REQUISIION
      'getItensRequisitionTemp',
      'getIsItensRequisitionAlreadyCreated',
    ]),
  },
  async created() {
    if (this.getEditRequisition) {
      await this.getItensByRequisition(this.getEditRequisition.idrequisicao);
    }
  },
  methods: {
    ...mapActions('requisition', [
      'saveItensRequisition',
      'getItensByRequisition',
      'deleteitem',
      'getRequisitionSummary',
    ]),
    async deleteItemSelected(item) {
      await this.deleteitem(item.iditensrequisicao);
    },
    formatDate(value) {
      return date.formatToDDMMYYYY(value);
    },
    async submitItensRequisitionFormThenGoNext() {
      this.getRequisitionSummary();
      this.goNextStep();
    },
  },
};
</script>
