/*export function onChatReceive(state,data){
    console.log("收到消息")
    for (let i = 0; i < state.length; i++) {

        let user = state[i];
           if(user.id===data.fromId){
                if(user.messageLists){
                    user.messageLists=[...user.messageLists,data.message.message]
                }else {
                    user.messageLists=[data.message.message]
                }
                console.log(state)
                return state
            }
    }
    const newUser = {
        id:data.fromId,
        messageLists:[data.message.message]
    }
    state.unshift(newUser)
    return state

}*/

export function onChatReceive(state, data) {
    console.log("收到消息");

    const newState = new Map(state);

    if (newState.has(data.fromId)) {
        const user = newState.get(data.fromId);
        const updatedUser = {
            ...user,
            messageLists: user.messageLists ? [...user.messageLists, data.message.message] : [data.message.message],
        };
        newState.set(user.id, updatedUser);
    } else {
        const newUser = {
            id: data.fromId,
            messageLists: [data.message.message],
        };
        newState.set(newUser.id, newUser);
    }
    return newState.toJS();
}
/*export function onChatSend(chatRecord,data,targetId){
    console.log("发送消息")
    for (let i = 0; i < chatRecord.length; i++) {
        let user = chatRecord[i];
        if(user.id===targetId){
            if(user.messageLists){
                user.messageLists=[...user.messageLists,data]
            }else {
                user.messageLists=[data]
            }
            return chatRecord
        }
    }

    const newUser = {
        id:targetId,
        messageLists:[data]
    }
    chatRecord.unshift(newUser)
    return chatRecord
}*/

export function onChatSend(chatRecord, data, targetId) {


    // 创建一个新的Map对象
    const newChatRecord = new Map(chatRecord)

    if (newChatRecord.has(targetId)) {
       newChatRecord.get(targetId).push(data);
    } else {
        console.log("第一次发")
        newChatRecord.set(targetId, [data])
    }

    return newChatRecord;
}

/*export function getChatListByUser(allChat,user){
    for (let i = 0; i < allChat.length; i++) {
        if(allChat[i].id===user.id){
            return allChat[i]
        }

    }

}*/
export function getChatListByUser(allChat,user) {
    return allChat.get(user.id)
}