import React, {useState} from 'react';
import {ProLayout} from '@ant-design/pro-components';
import {
  CommentOutlined,
  HomeOutlined,
  InboxOutlined,
  MedicineBoxOutlined,
  ScissorOutlined,
  UserOutlined
} from '@ant-design/icons';
import './index.less'
import {connect, history, Outlet, useAccess, useModel, useSelector} from 'umi'
import {Badge} from "antd";
import {allUnread} from "@/utils/chatUtils";
import useSocket from "@/hooks/useSocket";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import imgUrl from '../assets/images/logo.png'
import {
  AdminIcon,
  ChatIcon,
  ConsoleIcon,
  FriendIcon,
  HospitalIcon, LoveIcon,
  MainIcon,
  MessageIcon,
  PostIcon
} from "@/assets/Icons/layoutIncon";
const loginPath = '/login';

const BasicLayout = (props) => {
  const {chatRecordArray,friendRequest}=props
  const {initialState} = useModel('@@initialState');
  const {socket,disconnect}=useSocket(initialState.currentUser)
  const {lovesReceived,commentsReceived,mentionsReceived} = useSelector(state=>state.userModel)
  const {currentUser}=initialState;
  const {thanUser} = useAccess()
  const customMenuData= [
    {
      key:'1',
      name: 'Home',
      path: '/home',
      icon: <MainIcon />,
    },
    {
      key:'15',
      name: 'Chat',
      path: '/chat',
      icon:  <Badge size={"small"} count={allUnread(chatRecordArray)}><ChatIcon /></Badge>,
    },
    {
      key:'5',
      name: 'Friend',
      path: '/friend',
      icon:<Badge size={"small"} count={friendRequest}> <FriendIcon /></Badge>,
    },
    {
      key:'2',
      name: 'Share',
      path: '/new',
      icon: <PostIcon/>,
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
    {
      key:'18',
      path: '/inbox',
      name:'Message',
      icon: <Badge  size={"small"} count={lovesReceived+commentsReceived+mentionsReceived}><MessageIcon /></Badge>,
    },
    {
      key:'14',
      path: '/love',
      name:'Love',
      icon: <LoveIcon />,
    },
    {
      key:'16',
      path: '/medical',
      name: 'Hospital',
      icon: <HospitalIcon/>,
    },
    {
      key:'19',
      name: 'Console',
      path: '/dashboard',
      icon: <ConsoleIcon/>,
    },
    {
      key:'17',
      path: '/admin',
      name: 'Admin',
      icon: <AdminIcon/>,
      hideInMenu: !thanUser
    },
  ];
  const [pathname, setPathname] = useState(history.location.pathname);

  return (
    <ProLayout
        token={{
          sider: {
            colorMenuBackground: '#fff',
            colorMenuItemDivider: '#dfdfdf',
            colorTextMenu: '#595959',
            colorTextMenuSelected: 'rgba(42,122,251,1)',
            colorBgMenuItemSelected: 'rgba(230,243,254,1)',
          },
        }}
        location={{
          pathname,
        }}
      layout={"side"}
      title="PetBook"
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
            setPathname(path||'/home')
            history.push(path)
          }}
        >
          {dom}
        </div>
      }}
      logo={imgUrl}
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
