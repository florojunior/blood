import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import 'tiptap-vuetify/dist/main.css';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: {
          base: '#0030B1',
          lighten1: '#6200EE',
          lighten2: '#7F39FB',
          lighten3: '#985EFF',
          lighten4: '#BB86FC',
          darken1: '#5600E8',
          darken2: '#3F52CE',
          darken3: '#002A9C',
          darken4: '#255ECE',
        },
        secondary: {
          base: '#01A299',
          lighten1: '#00B3A6',
          lighten2: '#00C4B4',
          lighten3: '#03DAC5',
          lighten4: '#70EFDE',
          darken1: '#019592',
          darken2: '#69E2FF',
          darken3: '#00B0FF',
        },
        background: {
          base: '#FFFFFF',
          darken1: '#F2F4F8',
          darken2: '#E9ECFF',
        },
        tertiary: {
          base: '#434343',
          lighten1: '#BDBDBD',
          lighten2: '#F2F2F2',
        },
        fontsPrimaryVariant: {
          base: '#6E6893',
        },
        sidebar: '#E2F8FF',
        body: '#000000',
        cardcolor: '#FFFFFF',
        error: {
          base: '#DE0129',
          lighten1: '#FCE6EA',
        },
        red: {
          base: '#FF0000',
          lighten1: '#FCE6EA',
          darken1: '#DE0129',
        },
        yellow: {
          base: '#FFFF00',
          lighten1: '#FFF2AC',
          darken1: '#877202',
        },
        green: {
          base: '#00FF00',
          lighten1: '#CDFFCD',
          darken1: '#007F00',
        },
        blocked: '#DE0129',
        cancel: '#DE0129',
        unblocked: '#4EC07C',
        warning: '#E9A136',
        info: '#2196F3',
        delete: '#DE0129',
        surface: '#FFFFFF',
        onPrimaryHighEmphasis: '#FFFFFF',
        success: {
          base: '#4EC07C',
          lighten1: '#14D18D',
        },
      },
    },
  },
  components: {},
});

Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify: vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'md',
});

export default vuetify;
