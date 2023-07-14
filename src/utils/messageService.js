/*
import {getDvaApp} from "umi"
import {Avatar, Button, notification} from 'antd';
export  function messageService(data) {

    console.log(data)
    const dvaApp = getDvaApp;
    const {_store:{dispatch}}=dvaApp();
      if(data.code===2){
          if(data.message.type===1){
              console.log("处理加好友")
              friendRequestService(data.fromUser)
          }
          else if(data.message.type===0){
              console.log("处理删除好友")
              //friendRequestService(data.fromUser)
          }
          else if(data.message.type===2){
              console.log("同意加好友")
              const {fromUser} = data;
          notification.success({
               message: 'Approved request',
              description:  <Avatar src={fromUser.avatar}></Avatar>,
        });
          }
          else if(data.message.type===3){
              console.log("处理拒绝好友")
              const {fromUser} = data;
              notification.warning({
                  message: 'Rejected request',
                  description:  <Avatar src={fromUser.avatar}></Avatar>,
              });

          }else if(data.message.type===4){
              console.log("处理朋友上线的逻辑")
              // 弹出提醒
      /!*        notification.success({
                  message: '好友上线',
                  description: '来了',
              });*!/

          }else if(data.message.type===5){
              console.log("处理朋友下线逻辑")
  /!*            notification.success({
                  message: '好友下线',
                  description: '走了',
              });*!/
          }
      }else if(data.code===1){
          console.log(data)
          dispatch({
              type:"ChatModel/onReceive",
              payload:data,
          })
          dispatch({
              type:"MessageModel/onMessage",
              payload:data,
          })

      }
}

export  function friendRequestService(user) {
    const dvaApp = getDvaApp;
    const {_store:{dispatch}}=dvaApp();
        dispatch({
            type:"FriendModel/onReceiveFriendRequest",
            payload:user
        })
}


export function putProfileOnStore(data){
    const dvaApp = getDvaApp;
    const {_store:{dispatch}}=dvaApp();
    dispatch({
        type:"ChatModel/onFetchProfile",
        payload:data
    })
}

*/
