import {convertMapToList, onChatReceive, onChatSend, onNewSession} from "../utils/ChatUtils";

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
            const newChatRecord = onChatSend(chatRecord, message, contact)
            return {
                ...state,
                chatRecord: newChatRecord,
                chatRecordArray: convertMapToList(newChatRecord)
            }
        },
        onReceive(state, {payload}) {
            let {chatRecord} = state
            let {fromUser, message} = payload;
            const newChatRecord = onChatReceive(chatRecord, message, fromUser);
            return {
                ...state,
                chatRecord: newChatRecord,
                chatRecordArray: convertMapToList(newChatRecord)
            }
        },

        onFetchFriendsList(state, {payload}) {
            let {friendLists} = state
            friendLists = [...friendLists, ...payload]
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
            return {
                ...state,
                contact: payload
            }
        },

        onStartNewSession(state, {payload}) {
            const contact = payload
            let {chatRecord} = state
            if(!chatRecord.has(contact.id)){

                const newChatRecord = onNewSession(chatRecord,contact)
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

    }
}


