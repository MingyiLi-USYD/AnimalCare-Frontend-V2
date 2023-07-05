import React from 'react';
import './comment.less'
import {Avatar} from "antd";
import {HeartOutlined, MessageOutlined} from '@ant-design/icons';
import Interaction from "../../components/Interations/interaction";
import {history} from "umi";
import {formatTimestamp} from "../../utils/timeUtils";

function Comment({data,focus}) {
    const {nickName,userAvatar,commentContent,commentTime,postId,userId,commentLove} = data;
    const subCommentLength = 10;

    const handleLove = ()=>{

    }
    const handleComment = ()=>{
          focus(nickName)
    }

    return (
        <div className={"comment-item"}>
            <div className={"left"}>
                <Avatar size={32} src={userAvatar} onClick={()=>{history.push(`/profile/${userId}`)}}/>
            </div>
            <div className={"right"}>
                <div className={"author-nickname"}>
                    {nickName}
                </div>
                <div className={"content"}>
                    {commentContent}
                </div>
                <div className={"info"}>
                      <div className={"time"}>
                          {formatTimestamp(commentTime)}
                      </div>
                    <div className={"interactions"}>
                         <div className={"like"}>
                             <Interaction number={commentLove}>
                                 <HeartOutlined onClick={handleLove}/>
                             </Interaction>
                         </div>
                          <div className={"reply"}>
                              <Interaction number={subCommentLength}>
                                  <MessageOutlined onClick={handleComment}/>
                              </Interaction>
                          </div>
                    </div>
                </div>
                {
                    subCommentLength>0&&
                    <a>View reply</a>
                }

            </div>
        </div>
    );
}

export default Comment;