import {AlertOutlined, MessageOutlined} from '@ant-design/icons';
import {Avatar, Badge, Space, Tooltip} from 'antd';
import MyDropdown from "../Dropdown/MyDropdown";


const RightContent = () => {
/*    useEffect(()=>{connectWebSocket()},[])
    //const { socket, initSocket, closeSocket } =useWebSocket();
     initSocket(  `ws://localhost:8080/chat/${localStorage.getItem("userInfo")}`)*/

    return(


    <div >
    <Space size={24}>
        <Badge count={1}>
            <Tooltip title="Messages" placement="bottom">
                <Avatar icon={<MessageOutlined />} />
            </Tooltip>
        </Badge>

        <Badge count={1}>
            <Tooltip title="Notifications" placement="bottom">
                <Avatar icon={<AlertOutlined />} />
            </Tooltip>
        </Badge>

                <MyDropdown>
                    <Tooltip title="Account" placement="bottom">
                    <Avatar src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'} />
                    </Tooltip>
                </MyDropdown>


    </Space>
    </div>

)};
export default RightContent;