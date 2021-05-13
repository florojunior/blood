<template>
  <v-dialog v-model="isOpen" width="600" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        color="secondary lighten-1"
        class="px-8"
        v-bind="attrs"
        v-on="on"
        @click="isOpen = true"
      >
        Adicionar Ítem
      </v-btn>
    </template>

    <v-card class="py-4">
      <v-card-title>
        <span class="text-h5 primary--text"> Ítem requisição </span>
      </v-card-title>

      <v-card-text class="pb-0 pt-4">
        <v-form ref="stepThree">
          <v-container class="pa-0">
            <v-row dense>
              <v-col>
                <v-select
                  v-model="item.idProduct"
                  :loading="getListProductTypesLoading"
                  :disabled="getListProductTypesLoading"
                  :items="getListProductTypes"
                  :item-text="'nome_produto'"
                  :item-value="'idproduto'"
                  outlined
                  name="produto"
                  :rules="[]"
                  :label="
                    getListProductTypesLoading ? 'Carregando...' : 'Produto'
                  "
                ></v-select>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12">
                <label for="radioGender" class="v-label">
                  <div class="text-body-1">Quantidades</div>
                  <v-radio-group
                    id="radioGender"
                    v-model="tipoUnidade"
                    :rules="[]"
                    class="mb-2 mt-0"
                    row
                  >
                    <v-radio
                      v-for="type in mockTipoQuantidade.types"
                      :key="type.id"
                      :label="type.description"
                      :value="type.id"
                      name="tipounidade"
                    ></v-radio>
                  </v-radio-group>
                </label>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="item.unitQuantity"
                  :disabled="isUnidadeDisabled"
                  type="number"
                  outlined
                  name="unitQuantity"
                  label="Unidade"
                  :rules="[]"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="item.mlQuantity"
                  :disabled="isMilimeterDisabled"
                  type="number"
                  outlined
                  name="mlQuantity"
                  label="ml"
                  :rules="[]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-checkbox
                  v-model="item.phenotyped"
                  class="text-subtitle-1"
                  label="Este produto é Fenotipado?"
                  true-value="S"
                  false-value="N"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row v-if="isTranfusaoProgramada" dense>
              <v-col cols="12">
                <v-card flat>
                  <v-card-title class="px-0">
                    <span class="text-h5 primary--text text-weight">
                      Transfusão programada
                    </span>
                  </v-card-title>

                  <v-card-text class="px-0">
                    <v-input
                      :value="item.dateScheduled"
                      :rules="[(v) => !!v || 'O campo é obrigatório.']"
                    >
                      <v-date-picker
                        v-model="item.dateScheduled"
                        :show-current="false"
                        full-width
                        elevation="1"
                        color="primary"
                        type="date"
                        locale="PT-BR"
                      ></v-date-picker>
                    </v-input>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="item.interval"
                  type="number"
                  outlined
                  name="interval"
                  label="Intervalo"
                  :rules="[]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions class="px-6">
        <v-btn
          class="secondary lighten-1"
          @click="
            addNewItem();
            isOpen = false;
          "
        >
          Adicionar mais ítem
        </v-btn>
        <v-btn class="secondary lighten-1" @click="isOpen = false">
          Voltar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BaseModal from '@/components/template/modal/BaseModal.vue';
import { mapActions, mapGetters } from 'vuex';
import {} from '@/validations';

export default {
  async created() {
    this.getAllProductsType();
  },
  components: { BaseModal },
  data() {
    return {
      isOpen: false,
      tipoUnidade: null,
      isTranfusaoProgramada: true,
      item: {
        productDescription: null,
        idProduct: 22,
        abo: 'AB', //não é informado mais, como fica na API (envia null, vazio ou remove)?
        rhd: '-', //não é informado mais, como fica na API (envia null, vazio ou remove)?
        unitQuantity: null,
        mlQuantity: 0,
        phenotyped: 'N',
        interval: null,
        dateScheduled: null,
      },
      mockTipoQuantidade: {
        types: [
          {
            id: 0,
            description: 'Unidade',
          },
          {
            id: 1,
            description: 'ml',
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters('requisition', [
      //REQUISIION
      'getRequisition',

      //ITENS_REQUISIION
      'getItensRequisitionTemp',
      'getListProductTypes',
      'getListProductTypesLoading',
    ]),
    isUnidadeDisabled() {
      return this.tipoUnidade !== 0;
    },
    isMilimeterDisabled() {
      return this.tipoUnidade !== 1;
    },
    productSelectedDescription() {
      const productSelecetedList = this.getListProductTypes.filter(
        (product) => product.idproduto == this.item.idProduct
      );
      return productSelecetedList.length > 0
        ? productSelecetedList[0].nome_produto
        : '';
    },
  },
  watch: {
    tipoUnidade: function (newOptionChoosen) {
      this.resetOldUnityMeasuredOnOptionChange(newOptionChoosen);
    },
    isOpen() {
      this.item = {
        productDescription: null,
        idProduct: 22,
        abo: 'AB', //não é informado mais, como fica na API (envia null, vazio ou remove)?
        rhd: '-', //não é informado mais, como fica na API (envia null, vazio ou remove)?
        unitQuantity: null,
        mlQuantity: 0,
        phenotyped: 'N',
        interval: null,
        dateScheduled: null,
      };
    },
  },
  methods: {
    ...mapActions('requisition', [
      //ITEM REQUISTION
      'getAllProductsType',
      'addNewItemRequistionToTemp',
    ]),

    resetOldUnityMeasuredOnOptionChange(newOptionChoosen) {
      if (newOptionChoosen !== 0) this.item.unitQuantity = null;
      if (newOptionChoosen !== 1) this.item.mlQuantity = null;
    },
    addNewItem() {
      this.addNewItemRequistionToTemp({
        ...this.item,
        mlQuantity: this.mlQuantity ? this.mlQuantity : 0,
        productDescription: this.productSelectedDescription,
        dateScheduled: this.dateScheduled ? this.dateScheduled : '',
      });
    },
  },
};
</script>
