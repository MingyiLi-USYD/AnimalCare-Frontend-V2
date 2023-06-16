import React from 'react';
import {Avatar} from "antd";

function ChatHeader({contact}) {
    return (
        <div className={'chatHeader'}>
            <Avatar size={64} src={contact.avatar}/>
            <span>{contact.nickname}</span>
        </div>
    );
}

export default ChatHeader;