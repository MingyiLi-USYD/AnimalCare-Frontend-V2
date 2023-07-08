import {getPostById} from "../services/postService";
import {getCommentsById} from "../services/commentService";

export default {
    namespace:'postDetailModel',
    state:{
        page:0,
        total:0,
        comments:[],
        post:{},
        text:"",
        label:"Share your idea",
        active:false,
        type:0,
        commentId:0,
        replyNickname:"",
    },

    reducers:{
        fetchPostSuccess(state, { payload }) {
            state.post=payload;
            return state
        },

        fetchCommentsSuccess(state, { payload }) {
            state.comments= [...state.comments,...payload.records]
            state.page=payload.pages
            state.total=payload.total
             return state
        },
        updateComment(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
    },
    effects:{

        *fetchPost({ payload }, { call, put }) {
            const { data } = yield call(getPostById, payload);
            yield put({ type: 'fetchPostSuccess', payload: data });
        },
        *fetchComments({ payload }, { call, put }) {
            const { postId, page, pageSize } = payload;
            const { data } = yield call(getCommentsById, postId, page+1, pageSize);
            yield put({ type: 'fetchCommentsSuccess', payload: data });
        },
    }


}