import {createStore} from 'vuex'

const index = createStore({
    state(){
        return {
            username:'Username',
            email:'example@email.com',
            chatroom:[],
        }
    }
})
export default index