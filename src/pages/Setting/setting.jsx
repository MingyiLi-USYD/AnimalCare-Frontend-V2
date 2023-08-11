import React, {useState} from 'react';
import {useModel} from "umi";
import {Avatar, Button, Form, Input, Switch} from "antd";
import './setting.less'
import {updateUserProfile} from "@/services/userService";


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
                <Form.Item label="Email"  name={'email'}  rules={[
                    {
                        type: 'email',
                    },
                ]} initialValue={user.email}>
                    <Input/>
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
