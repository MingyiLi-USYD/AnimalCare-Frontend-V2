import React from 'react';
import {Avatar} from "antd";

function ChatHeader({contact}) {
    return (
        <div className={"chat-header"}>
            <div className={""}>
                <Avatar size={64} src={contact.avatar}/>
                <span>{contact.nickname}</span>
            </div>
        </div>
    );
}

export default ChatHeader;