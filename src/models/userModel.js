import {initUserInfo} from "../services/userService";

export default {
    namespace:'userModel',
    state:{
        loveList:[],
        startList:[],
        subscribeList:[],
        subscriberList:[],
        lovesReceived:0,
        commentsReceived:0,
        mentionsReceived:0,
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
        fetchUserInfoSuccess(state,{payload}){
            const {loveIdList,subscribeIdList,subscriberIdList
            ,lovesReceived,commentsReceived,mentionsReceived} =payload
            state.loveList = loveIdList
            state.subscribeList = subscribeIdList
            state.subscriberList = subscriberIdList
            state.lovesReceived = lovesReceived
            state.commentsReceived = commentsReceived
            state.mentionsReceived = mentionsReceived
        },
        resetLovesReceived(state,_){
             state.lovesReceived=0
        },
        resetCommentsReceived(state,_){
            state.commentsReceived=0
        },
        resetMentionsReceived(state,_){
            state.mentionsReceived=0
        },
        increaseLovesReceived(state,_){
            state.lovesReceived++
        },
        increaseCommentsReceived(state,_){
            state.commentsReceived++
        },
        increaseMentionsReceived(state,_){
            state.mentionsReceived++
        },
    },
    effects:{
        *initUserInfo({ payload }, { call, put }) {
            const { data,code } = yield call(initUserInfo);
            const {userId,username,role,email,avatar} = data;
            const user= {userId,username,role,email,avatar};
            if(code===1){
                yield put({ type: 'fetchUserInfoSuccess', payload: data });
                yield put({ type: 'ChatModel/onFetchProfile', payload: user });
                yield put({type: 'friendModel/fetchFriendListSuccess', payload: data.friendshipDtoList});
                yield put({type: 'friendModel/fetchRequestListSuccess', payload: data.friendRequestDtoList});
            }
        },
    }

}


