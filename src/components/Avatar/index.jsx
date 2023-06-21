import {Avatar, Tooltip} from 'antd';
import MyDropdown from "../Dropdown/MyDropdown";


const MyAvatar = ({avatar}) => {
    return(<MyDropdown>
            <Tooltip title="Account" placement="bottom">
                <Avatar src={avatar} />
            </Tooltip>
         </MyDropdown>
)};
export default MyAvatar;