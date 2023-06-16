import {onChatReceive, onChatSend} from "../utils/ChatUtils";

export default {
    namespace:'MessageModel',
    state:{},

    reducers:{
        onMessage(state,{payload}){
            return {
               ...payload
            }
        }
    }
}


