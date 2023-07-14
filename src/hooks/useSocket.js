import { useEffect, useState } from 'react';
import io  from 'socket.io-client';
import {useDispatch} from "umi";
import useMessageWorker from "@/hooks/useMessageWorker";

const useSocket = (currentUser) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const {putProfileOnStore,messageService}=useMessageWorker();
  const disconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };
  const initUserInfo = ()=>{
    dispatch({
      type:'userModel/fetchLoveList'
    })
  }
  const initFriendsInfo = ()=>{
    dispatch({
      type:'FriendModel/initFriendData'
    })
  }
  useEffect(()=>{
    putProfileOnStore(currentUser);
    initUserInfo()
    initFriendsInfo()
  },[
      currentUser.id
  ])
  useEffect(() => {
    const userId = currentUser.id; // 从父组件的参数中获取 userId
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
      messageService(data)
    });
    socketInstance.on('invalidTokenEvent', (data) => {
      console.log(data);
    });
    socketInstance.on('responseMessage', (data) => {
      console.log('来消息了');
      messageService(data);
    });
    setSocket(socketInstance);
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [currentUser.id]);

  return {socket,disconnect};
};

export default useSocket;