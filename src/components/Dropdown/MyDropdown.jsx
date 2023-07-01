import {LogoutOutlined, ProfileOutlined, SmileOutlined} from '@ant-design/icons';
import {Dropdown} from 'antd';
import {useModel,history} from 'umi';
import {auth} from "../../firebaseConfig";


const MyDropdown = (props) => {
    const {initialState:{currentUser} } = useModel('@@initialState');

    const  handleSignOut = async ()=> {
        await auth.signOut()
        localStorage.removeItem('serverToken')
        history.push('/login')

    }

    const items = [
        {
            key: '1',
            label: (
            <a onClick={()=>{history.push(`/profile/${currentUser.id}`)}}>
            Profile
        </a>
            ),
            icon: <ProfileOutlined />
        },
        {
            key: '2',
            label: (
                <a onClick={()=>{history.push('/pet')}}>
                    Pets
                </a>
            ),
            icon: <SmileOutlined />,
        },
        {
            key: '3',
            label: (
                <a onClick={()=>{history.push('/post')}}>
                    Posts
                </a>
            ),
            icon: <SmileOutlined />,
        },
        {
            key: '4',
            label: (
                <a onClick={()=>{history.push('/setting')}}>
                    Setting
                </a>
            ),
            icon: <SmileOutlined />,
        },
        {
            key: '5',
            danger: true,
            label: (
                <a onClick={handleSignOut}>
                    Logout
                </a>
            ),
            icon: <LogoutOutlined />
        },
    ];
    return (

    <Dropdown
        menu={
        {
            items,
            selectable:true
        }
      }
        trigger={"click"}
    >

        {
            props.children
        }
    </Dropdown>
);}
export default MyDropdown;
