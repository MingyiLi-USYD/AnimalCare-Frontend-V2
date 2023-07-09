import {love} from "../services/postService";

export default {
    namespace:'userModel',
    state:{
        loveList:[],
        startList:[]
    },

    reducers:{
        onChangeContact(state,{payload}){
            state.contact=payload;
        },
        addToLoveList(state,{payload}){
            !state.loveList.includes(payload)&&state.loveList.push(payload)
        },
        fetchUserInfo(state,{payload}){
            !state.loveList.includes(payload)&&state.loveList.push(payload)
        },

    },
    effects:{
        *fetchUserInfo({ payload }, { call, put }) {
            const { data,code } = yield call(love,payload);
            if(code===1){
                yield put({ type: 'postDetailModel/increaseLove'});
                yield put({ type: 'addToLoveList', payload: data });
            }
        },
    }

}


