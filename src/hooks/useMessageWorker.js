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
            switch (data.message.type) {
                case serviceMessageType.ADD_FRIEND:
                    notification.success({
                        message: `Friend request by ${fromUser.nickname}`,
                        description: <SystemMsg {...fromUser} />,
                    });
                    dispatch({
                        type: "friendModel/onReceiveFriendRequest",
                        payload: fromUser.userId,
                    });
                    break;

                case serviceMessageType.DELETE_FRIEND:
                    notification.warning({
                        message: `Delete by ${fromUser.nickname}`,
                        description: <SystemMsg {...fromUser} />,
                    });
                    dispatch({
                        type: "friendModel/onDeletedByFriend",
                        payload: fromUser.userId,
                    });
                    break;

                case serviceMessageType.AGREE_ADD_FRIEND:
                    notification.success({
                        message: 'Approved friend request',
                        description: <SystemMsg {...fromUser} />,
                    });
                    dispatch({
                        type: "friendModel/onApprovedByFriend",
                        payload: fromUser.userId,
                    });
                    break;

                case serviceMessageType.REJECT_ADD_FRIEND:
                    notification.warning({
                        message: 'Rejected friend request',
                        description: <SystemMsg {...fromUser} />,
                    });
                    break;

                case serviceMessageType.FRIEND_ONLINE:
                    console.log("处理朋友上线的逻辑");
                    break;

                case serviceMessageType.FRIEND_OFFLINE:
                    console.log("处理朋友下线逻辑");
                    break;

                case serviceMessageType.NEW_COMMENT:
                    notification.success({
                        message: 'NewComment',
                        description: <SystemMsg {...fromUser} />,
                    });
                    dispatch({
                        type: "userModel/increaseCommentsReceived",
                    });
                    break;

                case serviceMessageType.MENTION:
                    notification.success({
                        message: 'BeMentioned',
                        description: <SystemMsg {...fromUser} />,
                    });
                    dispatch({
                        type: "userModel/increaseMentionsReceived",
                    });
                    break;
                case serviceMessageType.NEW_LIKE:
                    notification.success({
                        message: 'NewLike',
                        description: <SystemMsg {...fromUser} />,
                    });
                    dispatch({
                        type: "userModel/increaseLovesReceived",
                    });
                    break;
                default:
                    // 处理其他未知类型
                    break;
            }

        }else if(data.code===1){
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


export default UseMessageWorker;