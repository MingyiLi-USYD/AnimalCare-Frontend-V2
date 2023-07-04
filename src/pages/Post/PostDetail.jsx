import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "../../.umi/exports";
import "./PostDetail.less"
import {Avatar, Button, Carousel, Divider, Input, List, Skeleton} from "antd";
import {parseStringToList} from "../../utils/arrayUtils";
import {getPostById} from "../../services/postService";
import Loading from "../../components/Loading";
import {MessageOutlined, StarOutlined, HeartOutlined, SmileOutlined,PaperClipOutlined} from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import {getCommentsById, postComment} from "../../services/commentService";
import Comment from "../Comment/comment";



function PostDetail() {
    const   commentContainerRef =useRef(null)
    const [commentLoading,setCommentLoading] = useState(false)
    const [page,setPage]=useState(0)
    const [total,setTotal] = useState(0)
    const [comments,setComments] = useState([])
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
        await fetchPost()
        await loadComment()
    }
    const fetchPost = async ()=>{
        setLoading(true)
        const {data,code} = await getPostById(postId)
        if(code===1){
            console.log(parseStringToList(data.images))
            setPost(data)
            setLoading(false)
        }
    }
    const   loadComment = async ()=>{
        if (commentLoading) {
            return;
        }
        setCommentLoading(true);
       const { data: { records,total },code} = await getCommentsById(postId,page,10);
        setPage(page+1)
        setComments([...comments,...records]);
        setTotal(total)
        setCommentLoading(false);

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
    if(loading||commentLoading){
        return <Loading/>
    }
    console.log(comments)

    function handleLove() {

    }

    const handleSend = async ()=> {
        const {code} = await postComment(postId,text)
        if(code===1){
            setText('')
        }
    }

    return (

            <div className={"post-container"}>

              <div className={"carousel"}>

                  <Carousel >
                          {parseStringToList(post.images).map((url, index) =>
                               (
                                  <div  key={index} >
                                  <div className={"image-container"} style={{backgroundSize:"contain",backgroundImage:`url(${url})`}}/>
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
                                {`Totally ${total} comments`}
                            </div>
                            <div className={"list-container"}>
                                <InfiniteScroll
                                    dataLength={comments.length}
                                    next={loadComment}
                                    hasMore={comments.length < total}
                                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                    scrollableTarget="scrollableDiv"
                                >
                                    <List
                                        dataSource={comments}
                                        renderItem={(item) => (
                                            <Comment key={item.id} data={item}/>
                                        )}
                                    />
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                    <div className={"actions"}>
                        <HeartOutlined className={"my-icon"} onClick={handleLove}/>
                        <span>{post.love}</span>
                        <StarOutlined className={"my-icon"}/>
                        <span>{post.love}</span>
                        <MessageOutlined className={"my-icon"} onClick={showComments}/>
                        <span>{total}</span>
                    </div>
                    <div className={"bottom"}>
                        <div className={"comment-wrapper"}>
                            <Input placeholder="Share your idea" value={text} onChange={handleInput} />
                            <div className={`input-buttons ${active?'active':'inactive'}`}>
                                <PaperClipOutlined />
                                <SmileOutlined />
                                <Button size={"middle"} type={"primary"} onClick={handleSend}>Send</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

    );
}

export default PostDetail;