import {onChatReceive, onChatSend} from "../utils/ChatUtils";

export default {
    namespace:'ChatModel',
    state:{
        chatRecord:new Map(),
        friendLists:[],
        contact:{},
        me:{}
    },

    reducers:{
        onSend(state,{payload:{msg,contact}}){
            let {chatRecord} = state
            const newChatRecord = onChatSend(chatRecord,msg,contact.id)
            return {
                ...state,
                chatRecord:newChatRecord
            }
        }
        ,
        onReceive(state,{payload}){
            let {chatRecord} = state
            const newChatRecord = onChatReceive(chatRecord,payload);
            return {
                ...state,
                chatRecord:newChatRecord
            }
        },

        onFetchFriendsList(state,{payload}){
            let {friendLists} = state
            friendLists=[...friendLists,...payload]
            return{
                ...state,
                friendLists
            }
        },
        onFetchProfile(state,{payload}){
            return{
                ...state,
                me:payload
            }
        },

        onChangeContact(state,{payload}){
            return{
                ...state,
                contact:payload
            }
        }
        }
}


