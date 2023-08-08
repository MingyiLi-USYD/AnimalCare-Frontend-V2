import React, {useState} from 'react';
import {useModel} from "umi";
import {Avatar, Button, Form, Input, Switch} from "antd";
import './setting.less'
import {updateUserProfile} from "@/services/userService";
import {retrievePartlyMessages} from "@/services/chatService";
import {useSelector} from "@@/exports";

const {TextArea} = Input;

function Setting() {
    const {chatRecord} = useSelector(state => state.ChatModel)
    const retrieveData=()=>{
        const map = new Map();
        Object.keys(chatRecord).forEach(
            key=> chatRecord[key].latestTime&&map.set(key,chatRecord[key].latestTime)
        )
        const keys = Object.fromEntries(map)

        retrievePartlyMessages(keys);
    }
    const {
        initialState, setInitialState
    } = useModel('@@initialState');
    const {currentUser} = initialState;
    const [user, setUser] = useState(currentUser);
    const handleNameChange = (e) => {
        //console.log(value)

        setUser({...user, nickname: e.target.value})
    }
    const handleDescriptionChange = (e) => {
        setUser({...user, description: e.target.value})

    }
    const handleSave = () => {
        updateUserProfile(user)
        setInitialState({...initialState, currentUser: user})
    }
    const handleReset = (e) => {
        setUser(currentUser)
    }
    return (

        <div className={"info-container"}>
            <Button type={"primary"} onClick={retrieveData}>点我</Button>
            <Avatar size={64} src={user.avatar}/>
            <h2>{currentUser.nickname}</h2>
            <p>{currentUser.description}</p>
            <Form
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 800,
                }}
            >
                <Form.Item label="Nickname">
                    <Input value={user.nickname} onChange={handleNameChange}/>
                </Form.Item>
                <Form.Item label="Description">
                    <TextArea rows={4} value={user.description} onChange={handleDescriptionChange}/>
                </Form.Item>
                <Form.Item label="Mute Message:">
                    <Switch defaultChecked={true}/>
                </Form.Item>
                <Form.Item>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Button danger onClick={handleReset}>
                            Reset
                        </Button>
                        <Button type={'primary'} style={{marginLeft: 200}} onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </Form.Item>

            </Form>
        </div>

    );
}

export default Setting;
