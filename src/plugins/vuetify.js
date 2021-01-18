import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import es from 'vuetify/es5/locale/es'


export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                primary: '#2196f3',
                secondary: '#00bcd4',
                accent: '#607d8b',
                error: '#f44336',
                warning: '#ff5722',
                info: '#3f51b5',
                success: '#4caf50'
            },
        },
    },
    lang: {
        locales: { es },
        current: 'es',
      },
});
