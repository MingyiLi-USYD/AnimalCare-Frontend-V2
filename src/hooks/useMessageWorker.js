import React from 'react';
import {getDvaApp} from "../.umi/exports";
import {Avatar, notification} from "antd";
import {useDispatch} from "umi";

const UseMessageWorker = (props)=>{
       const dispatch = useDispatch()
  function messageService(data) {
           const {fromUser} = data
        if(data.code===2){
            if(data.message.type===1){
                notification.success({
                    message: `Friend request by ${fromUser.nickname} `,
                    description:  <SystemMsg {...fromUser}/>,
                });
                dispatch({
                    type:"FriendModel/onReceiveFriendRequest",
                    payload:fromUser
                })
            }
            else if(data.message.type===0){
                notification.warning({
                    message: `Delete by ${fromUser.nickname} `,
                    description:  <SystemMsg {...fromUser}/>,
                });
                dispatch({
                    type:"FriendModel/onDeletedByFriend",
                    payload:fromUser
                })
            }
            else if(data.message.type===2){
                notification.success({
                    message: 'Approved friend request',
                    description:  <SystemMsg {...fromUser}/>,
                });
                dispatch({
                    type:"FriendModel/approveFriendSuccess",
                    payload:fromUser
                })
            }
            else if(data.message.type===3){
                notification.warning({
                    message: 'Rejected friend request',
                    description: <SystemMsg {...fromUser}/>,
                });

            }else if(data.message.type===4){
                console.log("处理朋友上线的逻辑")
                // 弹出提醒
                /*        notification.success({
                            message: '好友上线',
                            description: '来了',
                        });*/

            }else if(data.message.type===5){
                console.log("处理朋友下线逻辑")
                /*            notification.success({
                                message: '好友下线',
                                description: '走了',
                            });*/
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



  function putProfileOnStore(data){
        dispatch({
            type:"ChatModel/onFetchProfile",
            payload:data
        })
    }

    return {messageService,putProfileOnStore}
}
   const SystemMsg = (props)=>{
        const {nickname,avatar} = props;
      return(
          <div style={{display:"flex"}}>
              <Avatar src={avatar} ></Avatar>
              <div>{nickname}</div>
          </div>
      )
   }

export default UseMessageWorker;