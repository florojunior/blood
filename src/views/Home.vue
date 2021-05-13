<template>
  <Content class="d-flex flex-grow-1 pa-0"></Content>
</template>

<script>
import Content from '@/components/template/Content';

export default {
  components: {
    Content,
  },
  data: () => ({
    isLogged: false,
  }),
  created: function () {
    this.isLogged = localStorage.getItem('token_blood') !== 'null';
  },
};
</script>
