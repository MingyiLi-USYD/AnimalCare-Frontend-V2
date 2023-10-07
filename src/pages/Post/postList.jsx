import React, {useEffect, useState} from 'react';
import BackForward from "../../components/BackForward";
import {Avatar, Button, List, Popconfirm, Switch,Typography} from "antd";
import style from "../Pet/petDetail.less";
import {deletePostById, getMyPosts, setVisibility} from "@/services/postService";
import {history} from "umi";
import {urlWrapper} from "@/utils/imageUtils";
const { Title } = Typography;
function PostList() {
    const [data,setData] = useState([]);
    const fetchData = async ()=>{
        const res = await getMyPosts();
        setData(res.data)
    }
    useEffect(()=>{
        fetchData()
    },[])

    const confirm = (id) => {
        const newData = [...data].filter(item=> item.postId!==id)
        setData(newData)
        deletePostById(id)
    };
    const cancel = (e) => {

    };

    const onChange = (postId,visibility)=>{
        const newData = [...data].map(item=> {if(item.postId===postId){
            item.visible=visibility
        }
            return item})
        setVisibility(postId,visibility)
        setData(newData)
    }
    return (
        <div>
            <BackForward/>
            <Title style={{textAlign:"center"}} level={3}>Post Management</Title>
            <List
                pagination={{
                    position:'bottom',
                    align:'center',
                }}
                dataSource={data}
                renderItem={(item) => (

                    <List.Item   actions={[<Switch checked={item.visible} onChange={(open)=>{onChange(item.postId,open)}} />,
                        <Popconfirm
                            title="Delete Post"
                            description="Are you sure to delete this post?"
                            onConfirm={()=>confirm(item.postId)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No">
                            <Button danger className={'edit-button'} key="list-loadmore-more">Delete</Button>
                        </Popconfirm>
                    ]}>
                        <List.Item.Meta
                            avatar={
                                <Avatar shape={"square"} onClick={()=>history.push(`/post/${item.postId}`)} size={64} style={{cursor:"pointer"}} src={urlWrapper(item.coverImage)}/>
                            }
                            title={<a >{item.postTitle}</a>}
                            description={item.postContent}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default PostList;