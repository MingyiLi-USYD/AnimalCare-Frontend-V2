import React from 'react';
import { Avatar } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import {history} from "umi";
import Interaction from "../Interactions/interaction";

const PostCard = ({ item, loveList, handleLove, handleCancelLove }) => {

    return (
        <div className="list-item">
            <div className="pic">
                <img
                    src={`https://source.unsplash.com/random/${item.index}`}
                    onClick={() => {
                        history.push(`/post/${item.postId}`);
                    }}
                />
            </div>
            <div className="item-description">{item.postContent}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="item-userinfo">
                    <Avatar
                        size={28}
                        src={`https://source.unsplash.com/random/${item.index}`}
                        onClick={() => {
                            history.push(`/profile/${item.userId}`);
                        }}
                    />
                    <span className="nickname">{item.nickName}</span>
                </div>
                <div className="operation">
                    {loveList.includes(item.postId) ? (
                        <Interaction number={item.love} active={true}>
                            <HeartOutlined
                                onClick={() => {
                                    handleCancelLove(item.postId);
                                }}
                            />
                        </Interaction>
                    ) : (
                        <Interaction number={item.love}>
                            <HeartOutlined
                                onClick={() => {
                                    handleLove(item.postId);
                                }}
                            />
                        </Interaction>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
