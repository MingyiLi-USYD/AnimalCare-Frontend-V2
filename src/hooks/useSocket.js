import { useEffect, useState } from 'react';
import io  from 'socket.io-client';
import {useDispatch, useSelector} from "umi";
import useMessageWorker from "@/hooks/useMessageWorker";
import {retrieveAllMessages, retrievePartlyMessages} from "@/services/chatService";

const useSocket = (currentUser) => {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  const {messageService}=useMessageWorker();
  const disconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };
  const initUserInfo = ()=>{
    dispatch({
      type:'userModel/initUserInfo'
    })
  }
  const {chatRecord} = useSelector(state => state.ChatModel)
  //下面这个函数是根据用户当前的聊天记录 选择性拉取聊天记录
  const retrieveData=async()=>{


    if(Object.keys(chatRecord).length===0){
      //判断本地是否存在聊天记录
      //长度为0 证明第一次登录 或者 没有聊天记录 从远程拉取最近10个好友的最近100条聊天记录
/*      const res = await retrieveAllMessages()
      console.log(res)*/
      dispatch({
        type:'ChatModel/fetchAllChatRecords'
      })
    }else {
      //证明有聊天记录 不是第一次登录
      //先获取本地的聊天记录的最后一条的时间 然后再根据时间去查这个时候之后的聊天记录
      const map = new Map();
      Object.keys(chatRecord).forEach(
          key=> chatRecord[key].latestTime&&map.set(key,chatRecord[key].latestTime)
      )
      const keys = Object.fromEntries(map)
      dispatch({
        type:'ChatModel/fetchPartlyChatRecords',
        payload:keys,
      })
 /*     const res = await retrievePartlyMessages(keys)
      console.log(res)*/
    }
  }


  useEffect(()=>{
    initUserInfo()
    retrieveData()
  },[
      currentUser.userId
  ])
  useEffect(() => {
    const userId = currentUser.userId; // 从父组件的参数中获取 userId
    const token = localStorage.getItem('serverToken'); // 从本地存储中获取 token
    const socketInstance = io('', {
      reconnectionDelayMax: 10000,
      path: '/socket.io',
      transports: ['websocket'],
      query: {
        userId,
        token,
      },
    });
    socketInstance.on('connect', () => {
      dispatch({
        type:'ChatModel/connect',
      })
      console.log('连接上了')
    });
    socketInstance.on('disconnect', () => {
      dispatch({
        type:'ChatModel/disconnect',
      })
      console.log('连接断开了')
    });
    socketInstance.on('friendEvent', (data) => {
      console.log('来交互消息了');
      messageService(data)
    });
    socketInstance.on('invalidTokenEvent', (data) => {
      console.log(data);
    });
    socketInstance.on('responseMessage', (data) => {
      console.log('来聊天消息了');
      messageService(data);
    });
    setSocket(socketInstance);
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [currentUser.userId]);

  return {socket,disconnect};
};

export default useSocket;
