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

const UseMessageWorker = ()=>{
       const dispatch = useDispatch()
  function messageService(data) {
           const {fromUser} = data
        if(data.code===2){
            if(data.message.type===serviceMessageType.ADD_FRIEND){
                notification.success({
                    message: `Friend request by ${fromUser.nickname} `,
                    description:  <SystemMsg {...fromUser}/>,
                });
                dispatch({
                    type:"friendModel/onReceiveFriendRequest",
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
                    type:"friendModel/approveFriendSuccess",
                    payload:fromUser  //需要先从数据库查一遍 再同步到好友中 是实时的
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
            }else if(data.message.type===serviceMessageType.NEW_COMMENT){
                      console.log("处理新评论逻辑")
            }
            else if(data.message.type===serviceMessageType.MENTION){
                console.log("处理新mention")
            }
            else if(data.message.type===serviceMessageType.NEW_LIKE){
                console.log("处理新点赞")
            }
        }else if(data.code===1){
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