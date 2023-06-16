export default {
    namespace:'PostModel',
    state:{
        open:false,
        postId:0
    },

    reducers:{
        openModal(state,{payload}){

            return{
                open: true,
                postId: payload
            }
        },
        closeModal(state){
            return{
                ...state,
                open: false,
            }
        },
    }

}