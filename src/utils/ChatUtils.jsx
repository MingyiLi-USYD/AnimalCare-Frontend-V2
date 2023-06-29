
export function onChatReceiveService(chatRecord, data,fromUser,contact) {
    const newChatRecord = new Map(chatRecord)

    if (newChatRecord.has(fromUser.id)) {
        let record = newChatRecord.get(fromUser.id)
        record.chatList.push(data)
        record.chatUser=fromUser
        record.latestTime=data.date
        record.latestMsg=data.content
        if(contact.id!==fromUser.id)
        record.unRead++
        newChatRecord.set(fromUser.id,record)
    } else {
        newChatRecord.set(fromUser.id,{
            chatList:[data],
            chatUser:fromUser,
            latestTime:data.date,
            latestMsg:data.content,
            unRead:1
        })
    }
    return newChatRecord
}

export function onChatSendService(chatRecord, data, contact) {
    const targetId= contact.id
    // 创建一个新的Map对象
    const newChatRecord = new Map(chatRecord)

    if (newChatRecord.has(targetId)) {
        let record = newChatRecord.get(targetId)
        record.chatList.push(data)
        record.chatUser=contact
        record.latestTime=data.date
        record.latestMsg=data.content
    } else {
        newChatRecord.set(targetId, {
            chatList:[data],
            chatUser:contact,
            latestTime:data.date,
            latestMsg:data.content,
            unRead:0
        })
    }

    return newChatRecord;
}

export function getChat(allChat,user) {
    return allChat.get(user.id)
}
export function onNewSessionService(chatRecord,contact){
    const newChatRecord = new Map(chatRecord)
    newChatRecord.set(contact.id,{
        chatList:[],
        chatUser:contact,
        latestTime:new Date().getTime(),
        latestMsg: '',
        unRead:0
    })
   return newChatRecord
}

export function convertMapToList(chatRecord){

   return  Array.from(chatRecord.values()).sort(
       (a, b) => {
           return b.latestTime-a.latestTime
       }
   )

}

export function resetUnread(chatRecord,contact){
    const newChatRecord = new Map(chatRecord)
    const record = newChatRecord.get(contact.id)
    record.unRead=0
    return newChatRecord
}

export function allUnread(chatRecordArray){
     let count = 0;
    for (let i = 0; i < chatRecordArray.length; i++) {
        count+=chatRecordArray[i].unRead
    }
    return count
}

export function onChatFetchService(chatRecord,data,contact){
    const newChatRecord = new Map(chatRecord)
    let record  = newChatRecord.get(contact.id)
    record.chatList=data
    return newChatRecord
}