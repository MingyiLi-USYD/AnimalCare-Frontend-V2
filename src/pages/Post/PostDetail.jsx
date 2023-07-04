import React, {useEffect, useRef, useState} from 'react';
import BackForward from "../../components/BackForward";
import {useParams} from "../../.umi/exports";
import "./PostDetail.less"
import {Avatar, Button, Carousel, Col, Divider, Input, List, Row, Skeleton} from "antd";
import {parseStringToList} from "../../utils/arrayUtils";
import {getPostById} from "../../services/postService";
import Loading from "../../components/Loading";
import {MessageOutlined, StarOutlined, HeartOutlined, SmileOutlined,PaperClipOutlined} from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";

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
    const   commentContainerRef =useRef(null)
    const [data, setData] = useState([]);
    const [commentLoading,setCommentLoading] = useState(false)
    const loadMoreData = () => {
        if (commentLoading) {
            return;
        }
        setCommentLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setCommentLoading(false);
            })
            .catch(() => {
                setCommentLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

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

    const showComments = ()=> {
        const commentContainer = commentContainerRef.current;

        if (commentContainer) {
            const commentContainerTop = commentContainer.getBoundingClientRect().top;

            if (commentContainerTop > 0) {
                commentContainer.scrollIntoView({ behavior: 'smooth' });
            }
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
                    <div className={"author-info"}>
                        <div className={"user-info"}>
                            <Avatar size={40} src={post.userAvatar}/>
                            <span className={"nickname"}>{post.nickName}</span>
                        </div>

                        <Button style={{borderRadius:20}} type={"primary"}>Subscribe</Button>
                    </div>
                    <div className={"note-scroller"} id="scrollableDiv">
                        <div className={"note-content"}>
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
                        <div className={"comment-container"}  ref={commentContainerRef}>
                            <div className={"total"}>
                                {"一共500条"}
                            </div>
                            <div className={"list-container"}>
                                <InfiniteScroll
                                    dataLength={data.length}
                                    next={loadMoreData}
                                    hasMore={data.length < 50}
                                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                    scrollableTarget="scrollableDiv"
                                >
                                    <List
                                        dataSource={data}
                                        renderItem={(item) => (
                                            <List.Item key={item.email}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item.picture.large} />}
                                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                                    description={item.email}
                                                />
                                                <div>Content</div>
                                            </List.Item>
                                        )}
                                    />
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                    <div className={"actions"}>
                        <HeartOutlined className={"my-icon"}/>
                        <span>{post.love}</span>
                        <StarOutlined className={"my-icon"}/>
                        <span>{post.love}</span>
                        <MessageOutlined className={"my-icon"} onClick={showComments}/>
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