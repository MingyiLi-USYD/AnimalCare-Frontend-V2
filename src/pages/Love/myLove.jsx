import React, {useEffect, useState} from 'react';
import BackForward from "../../components/BackForward";
import {Avatar, Button, List, Popconfirm, Switch, Typography} from "antd";
import style from "../Pet/petDetail.less";
import {cancelLove, deletePostById, getLoves, setVisibility} from "@/services/postService";
import {history} from "umi";
import {urlWrapper} from "@/utils/imageUtils";
import {LoveIcon} from "@/assets/Icons/layoutIncon";

const {Title} = Typography;
const pageSize = 4
const MyLove = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(0)


    const fetchData = async () => {
        const {code, data} = await getLoves(current, pageSize);
        if (code === 1) {
            const {records, total, current} = data
            setCurrent(current)
            setTotal(total)
            setData(records)
        }

    }
    useEffect(() => {
        fetchData()
    }, [current])

    const confirm = (id) => {
        const newData = [...data].filter(item => item.postId !== id)
        setData(newData)
        cancelLove(id)
    };
    const cancel = (e) => {

    };

    const onChange = (postId, visibility) => {
        const newData = [...data].map(item => {
            if (item.postId === postId) {
                item.visible = visibility
            }
            return item
        })
        setVisibility(postId, visibility)
        setData(newData)
    }
    return (
        <div>
            <BackForward/>
            <Title style={{textAlign: "center"}} level={3}>My Loved Posts</Title>
            <List
                pagination={{
                    position: 'bottom',
                    align: 'center',
                    total,
                    current,
                    pageSize,
                    onChange:setCurrent
                }}
                dataSource={data}
                renderItem={(item) => (

                    <List.Item actions={[
                        <Popconfirm
                            title="Cancel Love"
                            description="Are you sure to cancel love this post?"
                            onConfirm={() => confirm(item.postId)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No">
                            <Button danger className={'edit-button'}>Cancel</Button>
                        </Popconfirm>
                    ]}>
                        <List.Item.Meta
                            avatar={
                                <Avatar shape={"square"} onClick={() => history.push(`/post/${item.postId}`)} size={64}
                                        style={{cursor: "pointer"}} src={urlWrapper(item.coverImage)}/>
                            }
                            title={<a>{item.postTitle}</a>}
                            description={item.postContent}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default MyLove;