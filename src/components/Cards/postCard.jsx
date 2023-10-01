import React from 'react';
import { Avatar } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import {history,useDispatch, useSelector} from "umi";
import Interaction from "../Interactions/interaction";
import './cards.less'
import {urlWrapper} from "@/utils/imageUtils";

const PostCard = ({item,avatar,index}) => {
    const {loveList} = useSelector(state => state.userModel)
    const dispatch = useDispatch();
    const {postUser,coverImage}=item;
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
                    src={urlWrapper(coverImage)}
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
                        src={postUser?postUser.avatar:avatar}
                        onClick={avatar?null:() => {
                            history.push(`/profile/${postUser.userId}`);
                        }}
                    />
                    <span className="nickname">{item.postUser?.nickname}</span>
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
