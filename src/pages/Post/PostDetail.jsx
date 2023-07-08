import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "../../.umi/exports";
import "./PostDetail.less"
import {Avatar, Button, Carousel, Divider, Input, List, Skeleton} from "antd";
import {parseStringToList} from "../../utils/arrayUtils";
import {getPostById} from "../../services/postService";
import Loading from "../../components/Loading";
import {HeartOutlined, MessageOutlined, PaperClipOutlined, SmileOutlined, StarOutlined} from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import {getCommentsById, postComment} from "../../services/commentService";
import Comment from "../Comment/comment";
import {history} from "umi";
import { useDispatch,useSelector } from 'umi';
function PostDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const {postId} = params
    const commentContainerRef =useRef(null)
    const inputRef = useRef(null);
    const [commentLoading,setCommentLoading] = useState(false)
    const [loading,setLoading] = useState(false)
    const [active,setActive] = useState(false)

    const {post,total,page,comments,text,label,type,commentId,replyNickname} = useSelector(state=>state.postDetailModel)

    useEffect(()=>{
        initData()
    },[])

    const  initData =  ()=>{
         fetchPost()
         loadComment()
    }
    const fetchPost =  ()=>{
        dispatch({
            type:'postDetailModel/fetchPost',
            payload:postId
        })
    }
    const   loadComment =  ()=>{
        dispatch({
            type:'postDetailModel/fetchComments',
            payload:{postId,page,pageSize:10}
        })
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
            dispatch({
                type:'postDetailModel/fetchComments',
                payload:{label:"Share your idea",type:0}
            })
            if (commentContainerTop > 0) {
                commentContainer.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    if(loading||commentLoading){
        return <Loading/>
    }

    const handleLove = async (postId) => {
    };

    const handleSend = async ()=> {
        if(commentType===0){
            const {code} = await postComment(postId,text)
            if(code===1){
                setText('')
            }
        }
        if(commentType===1){

        }
        if(commentType===2){

        }

    }
    const handleFocus = (label) => {

        if (inputRef.current) {
            inputRef.current.focus();
            setLabel("@"+label)
        }
    };

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
                            <Avatar className={"avatar"} size={40} src={post.userAvatar} onClick={()=>{history.push(`/profile/${post.userId}`)}}/>
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
                            <div className={"comment-list"}>
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
                                            <Comment key={item.id} comment={item} focus={handleFocus} comments={comments}/>
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
                            <Input placeholder={label} value={text} onChange={handleInput} ref={inputRef} />
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