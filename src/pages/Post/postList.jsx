import React, {useEffect, useState} from 'react';
import BackForward from "../../components/BackForward";
import {Avatar, Button, List, Popconfirm, Switch} from "antd";
import style from "../Pet/petDetail.less";
import {deletePostById, getMyPosts, setVisibility} from "@/services/postService";
import {parseStringToList} from "@/utils/arrayUtils";
import {history} from "umi";

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
            <h2 style={{textAlign:"center"}}>Post Management</h2>
            <List
                pagination={{
                    position:'bottom',
                    align:'center',
                }}
                dataSource={data}
                renderItem={(item) => (

                    <List.Item   actions={[<Switch checked={item.visible} onChange={(open)=>{onChange(item.postId,open)}} />,
                        <Popconfirm
                            title="Delete pet"
                            description="Are you sure to delete this pet?"
                            onConfirm={()=>confirm(item.postId)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No">
                            <Button danger className={style.button} key="list-loadmore-more">Delete</Button>
                        </Popconfirm>
                    ]}>
                        <List.Item.Meta
                            avatar={
                                <Avatar shape={"square"} onClick={()=>history.push(`/post/${item.postId}`)} size={64} style={{cursor:"pointer"}} src={parseStringToList(item.images)[0]}/>
                            }
                            title={<a >{item.topic}</a>}
                            description={item.postContent}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default PostList;