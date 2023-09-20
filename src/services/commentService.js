import { request } from 'umi';

export const getCommentsById = (id,page,pageSize) =>
    request(`/api/comments/${id}?current=${page}&pageSize=${pageSize}`, {
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

export const postSubcommentAndRead = (data) =>
    request('/api/comment/reply', {
        method: 'POST',
        data
    });

export const getAllCommentsToMyPost = (current,pageSize) =>
    request('/api/comments', {
        method: 'GET',
        params:{
            current,
            pageSize
        }
    });

export const markCommentAsRead = (commentId) =>
    request(`/api/comment/read/${commentId}`, {
        method: 'GET',
    });
