import React, {useState} from 'react';
import {Avatar, Button, Dropdown, Input, Space} from "antd";
import {DeleteOutlined, SmileOutlined} from "@ant-design/icons";

import {MoreInfoIcon} from "@/assets/Icons/icon";


import PostInfo from "@/pages/Inbox/Components/PostInfo/postInfo";
import {formatTimestamp} from "@/utils/timeUtils";
import {markMentionAsRead, replyMention} from "@/services/mentionService";
import {postComment} from "@/services/commentService";

const iconSize = {
    width: '45px',
    height: '45px',
}

function MentionPostCard({data,removeMention}) {
    const [text, setText] = useState('');
    const {
        mentionId,
       relevantPost:{ postTime, postContent,postId},
        userInfo: {avatar, nickname}
    } = data
    const handleInput = (e) => {
        setText(e.target.value)
    }


    const items = [
        {
            key: '1',
            danger: true,
            label: 'Mark Read',
            icon: <DeleteOutlined/>,
            onClick:async () => {
             const {code} =  await  markMentionAsRead(mentionId)
                if(code===1){
                    removeMention(mentionId)
                }
            }
        },
    ];

   const handleComment = async ()=>{
       const data= {
           postId,
           commentContent:text,
       }
    const {code} =  await replyMention(data,mentionId)
       if(code===1){
           removeMention(mentionId)
       }
   }

    return (

        <div className={'post-relevant-card'}>
            <div className={'card-left'}>
                <div className={'user-info'}>
                    <Space>
                        <Avatar size={60} src={avatar}/>
                        <span>{nickname}</span>
                        <span>{formatTimestamp(postTime)}</span>
                    </Space>
                </div>
                <div className={'comment-content'}>
                    {postContent}
                </div>
                <div className={"reply-wrapper"}>
                    <Input placeholder={`Leave Comment`} value={text} onChange={handleInput}/>
                    <div className={`input-buttons ${text.length > 0 ? 'active' : 'inactive'}`}>
                        <SmileOutlined/>
                        <Button size={"middle"} type={"primary"} onClick={handleComment}>Send</Button>
                    </div>
                </div>
            </div>
            <div className={'card-right'}>
                <PostInfo {...data.relevantPost} />
            </div>
            <div className={'operation'}>
                <Dropdown
                    menu={{
                        items,
                    }}
                    trigger={['click']}
                >
                    <MoreInfoIcon {...iconSize}  />
                </Dropdown>
            </div>
        </div>
    );
}

export default MentionPostCard;