/*
import io from "socket.io-client";
import {getFriends} from "../services/api";
import messageService, {putFriendsListOnStore, putProfileOnStore} from "./MessageService";

let websocketInstance = null;

export function socketIOStart({currentUser}) {

  if (!websocketInstance) {
    // 连接服务器的WebSocket代码${currentUser.id}
    //"http://localhost:8888"
    websocketInstance = io('', {
      reconnectionDelayMax: 10000,
      path: '/socket.io',
      transports:['websocket'],
      query:{
        userId:currentUser.id,
        token:localStorage.getItem("token")
      }
    });
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

  }
}

export function getSocketIOInstance() {
  return websocketInstance;
}
*/
