import {createApp} from 'vue';
import VueSocketIO from 'vue-3-socket.io';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';
import '../src/assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import socket from './socket';
import index from '@/store'
import {set_Url} from '@/assets/setting.js'

const app = createApp(App)
app.config.globalProperties.$set_Url = set_Url;



app.use(ElementPlus);
app.use(router);
app.use(new VueSocketIO({
    debug: true,
    connection: socket,
    // vuex: {
    //     // index,
    //     actionPrefix: "SOCKET_",
    //     mutationPrefix: "SOCKET_"
    // }
}));
app.use(VueCookies, {
    expireTimes: '7d',
});
app.use(index);
app.config.globalProperties.$cookies = VueCookies
app.mount("#app");
