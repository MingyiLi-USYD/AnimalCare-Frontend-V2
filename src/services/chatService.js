import {request} from "umi";

export const sendMessageToServer = async (data)=>
    await request('/api/chat/message',
        {
            method:"POST",
            data
        }
)
