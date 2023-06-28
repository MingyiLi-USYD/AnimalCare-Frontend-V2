
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


