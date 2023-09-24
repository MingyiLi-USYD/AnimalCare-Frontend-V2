import { request } from 'umi';

export const getCommentsById = (id,page,pageSize) =>
    request(`/api/comments/${id}?current=${page}&pageSize=${pageSize}`, {
        method: 'GET',
    });

export const postComment = (comment) =>
    request(`/api/comment`, {
        method: 'Post',
        data: comment

    });

export const loveComment = (commentId) =>
    request(`/api/comment/love/${commentId}`, {
        method: 'GET',
    });

export const getSubcommentsById = (commentId) =>
    request(`/api/subcomments/${commentId}`, {
        method: 'GET',
    });
export const postSubcomment = (subcommentContent) =>
    request(`/api/subcomment`, {
        method: 'POST',
        data:subcommentContent,
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
