import {LogoutOutlined, ProfileOutlined, SmileOutlined} from '@ant-design/icons';
import {Dropdown, Tooltip} from 'antd';
import {useModel,history} from 'umi';



const MyDropdown = (props) => {
    const {initialState:{currentUser} } = useModel('@@initialState');

    const  handleSignOut = async ()=> {

        localStorage.removeItem('serverToken')
        history.push('/login')

    }

    const items = [
        {
            key: '1',
            label: (
            <a onClick={()=>{history.push(`/profile/${currentUser.userId}`)}}>
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
            <Tooltip title="Account" placement="bottom">
                {
                    props.children
                }
            </Tooltip>

    </Dropdown>
);}
export default MyDropdown;
