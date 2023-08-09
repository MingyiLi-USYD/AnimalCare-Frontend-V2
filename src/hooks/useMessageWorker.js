import React from 'react';
import {Avatar, notification} from "antd";
import {useDispatch} from "umi";

const serviceMessageType = {
    DELETE_FRIEND: "DELETE_FRIEND",
    ADD_FRIEND: "ADD_FRIEND",
    AGREE_ADD_FRIEND: "AGREE_ADD_FRIEND",
    REJECT_ADD_FRIEND: "REJECT_ADD_FRIEND",
    FRIEND_ONLINE: "FRIEND_ONLINE",
    FRIEND_OFFLINE: "FRIEND_OFFLINE",
    NEW_COMMENT: "NEW_COMMENT",
    NEW_LIKE: "NEW_LIKE",
    MENTION: "MENTION"
}

const UseMessageWorker = (props)=>{
       const dispatch = useDispatch()
  function messageService(data) {
           const {fromUser} = data
        console.log(data)
        if(data.code===2){
            if(data.message.type===serviceMessageType.ADD_FRIEND){
                notification.success({
                    message: `Friend request by ${fromUser.nickname} `,
                    description:  <SystemMsg {...fromUser}/>,
                });
                dispatch({
                    type:"friendModel/onReceiveFriendRequest",
                    payload:fromUser
                })
            }
            else if(data.message.type===serviceMessageType.DELETE_FRIEND){
                notification.warning({
                    message: `Delete by ${fromUser.nickname} `,
                    description:  <SystemMsg {...fromUser}/>,
                });
                dispatch({
                    type:"friendModel/onDeletedByFriend",
                    payload:fromUser
                })
            }
            else if(data.message.type===serviceMessageType.AGREE_ADD_FRIEND){
                notification.success({
                    message: 'Approved friend request',
                    description:  <SystemMsg {...fromUser}/>,
                });
                dispatch({
                    type:"FriendModel/approveFriendSuccess",
                    payload:fromUser
                })
            }
            else if(data.message.type===serviceMessageType.REJECT_ADD_FRIEND){
                notification.warning({
                    message: 'Rejected friend request',
                    description: <SystemMsg {...fromUser}/>,
                });

            }
            else if(data.message.type===serviceMessageType.FRIEND_ONLINE){
                console.log("处理朋友上线的逻辑")
                // 弹出提醒
                /*        notification.success({
                            message: '好友上线',
                            description: '来了',
                        });*/
            }
            else if(data.message.type===serviceMessageType.FRIEND_OFFLINE){
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



    return {messageService}
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