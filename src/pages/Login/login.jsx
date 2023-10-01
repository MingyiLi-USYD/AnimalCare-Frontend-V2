import {LockOutlined, MobileOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProConfigProvider, ProFormCaptcha, ProFormCheckbox, ProFormText} from '@ant-design/pro-components';
import {message, Space, Tabs} from 'antd';
import {useEffect, useState} from 'react';
import {googleLogin, sendCode, userCodeLogin, userPasswordLogin} from "@/services/userService";
import {flushSync} from "react-dom";
import {history, useModel} from "umi";
import imgUrl from '../../assets/images/logo.png'

const LoginCard = () => {
    const [loginType, setLoginType] = useState('email');
    const {setInitialState, initialState} = useModel('@@initialState');
    const [emailValue, setEmailValue] = useState('');

    const jumpToHome = async (res) => {

        if (res.code === 1) {
            localStorage.setItem("access_token", res.data)
            await fetchUserInfo();
            history.push('/home');
        }

    }

    const handleCallback = async (res) => {
        googleLogin(res.credential).then(jumpToHome)
    }
    useEffect(() => {

        google.accounts.id.initialize({
            client_id: '1067998688265-29puvp1t8tlrraiufdl4aerh84vqu934.apps.googleusercontent.com',
            redirect_uri: 'http://localhost:5000/login',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            response_type: 'code',
            login_uri: 'http://localhost:5000',
            callback: handleCallback
        })
        google.accounts.id.prompt();
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme: "outline", size: "large"
            }
        )

    }, [])

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
        <ProConfigProvider hashed={false}>
            <div>
                <LoginForm
                    logo={imgUrl}
                    title="PetBook"
                    subTitle="The best platform for pet lover"
                    actions={
                        <Space direction={"vertical"}>
                            Other Login:
                            <Space>
                                <div>Google:</div>
                                <div id={"signInDiv"}></div>
                            </Space>

                        </Space>
                    }
                    onFinish={async (values) => {

                        if (loginType === 'account') {
                            userPasswordLogin(values).then(jumpToHome)
                        } else {

                            userCodeLogin(values).then(jumpToHome)
                        }


                    }}
                    submitter={{searchConfig: {submitText: 'Login',}}}
                >

                    <Tabs

                        centered
                        activeKey={loginType}
                        onChange={(activeKey) => setLoginType(activeKey)}
                        items={[
                            {key: 'account', label: 'Password Login'},
                            {key: 'email', label: 'Email Login'},
                        ]}
                    />

                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'Email'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input email!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'Password'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input password!',
                                    },
                                ]}
                            />
                        </>
                    )}
                    {loginType === 'email' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined className={'prefixIcon'}/>,
                                }}
                                name="email"
                                placeholder={'Email'}
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Pleas input email！',
                                    },

                                ]}
                                onChange={(e) => setEmailValue(e.target.value)}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={'Code'}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${'Get code'}`;
                                    }
                                    return 'Send code';
                                }}
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async () => {
                                    const {code} = await sendCode(emailValue)
                                    if (code === 1) {
                                        // 返回正常的 Promise
                                        message.success('Success to send')
                                        return Promise.resolve('验证码已发送'); // 此处可以根据需要返回任何成功信息
                                    } else {
                                        // 返回错误的 Promise
                                        message.error('Fail to  send')
                                        return Promise.reject('验证码发送失败'); // 此处可以根据需要返回任何错误信息
                                    }
                                }}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            Auto Login
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            Forget Password
                        </a>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

export default LoginCard