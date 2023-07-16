import {Avatar, Button, List} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {connect} from "../../.umi/exports";
import {getChat} from "@/utils/chatUtils";
import {retrieveMessageById} from "@/services/chatService";



const ChatContent = (props) => {

    const { chatRecord, contact, me,dispatch } = props;
    const listRef = useRef(null);
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [chatRecord[contact.id].chatList.length]);
    const chat = getChat(chatRecord,contact);

    async function handleFetchHistory() {
       const {code,data}=await retrieveMessageById(contact.id);
       if(code===1){
           dispatch({
               type: 'ChatModel/onFetchHistory',
               payload: {data},
           })
       }
    }

    return (
        <div
            className={'child-two'}
            id="ScrollableChatHistory"
            ref={listRef}
        >
                <Button onClick={handleFetchHistory}>History</Button>
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
    const isMe = data.fromId===me.id
    return(
        <div className={`oneMessage ${isMe?'reverse':''}`}>
                <div>
                    <Avatar size={50} src={isMe?me.avatar:target.avatar}/>
                </div>
                <div className={`text ${isMe ? 'after-triangle' : 'before-triangle'}`}>
                    {
                        data.content
                    }
                </div>
        </div>
    )
}