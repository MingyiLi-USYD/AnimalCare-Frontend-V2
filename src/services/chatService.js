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
    await request('/api/chat/retrieve/all',
        {
            method:"GET",
        }
    )

export const retrievePartlyMessages = async (data)=>
    await request('/api/chat/retrieve/partly',
        {
            method:"POST",
            data,
        }
    )

export const readMessage = async (userId)=>
    await request(`/api/chat/read/${userId}`,
        {
            method:"GET",
        }
    )
