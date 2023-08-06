import React, {useState} from 'react';
import {Avatar, Button, Input, Space} from "antd";
import {SmileOutlined} from "@ant-design/icons";

function LovePostCard({data}) {
    const [text, setText] = useState('');
    const {
        userInfo: {nickname, avatar}, commentContent,
        relevantPost: {coverImage}
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
                        <span>9.22</span>
                    </Space>
                </div>
                <div className={'comment-content'}>
                    {`${nickname} 很喜欢你这个post`}
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
                <div className={'image-container'} style={{backgroundImage: `url(${coverImage})`}}/>
            </div>
        </div>
    );
}

export default LovePostCard;