import {Avatar, Badge, List} from 'antd';
import {connect} from "umi";
import {useState} from 'react';
import {NewFriend} from "../../assets/logo/Logo";


const FriendList = (props) => {
    const {friendLists,contact,dispatch,friendRequest}=props
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
            <List>
                {
                    <List.Item key={-1} style={{ background:-2===contact.id? '#adb7c7' :-2 === hoveredIndex ? '#d8dee8' :'transparent' }}
                               onMouseEnter={()=>handleMouseEnter(-2)} onMouseLeave={handleMouseLeave} onClick={()=>handleClick({id:-2,avatar:null,nickname:'New Friend Request'})} >
                        <div style={{marginLeft:20}}>

                            <Badge size={"small"} count={friendRequest}><Avatar size={60} icon={<NewFriend/> } shape={"square"} /></Badge>
                            <span style={{fontSize:20,marginLeft:10,verticalAlign:"middle"}}>{'New Friend'}</span>
                        </div>
                    </List.Item>
                }
                {
                    friendLists.map((item,index) => (
                        <List.Item key={item.id} style={{ background:item.id===contact.id? '#adb7c7' :index === hoveredIndex ? '#d8dee8' :'transparent' }}
                                   onMouseEnter={()=>handleMouseEnter(index)} onMouseLeave={handleMouseLeave} onClick={()=>handleClick(item)} >
                            <div style={{marginLeft:20}}>
                                <Avatar size={60} src={item.avatar} shape={"square"} />
                                <span style={{fontSize:20,marginLeft:10,verticalAlign:"middle"}}>{item.nickname}</span>
                            </div>
                        </List.Item>
                    ))
                }

            </List>

        </div>
    );
};
export default connect(({ChatModel:{chatRecord,friendLists},FriendModel:{contact,friendRequest}})=>{

    return {chatRecord,friendLists,contact,friendRequest}})(FriendList);
