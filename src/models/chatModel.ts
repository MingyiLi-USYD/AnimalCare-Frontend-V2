
import {
    convertMapToList, onAllChatFetchService,
    onChatFetchService,
    onChatReceiveService,
    onChatSendService,
    onNewSessionService,
    resetUnread
} from "@/utils/chatUtils";
import {retrieveAllMessages} from "@/services/chatService";
import {ChatRecord, ChatRecordItem} from "@/entity/ChatRecord";
import {User} from "@/pojo/user";
import {DvaModel, EffectsMapObject} from "umi";
import {MyAction, MyReducersMapObject} from "@/services/dva";
import {CloudMessage} from "@/entity/Message";
interface ChatModelState{
    isConnected:boolean,
    chatRecord: ChatRecord,
    contact: User,
    me: User,
    chatRecordArray: ChatRecordItem[],
}

const chatModel:DvaModel<ChatModelState,EffectsMapObject,MyReducersMapObject<ChatModelState,MyAction<any>>> = {
    namespace: 'ChatModel',
    state: {
        isConnected:false,
        chatRecord: {},
        contact: {} as User,
        me: {} as User,
        chatRecordArray: [],
    },

    reducers: {
        disconnect(state){
            state.isConnected=false;
        },
        connect(state){
            state.isConnected=true;
        },
        fetchChatRecordsSuccess(state, {payload: messages}:{payload:ChatRecordItem[]}) {
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
        onFetchHistory(state, {payload}:{payload:CloudMessage}){
            let {chatRecord,contact} = state
            const newChatRecord =onChatFetchService(chatRecord,payload.chatList,contact)
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
            if(!chatRecord.hasOwnProperty(contact.userId)){
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
export default chatModel
