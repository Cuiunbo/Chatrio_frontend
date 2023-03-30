import { createApp } from 'vue';
import VueSocketIO from 'vue-3-socket.io';
import VueCookies from 'vue3-cookies';

import App from './App.vue';
import router from './router';

import socket from './socket';

import './assets/main.css';

const app = createApp(App);

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
  
app.mount("#app");
