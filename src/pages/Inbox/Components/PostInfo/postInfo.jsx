import React from 'react';
import {Button, Space} from "antd";
import {formatTimestamp} from "@/utils/timeUtils";
import {history} from "umi";

function PostInfo({postTitle,postTime,coverImage,postId}) {

    return (
        <div>
            <div className={'header'}>
                <div className={'title'}>{postTitle}</div>
                <div className={'time'}>{formatTimestamp(postTime)}</div>
            </div>
            <div className={'image-info'}>
                <div className={'image-container'} style={{backgroundImage: `url(${coverImage})`}}/>
                <Button type={"primary"} onClick={() => history.push(`/post/${postId}`)}> View Detail</Button>
            </div>
        </div>
    );
}

export default PostInfo;