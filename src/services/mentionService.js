import {request} from "umi";

export const getAllMentions = async (current,pageSize)=>request('/api/mentions',{
    method:'GET',
    params:{
        current,
        pageSize,
    }
})

export const markMentionAsRead = async (mentionId)=>request(`/api/mention/read/${mentionId}`,{
    method:'GET',
})
export const replyMention = async (data,mentionId)=>request('/api/mention/reply',{
    method:'POST',
    data,
    params:{
        mentionId,
    }
})