import {initUserInfo} from "../services/userService";

export default {
    namespace:'userModel',
    state:{
        loveList:[],
        startList:[],
        subscribeList:[],
        subscriberList:[]
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
        addToSubscriptionList(state,{payload:userId}){
            !state.subscribeList.includes(userId)&&state.subscribeList.push(userId)
        },
        removeFromSubscriptionList(state,{payload:userId}){
            const index = state.subscribeList.indexOf(userId);
            if(index>=0){
                state.subscribeList.splice(index, 1);
            }
        },
        fetchLoveListSuccess(state,{payload}){
           state.loveList=payload
        },
        fetchSubscribeListSuccess(state,{payload}){
            state.subscribeList=payload
        },
        fetchSubscriberListSuccess(state,{payload}){
            state.subscriberList=payload
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
                yield put({ type: 'fetchSubscribeListSuccess', payload: data.subscribeIdList });
                yield put({ type: 'fetchSubscriberListSuccess', payload: data.subscriberIdList });
                yield put({type: 'friendModel/fetchFriendListSuccess', payload: data.friendshipDtoList});
                yield put({type: 'friendModel/fetchRequestListSuccess', payload: data.friendRequestDtoList});

            }
        },
    }

}


