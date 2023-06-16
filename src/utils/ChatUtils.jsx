export function onChatReceive(state,data){
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

}
export function onChatSend(chatRecord,data,targetId){
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
}
export function getChatListByUser(allChat,user){
    for (let i = 0; i < allChat.length; i++) {
        if(allChat[i].id===user.id){
            return allChat[i]
        }

    }

}
