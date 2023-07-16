
import {
    convertMapToList, onAllChatFetchService,
    onChatFetchService,
    onChatReceiveService,
    onChatSendService,
    onNewSessionService,
    resetUnread
} from "../utils/chatUtils";
import {getRequestList} from "../services/friendService";
import {retrieveAllMessages} from "../services/chatService";


export default {
    namespace: 'ChatModel',
    state: {
        isConnected:false,
        chatRecord: {},
        contact: {},
        me: {},
        chatRecordArray: [],
    },

    reducers: {
        disconnect(state){
            state.isConnected=false;
        },
        connect(state){
            state.isConnected=true;
        },
        fetchChatRecordsSuccess(state, {payload: messages}) {
            let {chatRecord} = state
            const newChatRecord = onAllChatFetchService(chatRecord, messages)
            state.chatRecord=newChatRecord
            state.chatRecordArray=convertMapToList(newChatRecord)
        },

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

    },
    effects: {
        * fetchChatRecords({payload: userId}, {call, put}) {
            const {data, code} = yield call(retrieveAllMessages);
            if (code === 1) {
                yield put({type: 'fetchChatRecordsSuccess', payload: data});
            }
        },
    }
}


