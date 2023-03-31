import {createStore} from 'vuex'

const store = createStore({
    state(){
        return {
            username:'Username',
            email:'example@email.com',
            // 就是公共的数据，所有的组件都可以直接使用
            count: 100
        }
    }
})
export default store