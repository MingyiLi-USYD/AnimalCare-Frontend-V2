import {Avatar, Button, List, Popconfirm, Spin} from 'antd';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "umi";

const RequestedFriendList = () => {
    const dispatch = useDispatch()
    const {requestList} = useSelector(state => state.FriendModel)
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        dispatch({
            type:"FriendModel/onViewFriendRequest",
        })
    },[])
    if(loading){
        return <Spin>loading</Spin>
    }

    const handleReject = (id)=> {

    }
    const handleApprove =  async (user)=> {
        dispatch({
            type:'FriendModel/approveFriend',
            payload: user.id
        })
    }

    return (

            <List
                pagination={{
                    position:'bottom',
                    align:'center',
                }}
                dataSource={requestList}
                renderItem={(item) => (
                    <List.Item>
                        <div className={'one-friend-request'}>
                            <div className={'last-avatar'}>
                                    <Avatar shape={'square'} size={64} src={item.avatar}/>
                            </div>
                            <div className={'last-info'}>
                                <div className={'nickname'}>
                                    {item.nickname}
                                </div>
                                <div className={'last-msg'}>
                                    {item.msg}
                                </div>
                            </div>
                            <div className={'operation'}>
                                <Popconfirm
                                    title="Reject the request"
                                    description="Are you sure to reject this request?"
                                    onConfirm={()=>{handleReject(item.id)}}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                <Button className={'reject'} danger >Reject</Button>
                                </Popconfirm>
                                <Popconfirm
                                    title="Approve the request"
                                    description="Are you sure to approve this request?"
                                    onConfirm={()=>{handleApprove(item)}}
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