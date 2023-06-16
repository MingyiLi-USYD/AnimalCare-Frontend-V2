import React from 'react';
import {connect} from "../../.umi/exports";
import {Avatar, Button} from "antd";
import { EllipsisOutlined} from '@ant-design/icons';
import {history} from "umi";

function DetailInfo(props) {
    const {contact,dispatch} = props;
    const handleSendMsg =()=>{
        dispatch({
            type:'ChatModel/onStartNewSession',
            payload: contact
        })
        history.push('/chat')
    }
    return (

            <div className={'detail-info'}>
                <div className={'detail-info-top'}>
                    <Avatar style={{borderRadius:30}} src={contact.avatar}  size={150} shape={"square"}/>
                    <div  className={'text-info'}>
                        <div >
                            <span className={'nickname'}>{contact.nickname}</span>
                            <span style={{marginLeft:5}}>男</span>
                        </div>
                        <div>
                            Username:<span style={{marginLeft:5}}>{contact.userName}</span>
                        </div>
                        <div>
                            Description:<span style={{marginLeft:5}}>{contact.description}</span>
                        </div>
                        <div>
                            Region: <span style={{marginLeft:5}}>Victory Melbourne</span>
                        </div>
                    </div>
                    <div>
                        <EllipsisOutlined onClick={()=>{}} />
                    </div>

                </div>
                <div className={'detail-info-bottom'}>
                    <Button className={'send-button'} type={"primary"} onClick={handleSendMsg}>发消息</Button>
                </div>

            </div>


    );
}

export default connect(({FriendModel:{contact}})=>{

    return {contact}})(DetailInfo);
