export default {
    namespace:'FriendModel',
    state:{
        contact:{},
    },

    reducers:{
        onChangeContact(state,{payload}){
            return{
                ...state,
                contact:payload
            }
        }
    }
}


