import {cancelLove, getPostById, love} from "@/services/postService";
import {getCommentsById, getSubcommentsById, postComment, postSubcomment} from "@/services/commentService";
import {PostDto} from "@/pojo/post";
import {CommentDto} from "@/pojo/comment";
import {DvaModel, EffectsMapObject} from "umi";
import {MyAction, MyReducersMapObject, Page} from "@/services/dva";

interface postDetailModelState {
    pages: number;
    total: number;
    comments: CommentDto[];
    post: PostDto;
    text: string;
    label: string;
    active: boolean;
    type: number;
    commentId: number;
    replyNickname: string;
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
        commentId:0,
        replyNickname:"",
    },

    reducers:{
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
            state.commentId = 0;
            state.replyNickname = "";
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
export default postDetailModel