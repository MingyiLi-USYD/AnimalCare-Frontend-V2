import {initUserInfo} from "../services/userService";

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
        removeFromLoveList(state,{payload}){
            const index = state.loveList.indexOf(payload);
            if(index>=0){
                state.loveList.splice(index, 1);
            }

        },
        fetchLoveListSuccess(state,{payload}){
           state.loveList=payload
        },

    },
    effects:{
        *initUserInfo({ payload }, { call, put }) {
            const { data,code } = yield call(initUserInfo);
            if(code===1){
                yield put({ type: 'fetchLoveListSuccess', payload: data.loveIdList });
                yield put({type: 'friendModel/fetchFriendListSuccess', payload: data.friendshipDtoList});
                yield put({type: 'friendModel/fetchRequestListSuccess', payload: data.friendRequestDtoList});

            }
        },
    }

}


