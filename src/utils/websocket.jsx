import io from "socket.io-client";
import {getFriends} from "../services/api";
import messageService, {putFriendsListOnStore, putProfileOnStore} from "./MessageService";

let websocketInstance = null;

export function socketIOStart({currentUser}) {

  if (!websocketInstance) {
    // 连接服务器的WebSocket代码${currentUser.id}
    websocketInstance = io("http://localhost:8888", {
      reconnectionDelayMax: 10000,
      transports:['websocket'],
      query:{
        userId:currentUser.id,
        token:localStorage.getItem("token")
      }
    });
    // 可以添加事件处理程序等
    // 连接建立时的回调函数
/*    websocketInstance.onopen = () => {
      console.log('成功连接');
      getFriends().then((res) => putFriendsListOnStore(res.data));
      putProfileOnStore(currentUser)
    };*/
    websocketInstance.on('friendEvent', (data)=>{
      console.log(data)
    });
    websocketInstance.on('invalidTokenEvent', (data)=>{
      console.log(data)
    });

    websocketInstance.on('connect', ()=>{
      getFriends().then((res) => putFriendsListOnStore(res.data));
      putProfileOnStore(currentUser)
    });

    websocketInstance.on('responseMessage', (data)=>{
      console.log('来消息了')
       messageService(data)
    });


    // 接收消息时的回调函数
/*    websocketInstance.onmessage = (event) => {
      const res = JSON.parse(event.data);
      console.log(res)
      messageService(res);
    };*/

    // 连接关闭时的回调函数
/*    websocketInstance.onclose = () => {
      console.log('WebSocket 连接已关闭');
      setTimeout(() => {
        connectWebSocket();
      }, 2000);
    };*/
  }
}

export function getSocketIOInstance() {
  return websocketInstance;
}
