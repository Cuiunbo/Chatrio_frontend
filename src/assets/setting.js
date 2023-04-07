// 设置全局变量 -> 用于判断当前环境 -> 服务器环境还是本地环境
export
let set_Url;
  set_Url = 'http://47.94.222.108:5000';

// if (process.env.NODE_ENV === 'production') {
//   set_Url = 'http://47.94.222.108:5000';
// } else {
//   set_Url = 'http://localhost:5000';
// }