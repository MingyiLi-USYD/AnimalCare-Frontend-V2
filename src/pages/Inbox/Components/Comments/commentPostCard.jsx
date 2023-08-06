import React, {useState} from 'react';
import {Avatar, Button, Input, Space} from "antd";
import {SmileOutlined} from "@ant-design/icons";

function CommentPostCard({data}) {
    const [text, setText] = useState('');
    const {
        commentUser: {nickname, avatar}, commentContent,
        relevantPost: {coverImage,postTitle,postTime,postContent}
    } = data
    const handleInput = (e) => {
        setText(e.target.value)
    }
    const handleReply = () => {

    }
    return (
        <div className={'post-relevant-card'}>
            <div className={'card-left'}>
                <div className={'user-info'}>
                    <Space>
                        <Avatar size={60} src={avatar}/>
                        <span>{nickname}</span>
                        <span>09:35</span>
                    </Space>
                </div>
                <div className={'comment-content'}>
                    {commentContent}
                </div>
                <div className={"reply-wrapper"}>
                    <Input placeholder={`Reply`} value={text} onChange={handleInput}/>
                    <div className={`input-buttons ${text.length > 0 ? 'active' : 'inactive'}`}>
                        <SmileOutlined/>
                        <Button size={"middle"} type={"primary"} onClick={handleReply}>Reply</Button>
                    </div>
                </div>
            </div>
            <div className={'card-right'}>
                <div>{postTitle}</div>
                <div>{postContent}</div>
                <div className={'image-container'} style={{backgroundImage: `url(${coverImage})`}}/>
            </div>
        </div>
    );
}

export default CommentPostCard;