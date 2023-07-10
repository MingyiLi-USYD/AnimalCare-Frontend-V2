import React, {useEffect} from "react";
import io from "socket.io-client";
import {friendRequestService, messageService, putProfileOnStore} from "../utils/messageService";
import {useDispatch} from "umi";


const Socket= ({currentUser,children})=>{
    const dispatch = useDispatch();
    let websocketInstance = null;
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
    useEffect(() => {
        putProfileOnStore(currentUser);
        initUserInfo()
        initFriendsInfo()
        if (!websocketInstance) {
            websocketInstance = io('', {
                reconnectionDelayMax: 10000,
                path: '/socket.io',
                transports: ['websocket'],
                query: {
                    userId: currentUser.id,
                    token: localStorage.getItem("serverToken")
                }
            });
            websocketInstance.on('connect', () => {
                console.log('连接上了')
            });
            websocketInstance.on('friendEvent', (data) => {
                console.log(data);
            });
            websocketInstance.on('friendRequestEvent', (data) => {
               console.log('收到好友请求了')
                console.log(data)
                friendRequestService(data.fromUser)
            });
            websocketInstance.on('invalidTokenEvent', (data) => {
                console.log(data);
            });

            websocketInstance.on('responseMessage', (data) => {
                console.log('来消息了');
                messageService(data);
            });
        }
        return () => {
            // 清理工作
            websocketInstance.disconnect();
            websocketInstance = null;
        };
    }, []);
    return children;
}

export default Socket;