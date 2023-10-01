import {cancelLove, getPostById, love} from "@/services/postService";
import {
    cancelLoveComment, cancelLoveSubcomment,
    getCommentsById,
    getSubcommentsById,
    loveComment, loveSubcomment,
    postComment,
    postSubcomment
} from "@/services/commentService";
import {PostDto} from "@/pojo/post";
import {CommentDto} from "@/pojo/comment";
import {DvaModel, EffectsMapObject} from "umi";
import {MyAction, MyReducersMapObject, Page} from "@/services/dva";
import {subscribeUser, unsubscribeUser} from "@/services/userService";

export interface postDetailModelState {
    pages: number;
    total: number;
    comments: CommentDto[];
    post: PostDto;
    text: string;
    label: string;
    active: boolean;
    type: number;
    commentId: string;
    isReply: boolean;
    replyUserId: string;
    loading: boolean;
}



const postDetailModel:DvaModel<postDetailModelState,EffectsMapObject,MyReducersMapObject<postDetailModelState, MyAction<any>>> ={
    namespace:'postDetailModel',
    state:{
        pages:0,
        total:0,
        comments:[],
        post:{} as PostDto,
        text:"",
        label:"Share your idea",
        active:false,
        type:0,
        commentId:'',
        replyUserId:'',
        isReply:false,
        loading:false
    },

    reducers:{
        loading(state, {payload}) {
            state.loading = true
        },
        stopLoading(state, {payload}) {
            state.loading = false
        },
        fetchPostSuccess(state, {payload}) {
            const {post,commentPage}:{commentPage:Page<CommentDto>,post:PostDto} = payload
            state.post=post;
            state.comments=commentPage.records;
            state.pages = commentPage.pages;
            state.total = commentPage.total;
            state.text = "";
            state.label = "Share your idea";
            state.active = false;
            state.type = 0;
            state.commentId = '';
            state.replyUserId = '';
            state.isReply = false;
        },

        fetchCommentsSuccess(state, { payload }) {
            state.comments= [...state.comments,...payload.records]
            state.pages=payload.pages
            state.total=payload.total

        },
        fetchSubcommentsSuccess(state, { payload }) {
            const {data,commentId} = payload
            const find = state.comments.find(comment=>comment.commentId===commentId);
            if(find){
                find.subcommentDtos=data
            }

        },

        onShowComments(state, { payload }) {
            const {label,type}=payload
            state.label=label
            state.type=type
            state.isReply = false
            state.replyUserId = '';

        },
        onClickComment(state, { payload }) {
            const {label,type,commentId}=payload
            state.label=label
            state.type=type
            state.commentId=commentId
            state.isReply = false
            state.replyUserId = '';

        },
        onClickSubcomment(state, { payload }) {
            const {label,type,replyUserId,commentId}=payload
            state.label=label
            state.type=type
            state.commentId=commentId
            state.isReply = true
            state.replyUserId = replyUserId
        },
        addCommentSuccess(state, { payload }) {
           state.comments.unshift(payload)
        },
        addSubcommentSuccess(state, { payload }) {
            const find = state.comments.find(comment=>comment.commentId===payload.commentId);
            if(find){
                find.subcommentDtos.unshift(payload)
            }
        },
        increaseLove(state) {
            state.post.love++;
        },
        decreaseLove(state) {
            state.post.love--;
        },
        increaseCommentLove(state,{payload:commentId}) {
            state.comments.forEach(comment=>comment.commentId===commentId&&comment.commentLove++)
        },
        decreaseCommentLove(state,{payload:commentId}) {
            state.comments.forEach(comment=>comment.commentId===commentId&&comment.commentLove--)
        },
        increaseSubcommentLove(state,{payload}) {
            const { subcommentId, commentId } = payload;

            for (const comment of state.comments) {
                if (commentId === comment.commentId) {
                    const subcomments = comment.subcommentDtos;
                    for (const subcomment of subcomments) {
                        if (subcomment.subcommentId === subcommentId) {
                            subcomment.subcommentLove++;
                            break;
                        }
                    }
                    break;
                }
            }
        },
        decreaseSubcommentLove(state,{payload}) {
            const {subcommentId,commentId} = payload
            for (const comment of state.comments) {
                if (commentId === comment.commentId) {
                    const subcomments = comment.subcommentDtos;
                    for (const subcomment of subcomments) {
                        if (subcomment.subcommentId === subcommentId) {
                            subcomment.subcommentLove--;
                            break;
                        }
                    }
                    break;
                }
            }

        },

        syncIncreaseInDetail(state,{ payload }){
            if(state.post.postId&&state.post.postId===payload){
                state.post.love++
            }
       },
        syncDecreaseInDetail(state,{ payload }){
            if(state.post.postId&&state.post.postId===payload){
                state.post.love--
            }
        },
    },
    effects:{

        *fetchPostWithComments({ payload }, { call, put }) {
            const { data,code } = yield call(getPostById, payload);
            const { data:data2  } = yield call(getCommentsById, payload, 1, 10);
            yield put({ type: 'fetchPostSuccess', payload: {post:data,commentPage:data2} });
            yield put({ type: 'stopLoading'});

        },
        *fetchComments({ payload }, { call, put }) {
            const { postId, pages, pageSize } = payload;
            const { data } = yield call(getCommentsById, postId, pages, pageSize);
            yield put({ type: 'fetchCommentsSuccess', payload: data });
        },
        *fetchSubcomments({ payload }, { call, put }) {
            const { data } = yield call(getSubcommentsById, payload);

            yield put({ type: 'fetchSubcommentsSuccess', payload: {data,commentId:payload} });
        },
        *addComment({ payload:comment }, { call, put }) {

            const { data,code } = yield call(postComment,comment);
            if(code===1){
                yield put({ type: 'addCommentSuccess', payload: data });
            }
        },
        *addSubcomment({ payload:subcomment }, { call, put }) {
            const { data,code } = yield call(postSubcomment,subcomment);
            if(code===1){
                yield put({ type: 'addSubcommentSuccess', payload: data });
            }
        },
        *lovePost({ payload:postId }, { call, put }) {
            const {code} = yield call(love,postId);
            if(code===1){
                yield put({ type: 'increaseLove'});
                yield put({ type: 'userModel/addToLoveList', payload: postId });
                yield put({ type: 'homeModel/increaseLove', payload: postId });

            }
        },
        *cancelLovePost({ payload:postId }, { call, put }) {
            const {code} = yield call(cancelLove,postId);
            if(code===1){
                yield put({ type: 'decreaseLove'});
                yield put({ type: 'userModel/removeFromLoveList', payload: postId });
                yield put({ type: 'homeModel/decreaseLove', payload: postId });
            }
        },
        *subscribeUser({ payload:userId }, { call, put }) {
            const {code} = yield call(subscribeUser,userId);
            if(code===1){
                yield put({ type: 'userModel/addToSubscriptionList', payload: userId });
            }
        },
        *unsubscribeUser({ payload:userId }, { call, put }) {
            const {code} = yield call(unsubscribeUser,userId);
            if(code===1){
                yield put({ type: 'userModel/removeFromSubscriptionList', payload: userId });
            }
        },
        *onLoveComment({ payload:commentId }, { call, put }) {
            const {code} = yield call(loveComment,commentId);
            if(code===1){
                yield put({ type: 'increaseCommentLove', payload: commentId });
                yield put({ type: 'userModel/addToLoveCommentList', payload: commentId });
            }
        },
        *onCancelLoveComment({ payload:commentId }, { call, put }) {
            const {code} = yield call(cancelLoveComment,commentId);
            if(code===1){
                yield put({ type: 'decreaseCommentLove', payload: commentId });
                yield put({ type: 'userModel/removeFromLoveCommentList', payload: commentId });
            }
        },

        *onLoveSubcomment({ payload }, { call, put }) {
            const {commentId,subcommentId} = payload
            const {code} = yield call(loveSubcomment,subcommentId);
            if(code===1){
                yield put({ type: 'increaseSubcommentLove', payload: {commentId,subcommentId} });
                yield put({ type: 'userModel/addToLoveSubcommentList', payload: subcommentId });
            }
        },

        *onCancelLoveSubcomment({ payload }, { call, put }) {
            const {commentId,subcommentId} = payload
            const {code} = yield call(cancelLoveSubcomment,subcommentId);
            if(code===1){
                yield put({ type: 'decreaseSubcommentLove', payload: {commentId,subcommentId} });
                yield put({ type: 'userModel/removeFromLoveSubcommentList', payload: subcommentId });
            }
        },
    },


}
export default postDetailModel