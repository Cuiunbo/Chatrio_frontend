import {createStore} from 'vuex'

const index = createStore({
    state() {
        return {
            username: 'Username',
            email: 'example@email.com',
            currentRoom: 0,
            rooms: {
                "roomdefault": { 
                    history: [
                        {time: '03/31  14:06', content: 'this user1🍤', sender: 'user1'}, // content
                    ],
                    roomId: 0,
                    roomName: "roomdefault",
                    num: 1,
                },
                
            },
            chatroom: [],
        }
    }
})
export default index