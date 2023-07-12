import React from 'react';
import {getDvaApp} from "umi"

export  function messageService(data) {
    const dvaApp = getDvaApp;
    const {_store:{dispatch}}=dvaApp();
      if(data.code===2){
          if(data.type===1){
              console.log("处理加好友")
              friendRequestService(data.fromUser)
          }else if(data.type===2){
              console.log("处理拒绝好友")
          }
          else if(data.type===3){
              console.log("处理朋友上线的逻辑")
          }else if(data.type===4){
              console.log("处理朋友下线逻辑")
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

