import React, {useState} from 'react';
import {useModel} from "umi";
import {Avatar, Button, Form, Input, Space, Switch,Typography } from "antd";

import './setting.less'
import {updateUserProfile} from "@/services/userService";
const { Title } = Typography;
const {TextArea} = Input;

function Setting() {
    const [form] = Form.useForm();
    const {
        initialState, setInitialState
    } = useModel('@@initialState');
    const {currentUser} = initialState;
    const [user, setUser] = useState(currentUser);
    const finish = async (user) => {
        const {data,code} =await updateUserProfile(user);
        if(code===1){
            setInitialState({...initialState, currentUser: {...currentUser,...user}})
        }

    }
    const handleReset = (e) => {
        form.resetFields();
    }
    return (
        <div className={"info-container"}>
            <Space direction={"vertical"} align={"center"}>
                <Avatar size={64} src={user.avatar}/>
                <Title level={3}>{currentUser.nickname}</Title>
                <Title level={5}>{currentUser.description}</Title>
            </Space>
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
                    marginTop:100
                }}
                onFinish={finish}
                form={form}
            >
                <Form.Item label="Nickname" name={'nickname'} initialValue={user.nickname}>
                    <Input showCount maxLength={15}/>
                </Form.Item>
                <Form.Item label="Description" name={'description'} initialValue={user.description}>
                    <TextArea rows={4} showCount maxLength={500}
                              style={{
                                  height: 120,
                                  resize: 'none',
                              }}/>
                </Form.Item>
                <Form.Item label="Username"  name={'email'}  rules={[
                    {
                        type: 'email',
                    },
                ]} initialValue={user.username}>
                    <Input disabled={true}/>
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
                        <Button type={'primary'} style={{marginLeft: 200}} htmlType="submit">
                            Save
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>

    );
}

export default Setting;
