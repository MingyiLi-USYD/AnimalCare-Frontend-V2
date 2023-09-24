import {ChatRecord, ChatRecordItem} from "@/entity/ChatRecord";
import {User} from "@/pojo/user";
import {ChatMessage} from "@/entity/Message";
import {history} from "umi";


export function onChatReceiveService(chatRecord:ChatRecord, data:ChatMessage,fromUser:User,contact:User) {

    if (fromUser.userId in chatRecord) {
        const path = history.location.pathname
        let record = chatRecord[fromUser.userId];
        record.chatList.push(data);
        record.chatUser = fromUser;
        record.latestTime = data.date;
        record.latestMsg = data.content;
        if (path!=='/chat' ||contact.userId !== fromUser.userId) {
            record.unRead++;
        }
        chatRecord[fromUser.userId] = record;
    } else {
        chatRecord[fromUser.userId] = {
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
    const targetId = contact.userId;
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
    return allChat[user.userId];
}

export function onNewSessionService(chatRecord: ChatRecord, contact: User) {
    const newChatRecord: ChatRecord = { ...chatRecord };
    newChatRecord[contact.userId] = {
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
    const record = newChatRecord[contact.userId];
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
    let record = newChatRecord[contact.userId];
    record.chatList = data;
    return newChatRecord;
}

export function onPartlyChatFetchService(chatRecord: ChatRecord, cloudChatRecord: ChatRecord) {
    Object.keys(cloudChatRecord).forEach(key=>{
        if (chatRecord.hasOwnProperty(key)) {
            const cloudChatRecordElement = cloudChatRecord[key];
            const chatRecordElement = chatRecord[key];
            cloudChatRecordElement.chatList= [...chatRecordElement.chatList,...cloudChatRecordElement.chatList]
            chatRecord[key]= {...chatRecordElement,...cloudChatRecordElement}

        }else {
            chatRecord[key] = cloudChatRecord[key]
        }
    })

    return chatRecord
}
