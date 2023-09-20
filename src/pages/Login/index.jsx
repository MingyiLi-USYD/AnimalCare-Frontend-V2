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
        console.log(res)
/*        if (res.code === 1) {
            localStorage.setItem('serverToken', res.data.serverToken);
            await fetchUserInfo();
            history.push('/home');
        } else {
            console.log('登录失败');
        }*/
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
            </Card>
        </div>
    )
};
export default Login;
