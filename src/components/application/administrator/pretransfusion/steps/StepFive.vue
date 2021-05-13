<template>
  <v-form>
    <RequisitionSummary />
    <v-btn
      depressed
      color="secondary"
      class="mr-2 px-8 text-button"
      @click="finish"
    >
      Finalizar
    </v-btn>
    <v-btn depressed text @click="goBackStep"> Voltar </v-btn>
  </v-form>
</template>

<script>
import RequisitionSummary from '@/components/application/administrator/pretransfusion/RequisitionSummary.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { RequisitionSummary },
  props: {
    goBackStep: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      idAttendance: 1,
    };
  },
  async created() {},
  methods: {
    ...mapActions('requisition', ['updateRequisitionSummary']),
    ...mapActions('modal', ['closeRequisition']),
    async finish() {
      await this.updateRequisitionSummary();
      this.closeRequisition();
    },
  },
  computed: {
    ...mapGetters('requisition', ['getSummaryRequisition']),
  },
};
</script>

<style>
</style>

