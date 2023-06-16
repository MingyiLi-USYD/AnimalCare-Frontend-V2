import { request } from 'umi';

export const getCommentsById = (id,page,pageSize) =>
    request(`/api/comments/${id}?currPage=${page}&pageSize=${pageSize}`, {
        method: 'GET',
    });

export const newGetCommentsById = (url) =>
    request(url, {
        method: 'GET',
    });
