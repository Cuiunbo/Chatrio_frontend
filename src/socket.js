import io from 'socket.io-client';
import {set_Url} from '@/assets/setting.js'

// const socket = io('http://47.94.222.108:5000');
// const socket = io('http://localhost:5000');

const socket = io(set_Url);

// const socket = io('http://10.1.148.246:5000');

export default socket;
