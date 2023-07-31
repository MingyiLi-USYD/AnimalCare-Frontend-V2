const lovePost = 'postDetailModel/lovePost'
const cancelLovePost = 'postDetailModel/cancelLovePost'
const fetchPostWithComments = 'postDetailModel/fetchPostWithComments'
const fetchComment = 'postDetailModel/fetchComments'
const addComment='postDetailModel/addComment'
const addSubcomment='postDetailModel/addSubcomment'
const showComments = 'postDetailModel/onShowComments'

const loveAction= (postId) => {
      return{
          type: lovePost,
          payload: postId
      }
}

const cancelLoveAction= (postId) => {
    return{
        type: cancelLovePost,
        payload: postId
    }
}

const fetchPostAction = (postId) =>{
    return{
        type: fetchPostWithComments,
        payload: postId
    }
}
const fetchCommentAction = (postId,pages,pageSize)=>{
    return {
        type: fetchComment,
        payload: {postId, pages, pageSize}
    }
}

const addCommentAction = (postId, commentContent) => {
    return {
        type: addComment,
        payload: { postId, commentContent }
    };
};
const addSubcommentAction = (commentId, commentContent, replyNickname) => {
    if (!replyNickname) {
        return {
            type: addSubcomment,
            payload: { commentId, commentContent }
        };
    } else {
        return {
            type: addSubcomment,
            payload: { commentId, commentContent, replyNickname }
        };
    }
};

const showCommentsAction = ()=>{
    return {
        type: showComments,
        payload: {label: "Share your idea", type: 0}
    }
}
export {
    lovePost,
    cancelLovePost,
    fetchPostWithComments,
    fetchComment,
    addComment,
    addSubcomment,
    showComments,
    loveAction,
    cancelLoveAction,
    fetchPostAction,
    fetchCommentAction,
    addCommentAction,
    addSubcommentAction,
    showCommentsAction
};