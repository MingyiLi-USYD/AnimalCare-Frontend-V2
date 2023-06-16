
export function onChatReceive(chatRecord, data,fromUser) {
    console.log(data);
    const newChatRecord = new Map(chatRecord)

    if (newChatRecord.has(fromUser.id)) {
        let record = newChatRecord.get(fromUser.id)
        record.chatList.push(data)
        record.chatUser=fromUser
        record.latestTime=data.date,
        record.latestMsg=data.content,
        newChatRecord.set(fromUser.id,record)
    } else {
        newChatRecord.set(fromUser.id,{
            chatList:[data],
            chatUser:fromUser,
            latestTime:data.date,
            latestMsg:data.content,
        })
    }
    return newChatRecord
}

export function onChatSend(chatRecord, data, contact) {
    console.log(data);
    const targetId= contact.id
    // 创建一个新的Map对象
    const newChatRecord = new Map(chatRecord)

    if (newChatRecord.has(targetId)) {
      newChatRecord.get(targetId).chatList.push(data)
      newChatRecord.get(targetId).chatUser=contact
      newChatRecord.get(targetId).latestTime=data.date
      newChatRecord.get(targetId).latestMsg=data.content
    } else {
        newChatRecord.set(targetId, {
            chatList:[data],
            chatUser:contact,
            latestTime:data.date,
            latestMsg:data.content,
        })
    }

    return newChatRecord;
}

export function getChat(allChat,user) {
    return allChat.get(user.id)
}
export function onNewSession(chatRecord,contact){
    const newChatRecord = new Map(chatRecord)
    newChatRecord.set(contact.id,{
        chatList:[],
        chatUser:contact,
        latestTime:new Date().getTime(),
        latestMsg: '',
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