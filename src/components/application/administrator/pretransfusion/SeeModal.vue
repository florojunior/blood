<template>
  <BaseModal :isOpen="visible" :handleClose="() => close()">
    <template v-slot:title>{{ title }}</template>
    <template v-slot:content>
      <Notification
        :requisition="requisition"
        v-if="requisition.status == 'Não Conforme'"
      />
      <RequisitionSummary />
      <RejectTransfusionModal :requisition="requisition" />
    </template>
    <template v-slot:actions>
      <div
        class="d-flex justify-center"
        style="width: 100%"
        v-if="requisition.status != 'Não Conforme'"
      >
        <v-btn
          data-testid="visibility-button"
          class="red darken-2 darken-1 py-4"
          depressed
          x-small
          :loading="loading"
          @click="openRejectModal()"
        >
          <span
            class="text-xl-subtitle-2 text-lg-subtitle-2 white--text font-weight-bold"
          >
            REJEITAR REQUISIÇÃO
          </span>
        </v-btn>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions } from 'vuex';

import BaseModal from '@/components/template/modal/BaseModal.vue';
import StepWrapper from '@/components/template/step/StepWrapper.vue';
import RequisitionSummary from '@/components/application/administrator/pretransfusion/RequisitionSummary.vue';
import RejectTransfusionModal from '@/components/application/administrator/pretransfusion/RejectTransfusionModal.vue';
import Notification from '@/components/application/administrator/pretransfusion/Notification.vue';

export default {
  props: {
    requisition: {
      required: false,
      type: Object,
    },
    loading: {
      required: false,
    },
  },
  name: 'SeeModal',
  components: {
    BaseModal,
    StepWrapper,
    RequisitionSummary,
    RejectTransfusionModal,
    Notification,
  },
  data() {
    return {
      visible: true,
      dialog: false,
      unsubscribe: null,
      unsubscribeEdit: null,
      title: 'Resumo da solicitação',
    };
  },
  methods: {
    ...mapActions('modal', [
      'closeSeeTransfusion',
      'rejectTransfusionRequisition',
    ]),
    close() {
      this.visible = false;
      this.closeSeeTransfusion();
    },
    handleReject() {
      this.cancelTransfusionRequisition();
    },
    openRejectModal() {
      this.rejectTransfusionRequisition();
    },
  },
};
</script>

<style>
</style>
