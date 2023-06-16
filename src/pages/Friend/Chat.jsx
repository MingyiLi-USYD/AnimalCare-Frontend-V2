import {Avatar, Button, Col, Divider, List, Row, Skeleton} from 'antd';
import {useEffect, useRef, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {connect} from "../../.umi/exports";
import {getChatListByUser} from "../../utils/ChatUtils";
const Chat = (props) => {
    const ini = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(ini);
    const { chatRecord, friendLists, contact, dispatch, me } = props;
    const listRef = useRef(null);
    useEffect(() => {
        // 当 dataSource 发生变化时，滚动到最底部
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [chatRecord]);
    return (
        <div
            className={'messageContainer'}
            id="scrollableDiv"
            style={{
                overflow: 'auto',
                border: '2px solid rgba(140, 140, 140, 0.35)',
                textAlign: 'center',
            }}
            ref={listRef}
        >
                <Button>History</Button>
                <List
                    dataSource={getChatListByUser(chatRecord, contact)?.messageLists}
                    renderItem={(item, index) => (
                        <List.Item>
                             <OneRecord index={index} me={true} data={item} me={me}/>
                        </List.Item>
                    )}
                />
        </div>
    );
};
export default connect(
    ({ ChatModel: { chatRecord, friendLists, contact, me } }) => {
        return { chatRecord, friendLists, contact, me };
    },
)(Chat);
const OneRecord = ({index,data,me})=>{

    return(
        <div className={`oneMessage ${data.user.id===me.id?'revere':''}`}>

                <div span={2}>
                    <Avatar size={50} src={data.user.avatar}/>
                </div>
                <div span={22}style={{borderRadius:10,backgroundColor:'green',padding:15}}dangerouslySetInnerHTML={{ __html: data.message.content }}>
                </div>

        </div>
    )
}