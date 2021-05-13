import VueMask from 'v-mask';
import Vue from 'vue';

Vue.use(VueMask, {
  placeholders: {
    // Não aceita números
    P: /[^0-9]/,
    // Não aceita números nem espaços
    S: /[^0-9 ]/
    // letras maiúsculas minúsculas com e sem acenti e espaço
    // P: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
  },
});
