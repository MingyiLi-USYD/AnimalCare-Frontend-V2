import {initUserInfo} from "../services/userService";

export default {
    namespace:'userModel',
    state:{
        loveList:[],
        startList:[],
        subscriptionList:[]
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
        addToSubscriptionList(state,{payload}){
            !state.subscriptionList.includes(payload)&&state.subscriptionList.push(payload)
        },
        removeFromSubscriptionList(state,{payload}){
            const index = state.subscriptionList.indexOf(payload);
            if(index>=0){
                state.subscriptionList.splice(index, 1);
            }
        },
        fetchLoveListSuccess(state,{payload}){
           state.loveList=payload
        },
        fetchSubscriptionListSuccess(state,{payload}){
            state.subscriptionList=payload
        },

    },
    effects:{
        *initUserInfo({ payload }, { call, put }) {
            const { data,code } = yield call(initUserInfo);
            const {userId,username,role,email,avatar} = data;
            const user= {userId,username,role,email,avatar};
            if(code===1){

                yield put({ type: 'fetchLoveListSuccess', payload: data.loveIdList });
                yield put({ type: 'ChatModel/onFetchProfile', payload: user });
                yield put({ type: 'fetchSubscriptionListSuccess', payload: data.subscribedUserIdList });
                yield put({type: 'friendModel/fetchFriendListSuccess', payload: data.friendshipDtoList});
                yield put({type: 'friendModel/fetchRequestListSuccess', payload: data.friendRequestDtoList});

            }
        },
    }

}


