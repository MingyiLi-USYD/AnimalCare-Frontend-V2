import React, {useEffect, useRef, useState} from 'react';
import {history, useDispatch, useParams, useSelector} from "umi";
import "./postDetail.less"
import {Avatar, Button, Carousel, Divider, Input, List, Skeleton, Spin} from "antd";
import Loading from "../../components/Loading";
import {HeartOutlined, MessageOutlined, PaperClipOutlined, SmileOutlined, StarOutlined} from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../Comment/comment";
import Interaction from "../../components/Interactions/interaction";
import {
    addCommentAction, addSubcommentAction,
    cancelLoveAction, cancelLovePost, fetchComment,
    fetchCommentAction,
    fetchPostAction,
    fetchPostWithComments, loveAction, lovePost,
    showCommentsAction
} from "@/actions/postDetailActions";

function PostDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const {postId} = params
    const commentContainerRef = useRef(null)
    const inputRef = useRef(null);
    const [active, setActive] = useState(false)
    const [text, setText] = useState("")

    const {
        post,
        total,
        pages,
        comments,
        label,
        type,
        commentId,
        replyNickname,
    } = useSelector(state => state.postDetailModel)
    const {loveList, startList} = useSelector(state => state.userModel)
    const {effects,global} = useSelector(state => state.loading)
    //const isLoading =   effects[fetchComment] ||effects[lovePost] ||effects[cancelLovePost];
    useEffect(() => {
        if (postId && postId !== post.postId) {
            dispatch(fetchPostAction(postId))
        }
    }, [])

    const loadComment = () => {
        dispatch(fetchCommentAction(postId,pages,10))
    }

    const handleInput = (e) => {
        const input = e.target.value;
        setText(input)
        if (!active && input.length > 0) {
            setActive(true)
        } else if (active && input.length === 0) {
            setActive(false)
        }
    }

    const showComments = () => {
        const commentContainer = commentContainerRef.current;
        if (commentContainer) {
            const commentContainerTop = commentContainer.getBoundingClientRect().top;
            dispatch(showCommentsAction())
            if (commentContainerTop > 0) {
                commentContainer.scrollIntoView({behavior: 'smooth'});
            }
        }
    }
    if (effects[fetchPostWithComments]) {
        return <Loading/>
    }

    const handleLove = () => {
        dispatch(loveAction(postId))
    };
    const handleCancelLove = () => {
        dispatch(cancelLoveAction(postId))
    };


    const handleSend = () => {
        if (type === 0) {
            dispatch(addCommentAction(postId,text))
        }
        if (type === 1) {
            dispatch(addSubcommentAction(commentId,text))
        }
        if (type === 2) {
            dispatch(addSubcommentAction(commentId,text,replyNickname))
        }
        afterSend()
    }

    const afterSend = () => {
        setText("")
        setActive(false)
    }
    const handleFocus = (label) => {

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
   console.log(global)

    return (

        <div className={"post-container"}>
            <div className={"carousel"}>
                <Carousel autoplay={false}>
                    {post?.images?.map(({imageId,imageUrl}) =>
                        (
                            <div key={imageId}>
                                <div className={"image-container"}
                                     style={{backgroundSize: "contain", backgroundImage: `url(${imageUrl})`}}/>
                            </div>
                        )
                    )}
                </Carousel>
            </div>
            <div className={"content-info"}>
                <div className={"author-info"}>
                    <div className={"user-info"}>
                        <Avatar className={"avatar"} size={40} src={post?.postUser?.avatar} onClick={() => {
                            history.push(`/profile/${post?.userId}`)
                        }}/>
                        <span className={"nickname"}>{post?.postUser?.nickname}</span>
                    </div>

                    <Button style={{borderRadius: 20}} type={"primary"}>Subscribe</Button>
                </div>
                <div className={"note-scroller"} id="scrollableDiv">
                    <div className={"note-content"}>
                        <div className={"topic"}>
                            {
                                post.postTitle
                            }
                        </div>
                        <div className={"description"}>
                            {
                                post.postContent
                            }
                        </div>
                    </div>
                    <div className={"comment-container"} ref={commentContainerRef}>
                        <div className={"total"}>
                            {`Totally ${total} comments`}
                        </div>
                        <div className={"comment-list"}>
                            <InfiniteScroll
                                dataLength={comments.length}
                                next={loadComment}
                                hasMore={comments.length < total}
                                loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    dataSource={comments}
                                    renderItem={(item) => (
                                        <Comment key={item.commentId} comment={item} focus={handleFocus}/>
                                    )}
                                />
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
                <div className={"actions"}>
                    {
                        loveList.includes(postId) ?
                            <Interaction number={post.love} active={true}>
                                <HeartOutlined className={"my-icon"} onClick={handleCancelLove}/>
                            </Interaction> :
                            <Interaction number={post.love}>
                                <HeartOutlined className={"my-icon"} onClick={handleLove}/>
                            </Interaction>
                    }
                    <Interaction number={post.love}>
                        <StarOutlined className={"my-icon"}/>
                    </Interaction>
                    <Interaction number={total}>
                        <MessageOutlined className={"my-icon"} onClick={showComments}/>
                    </Interaction>
                </div>
                <div className={"bottom"}>
                    <div className={"comment-wrapper"}>
                        <Input placeholder={label} value={text} onChange={handleInput} ref={inputRef}/>
                        <div className={`input-buttons ${active ? 'active' : 'inactive'}`}>
                            <PaperClipOutlined/>
                            <SmileOutlined/>
                            <Button size={"middle"} type={"primary"} onClick={handleSend}>Send</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default PostDetail;