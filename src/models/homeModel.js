import {cancelLove, getPosts, love} from "../services/postService";

export default {
    namespace:'homeModel',
    state:{
        postList:[],
        current:0,
        total:0,
        selector:0,
        pages:0,
        keywords:'',
    },

    reducers:{
        fetchPostsSuccess(state, { payload }) {
            const {records,current,total,pages} = payload
            state.postList= records
            state.current=1
            state.total=total
            state.pages=pages
        },
        loadMorePostsSuccess(state, { payload }) {
            const {records,current,total,pages} = payload
            state.postList= [...state.postList,...records]
            state.current=current
            state.total=total
            state.pages=pages
        },
        changeSelectorSuccess(state, { payload }) {
               state.selector=payload
        },
        increaseLove(state, { payload:postId }) {
            state.postList.find(item=>item.postId===postId).love++
        },
        decreaseLove(state, { payload:postId }) {
            state.postList.find(item=>item.postId===postId).love--
        },
        changeKeywords(state, { payload:keywords }) {
            state.keywords=keywords
        },
        changeSelector(state, { payload:selector }) {
            state.selector=selector
        },
    },
    effects: {
        *fetchPosts({ payload }, { call, put }) {
            const {  selector,keywords } = payload
            const { data,code } = yield call(getPosts,1,20,selector,keywords);
            if(code===1){
                yield put({ type: 'fetchPostsSuccess', payload: data });
            }
        },
        *loadMorePosts({payload}, { call, put }) {
            const { current, selector,keywords} = payload
            const { data,code } = yield call(getPosts,current+1,20,selector,keywords);
            if(code===1){
                yield put({ type: 'loadMorePostsSuccess', payload: data });
            }
        },
        *lovePost({ payload:postId }, { call, put }) {
            const { data,code } = yield call(love,postId);
            if(code===1){
                yield put({ type: 'userModel/addToLoveList', payload: postId });
                yield put({ type: 'increaseLove', payload: postId});
                yield put({ type: 'postDetailModel/syncIncreaseInDetail', payload: postId});
            }
        },
        *cancelLovePost({ payload:postId }, { call, put }) {
            const { data,code } = yield call(cancelLove,postId);
            if(code===1){
                yield put({ type: 'userModel/removeFromLoveList', payload: postId });
                yield put({ type: 'decreaseLove', payload: postId});
                yield put({ type: 'postDetailModel/syncDecreaseInDetail', payload: postId});
            }
        },
    },

    }