import {LockOutlined, MobileOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProConfigProvider, ProFormCaptcha, ProFormCheckbox, ProFormText} from '@ant-design/pro-components';
import {message, Space, Tabs} from 'antd';
import {useState} from 'react';
import FirebaseUI from "@/pages/Login/firebaseUI";
import {userLogin} from "@/services/userService";
import {flushSync} from "react-dom";
import {useModel,history} from "umi";


const LoginCard = () => {
    const [loginType, setLoginType] = useState('phone');
    const {setInitialState, initialState} = useModel('@@initialState');
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
                    logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                    title="PetBook"
                    subTitle="全球最大的代码托管平台"
                    actions={
                        <Space direction={"vertical"}>
                            其他登录方式
                            <Space>
                                <div>Google: </div>
                                <div id={"signInDiv"}></div>
                            </Space>

                        </Space>
                    }
                    onFinish={async (values) => {
                      userLogin(values).then(async (res)=>{

                          localStorage.setItem("access_token",res.access_token)
                          localStorage.setItem("refresh_token",res.refresh_token)
                          await fetchUserInfo();
                          history.push('/home');
                      },()=>{
                          console.log('处理登录失败的情况')

                      })

                    }}
                    submitter={{searchConfig: {submitText: 'Login',}}}
                >

                    <Tabs

                        centered
                        activeKey={loginType}
                        onChange={(activeKey) => setLoginType(activeKey)}
                        items={[
                                {key: 'account', label: 'Password Login'},
                                {key: 'phone', label: 'Email Login'},
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
                                placeholder={'用户名: admin or user'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'密码: ant.design'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </>
                    )}
                    {loginType === 'phone' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined className={'prefixIcon'}/>,
                                }}
                                name="mobile"
                                placeholder={'手机号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={'请输入验证码'}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${'获取验证码'}`;
                                    }
                                    return '获取验证码';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async () => {
                                    message.success('获取验证码成功！验证码为：1234');
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
                            自动登录
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            忘记密码
                        </a>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

export default LoginCard