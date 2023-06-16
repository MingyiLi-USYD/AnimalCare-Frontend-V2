// import messageService, {putFriendsListOnStore, putProfileOnStore} from "./MessageService";
// import {getFriends} from "../services/api";
//
// let websocketInstance = null;
//
// export function connectWebSocket({currentUser}) {
//
//   if (!websocketInstance) {
//     // 连接服务器的WebSocket代码${currentUser.id}
//     websocketInstance = new WebSocket(`ws://localhost:8080/chat/${currentUser.id}`);
//     // 可以添加事件处理程序等
//     // 连接建立时的回调函数
//     websocketInstance.onopen = () => {
//       console.log('成功连接');
//       getFriends().then((res) => putFriendsListOnStore(res.data));
//       putProfileOnStore(currentUser)
//     };
//
//     // 接收消息时的回调函数
//     websocketInstance.onmessage = (event) => {
//       const res = JSON.parse(event.data);
//       console.log(res)
//       messageService(res);
//     };
//
//     // 连接关闭时的回调函数
//     websocketInstance.onclose = () => {
//       console.log('WebSocket 连接已关闭');
//       setTimeout(() => {
//         connectWebSocket();
//       }, 2000);
//     };
//   }
// }
//
// export function getWebSocketInstance() {
//   return websocketInstance;
// }
