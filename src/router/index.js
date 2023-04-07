import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignupView from "@/views/SignupView.vue";
import TestView from "@/views/TestView.vue"
import Chatroom from "@/views/Chatroom.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: LoginView    // 登录界面
        },
        {
            path: '/signup',
            component: SignupView   // 注册界面
        },
        {
            path: '/chat',
            component: Chatroom     // 聊天室
        },
        {
            path: '/test',
            component: TestView     // 测试用
        }
    ]
})

export default router
