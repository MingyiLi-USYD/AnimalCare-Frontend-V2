
import {
    convertMapToList,
    onChatFetchService,
    onChatReceiveService,
    onChatSendService,
    onNewSessionService,
    resetUnread
} from "../utils/chatUtils";

export default {
    namespace: 'ChatModel',
    state: {
        chatRecord: {},
        friendLists: [],
        contact: {},
        me: {},
        chatRecordArray: [],
    },

    reducers: {
        onSend(state, {payload: {message, contact}}) {
            let {chatRecord} = state
            const newChatRecord = onChatSendService(chatRecord, message, contact)
            state.chatRecord=newChatRecord
            state.chatRecordArray=convertMapToList(newChatRecord)
        },
        onReceive(state, {payload}) {
            let {chatRecord,contact} = state
            let {fromUser, message} = payload;
            const newChatRecord = onChatReceiveService(chatRecord, message, fromUser,contact);
            state.chatRecord=newChatRecord
            state.chatRecordArray=convertMapToList(newChatRecord)
        },
        onFetchHistory(state, {payload}){
            let {chatRecord,contact} = state
            const {data} =payload;
           const newChatRecord =onChatFetchService(chatRecord,data,contact)
            state.chatRecord=newChatRecord
            state.chatRecordArray=convertMapToList(newChatRecord)
        },

        onFetchFriendsList(state, {payload}) {
            state.friendLists = [ ...payload]
        },
        onFetchProfile(state, {payload}) {
            state.me=payload;
        },

        onChangeContact(state, {payload}) {
            let {chatRecord} = state
            const newChatRecord = resetUnread(chatRecord,payload);
            state.contact = payload
            state.chatRecord=newChatRecord
            state.chatRecordArray=convertMapToList(newChatRecord)
        },

        onStartNewSession(state, {payload}) {
            const contact = payload
            let {chatRecord} = state
            if(!chatRecord.hasOwnProperty(contact.id)){
                const newChatRecord = onNewSessionService(chatRecord,contact)
                state.chatRecord=newChatRecord
                state.chatRecordArray=convertMapToList(newChatRecord)
            }
            state.contact= contact

        },
        onApproveFriend(state, {payload}) {
            let {friendLists} = state
            state.friendLists =[...friendLists, payload]
        },
        onDeleteFriend(state, {payload}) {
            let {friendLists} = state
            state.friendLists = friendLists.filter(item=>item.id!==payload.id)
        },

    }
}


