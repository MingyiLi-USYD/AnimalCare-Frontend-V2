import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const useSocket = (id) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const userId = id; // 从父组件的参数中获取 userId
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

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [id]);

  return socket;
};

export default useSocket;
