const fetchFriendRequests = (ids)=>{
    return {
        type: 'friendModel/fetchRequestsByIds',
        payload:ids
    }
}
export {fetchFriendRequests}