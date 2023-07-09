import { request } from 'umi';

export const getCommentsById = (id,page,pageSize) =>
    request(`/api/comments/${id}?currPage=${page}&pageSize=${pageSize}`, {
        method: 'GET',
    });

export const postComment = (postId,commentContent) =>
    request(`/api/comment/${postId}`, {
        method: 'Post',
        data:{
            commentContent
        }
    });

export const loveComment = (commentId) =>
    request(`/api/comment/love/${commentId}`, {
        method: 'GET',
    });

export const getSubcommentsById = (commentId) =>
    request(`/api/comment/subcomments/${commentId}`, {
        method: 'GET',
    });
export const postSubcomment = (commentId,subcommentContent,targetNickname) =>
    request(`/api/comment/subcomment/${commentId}`, {
        method: 'POST',
        data:{
            subcommentContent,
            targetNickname,

        }
    });
