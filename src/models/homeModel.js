export default {
    namespace:'homeModel',
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