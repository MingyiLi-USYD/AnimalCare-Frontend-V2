import {Avatar, Button, List} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {connect} from "../../.umi/exports";
import {getChat} from "../../utils/ChatUtils";

const ChatContent = (props) => {
    const { chatRecord, contact, me } = props;
    const listRef = useRef(null);
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [chatRecord]);
    const chat = getChat(chatRecord,contact);
    return (
        <div
            className={'messageContainer'}
            id="scrollableDiv"
            style={{
                overflow: 'auto',
                border: '2px solid rgba(140, 140, 140, 0.35)',
                textAlign: 'center',
            }}
            ref={listRef}
        >
                <Button>History</Button>
                <List
                    dataSource={chat?chat.chatList:[]}
                    renderItem={(item) => (
                        <List.Item>
                             <OneRecord  data={item} me={me} target={chat.chatUser} />
                        </List.Item>
                    )}
                />
        </div>
    );
};
export default connect(
    ({ ChatModel: { chatRecord, contact, me } }) => {
        return { chatRecord, contact, me };
    },
)(ChatContent);
const OneRecord = ({data,me,target})=>{
    const isMe = data.userId===me.id
    return(
        <div className={`oneMessage ${isMe?'reverse':''}`}>
                <div span={2}>
                    <Avatar size={50} src={isMe?me.avatar:target.avatar}/>
                </div>
                <div className={'text'} span={22}dangerouslySetInnerHTML={{ __html: data.content }}/>
        </div>
    )
}