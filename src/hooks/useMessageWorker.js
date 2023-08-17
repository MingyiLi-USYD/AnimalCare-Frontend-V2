import React from 'react';
import {Avatar, notification, Space} from "antd";
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
                    payload:fromUser.userId
                })
            }
            else if(data.message.type===serviceMessageType.DELETE_FRIEND){
                notification.warning({
                    message: `Delete by ${fromUser.nickname} `,
                    description:  <SystemMsg {...fromUser}/>,
                });
                dispatch({
                    type:"friendModel/onDeletedByFriend",
                    payload:fromUser.userId
                })
            }
            else if(data.message.type===serviceMessageType.AGREE_ADD_FRIEND){
                notification.success({
                    message: 'Approved friend request',
                    description:  <SystemMsg {...fromUser}/>,
                });
                dispatch({
                    type:"friendModel/onApprovedByFriend",
                    payload:fromUser.userId
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
                notification.success({
                    message: 'NewComment',
                    description:  <SystemMsg {...fromUser}/>,
                });
                      console.log("处理新评论逻辑")
            }
            else if(data.message.type===serviceMessageType.MENTION){
                notification.success({
                    message: 'BeMentioned',
                    description:  <SystemMsg {...fromUser}/>,
                });
                console.log("处理新mention")
            }
            else if(data.message.type===serviceMessageType.NEW_LIKE){
                notification.success({
                    message: 'NewLike',
                    description:  <SystemMsg {...fromUser}/>,
                });
                console.log("处理新点赞")
            }
        }else if(data.code===1){
/*            notification.success({
                message: 'New Message',
                description:  <ChatMsg {...data}/>,
            });*/
            dispatch({
                type:"ChatModel/onReceive",
                payload:data,
            })
        }
    }



    return {messageService}
}
   const SystemMsg = (props)=>{
        const {nickname,avatar} = props;
      return(
          <Space >
              <Avatar src={avatar} ></Avatar>
              <div>{nickname}</div>
          </Space>
      )
   }

const style = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "50px",
};


const ChatMsg = (data)=>{
    const {nickname,avatar} = data.fromUser;
    const {content} = data.message;
    return(
       <Space direction={"vertical"}>
           <Space>
               <Avatar src={avatar} ></Avatar>
               <div>{nickname}</div>
           </Space>
           <span style={style}>
               {content}
           </span>
       </Space>

    )
}

export default UseMessageWorker;