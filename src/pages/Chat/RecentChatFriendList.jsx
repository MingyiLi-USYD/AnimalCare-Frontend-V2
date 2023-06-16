import {Avatar, List} from 'antd';
import {connect} from "umi";
import {useState} from 'react';


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
            id="scrollableDiv"
            style={{
                height: '100%',
                overflow: 'auto',
                padding: '0 0px',
                border: '4px solid rgba(140, 140, 140, 0.35)',
            }}
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
        <div>
            <Avatar src={data.chatUser.avatar}/>
            <span>{data.latestMsg}</span>
        </div>
    )

}