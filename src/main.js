import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// import store from './store'

import './assets/sass/style.sass'

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

const clickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = event => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value();
            }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};

const app = createApp(App)

app.use(router).use(createPinia()).directive("click-outside", clickOutside).use(VuePlyr, {plyr: {}})

app.mount('#app')
