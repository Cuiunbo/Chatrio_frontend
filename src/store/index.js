import {createStore} from 'vuex'

const index = createStore({
    state() {
        return {
            username: 'Username',
            email: 'example@email.com',
            currentRoom: 0,
            rooms:[
                {
                  history: [
                    {time: '03/31 14:06', content: 'this user1🍤', sender: 'user1'},
                    {time: '03/31 14:10', content: 'this user2🍔', sender: 'user2'},
                  ],
                  roomId: 0,
                  roomName: 'roomdefault',
                  num: 2,
                },
            ],
            roomsindex:{
                roomId : {
                    0:0,
                },
                roomName: {
                    roomdefault:0,
                }
                // roomname : index
            },
            chatroom: [],
        }
    }
})
export default index