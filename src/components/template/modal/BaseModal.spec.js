import { createLocalVue } from '@vue/test-utils';

import createWrapper from '@/../tests/utils/createWrapper';

import BaseModal from '@/components/template/modal/BaseModal.vue';
import addWrapperElemWithDataAppToBody from '@/../tests/utils/addWrapperElemWithDataAppToBody';

describe('BaseModal.vue', () => {
  // const baseModalId = '[data-testid="base-modal"]';
  const closeButtonId = '[data-testid="close-button"]';
  const titleSlotId = '[data-testid="title"]';
  const contentSlotId = '[data-testid="content"]';
  const actionsSlotId = '[data-testid="actions"]';

  describe('Properties', () => {
    it('"handleClose" prop is required and must be of type "Function"', async () => {
      expect(BaseModal.props.handleClose).toMatchObject({
        type: Function,
        required: true,
      });
    });
    it('"isOpen" prop is not required, has type "Boolean" and has "false" value by default', async () => {
      expect(BaseModal.props.isOpen).toMatchObject({
        type: Boolean,
        default: false,
      });
    });

    it('"isCloseButtonDisabled" prop is not required, has type "Boolean" and has "false" value by default', async () => {
      expect(BaseModal.props.isCloseButtonDisabled).toMatchObject({
        type: Boolean,
        default: false,
      });
    });
  });

  describe('should render a modal with close button enabled', () => {
    let wrapper;

    const title = 'titulo: Nova solicitação';
    const content = 'slot de conteúdo';
    const actions = 'slot de actions';

    beforeEach(() => {
      addWrapperElemWithDataAppToBody();

      const localVue = createLocalVue();

      // v-dialog needs to be involved around v-app, so it is necessary
      // to use a bridge component (App) to test v-dialog
      const App = localVue.component('App', {
        components: { BaseModal },
        data() {
          return {
            isOpen: true,
            title,
            content,
            actions,
          };
        },
        methods: {
          handleClose() {
            this.isOpen = false;
          },
        },
        template: `
          <v-app>
             <BaseModal
              :isOpen="isOpen"
              :handleClose="() => handleClose()"
              :isCloseButtonDisabled="false"
              >
            <template v-slot:title>{{ title }}</template>
            <template v-slot:content>{{ content }}</template>
            <template v-slot:actions>{{ actions }}</template>
            </BaseModal>
          </v-app>
        `,
      });

      wrapper = createWrapper(App);
    });

    it('Base Modal is rendered', () => {
      const baseModal = wrapper.findComponent(BaseModal);

      expect(baseModal.props().isOpen).toBe(true);
    });

    it('Title text is rendered', () => {
      const titleSlot = wrapper.find(titleSlotId);

      expect(titleSlot.text()).toEqual(title);
    });

    it('Content text is rendered', () => {
      const contentSlot = wrapper.find(contentSlotId);

      expect(contentSlot.text()).toEqual(content);
    });

    it('Actions text is rendered', () => {
      const actionSlot = wrapper.find(actionsSlotId);

      expect(actionSlot.text()).toEqual(actions);
    });

    it('Close button is enabled', () => {
      const closeButton = wrapper.find(closeButtonId);

      expect(closeButton.props().disabled).toBe(false);
    });

    it('When close button is clicked, modal should be closed', async () => {
      wrapper.find(closeButtonId).trigger('click');
      await wrapper.vm.$nextTick();

      const baseModal = wrapper.findComponent(BaseModal);
      expect(baseModal.props().isOpen).toBe(false);
    });
  });

  describe('should render a modal with close button disabled', () => {
    let wrapper;

    const title = 'slot de titulo: Nova solicitação';
    const content = 'slot de conteúdo: Solicitação de algo';
    const actions = 'slot de actions: Botões';

    beforeEach(() => {
      addWrapperElemWithDataAppToBody();

      const localVue = createLocalVue();

      // v-dialog needs to be involved around v-app, so it is necessary
      // to use a bridge component (App) to test v-dialog
      const App = localVue.component('App', {
        components: { BaseModal },
        data() {
          return {
            isOpen: true,
            title,
            content,
            actions,
          };
        },
        methods: {
          handleClose() {
            this.isOpen = false;
          },
        },
        template: `
          <v-app>
             <BaseModal
            :isOpen="isOpen"
            :handleClose="() => handleClose()"
            :isCloseButtonDisabled="true"
            >
            <template v-slot:title>{{ title }}</template>
            <template v-slot:content>{{ content }}</template>
            <template v-slot:actions>{{ actions }}</template>
            </BaseModal>
          </v-app>
        `,
      });

      wrapper = createWrapper(App);
    });

    it('Base Modal is rendered', () => {
      const baseModal = wrapper.findComponent(BaseModal);

      expect(baseModal.props().isOpen).toBe(true);
    });

    it('Title text is rendered', () => {
      const titleSlot = wrapper.find(titleSlotId);

      expect(titleSlot.text()).toEqual(title);
    });

    it('Content text is rendered', () => {
      const contentSlot = wrapper.find(contentSlotId);

      expect(contentSlot.text()).toEqual(content);
    });

    it('Actions text is rendered', () => {
      const actionSlot = wrapper.find(actionsSlotId);

      expect(actionSlot.text()).toEqual(actions);
    });

    it('Close button is disabled', () => {
      const closeButton = wrapper.find(closeButtonId);

      expect(closeButton.props().disabled).toBe(true);
    });

    it('When close button is clicked, modal should NOT be closed', async () => {
      wrapper.find(closeButtonId).trigger('click');
      await wrapper.vm.$nextTick();

      const baseModal = wrapper.findComponent(BaseModal);
      expect(baseModal.props().isOpen).toBe(true);
    });
  });
});
