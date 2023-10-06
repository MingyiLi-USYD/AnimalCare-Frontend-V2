import {Avatar, Badge, Button, List} from 'antd';
import {useDispatch, useSelector} from "umi";
import {formatTimestamp} from "@/utils/timeUtils";
import {readMessage} from "@/services/chatService";


const RecentChatFriendList = () => {
    const dispatch = useDispatch();
    const {chatRecordArray, contact} = useSelector((state) => state.ChatModel);
    const handleClick = (item) => {
        dispatch({
            type: 'ChatModel/onChangeContact',
            payload: item.chatUser
        })
        item.unRead>0&&readMessage(item.chatUser.userId)
    }

    return (
        <div
            id="scrollableDivRecent"
        >
            <List

                dataSource={chatRecordArray}
                renderItem={(item) => (
                    <List.Item key={item.chatUser.userId}
                               id={item.chatUser.userId === contact.userId ? 'active' : ''}
                               className={'friend-item'}
                               onClick={() => handleClick(item)}>
                        <OneRecord data={item}/>
                    </List.Item>
                )}
            />
        </div>
    );
};
export default RecentChatFriendList
const OneRecord = ({data}) => {

    const dispatch = useDispatch();
    const handleDelete =(e)=>{
        e.stopPropagation(); // 阻止事件冒泡
        dispatch({
            type: 'ChatModel/onDelete',
            payload: data.chatUser.userId
        })

    }
    return (
        <div style={{display: "flex"}} >
            <Button className={'delete-button'} danger onClick={handleDelete} >Delete</Button>
            <div className={'last-avatar'}>
                <Badge count={data.unRead ? data.unRead : 0}>
                    <Avatar shape={'square'} size={60} src={data.chatUser.avatar}/>
                </Badge>
            </div>
            <div className={'last-info'}>
                <div className={'nickname'}>
                    {data.chatUser.nickname}
                </div>
                <div className={'last-msg'}>
                    {data.latestMsg}
                </div>
            </div>
            <div className={'last-time'}>
                {
                    formatTimestamp(data.latestTime)
                }
            </div>

        </div>
    )

}