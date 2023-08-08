import React, {useState} from 'react';
import {Avatar, Button, Dropdown, Input, Space} from "antd";
import {DeleteOutlined, SmileOutlined} from "@ant-design/icons";
import {formatTimestamp} from "@/utils/timeUtils";
import {history} from "umi";
import {MoreInfoIcon} from "@/assets/Icons/icon";
import {markCommentAsRead, postSubcomment, postSubcommentAndRead} from "@/services/commentService";
import {addSubcomment} from "@/actions/postDetailActions";
import PostInfo from "@/pages/Inbox/Components/PostInfo/postInfo";

const iconSize = {
    width: '45px',
    height: '45px',
}

function CommentPostCard({data}) {
    const [text, setText] = useState('');
    const {
        commentUser: {nickname, avatar}, commentContent, commentId,
        relevantPost,
    } = data
    const handleInput = (e) => {
        setText(e.target.value)
    }
    const handleReply = () => {
        const data = {
            subcommentContent: text,
            targetNickname: nickname,
            commentId,
        }
        postSubcommentAndRead(data)
    }

    const items = [
        {
            key: '1',
            danger: true,
            label: 'Mark Read',
            icon: <DeleteOutlined/>,
            onClick: () => markCommentAsRead(commentId).then(
                ()=>{
                    //移动div 1秒 然后删除内容
                }
            )
        },
    ];
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
                      <PostInfo {...relevantPost} />
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

export default CommentPostCard;