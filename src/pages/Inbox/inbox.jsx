import React, {useEffect, useState} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {Outlet, history, useLocation} from "umi";
import './inbox.less'
const items = [
    {
        label: 'Mentioned',
        key: '/inbox/mention',
        icon: <MailOutlined />,
    },
    {
        label: 'Comments received',
        key: '/inbox/comments',
        icon: <AppstoreOutlined />,
    },
    {
        label: 'Loves received',
        key: '/inbox/loves',
        icon: <AppstoreOutlined />,
    },
    {
        label: 'Setting',
        key: '/inbox/system',
        icon: <SettingOutlined />,
    },

];
const App = () => {
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);
    useEffect(()=>{
        setCurrent(location.pathname)
    },[location.pathname])

    const onClick = (e) => {
        history.push(e.key)
    };
    return <div className={"inbox-page"}>
        <div className={"inbox-container"}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <Outlet/>
        </div>
    </div>;
};
export default App;