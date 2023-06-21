export default {
    namespace:'RelationModel',
    state:{
        open:false,
    },

    reducers:{
        openModal(){
            return{
                open: true
            }
        },
        closeModal(){
            return{
                open: false,
            }
        },
    }

}