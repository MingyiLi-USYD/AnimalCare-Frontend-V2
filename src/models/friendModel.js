import {approveRequest, deleteFriend, getFriends, getRequestList, rejectRequest} from "../services/friendService";

export default {
    namespace: 'FriendModel',
    state: {
        contact: {},
        friendRequest: 0,
        friendList: [],
        requestList: [],
    },

    reducers: {
        approveFriendSuccess(state, {payload}) {
            let {friendList} = state
            state.friendList = [...friendList, payload]
        },
        deleteFriendSuccess(state, {payload: userId}) {
            let {friendList} = state
            state.friendList = friendList.filter(item => item.id !== userId)
        },

        onChangeContact(state, {payload}) {
            return {
                ...state,
                contact: payload
            }
        },
        onReceiveFriendRequest(state, {payload: userInfo}) {
            state.requestList.unshift(userInfo)
            state.friendRequest++
        },
        deleteFriendRequest(state, {payload: userId}) {
            state.requestList = state.requestList.filter(item => item.id !== userId)
        },

        onViewFriendRequest(state) {
            state.friendRequest = 0
        },
        fetchFriendListSuccess(state, {payload}) {
            state.friendList = payload
        },
        fetchRequestListSuccess(state, {payload}) {
            state.requestList = payload
        }
    },
    effects: {
        * fetchFriendList(_, {call, put}) {
            const {data, code} = yield call(getFriends);
            if (code === 1) {
                yield put({type: 'fetchFriendListSuccess', payload: data});
            }
        },
        * fetchRequestList(_, {call, put}) {
            const {data, code} = yield call(getRequestList);
            if (code === 1) {
                yield put({type: 'fetchRequestListSuccess', payload: data});
            }
        },
        * initFriendData(_, {call, all, put}) {
            const [responseA, responseB] = yield all([call(getFriends), call(getRequestList)]);
            if (responseA.code === 1) {
                yield put({type: 'fetchFriendListSuccess', payload: responseA.data});
            }
            if (responseB.code === 1) {
                yield put({type: 'fetchRequestListSuccess', payload: responseB.data});
            }
        },

        * approveFriend({payload: userId}, {call, put}) {
            const {data, code} = yield call(approveRequest, userId);
            if (code === 1) {
                yield put({type: 'approveFriendSuccess', payload: data});
                yield put({type: 'deleteFriendRequest', payload: userId});
            }
        },
        * rejectFriend({payload: userId}, {call, put}) {
            const {data, code} = yield call(rejectRequest, userId);
            if (code === 1) {
                //yield put({type: 'approveFriendSuccess', payload: data});
                yield put({type: 'deleteFriendRequest', payload: userId});
            }
        },
        * deleteFriend({payload: userId}, {call, put}) {

            const {code} = yield call(deleteFriend, userId);
            if (code === 1) {
                yield put({type: 'deleteFriendSuccess', payload: userId});
            }
        },
    }
}

