import chat from "@/pages/Chat/Chat";


export function onChatReceiveService(chatRecord:ChatRecord, data:ChatMessage,fromUser:User,contact:User) {

    if (fromUser.id in chatRecord) {
        let record = chatRecord[fromUser.id];
        record.chatList.push(data);
        record.chatUser = fromUser;
        record.latestTime = data.date;
        record.latestMsg = data.content;
        if (contact.id !== fromUser.id) {
            record.unRead++;
        }
        chatRecord[fromUser.id] = record;
    } else {
        chatRecord[fromUser.id] = {
            chatList: [data],
            chatUser: fromUser,
            latestTime: data.date,
            latestMsg: data.content,
            unRead: 1,
        };
    }
    return chatRecord;
}
export function onChatSendService(chatRecord: ChatRecord, data: ChatMessage, contact: User) {
    const targetId = contact.id;
    const newChatRecord: ChatRecord = { ...chatRecord };

    if (newChatRecord.hasOwnProperty(targetId)) {
        let record = newChatRecord[targetId];
        record.chatList.push(data);
        record.chatUser = contact;
        record.latestTime = data.date;
        record.latestMsg = data.content;
    } else {
        newChatRecord[targetId] = {
            chatList: [data],
            chatUser: contact,
            latestTime: data.date,
            latestMsg: data.content,
            unRead: 0,
        };
    }

    return newChatRecord;
}

export function getChat(allChat: ChatRecord, user: User) {
    return allChat[user.id];
}

export function onNewSessionService(chatRecord: ChatRecord, contact: User) {
    const newChatRecord: ChatRecord = { ...chatRecord };
    newChatRecord[contact.id] = {
        chatList: [],
        chatUser: contact,
        latestTime: new Date().getTime(),
        latestMsg: '',
        unRead: 0,
    };
    return newChatRecord;
}

export function convertMapToList(chatRecord: ChatRecord) {
    const values = Object.values(chatRecord);
    return values.sort((a, b) => b.latestTime - a.latestTime);
}

export function resetUnread(chatRecord: ChatRecord, contact: User) {
    const newChatRecord: ChatRecord = { ...chatRecord };
    const record = newChatRecord[contact.id];
    record.unRead = 0;
    return newChatRecord;
}

export function allUnread(chatRecordArray: ChatRecordItem[]) {
    let count = 0;
    for (let i = 0; i < chatRecordArray.length; i++) {
        count += chatRecordArray[i].unRead;
    }
    return count;
}

export function onChatFetchService(chatRecord: ChatRecord, data: ChatMessage[], contact: User) {
    const newChatRecord: ChatRecord = { ...chatRecord };
    let record = newChatRecord[contact.id];
    record.chatList = data;
    return newChatRecord;
}
export function onAllChatFetchService(chatRecord: ChatRecord, chats: ChatRecordItem[]) {
     chats.forEach(chat=>{
               const id  = chat.chatUser.id;
               if(chatRecord[id]){
                   //等待后期改进
                   chatRecord[id].chatUser=chat.chatUser;
                   chatRecord[id].chatList=chat.chatList;
                   chatRecord[id].latestTime=chat.latestTime;
                   chatRecord[id].unRead=chat.unRead;
               }else {
                   chatRecord[id]=chat
               }
         }
     )
    return chatRecord
}
