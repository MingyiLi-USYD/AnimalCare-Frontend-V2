import React, {useState} from 'react';
import {Avatar, Button, Dropdown, Modal, Space} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import {history, useDispatch, useSelector} from "umi";
import RequestedFriendList from "./requestedFriendList";
import {MoreInfoIcon} from "@/assets/Icons/icon";

const iconSize = {
    width: '45px',
    height: '45px',
}

function DetailInfo() {
    const {contact} = useSelector(state => state.friendModel)
    const dispatch = useDispatch()
    const handleSendMsg = () => {
        dispatch({
            type: 'ChatModel/onStartNewSession',
            payload: contact
        })
        history.push('/chat')
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete = () => {
        dispatch({
            type: 'friendModel/deleteFriend',
            payload: contact.userId
        })
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const items = [
        {
            key: '1',
            danger: true,
            label: 'Delete',
            icon: <DeleteOutlined/>,
            onClick: () => {
                setIsModalOpen(true)
            }
        },
    ];
    const nicknameStyle = {
        fontSize: '1.2em',  // 放大字体
        color: 'red',  // 设置颜色为红色
    };
    if (contact.userId === -2) {
        return (
            <div className={'detail-info'}>
                <RequestedFriendList dispatch={dispatch}/>
            </div>
        )
    }
    return (
        <div>
            {Object.keys(contact).length !== 0 &&
                <div className={'detail-info'}>
                    <div className={'detail-info-top'}>
                        <Avatar src={contact.avatar} size={150} shape={"circle"}/>
                        <div className={'text-info'}>
                            <Space>
                                <span className={'nickname'}>{contact.nickname}</span>
                                <span>Boy</span>
                            </Space>
                            <Space>
                                <span>Username:</span>
                                <span>{contact.username}</span>
                            </Space>
                            <Space>
                                <span>Nickname:</span>
                                <span>{contact.nickname}</span>
                            </Space>
                            <Space>
                                <span>Region:</span>
                                <span>Victoria Melbourne</span>
                            </Space>
                        </div>
                        <div className={'button-info'}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                trigger={['click']}
                            >
                                <MoreInfoIcon {...iconSize}  />
                            </Dropdown>
                        </div>
                    </div>
                    <div className={'detail-info-bottom'}>
                        <Button className={'send-button'} type={"primary"} onClick={handleSendMsg}>Message</Button>
                    </div>
                </div>
            }
            <Modal title="Delete Friend" open={isModalOpen} onOk={handleDelete} onCancel={handleCancel}>
                <p>
                    Are you sure to delete your friend: {' '}
                    <span style={nicknameStyle}>{contact.nickname}</span>
                </p>
                <p>It will be unrecoverable</p>
            </Modal>
        </div>


    );
}

export default DetailInfo
