export default {
    namespace:'FriendModel',
    state:{
        contact:{},
        friendRequest:0
    },

    reducers:{
        onChangeContact(state,{payload}){
            return{
                ...state,
                contact:payload
            }
        },
        onReceiveFriendRequest(state) {
            let {friendRequest} = state
            friendRequest++
            return{
                ...state,
                friendRequest
            }
        },
        onViewFriendRequest(state){
            return{
                ...state,
                friendRequest: 0
            }
        }
    }
}

