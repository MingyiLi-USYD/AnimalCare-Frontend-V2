import React from 'react';
import {getDvaApp} from "umi"

export default function messageService(data) {
    const dvaApp = getDvaApp;
    const {_store:{dispatch}}=dvaApp();
      if(data.system){
          if(data.type==='ON'){
              console.log("处理朋友上线的逻辑")
          }else if(data.type==='OFF'){
              console.log("处理朋友下线逻辑")
          }
      }else {
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
export function putFriendsListOnStore(data){
    const dvaApp = getDvaApp;
    const {_store:{dispatch}}=dvaApp();
    dispatch({
        type:"ChatModel/onFetchFriendsList",
        payload:data
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

