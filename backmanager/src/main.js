import { createApp } from 'vue'
import App from './App.vue';
// import '../src/mock';
import router from './routes';

import { hovershow } from './directives';

const app = createApp(App);

app.directive(hovershow.name, {
    updated:hovershow.updated,
    mounted:hovershow.mounted
})

app.use(router);

app.mount('#app')
