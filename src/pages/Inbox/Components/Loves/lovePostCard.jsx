import React, {useState} from 'react';
import {Avatar, Dropdown, Space} from "antd";
import PostInfo from "@/pages/Inbox/Components/PostInfo/postInfo";
import {MoreInfoIcon} from "@/assets/Icons/icon";
import {DeleteOutlined} from "@ant-design/icons";
import {markCommentAsRead} from "@/services/commentService";

const iconSize = {
    width: '45px',
    height: '45px',
}
function LovePostCard({data}) {
    const {
        userInfo: {nickname, avatar},
        relevantPost
    } = data
    const items = [
        {
            key: '1',
            danger: true,
            label: 'Mark Read',
            icon: <DeleteOutlined/>,
            onClick: () => markCommentAsRead(commentId)
        },
    ];
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
            </div>
            <div className={'card-right'}>
                <PostInfo {...relevantPost}/>
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

export default LovePostCard;