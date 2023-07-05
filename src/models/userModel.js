export default {
    namespace:'userModel',
    state:{
        loveList:[],
        startList:[]
    },

    reducers:{
        onChangeContact(state,{payload}){
            return{
                ...state,
                contact:payload
            }
        },
    }
}


