import {request} from "umi";

export const getLovePostsToMe = async (current,pageSize)=>request('/api/lovePosts',{
    method:'GET',
    params:{
        current,
        pageSize,
    }
})

export const markLovePostAsRead = async (lovePostId)=>request(`/api/lovePost/read/${lovePostId}`,{
    method:'GET',
})