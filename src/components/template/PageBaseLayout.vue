<!-- Componente Não esta sendo usado no momento -->
<template>
  <PageWrapper>
    <PageHeader>
      <template v-slot:header-extra-content>
        <slot name="page-header-extra-content" />
      </template>
    </PageHeader>
    <PageContent>
      <slot name="page-content"></slot>
    </PageContent>
  </PageWrapper>
</template>

<script>
import PageHeader from '@/components/template/PageHeader.vue';
import PageWrapper from '@/components/template/PageWrapper.vue';
import PageContent from '@/components/template/PageContent.vue';

export default {
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
  },
};
</script>

<style>
</style>
