import React, {useState} from 'react';
import {Avatar, Button, Input, Space} from "antd";
import {PaperClipOutlined, SmileOutlined} from "@ant-design/icons";

function PostRelevantCard(props) {
    const [text,setText] = useState('');
    const handleInput = ()=>{

    }
    const handleReply = ()=>{

    }
    return (
        <div className={'post-relevant-card'}>
            <div className={'card-left'} >
               <div className={'user-info'}>
                   <Space >
                       <Avatar size={60} src={'https://lh3.googleusercontent.com/a/AAcHTteGdWop8z16I8LGZAb-nolwABlOk0oxIqj2tt1YRt1vbw=s96-c'}/>
                       <span>{'Mingyi Li'}</span>
                       <span>09:35</span>
                   </Space>
               </div>
                <div className={'comment-content'}>
                    这个是我评论的内容AAAAAA
                </div>
                <div className={"reply-wrapper"}>
                    <Input placeholder={`Reply`} value={text} onChange={handleInput}/>
                    <div className={`input-buttons ${text.length>0 ? 'active' : 'inactive'}`}>
                        <PaperClipOutlined/>
                        <SmileOutlined/>
                        <Button size={"middle"} type={"primary"} onClick={handleReply}>Send</Button>
                    </div>
                </div>
            </div>
            <div className={'card-right'}>

            </div>
        </div>
    );
}

export default PostRelevantCard;