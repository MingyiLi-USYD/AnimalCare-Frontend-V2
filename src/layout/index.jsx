import React, {useEffect} from 'react';
import { ProLayout } from '@ant-design/pro-components';
import { HomeOutlined,ScissorOutlined,DeleteOutlined } from '@ant-design/icons';
import './index.less'
import {history,useModel,Outlet} from 'umi'
import RightContent from "../components/Avatar";
import Header from "../components/Header/Header";
import {socketIOStart} from "../utils/websocket";
const loginPath = '/login';

const BasicLayout = () => {
  const {initialState } = useModel('@@initialState');
  const customMenuData= [
    {
      key:'1',
      name: '首页',
      path: '/home',
      icon: <HomeOutlined/>,
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
      key:'5',
      name: '好友',
      path: '/friend',
      icon: <HomeOutlined/>,
    },
    {
      key:'6',
      name: '权限演示',
      path: '/access',
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


  socketIOStart(initialState)
  return (
    <ProLayout
   /*   layout={"mix"}*/
      fixSiderbar
      title="Umi App"
      navTheme="dark"
      menuDataRender={()=>customMenuData}
     /* rightContentRender={() => <RightContent />}*/
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
      //headerRender={()=><Header/>}
     /*   headerContentRender={()=><Header/>}*/
      onPageChange={() => {
        const { location } = history;
        console.log(initialState);
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

export default BasicLayout;
