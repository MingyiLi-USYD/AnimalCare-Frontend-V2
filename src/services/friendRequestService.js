import {request} from "umi";

export const getAllFriendRequests = async () =>
    await request('/api/friendRequests',
        {
            method: "GET"
        }
    )
export const getAllFriendRequestsByIds = async (ids) =>
    await request('/api/friendRequests/byIds',
        {
            method: "POST",
            data:ids,
        }
    )