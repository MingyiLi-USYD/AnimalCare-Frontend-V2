import {Avatar, Button, List, Popconfirm, Spin} from 'antd';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "umi";
import {fetchFriendRequests} from "@/actions/friendActions";

const RequestedFriendList = () => {
    const dispatch = useDispatch()
    const {requestList,requestUnSyncUserIds} = useSelector(state => state.friendModel)
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        //同步拿到所有的请求
        if(requestUnSyncUserIds.length>0){

            dispatch(fetchFriendRequests(requestUnSyncUserIds))
        }

    },[requestUnSyncUserIds])
    if(loading){
        return <Spin>loading</Spin>
    }

    const handleReject = (userId)=> {
        dispatch({
            type:'friendModel/rejectFriend',
            payload: userId
        })
    }
    const handleApprove =   (userId)=> {
        dispatch({
            type:'friendModel/approveFriend',
            payload: userId
        })
    }
    console.log(requestList)
    return (

            <List
                pagination={{
                    position:'bottom',
                    align:'center',
                }}
                dataSource={requestList}
                renderItem={({friendInfo,msg}) => (
                    <List.Item>
                        <div className={'one-friend-request'}>
                            <div className={'last-avatar'}>
                                    <Avatar shape={'square'} size={64} src={friendInfo.avatar}/>
                            </div>
                            <div className={'last-info'}>
                                <div className={'nickname'}>
                                    {friendInfo.nickname}
                                </div>
                                <div className={'last-msg'}>
                                    {msg}
                                </div>
                            </div>
                            <div className={'operation'}>
                                <Popconfirm
                                    title="Reject the request"
                                    description="Are you sure to reject this request?"
                                    onConfirm={()=>handleReject(friendInfo.userId)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                <Button className={'reject'} danger >Reject</Button>
                                </Popconfirm>
                                <Popconfirm
                                    title="Approve the request"
                                    description="Are you sure to approve this request?"
                                    onConfirm={()=>handleApprove(friendInfo.userId)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                <Button className={'approve'} type={"primary"} >Approve</Button>
                                </Popconfirm>
                            </div>
                        </div>
                    </List.Item>
                )}
            />

    );
};
export default RequestedFriendList;