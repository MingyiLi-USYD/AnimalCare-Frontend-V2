import {getPostById} from "../services/postService";
import {getCommentsById, postComment} from "../services/commentService";

export default {
    namespace:'postDetailModel',
    state:{
        postId:0,
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
        onShowComments(state, { payload }) {
            const {label,type}=payload
            state.label=label
            state.type=type
        },
        onClickComment(state, { payload }) {
            const {label,type}=payload
            state.label=label
            state.type=type
        },
        onClickSubcomment(state, { payload }) {
            const {label,type}=payload
            state.label=label
            state.type=type
        },
        addCommentSuccess(state, { payload }) {
            console.log(payload)
           state.comments=[payload,...state.comments]
        },
    },
    effects:{

        *fetchPost({ payload }, { call, put }) {
            const { data,code } = yield call(getPostById, payload);
            yield put({ type: 'fetchPostSuccess', payload: data });
        },
        *fetchComments({ payload }, { call, put }) {
            const { postId, page, pageSize } = payload;
            const { data } = yield call(getCommentsById, postId, page+1, pageSize);
            yield put({ type: 'fetchCommentsSuccess', payload: data });
        },
        *addComment({ payload }, { call, put }) {
            const {postId,commentContent} = payload;
            const { data,code } = yield call(postComment, postId,commentContent);

            if(code===1){
                yield put({ type: 'addCommentSuccess', payload: data });
            }

        },
    },
    subscriptions: {
        setup(props) {
            console.log(props)
            const { dispatch,history } =props
            history.listen(location => {
               console.log(location)
            });
        },
    },


}