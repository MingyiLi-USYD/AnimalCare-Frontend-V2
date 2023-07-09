import React from 'react';
import './comment.less'
import {Avatar} from "antd";
import {HeartOutlined, MessageOutlined} from '@ant-design/icons';
import Interaction from "../../components/Interations/interaction";
import {history} from "umi";
import {formatTimestamp} from "../../utils/timeUtils";
import SubComment from "./subComment";
import {getSubcommentsById} from "../../services/commentService";
import {useDispatch, useSelector} from "../../.umi/exports";

function Comment({comment,focus}) {
    const dispatch = useDispatch();

    const {id,nickName,userAvatar,commentContent,
        commentTime,postId,userId,commentLove,
        subcommentsLength,subcommentDtos} = comment;
    const {post,total,page,comments,label,type,commentId,replyNickname} = useSelector(state=>state.postDetailModel)
    const handleLove = ()=>{

    }
    const handleComment = ()=>{
          focus()
        dispatch({
            type:'postDetailModel/onClickComment',
            payload:{label:`@${nickName}`,type:1,commentId:id}
        })
    }

    const handleLoadMore = async ()=>{
        dispatch({
            type:'postDetailModel/fetchSubcomments',
            payload:id
        })
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
                              <Interaction number={subcommentsLength}>
                                  <MessageOutlined onClick={handleComment}/>
                              </Interaction>
                          </div>
                    </div>
                </div>
                <div className={"reply-container"}>
                    {subcommentDtos?.map(item=>(<SubComment key={item.subcommentId} data={item} focus={focus}/>))}
                </div>

                {
                    subcommentsLength-subcommentDtos?.length>0&&
                    <a onClick={handleLoadMore}>{`View rest ${subcommentsLength-subcommentDtos.length} replies`}</a>
                }

            </div>
        </div>
    );
}

export default Comment;