import React from 'react';
import {Avatar} from "antd";
import {history} from "umi";
import {formatTimestamp} from "@/utils/timeUtils";
import Interaction from "../../components/Interactions/interaction";
import {HeartOutlined, MessageOutlined} from "@ant-design/icons";
import {useDispatch} from "umi";
import {SubcommentDto} from "@/pojo/subComment";
import {useSelector} from "@@/exports";



function SubComment({data,focus}:{data:SubcommentDto,focus:Function}) {
    const dispatch = useDispatch();
    const {commentId,subcommentId,userId,
        subcommentTime,subcommentContent,subcommentLove,
        subcommentUser} = data;

    // @ts-ignore
    const {loveSubcommentList} = useSelector(state => state.userModel)
    const handleLove = ()=>{
        dispatch({
            type:'postDetailModel/onLoveSubcomment',
            payload: {commentId,subcommentId}
        })
    }

    const handleCancelLove = ()=>{
        dispatch({
            type:'postDetailModel/onCancelLoveSubcomment',
            payload: {commentId,subcommentId}
        })
    }
    const handleComment = ()=>{
        focus()
        dispatch({
            type:'postDetailModel/onClickSubcomment',
            payload:{label:`@${subcommentUser.nickname}`,type:2,replyUserId:subcommentUser.userId,commentId}
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
                            <Interaction number={subcommentLove} active={loveSubcommentList.includes(subcommentId)}>
                                <HeartOutlined onClick={loveSubcommentList.includes(subcommentId)?handleCancelLove:handleLove}/>
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