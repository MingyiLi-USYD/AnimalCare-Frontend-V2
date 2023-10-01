import {connect} from 'umi';
import {sendMessageToServer} from "@/services/chatService";
import './chat.less'
import {Button, notification} from 'antd';
import React, {useState} from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {FileAddOutlined, SmileOutlined} from "@ant-design/icons";
import ChatContent from "./chatContent";
import ChatHeader from "./chatHeader";
import RecentChatFriendList from "./recentChatFriendList";

const Chat = (props) => {

    const {contact, dispatch, me} = props;
    const [emo, setEmo] = useState(false)
    const [text, setText] = useState('')
    const handleSend =  () => {

        if (text.trim() === '') {
            // 内容为空
            notification.error({
                message: 'Error',
                description: 'Can not input none',
            });
            return
        }
        const message = {
            fromId: me.userId,
            date: new Date().getTime(),
            toId:contact.userId,
            type: 'text',
            content: text,
        }
        sendMessageToServer(message)

        dispatch({
            type: 'ChatModel/onSend',
            payload: {message, contact},
        });
        setText('')
    };
    const handleClear = () => {
        setText('')
    }

    const appendData = (data) => {
        setText(text + data.native)
        setEmo(false)
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend()
            e.preventDefault(); // 阻止默认的回车换行行为
            const textarea = e.target;
            textarea.scrollTop = 0; // 将光标移至第一行
        }

    };
    return (
        <div
            className={"chatContainer"}
        >

            <div className={'fixed-div'}>
                <RecentChatFriendList/>
            </div>
            {
                Object.keys(contact).length !== 0 &&
                <div className={'flexible-div'} style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <ChatHeader contact={contact}/>
                    <ChatContent/>

                    <div className={'child-three'}>

                        <div
                            style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 9999,
                            }}
                        >
                            {emo &&
                                <Picker onClickOutside={() => setEmo(false)} data={data} onEmojiSelect={appendData}/>}
                        </div>

                        <div className={'toolBar'}>
                            <SmileOutlined style={{fontSize: 25, marginLeft: 10}} onClick={(e) => {
                                e.stopPropagation();
                                setEmo(true);
                            }}/>
                            <FileAddOutlined style={{fontSize: 25, marginLeft: 10}}/>
                        </div>
                        <textarea
                            className={'myInput'}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Please input text or emoji..."
                            style={{resize: 'none',fontSize:22}}
                            onKeyDown={handleKeyPress}
                        />
                        <div className={'myButtonDiv'}>
                            <Button danger onClick={handleClear}>Clear</Button>
                            <Button type="primary" disabled={text.trim() === ''} onClick={handleSend}>Send</Button>
                        </div>
                    </div>

                </div>

            }

        </div>
    )
};

export default connect(
    ({ChatModel: {chatRecord, contact, me}}) => {
        return {chatRecord, contact, me};
    },
)(Chat);
