import React from 'react';
import {ProLayout} from '@ant-design/pro-components';
import {CommentOutlined, DeleteOutlined, HomeOutlined, ScissorOutlined, UserOutlined} from '@ant-design/icons';
import './index.less'
import {history, Outlet, useModel} from 'umi'
import {Badge} from "antd";
import {connect} from "../.umi/exports";
import {allUnread} from "@/utils/chatUtils";
import useSocket from "@/hooks/useSocket";
import MyDropdown from "@/components/Dropdown/MyDropdown";
const loginPath = '/login';

const BasicLayout = (props) => {
  const {chatRecordArray,friendRequest}=props
  const {initialState} = useModel('@@initialState');
  const {socket,disconnect}=useSocket(initialState.currentUser)
  const {currentUser}=initialState;
  const customMenuData= [
    {
      key:'1',
      name: '首页',
      path: '/home',
      icon: <HomeOutlined/>,
    },
    {
      key:'15',
      name: '聊天',
      path: '/chat',
      icon:  <Badge size={"small"} count={allUnread(chatRecordArray)}><CommentOutlined /></Badge>,
    },
    {
      key:'5',
      name: '好友',
      path: '/friend',
      icon:<Badge size={"small"} count={friendRequest}> <UserOutlined /></Badge>,
    },
    {
      key:'2',
      name: '发布',
      path: '/new',
      icon: <HomeOutlined/>,
      routes: [
        {
          key:'3',
          name: 'Post',
          path: '/new/post',
          icon: <HomeOutlined/>,
        },
        {
          key:'4',
          name: 'Pet',
          path: '/new/pet',
          icon: <HomeOutlined/>,
        },
      ],
    },
    {
      key:'6',
      name: '控制台',
      path: '/dashboard',
      icon: <ScissorOutlined/>,
    },
    {
      key:'7',
      name: ' CRUD 示例',
      path: '/table',
      icon: <DeleteOutlined/>,
    },
    {
      key:'8',
      path: '/setting',
      hideInMenu: true,
    },

    {
      key:'9',
      path: '/profile/:id',
      hideInMenu: true,
    },
    {
      key:'10',
      path: '/post/:postId',
      hideInMenu: true,
    },
    {
      key:'11',
      path: '/pet/:petId',
      hideInMenu: true,
    },
    {
      key:'12',
      path: '/pet',
      hideInMenu: true,
    },
    {
      key:'13',
      path: '/post',
      hideInMenu: true,
    },
  ];

  return (
    <ProLayout
      layout={"side"}
      fixSiderbar
      title="Umi App"
      navTheme="dark"
      menuDataRender={()=>customMenuData}
      avatarProps={{
        src: currentUser.avatar,
        size: 'large',
        title: `${currentUser.nickname}`,
        render:(props,dom)=><MyDropdown>{dom}</MyDropdown>,
      }}
      menuItemRender={(props,dom)=>{
       const {path,name} = props;
        return <div className={'menu-link'}
          onClick={() => {
            history.push(path)
          }}
        >
          {dom}
        </div>
      }}
      logo={ 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg'}
      onPageChange={() => {
        const { location } = history;
        //console.log(initialState);
        // 如果没有登录，重定向到 login
        if (!initialState?.currentUser && location.pathname !== loginPath) {
        console.log("被重定向到登录页")
        history.push(loginPath);
      }
      }}
    >
      <Outlet/>
    </ProLayout>
  );
};

export default connect(({ChatModel:{chatRecordArray},friendModel:{friendRequest}})=>{

  return {chatRecordArray,friendRequest}})( BasicLayout);
