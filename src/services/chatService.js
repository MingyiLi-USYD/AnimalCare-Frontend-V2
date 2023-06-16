import {request} from "../.umi/exports";

export const sendMessageToServer = async (data)=>
    await request('/api/chat/message',
        {
            method:"POST",
            data
        }
)
