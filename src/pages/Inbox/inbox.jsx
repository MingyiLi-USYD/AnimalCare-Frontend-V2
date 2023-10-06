import React, {useEffect, useMemo, useState} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Badge, Menu} from 'antd';
import {Outlet, history, useLocation, useSelector, useDispatch} from "umi";
import './inbox.less'
import {CommentIcon, LoveIcon, MentionIcon, SettingIcon} from "@/assets/Icons/layoutIncon";


const App = () => {
    const {lovesReceived,commentsReceived,mentionsReceived} = useSelector(state=>state.userModel)
    const items = useMemo(() => [
        {
            label: 'Mentioned',
            key: '/inbox/mention',
            icon: <Badge count={mentionsReceived} size={"small"}><MentionIcon /></Badge>,
            action: 'resetMentionsReceived',
        },
        {
            label: 'Comments received',
            key: '/inbox/comments',
            icon: <Badge count={commentsReceived} size={"small"}><CommentIcon /></Badge>,
            action: 'resetCommentsReceived',
        },
        {
            label: 'Loves received',
            key: '/inbox/loves',
            icon: <Badge count={lovesReceived} size={"small"}><LoveIcon /></Badge>,
            action: 'resetLovesReceived',
        },
        {
            label: 'Setting',
            key: '/inbox/system',
            icon: <SettingIcon />,
        },
    ], [lovesReceived, commentsReceived, mentionsReceived]);
    const location = useLocation();
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(location.pathname);
    const actionMap = useMemo(() => ({
        '/inbox/mention': 'resetMentionsReceived',
        '/inbox/comments': 'resetCommentsReceived',
        '/inbox/loves': 'resetLovesReceived',
    }), [])
    useEffect(()=>{
        setCurrent(location.pathname)
    },[location.pathname])

    const onClick = (e) => {
        if(location.pathname!==e.key){
            const action = actionMap[e.key];
            action&&dispatch({
                type: `userModel/${action}`
            })
            history.push(e.key)
        }
    };
    return <div className={"inbox-page"}>
        <div className={"inbox-container"}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <Outlet/>
        </div>
    </div>;
};
export default App;