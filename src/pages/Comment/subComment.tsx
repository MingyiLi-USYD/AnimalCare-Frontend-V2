import React from 'react';
import {Avatar} from "antd";
import {history} from "umi";
import {formatTimestamp} from "@/utils/timeUtils";
import Interaction from "../../components/Interactions/interaction";
import {HeartOutlined, MessageOutlined} from "@ant-design/icons";
import {useDispatch} from "umi";
import {SubcommentDto} from "@/pojo/subComment";



function SubComment({data,focus}:{data:SubcommentDto,focus:Function}) {
    const dispatch = useDispatch();
    const {commentId,userId,
        subcommentTime,subcommentContent,subcommentLove,targetNickname,
        subcommentUser} = data;
    const handleLove = ()=>{

    }
    const handleComment = ()=>{
        focus()
        dispatch({
            type:'postDetailModel/onClickSubcomment',
            payload:{label:`@${subcommentUser.nickname}`,type:2,targetNickname:subcommentUser.nickname,commentId}
        })
    }
    // @ts-ignore
    return (
        <div className={"comment-item"}>
            <div className={"left"}>
                <Avatar size={32} src={subcommentUser.avatar} onClick={()=>{history.push(`/profile/${userId}`)}}/>
            </div>
            <div className={"right"}>
                <div className={"author-nickname"}>
                    {subcommentUser.nickname}
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
                            <Interaction number={subcommentLove} active={false}>
                                <HeartOutlined onClick={handleLove}/>
                            </Interaction>
                        </div>
                        <div className={"reply"}>
                            <Interaction number={0} active={false}>
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