import React, {useState} from 'react';
import {connect} from "../../.umi/exports";
import {Avatar, Button, Dropdown, Modal} from "antd";
import {DeleteOutlined, EllipsisOutlined} from '@ant-design/icons';
import {history} from "umi";
import RequestedFriendList from "./requestedFriendList";

function DetailInfo(props) {
    const {contact,dispatch} = props;
    const handleSendMsg =()=>{
        dispatch({
            type:'ChatModel/onStartNewSession',
            payload: contact
        })
        history.push('/chat')
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete =  () => {
        dispatch({
            type:'friendModel/deleteFriend',
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
            icon:<DeleteOutlined />,
            onClick:()=>{setIsModalOpen(true)}
        },
    ];
    const nicknameStyle = {
        fontSize: '1.2em',  // 放大字体
        color: 'red',  // 设置颜色为红色
    };
    if(contact.userId===-2){
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
                    <Avatar style={{borderRadius:30}} src={contact.avatar}  size={150} shape={"square"}/>
                    <div  className={'text-info'}>
                        <div >
                            <span className={'nickname'}>{contact.nickname}</span>
                            <span style={{marginLeft:5}}>男</span>
                        </div>
                        <div>
                            Username:<span style={{marginLeft:5}}>{contact.username}</span>
                        </div>
                        <div>
                            Description:<span style={{marginLeft:5}}>{contact.description}</span>
                        </div>
                        <div>
                            Region: <span style={{marginLeft:5}}>Victory Melbourne</span>
                        </div>
                    </div>
                    <div>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <EllipsisOutlined className={'button-info'} />
                        </Dropdown>
                    </div>

                </div>
                <div className={'detail-info-bottom'}>
                    <Button className={'send-button'} type={"primary"} onClick={handleSendMsg}>发消息</Button>
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

export default connect(({friendModel:{contact}})=>{

    return {contact}})(DetailInfo);
