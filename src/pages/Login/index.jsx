import {Button, Card, Form, Input, Space} from 'antd';
import {history, useModel} from "umi";
import {userLogin} from "@/services/userService";
import {flushSync} from "react-dom";
import FirebaseUI from "./firebaseUI";
import './index.less'

import {LockOutlined, UserOutlined} from "@ant-design/icons";
import MyLogin from "@/pages/Login/login";
import LoginCard from "@/pages/Login/login";


const Login = () => {

    const {setInitialState, initialState} = useModel('@@initialState');

    const onFinish = async (values) => {
        const res = await userLogin(values);
        if (res.code === 1) {
            localStorage.setItem('serverToken', res.data.serverToken);
            await fetchUserInfo();
            history.push('/home');
        } else {
            console.log('登录失败');
        }
    };
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            flushSync(() => {
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
        }
    };
    return (

        <div className={'login-page'}>
            <Card className={'login-table'}>
                <LoginCard/>
{/*                <div className={'title'}> PetBook </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                            {
                                type: 'email',
                                message: 'Must be valid email',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                            {
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                                message: 'Password must be 8-16 characters long and contain at least one letter and one number',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                        Or <a onClick={() => history.push('/signup')}>register now!</a>
                    </Form.Item>
                </Form>

                <FirebaseUI initialState={initialState} setInitialState={setInitialState}/>*/}
            </Card>
        </div>
    )
};
export default Login;
