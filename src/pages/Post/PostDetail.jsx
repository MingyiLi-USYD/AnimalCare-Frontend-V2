import React, {useEffect, useState} from 'react';
import BackForward from "../../components/BackForward";
import {useParams} from "../../.umi/exports";
import "./PostDetail.less"
import {Avatar, Button, Carousel, Col, Input, Row} from "antd";
import {parseStringToList} from "../../utils/arrayUtils";
import {getPostById} from "../../services/postService";
import Loading from "../../components/Loading";
import {MessageOutlined, StarOutlined, HeartOutlined, SmileOutlined,PaperClipOutlined} from '@ant-design/icons';

const imageUrl = "https://fastly.picsum.photos/id/400/200/300.jpg?hmac=FD74WIE42b0qUFf-QggfWsoHPJqcGgjSatRvUM9dAws";

const divStyle = {
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundImage: `url(${imageUrl})`,
};

function PostDetail() {
    const params = useParams();
    const {postId} = params
    const [loading,setLoading] = useState(false)
    const [post,setPost] = useState({})
    const [text,setText] = useState("");
    const [active,setActive] = useState(false)
    useEffect(()=>{
        initData()

    },[])

    const  initData = async ()=>{
        setLoading(true)
     const {data,code} = await getPostById(postId)
        if(code===1){
            console.log(parseStringToList(data.images))
            setPost(data)
            setLoading(false)
        }
    }
    if(loading){
        return <Loading/>
    }
    const handleInput = (e)=>{
        const input = e.target.value;
        setText(input)
        if(!active&&input.length>0){
           setActive(true)
        }else if(active&&input.length===0){
            setActive(false)
        }
    }
    return (

            <div className={"post-container"}>

              <div className={"carousel"}>

                  <Carousel >
                          {parseStringToList(post.images).map((url, index) =>
                               (
                                  <div>
                                  <div key={index} className={"image-container"} style={{backgroundSize:"contain",backgroundImage:`url(${url})`}}/>

                                  </div>
                              )

                              )}
                  </Carousel>
              </div >
                <div className={"content-info"}>
                    <div className={"header"}>
                        <div className={"user-info"}>
                            <Avatar size={40} src={post.userAvatar}/>
                            <span className={"nickname"}>{post.nickName}</span>
                        </div>

                        <Button style={{borderRadius:20}} type={"primary"}>Subscribe</Button>
                    </div>
                    <div className={"content"}>
                        <div className={"topic"}>
                            {
                                post.topic
                            }
                        </div>
                        <div className={"description"}>
                            {
                             post.postContent
                            }
                        </div>
                    </div>
                    <div className={"actions"}>
                        <HeartOutlined className={"my-icon"}/>
                        <span>{post.love}</span>
                        <StarOutlined className={"my-icon"}/>
                        <span>{post.love}</span>
                        <MessageOutlined className={"my-icon"}/>
                        <span>{post.love}</span>
                    </div>
                    <div className={"bottom"}>
                        <div className={"comment-wrapper"}>
                            <Input placeholder="Share your idea" value={text} onChange={handleInput} />
                            <div className={`input-buttons ${active?'active':'inactive'}`}>
                                <PaperClipOutlined />
                                <SmileOutlined />
                                <Button size={"middle"} type={"primary"}>Send</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

    );
}

export default PostDetail;