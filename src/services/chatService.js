import {request} from "umi";

export const sendMessageToServer = async (data)=>
    await request('/api/chat/message',
        {
            method:"POST",
            data
        }
)
export const retrieveMessageById = async (id)=>
    await request(`/api/chat/retrieve/${id}`,
        {
            method:"GET",
        })
export const retrieveAllMessages = async ()=>
    await request('/api/chat/retrieve',
        {
            method:"GET",
        }
    )