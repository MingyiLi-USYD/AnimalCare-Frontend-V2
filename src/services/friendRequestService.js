import {request} from "umi";

export const getAllFriendRequests = async () =>
    await request('/api/friendRequests',
        {
            method: "GET"
        }
    )