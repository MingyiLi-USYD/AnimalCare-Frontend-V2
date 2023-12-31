const lovePost = 'postDetailModel/lovePost'
const cancelLovePost = 'postDetailModel/cancelLovePost'
const fetchPostWithComments = 'postDetailModel/fetchPostWithComments'
const fetchComment = 'postDetailModel/fetchComments'
const addComment='postDetailModel/addComment'
const addSubcomment='postDetailModel/addSubcomment'
const showComments = 'postDetailModel/onShowComments'

const subscribeUser = 'postDetailModel/subscribeUser'
const unsubscribeUser = 'postDetailModel/unsubscribeUser'

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
const subscribeUserAction= (userId) => {
    return{
        type: subscribeUser,
        payload: userId
    }
}
const unsubscribeUserAction= (userId) => {
    return{
        type: unsubscribeUser,
        payload: userId
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

const addCommentAction = (postId, commentContent,targetUserId) => {
    return {
        type: addComment,
        payload: { postId, commentContent,targetUserId }
    };
};
const addSubcommentAction = (commentId,subcommentContent,targetUserId, replyUserId,isReply) => {
    if (!isReply) {
        return {
            type: addSubcomment,
            payload: { commentId, targetUserId,subcommentContent }
        };
    } else {
        return {
            type: addSubcomment,
            payload: { commentId, targetUserId, subcommentContent, replyUserId,isReply}
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
    showCommentsAction,
    subscribeUserAction,
    unsubscribeUserAction,
};