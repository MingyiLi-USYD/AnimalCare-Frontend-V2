import {getLoves} from "../services/postService";
import {getFriends, getRequestList} from "../services/friendService";

export default {
    namespace:'FriendModel',
    state:{
        contact:{},
        friendRequest:0,
        friendList: [],
        requestList: [],
    },

    reducers:{
        onChangeContact(state,{payload}){
            return{
                ...state,
                contact:payload
            }
        },
        onReceiveFriendRequest(state) {
            let {friendRequest} = state
            friendRequest++
            return{
                ...state,
                friendRequest
            }
        },
        onViewFriendRequest(state){
            return{
                ...state,
                friendRequest: 0
            }
        },
        fetchFriendListSuccess(state,{payload}){
               state.friendList = payload
        },
        fetchRequestListSuccess(state,{payload}){
            state.requestList = payload
        }
    },
    effects:{
        *fetchFriendList(_, { call, put }) {
            const { data,code } = yield call(getFriends);
            if(code===1){
                yield put({ type: 'fetchFriendListSuccess', payload: data });
            }
        },
        *fetchRequestList(_, { call, put }) {
            const { data,code } = yield call(getRequestList);
            if(code===1){
                yield put({ type: 'fetchRequestListSuccess', payload: data });
            }
        },
        * initFriendData(_, { call,all,put}) {
                const [responseA, responseB] = yield all([call(getFriends), call(getRequestList)]);
                console.log(responseA)
                console.log(responseB)
                if(responseA.code===1){
                    yield put({ type: 'fetchFriendListSuccess', payload: responseA.data });
                }
                if(responseB.code===1){
                    yield put({ type: 'fetchRequestListSuccess', payload: responseB.data });
                }
        }

    }
}

