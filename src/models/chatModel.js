
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
        chatRecord: new Map(),
        friendLists: [],
        contact: {},
        me: {},
        chatRecordArray: [],
    },

    reducers: {
        onSend(state, {payload: {message, contact}}) {
            let {chatRecord} = state
            const newChatRecord = onChatSendService(chatRecord, message, contact)
            return {
                ...state,
                chatRecord: newChatRecord,
                chatRecordArray: convertMapToList(newChatRecord)
            }
        },
        onReceive(state, {payload}) {
            let {chatRecord,contact} = state
            let {fromUser, message} = payload;
            const newChatRecord = onChatReceiveService(chatRecord, message, fromUser,contact);
            return {
                ...state,
                chatRecord: newChatRecord,
                chatRecordArray: convertMapToList(newChatRecord)
            }
        },
        onFetchHistory(state, {payload}){
            let {chatRecord,contact} = state
            const {data} =payload;
           const newChatRecord =onChatFetchService(chatRecord,data,contact)
            return {
                ...state,
                chatRecord: newChatRecord,
                chatRecordArray: convertMapToList(newChatRecord)
            }
        },

        onFetchFriendsList(state, {payload}) {
          const  friendLists = [ ...payload]
            return {
                ...state,
                friendLists
            }
        },
        onFetchProfile(state, {payload}) {
            return {
                ...state,
                me: payload
            }
        },

        onChangeContact(state, {payload}) {
            let {chatRecord} = state
            const newChatRecord = resetUnread(chatRecord,payload);
            console.log(newChatRecord)
            return {
                ...state,
                chatRecord:newChatRecord,
                chatRecordArray: convertMapToList(newChatRecord),
                contact: payload
            }
        },

        onStartNewSession(state, {payload}) {
            const contact = payload
            let {chatRecord} = state
            if(!chatRecord.has(contact.id)){
                const newChatRecord = onNewSessionService(chatRecord,contact)
                console.log(newChatRecord)
                return{
                    ...state,
                    chatRecord: newChatRecord,
                    chatRecordArray: convertMapToList(newChatRecord),
                    contact
                }
            }else {
                return {
                    ...state,
                    contact
                }
            }

        },
        onApproveFriend(state, {payload}) {
            let {friendLists} = state
            friendLists = [...friendLists, payload]
            return {
                ...state,
                friendLists
            }
        },
        onDeleteFriend(state, {payload}) {
            let {friendLists} = state
            friendLists = friendLists.filter(item=>item.id!==payload.id)
            return {
                ...state,
                friendLists
            }
        },

    }
}


