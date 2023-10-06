import {Dropdown, Tooltip} from 'antd';
import {history, useModel} from 'umi';
import {LogoutIcon, PetsIcon, PostsIcon, ProfileIcon, UpdateIcon} from "@/assets/Icons/layoutIncon";
import './dropdown.less'
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
            <a className={'dropdown'} onClick={()=>{history.push(`/profile/${currentUser.userId}`)}}>
            Profile
        </a>
            ),
            icon: <ProfileIcon />
        },
        {
            key: '2',
            label: (
                <a className={'dropdown'} onClick={()=>{history.push('/pet')}}>
                    Pets
                </a>
            ),
            icon: <PetsIcon />,
        },
        {
            key: '3',
            label: (
                <a className={'dropdown'} onClick={()=>{history.push('/post')}}>
                    Posts
                </a>
            ),
            icon: <PostsIcon />,
        },
        {
            key: '4',
            label: (
                <a className={'dropdown'} onClick={()=>{history.push('/setting')}}>
                    Setting
                </a>
            ),
            icon: <UpdateIcon />,
        },
        {
            key: '5',
            danger: true,
            label: (
                <a className={'dropdown'} onClick={handleSignOut}>
                    Logout
                </a>
            ),
            icon: <LogoutIcon />
        },
    ];
    return (

    <Dropdown
        className={'my-dropdown'}
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
