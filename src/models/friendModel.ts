import {approveRequest, deleteFriend, getFriends, getFriendsByIds, rejectRequest} from "@/services/friendService";
import {User} from "@/pojo/user";
import {FriendRequestDto} from "@/pojo/friendRequest";
import {FriendshipDto} from "@/pojo/friendship";
import {DvaModel, EffectsMapObject} from "umi";
import {MyAction, MyReducersMapObject} from "@/services/dva";
import {getAllFriendRequests, getAllFriendRequestsByIds} from "@/services/friendRequestService";


interface FriendModelState  {
    contact: User;
    friendRequest:number;
    friendList: FriendshipDto[];
    requestList: FriendRequestDto[];
    requestUnSyncUserIds: string[];
    friendUnSyncUserIds: string[];
}

 const friendModel:DvaModel<FriendModelState,EffectsMapObject,MyReducersMapObject<FriendModelState,MyAction<any>>> =    {
    namespace: 'friendModel',
    state: {
        contact: {} as User,
        friendRequest: 0,
        friendList: [],
        requestList: [],
        requestUnSyncUserIds:[],
        friendUnSyncUserIds: [],
    },

    reducers: {
        onDeletedByFriend (state, {payload:userId}) {
            let {friendList} = state
            state.friendList = friendList.filter(item=>item.friendInfo.userId !==userId);
        },
        onApprovedByFriend(state, {payload:userId}) {
            state.friendUnSyncUserIds.push(userId)
        },
        onReceiveFriendRequest(state,{payload: userId}) {
            state.friendRequest++
            state.requestUnSyncUserIds.push(userId)
        },
        approveFriendSuccess(state, {payload}) {
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

        deleteFriendRequest(state, {payload: userId}) {
            state.requestList = state.requestList.filter(item => item.friendInfo.userId !== userId)
        },

        onViewFriendRequest(state) {
            state.friendRequest = 0
        },
        fetchFriendListSuccess(state, {payload}) {
            state.friendList = payload
        },
        fetchFriendListByIdsSuccess(state, {payload}) {
            state.friendList= [...state.friendList,...payload]
            state.friendUnSyncUserIds=[]
        },
        fetchRequestListSuccess(state, {payload}) {
            state.requestList = payload
        },
        fetchRequestListByIdsSuccess(state, {payload}) {
            state.requestList = [...state.requestList,...payload]
            state.requestUnSyncUserIds=[]
        }
    },
    effects: {
        * fetchFriendsByIds({payload:friendUnSyncUserIds}, {call, put}) {
            const {data, code} = yield call(getFriendsByIds,friendUnSyncUserIds);
            if (code === 1) {
                yield put({type: 'fetchFriendListByIdsSuccess', payload: data});
            }
        },
        * fetchRequestsByIds({payload:requestUnSyncUserIds}, {call, put}) {
            const {data, code} = yield call(getAllFriendRequestsByIds,requestUnSyncUserIds);
            if (code === 1) {
                yield put({type: 'fetchRequestListByIdsSuccess', payload: data});
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