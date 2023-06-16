import {Avatar, Card, Divider, List, Skeleton} from 'antd';
import {connect} from "umi";
import { useEffect, useState } from 'react';
/*import InfiniteScroll from 'react-infinite-scroll-component';*/


const FriendList = (props) => {
    const {chatRecord,friendLists,contact,dispatch}=props
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
                padding: '0 16px',
                border: '4px solid rgba(140, 140, 140, 0.35)',
            }}
        >
                <List

                    dataSource={friendLists}
                    renderItem={(item,index) => (
                        <List.Item key={item.id} style={{ background:item.id===contact.id? '#adb7c7' :index === hoveredIndex ? '#d8dee8' :'transparent' }}
                                   onMouseEnter={()=>handleMouseEnter(index)} onMouseLeave={handleMouseLeave} onClick={()=>handleClick(item)} >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a>{item.nickname}</a>}
                                description={item.description}
                            />
                            <div>Content</div>
                        </List.Item>
                    )}
                />
        </div>
    );
};
export default connect(({ChatModel:{chatRecord,friendLists,contact}})=>{

    return {chatRecord,friendLists,contact}})(FriendList);
