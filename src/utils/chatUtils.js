
export function onChatReceiveService(chatRecord, data,fromUser,contact) {

    if (fromUser.id in chatRecord) {
        let record = chatRecord[fromUser.id];
        record.chatList.push(data);
        record.chatUser = fromUser;
        record.latestTime = data.date;
        record.latestMsg = data.content;
        if (contact.id !== fromUser.id) record.unRead++;
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
export function onChatSendService(chatRecord, data, contact) {
    const targetId = contact.id;
    const newChatRecord = { ...chatRecord };

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

export function getChat(allChat, user) {
    return allChat[user.id];
}

export function onNewSessionService(chatRecord, contact) {
    const newChatRecord = { ...chatRecord };
    newChatRecord[contact.id] = {
        chatList: [],
        chatUser: contact,
        latestTime: new Date().getTime(),
        latestMsg: '',
        unRead: 0,
    };
    return newChatRecord;
}

export function convertMapToList(chatRecord) {
    const values = Object.values(chatRecord);
    return values.sort((a, b) => b.latestTime - a.latestTime);
}

export function resetUnread(chatRecord, contact) {
    const newChatRecord = { ...chatRecord };
    const record = newChatRecord[contact.id];
    record.unRead = 0;
    return newChatRecord;
}

export function allUnread(chatRecordArray) {
    let count = 0;
    for (let i = 0; i < chatRecordArray.length; i++) {
        count += chatRecordArray[i].unRead;
    }
    return count;
}


export function onChatFetchService(chatRecord, data, contact) {
    const newChatRecord = { ...chatRecord };
    let record = newChatRecord[contact.id];
    record.chatList = data;
    return newChatRecord;
}

