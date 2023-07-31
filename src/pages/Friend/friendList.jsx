import {Avatar, Badge, List} from 'antd';
import {useDispatch} from "umi";
import {useState} from 'react';
import {NewFriend} from "@/assets/logo/Logo";
import {useSelector} from "umi";


const FriendList = () => {
    const dispatch = useDispatch()
    const {contact, friendList, requestList, friendRequest} = useSelector(state => state.friendModel)
    const [hoveredIndex, setHoveredIndex] = useState(-1);


    const handleMouseEnter = (index) => {
        setHoveredIndex(index)
    }
    const handleMouseLeave = () => {
        setHoveredIndex(-1)
    }
    const handleClick = (contact) => {
        dispatch({
            type: 'friendModel/onChangeContact',
            payload: contact
        })
    }

    return (
        <div
            id="myScrollableDiv"
        >
            <List>
                {
                    <List.Item key={-1}
                               style={{background: -2 === contact.id ? '#adb7c7' : -2 === hoveredIndex ? '#d8dee8' : 'transparent'}}
                               onMouseEnter={() => handleMouseEnter(-2)} onMouseLeave={handleMouseLeave}
                               onClick={() => handleClick({id: -2, avatar: null, nickname: 'New Friend Request'})}>
                        <div style={{marginLeft: 20}}>

                            <Badge size={"small"} count={friendRequest}><Avatar size={60} icon={<NewFriend/>}
                                                                                shape={"square"}/></Badge>
                            <span style={{fontSize: 20, marginLeft: 10, verticalAlign: "middle"}}>{'New Friend'}</span>
                        </div>
                    </List.Item>
                }
                {
                    friendList.map(({friendInfo}, index) => (
                        <List.Item key={friendInfo.userId}
                                   style={{background: friendInfo.userId === contact.userId ? '#adb7c7' : index === hoveredIndex ? '#d8dee8' : 'transparent'}}
                                   onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}
                                   onClick={() => handleClick(friendInfo)}>
                            <div style={{marginLeft: 20}}>
                                <Avatar size={60} src={friendInfo.avatar} shape={"square"}/>
                                <span style={{
                                    fontSize: 20,
                                    marginLeft: 10,
                                    verticalAlign: "middle"
                                }}>{friendInfo.nickname}</span>
                            </div>
                        </List.Item>
                    ))
                }

            </List>

        </div>
    );
};
export default FriendList;
