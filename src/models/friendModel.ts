import {approveRequest, deleteFriend, getFriends, rejectRequest} from "@/services/friendService";
import {User} from "@/pojo/user";
import {FriendRequestDto} from "@/pojo/friendRequest";
import {FriendshipDto} from "@/pojo/friendship";
import {DvaModel, EffectsMapObject} from "umi";
import {MyAction, MyReducersMapObject} from "@/services/dva";
import {getAllFriendRequests} from "@/services/friendRequestService";


interface FriendModelState  {
    contact: User;
    friendRequest:number;
    friendList: FriendshipDto[];
    requestList: FriendRequestDto[];
}

 const friendModel:DvaModel<FriendModelState,EffectsMapObject,MyReducersMapObject<FriendModelState,MyAction<any>>> =    {
    namespace: 'friendModel',
    state: {
        contact: {} as User,
        friendRequest: 0,
        friendList: [],
        requestList: [],
    },

    reducers: {
        onDeletedByFriend (state, {payload}:MyAction<User> ) {
            let {friendList} = state
            state.friendList = friendList.filter(item=>item.friendInfo.userId !==payload.userId);
        },
        approveFriendSuccess(state, {payload}:MyAction<FriendshipDto>) {

            let {friendList} = state
            state.friendList = [...friendList, payload]
        },
        deleteFriendSuccess(state, {payload: userId}) {
            let {friendList} = state
            state.friendList = friendList.filter(item => item.friendInfo.userId !== userId)
            state.contact={} as User
         },

        onChangeContact(state, {payload}:MyAction<User>) {
            return {
                ...state,
                contact: payload
            }
        },
        onReceiveFriendRequest(state,) {
            state.friendRequest++
        },
        deleteFriendRequest(state, {payload: userId}) {
            state.requestList = state.requestList.filter(item => item.friendInfo.userId !== userId)
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
            const {data, code} = yield call(getAllFriendRequests);
            if (code === 1) {
                yield put({type: 'fetchRequestListSuccess', payload: data});
                yield put({type: 'onViewFriendRequest'});
            }
        },
        * approveFriend({payload: userId}, {call, put}) {
            const {data, code} = yield call(approveRequest, userId);
            if (code === 1) {
                yield put({type: 'approveFriendSuccess', payload: data });
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

export default friendModel