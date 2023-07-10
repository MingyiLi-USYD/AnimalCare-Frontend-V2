import {cancelLove, getPostById, love} from "../services/postService";
import {getCommentsById, getSubcommentsById, postComment, postSubcomment} from "../services/commentService";
import {matchPath} from "umi";


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
            const {post,data} = payload
            state.post=post;
            state.comments=data.records;
            state.page = data.page;
            state.total = data.total;
            state.text = "";
            state.label = "Share your idea";
            state.active = false;
            state.type = 0;
            state.commentId = 0;
            state.replyNickname = "";
        },

        fetchCommentsSuccess(state, { payload }) {
            state.comments= [...state.comments,...payload.records]
            state.page=payload.pages
            state.total=payload.total

        },
        fetchSubcommentsSuccess(state, { payload }) {
            const {data,commentId} = payload
            state.comments.find(item=>item.id===commentId).subcommentDtos= data

        },

        onShowComments(state, { payload }) {
            const {label,type}=payload
            state.label=label
            state.type=type
        },
        onClickComment(state, { payload }) {
            const {label,type,commentId}=payload
            state.label=label
            state.type=type
            state.commentId=commentId
        },
        onClickSubcomment(state, { payload }) {
            const {label,type,replyNickname,commentId}=payload
            state.label=label
            state.type=type
            state.replyNickname=replyNickname
            state.commentId=commentId
        },
        addCommentSuccess(state, { payload }) {
           state.comments.unshift(payload)
        },
        addSubcommentSuccess(state, { payload }) {
            state.comments.find(item=>item.id===payload.commentId).subcommentDtos.unshift(payload)
        },
        increaseLove(state) {
            state.post.love++;
        },
        decreaseLove(state) {
            state.post.love--;
        },

    },
    effects:{

        *fetchPostWithComments({ payload }, { call, put }) {
            const { data,code } = yield call(getPostById, payload);
            const { data:data2  } = yield call(getCommentsById, payload, 1, 10);
            yield put({ type: 'fetchPostSuccess', payload: {post:data,data:data2} });

        },
        *fetchComments({ payload }, { call, put }) {
            const { postId, page, pageSize } = payload;
            const { data } = yield call(getCommentsById, postId, page+1, pageSize);
            yield put({ type: 'fetchCommentsSuccess', payload: data });
        },
        *fetchSubcomments({ payload }, { call, put }) {
            const { data } = yield call(getSubcommentsById, payload);
            yield put({ type: 'fetchSubcommentsSuccess', payload: {data,commentId:payload} });
        },
        *addComment({ payload }, { call, put }) {
            const {postId,commentContent} = payload;
            const { data,code } = yield call(postComment, postId,commentContent);
            if(code===1){
                yield put({ type: 'addCommentSuccess', payload: data });
            }
        },
        *addSubcomment({ payload }, { call, put }) {
            const {replyNickname,commentId,commentContent} = payload;
            const { data,code } = yield call(postSubcomment, commentId,commentContent,replyNickname?replyNickname:null);
            if(code===1){
                yield put({ type: 'addSubcommentSuccess', payload: data });
            }
        },
        *lovePost({ payload:postId }, { call, put }) {
            const {code} = yield call(love,postId);
            if(code===1){
                yield put({ type: 'increaseLove'});
                yield put({ type: 'userModel/addToLoveList', payload: postId });
            }
        },
        *cancelLovePost({ payload:postId }, { call, put }) {
            const {code} = yield call(cancelLove,postId);
            if(code===1){
                yield put({ type: 'decreaseLove'});
                yield put({ type: 'userModel/removeFromLoveList', payload: postId });
            }
        },
    },


}