import {request} from "umi";

export const getFriendshipStatus = async (id)=>await request(`/api/friends/status/${id}`,
    {
        method:"GET"
    }
)
export const sendFriendRequest = async (id,msg)=>await request(`/api/friendRequest/${id}`,
    {
        method:"POST",
        params:{
            msg
        }
    }
)

export const getFriends = async ()=>await request('/api/friends', {
        method: 'GET',
    });


export const deleteFriend = async (id)=>await request(`/api/friends/${id}`,
    {
        method:"DELETE"
    }
)

export const getRequestList = async ()=>await request('/api/friendRequests',
    {
        method:"GET"
    }
)

export const approveRequest = async (id)=>await request(`/api/friendRequest/${id}`,
    {
        method:"GET"
    }
)

export const rejectRequest = async (id)=>await request(`/api/friendRequest/${id}`,
    {
        method:"DELETE"
    }
)