import {request} from "umi";

export const getFriendshipStatus = async (id)=>await request(`/api/friends/status/${id}`,
    {
        method:"GET"
    }
)