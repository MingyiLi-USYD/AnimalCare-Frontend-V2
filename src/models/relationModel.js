export default {
    namespace:'relationModel',
    state:{
        open:false,
    },

    reducers:{
        openModal(state,){
          state.open=true
        },
        closeModal(state,){
            state.open=false
        },
    }
}

