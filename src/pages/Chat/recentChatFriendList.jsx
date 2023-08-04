import {Avatar, Badge, List} from 'antd';
import {useDispatch, useSelector} from "umi";
import {formatTimestamp} from "@/utils/timeUtils";


const RecentChatFriendList = () => {
    const dispatch = useDispatch();
    const {chatRecordArray, contact} = useSelector((state) => state.ChatModel);
    const handleClick = (contact) => {
        dispatch({
            type: 'ChatModel/onChangeContact',
            payload: contact
        })
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
                               onClick={() => handleClick(item.chatUser)}>
                        <OneRecord data={item}/>
                    </List.Item>
                )}
            />
        </div>
    );
};
export default RecentChatFriendList
const OneRecord = ({data}) => {
    return (
        <div style={{display: "flex"}}>
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