import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignupView from "@/views/SignupView.vue";
import ChatView from "@/views/ChatView.vue";
import TestView from "@/views/TestView.vue"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            // component: TestView
            component: LoginView
        },
        {
            path: '/signup',
            component: SignupView
        },
        {
            path: '/chat',
            component: TestView
        },
        {
            path: '/test',
            component: ChatView
        }
    ]
})

export default router
