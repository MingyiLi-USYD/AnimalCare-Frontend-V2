export default {
    namespace:'petBriefModel',
    state:{
        open:false,
        petId:-1
    },

    reducers:{
        openModal(state,{payload:petId}){
            state.open=true
            state.petId = petId
        },
        closeModal(state){
            state.open=false
        },
    }

}