import {Avatar, Badge, List} from 'antd';
import {connect} from "umi";
import {useState} from 'react';
import {formatTimestamp} from "../../utils/TimeUtils";


const RecentChatFriendList = (props) => {
    const {chatRecordArray,contact,dispatch}=props
    const [hoveredIndex,setHoveredIndex] = useState(-1);
    const handleMouseEnter =(index)=>{
        setHoveredIndex(index)
    }
    const handleMouseLeave = ()=>{
        setHoveredIndex(-1)
    }
    const handleClick= (contact)=>{
        dispatch({
            type:'ChatModel/onChangeContact',
            payload: contact
        })
    }

    return (
        <div
            id="scrollableDivRecent"
            style={{borderRight:'3px solid black',height:'100%'}}
        >
                <List

                    dataSource={chatRecordArray}
                    renderItem={(item,index) => (
                        <List.Item key={item.chatUser.id} style={{ background:item.chatUser.id===contact.id? '#adb7c7' :index === hoveredIndex ? '#d8dee8' :'transparent' }}
                                   onMouseEnter={()=>handleMouseEnter(index)} onMouseLeave={handleMouseLeave} onClick={()=>handleClick(item.chatUser)} >
                        <OneRecord data={item}/>
                        </List.Item>
                    )}
                />
        </div>
    );
};
export default connect(({ChatModel:{chatRecordArray,contact}})=>{

    return {chatRecordArray,contact}})(RecentChatFriendList);
const OneRecord = ({data})=>{
    return(
        <div style={{display:"flex"}}>
            <div className={'last-avatar'}>
                <Badge count={data.unRead?data.unRead:0}>
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