<template>
  <BaseModal :isOpen="visible" :handleClose="() => close()">
    <template v-slot:title>{{ title }}</template>
    <template v-slot:content>
      <v-stepper v-model="currentStep" vertical class="elevation-0">
        <v-stepper-step
          class="text-body-1"
          :complete="currentStep > 1"
          step="1"
        >
          Atendimento
        </v-stepper-step>

        <v-stepper-content step="1">
          <StepWrapper>
            <StepOne :goNextStep="goNextStep" />
          </StepWrapper>
        </v-stepper-content>

        <v-stepper-step
          class="text-body-1"
          :complete="currentStep > 2"
          step="2"
        >
          Procedimento
        </v-stepper-step>

        <v-stepper-content step="2">
          <StepWrapper>
            <StepTwo :goNextStep="goNextStep" :goBackStep="goBackStep" />
          </StepWrapper>
        </v-stepper-content>

        <v-stepper-step
          class="text-body-1"
          :complete="currentStep > 3"
          step="3"
        >
          Requisição
        </v-stepper-step>

        <v-stepper-content step="3">
          <StepWrapper>
            <StepThree :goNextStep="goNextStep" :goBackStep="goBackStep" />
          </StepWrapper>
        </v-stepper-content>

        <v-stepper-step
          class="text-body-1"
          :complete="currentStep > 4"
          step="4"
        >
          Ítem requisição
        </v-stepper-step>
        <v-stepper-content step="4">
          <StepWrapper>
            <StepFour :goNextStep="goNextStep" :goBackStep="goBackStep" />
          </StepWrapper>
        </v-stepper-content>

        <v-stepper-step class="text-body-1" step="5"> Resumo </v-stepper-step>
        <v-stepper-content step="5">
          <StepWrapper class="pt-0">
            <StepFive :goBackStep="goBackStep" />
          </StepWrapper>
        </v-stepper-content>
      </v-stepper>
    </template>
    <template v-slot:actions></template>
  </BaseModal>
</template>

<script>
import { mapActions } from 'vuex';

import BaseModal from '@/components/template/modal/BaseModal.vue';
import StepWrapper from '@/components/template/step/StepWrapper.vue';

import StepOne from '@/components/application/administrator/pretransfusion/steps/StepOne.vue';
import StepTwo from '@/components/application/administrator/pretransfusion/steps/StepTwo.vue';
import StepThree from '@/components/application/administrator/pretransfusion/steps/StepThree.vue';
import StepFour from '@/components/application/administrator/pretransfusion/steps/StepFour.vue';
import StepFive from '@/components/application/administrator/pretransfusion/steps/StepFive.vue';

export default {
  props: {
    requisition: {
      required: false,
      type: Object,
    },
  },
  name: 'CreateTransfusionModal',
  components: {
    BaseModal,
    StepWrapper,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive,
  },
  data() {
    return {
      currentStep: 1,
      minimalStep: 1,
      totalSteps: 5,
      visible: true,
      dialog: false,
      unsubscribe: null,
      unsubscribeEdit: null,
      title: '',
    };
  },
  methods: {
    ...mapActions('modal', ['closeRequisition']),
    goNextStep() {
      if (this.currentStep < this.totalSteps) this.currentStep += 1;
    },
    goBackStep() {
      if (this.currentStep > this.minimalStep) this.currentStep -= 1;
    },
    close() {
      this.visible = false;
      this.closeRequisition();
    },
  },
};
</script>

<style>
</style>
