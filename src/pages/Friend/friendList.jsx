import {Avatar, Badge, List} from 'antd';
import {useDispatch, useSelector} from "umi";
import {useState} from 'react';
import {NewFriend} from "@/assets/Icons/icon";


const FriendList = () => {
    const dispatch = useDispatch()
    const {contact, friendList, requestList, friendRequest} = useSelector(state => state.friendModel)

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
                               className={`friend-item`}
                               id={-2 === contact.userId ? 'active' : ''}
                               onClick={() => handleClick({userId: -2})}>
                        <div style={{marginLeft: 20}}>

                            <Badge size={"small"} count={friendRequest}><Avatar size={60} icon={<NewFriend/>}
                                                                                shape={"square"}/></Badge>
                            <span className={'friend-info'}>{'New Friend'}</span>
                        </div>
                    </List.Item>
                }
                {
                    friendList.map(({friendInfo}, index) => (
                        <List.Item key={friendInfo.userId}
                                   className={`friend-item`}
                                   id={friendInfo.userId === contact.userId ? 'active' : ''}
                                   onClick={() => handleClick(friendInfo)}>
                            <div style={{marginLeft: 20}}>
                                <Avatar size={60} src={friendInfo.avatar} shape={"square"}/>
                                <span className={'friend-info'}>{friendInfo.nickname}</span>
                            </div>
                        </List.Item>
                    ))
                }

            </List>
        </div>
    );
};
export default FriendList;
