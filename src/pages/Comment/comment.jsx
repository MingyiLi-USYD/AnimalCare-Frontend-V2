import React from 'react';
import './comment.less'
import {Avatar} from "antd";
import {MessageOutlined, StarOutlined, HeartOutlined, SmileOutlined,PaperClipOutlined} from '@ant-design/icons';
import Interaction from "../../components/Interations/interaction";
import {history} from "umi";

function Comment({data}) {
    const {nickName,userAvatar,commentContent,commentTime,postId,userId} = data;
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
                          06-30
                      </div>
                    <div className={"interactions"}>
                         <div className={"like"}>
                             <Interaction number={50}>
                                 <HeartOutlined/>
                             </Interaction>
                         </div>
                          <div className={"reply"}>
                              <Interaction number={30}>
                                  <MessageOutlined/>
                              </Interaction>
                          </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;