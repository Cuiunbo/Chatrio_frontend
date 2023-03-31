import { createApp } from 'vue';
import VueSocketIO from 'vue-3-socket.io';
import VueCookies from 'vue-cookies';

import App from './App.vue';
import router from './router';

import '../src/assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import socket from './socket';

const app = createApp(App)

app.use(ElementPlus)

app.use(router);
app.use( new VueSocketIO({
  debug: true,
  connection: socket,
  // vuex: {
  //     // store,
  //     actionPrefix: "SOCKET_",
  //     mutationPrefix: "SOCKET_"
  // }
}));
app.use(VueCookies,{
  expireTimes: '7d',
});

app.config.globalProperties.$cookies = VueCookies
app.mount("#app");
