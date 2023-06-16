import {Avatar, List} from 'antd';
import {connect} from "umi";
import {useState} from 'react';


const FriendList = (props) => {
    const {friendLists,contact,dispatch}=props
    const [hoveredIndex,setHoveredIndex] = useState(-1);
    const handleMouseEnter =(index)=>{
        setHoveredIndex(index)
    }
    const handleMouseLeave = ()=>{
        setHoveredIndex(-1)
    }
    const handleClick= (contact)=>{
        dispatch({
            type:'FriendModel/onChangeContact',
            payload: contact
        })
    }

    return (
        <div
            id="myScrollableDiv"
        >
            <List

                dataSource={[...friendLists,...friendLists,...friendLists,...friendLists]}
                renderItem={(item,index) => (
                    <List.Item key={item.id} style={{ background:item.id===contact.id? '#adb7c7' :index === hoveredIndex ? '#d8dee8' :'transparent' }}
                               onMouseEnter={()=>handleMouseEnter(index)} onMouseLeave={handleMouseLeave} onClick={()=>handleClick(item)} >
                        <div>
                            <Avatar size={60} src={item.avatar} />
                            <span style={{fontSize:20,marginLeft:10,verticalAlign:"middle"}}>{item.nickname}</span>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};
export default connect(({ChatModel:{chatRecord,friendLists},FriendModel:{contact}})=>{

    return {chatRecord,friendLists,contact}})(FriendList);
