import {createStore} from 'vuex'

const index = createStore({
    state() {
        return {
            username: 'Username',
            email: 'example@email.com',
            currentRoom: 0,
            rooms: [],
            chatroom: [],
        }
    }
})
export default index