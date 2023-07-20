import React from 'react';
import { Avatar } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import {history} from "umi";
import Interaction from "../Interactions/interaction";
import './cards.less'
import {useDispatch, useSelector} from "../../.umi/exports";

const PostCard = ({item,avatar,index}) => {
    const {loveList} = useSelector(state => state.userModel)
    const dispatch = useDispatch();
    const handleLove = (postId) => {
        dispatch({
            type: 'homeModel/lovePost',
            payload: postId
        })
    };
    const handleCancelLove = (postId) => {
        dispatch({
            type: 'homeModel/cancelLovePost',
            payload: postId
        })
    };

    return (
        <div className="post-card">
            <div className="pic">
                <img
                    src={`https://source.unsplash.com/random/${index}`}
                    onClick={() => {
                        history.push(`/post/${item.postId}`);
                    }}
                />
            </div>
            <div className="item-description">{item.postContent}</div>
            <div className={'bottom'}>
                <div className="item-userinfo">
                    <Avatar
                        size={28}
                        src={avatar?avatar:item.userAvatar}
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
