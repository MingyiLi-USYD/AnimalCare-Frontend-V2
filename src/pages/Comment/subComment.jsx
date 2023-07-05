import React from 'react';
import {Avatar} from "antd";
import {history} from "../../.umi/core/history";
import {formatTimestamp} from "../../utils/timeUtils";
import Interaction from "../../components/Interations/interaction";
import {HeartOutlined, MessageOutlined} from "@ant-design/icons";

function SubComment({data,focus}) {
    const {commentId,userId,
        subcommentTime,subcommentContent,subcommentLove,targetNickname,
        userAvatar,nickName} = data;
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
                    {subcommentContent}
                </div>
                <div className={"info"}>
                    <div className={"time"}>
                        {formatTimestamp(subcommentTime)}
                    </div>
                    <div className={"interactions"}>
                        <div className={"like"}>
                            <Interaction number={subcommentLove}>
                                <HeartOutlined onClick={handleLove}/>
                            </Interaction>
                        </div>
                        <div className={"reply"}>
                            <Interaction number={0}>
                                <MessageOutlined onClick={handleComment}/>
                            </Interaction>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SubComment;