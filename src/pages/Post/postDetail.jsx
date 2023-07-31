import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "umi";
import "./postDetail.less"
import {Avatar, Button, Carousel, Divider, Input, List, Skeleton} from "antd";
import Loading from "../../components/Loading";
import {HeartOutlined, MessageOutlined, PaperClipOutlined, SmileOutlined, StarOutlined} from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../Comment/comment";
import {history, useDispatch, useSelector} from "umi";
import Interaction from "../../components/Interactions/interaction";

function PostDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const {postId} = params
    const commentContainerRef = useRef(null)
    const inputRef = useRef(null);
    const [commentLoading, setCommentLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(false)
    const [text, setText] = useState("")
    const {
        post,
        total,
        page,
        comments,
        label,
        type,
        commentId,
        replyNickname
    } = useSelector(state => state.postDetailModel)
    const {loveList, startList} = useSelector(state => state.userModel)

    useEffect(() => {
        if (postId !== post.postId) {
            dispatch({
                type: 'postDetailModel/fetchPostWithComments',
                payload: postId
            })
        }
    }, [])

    const loadComment = () => {
        dispatch({
            type: 'postDetailModel/fetchComments',
            payload: {postId, page, pageSize: 10}
        })
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
            dispatch({
                type: 'postDetailModel/onShowComments',
                payload: {label: "Share your idea", type: 0}
            })
            if (commentContainerTop > 0) {
                commentContainer.scrollIntoView({behavior: 'smooth'});
            }
        }
    }
    if (loading || commentLoading) {
        return <Loading/>
    }

    const handleLove = () => {
        dispatch({
            type: 'postDetailModel/lovePost',
            payload: postId
        })
    };
    const handleCancelLove = () => {
        dispatch({
            type: 'postDetailModel/cancelLovePost',
            payload: postId
        })
    };


    const handleSend = () => {
        if (type === 0) {
            dispatch({
                type: 'postDetailModel/addComment',
                payload: {postId, commentContent: text}
            })
        }
        if (type === 1) {
            dispatch({
                type: 'postDetailModel/addSubcomment',
                payload: {commentId, commentContent: text}
            })
        }
        if (type === 2) {
            dispatch({
                type: 'postDetailModel/addSubcomment',
                payload: {commentId, commentContent: text, replyNickname}
            })
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
                        <Avatar className={"avatar"} size={40} src={post.userAvatar} onClick={() => {
                            history.push(`/profile/${post.userId}`)
                        }}/>
                        <span className={"nickname"}>{post.nickName}</span>
                    </div>

                    <Button style={{borderRadius: 20}} type={"primary"}>Subscribe</Button>
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
                                        <Comment key={item.id} comment={item} focus={handleFocus}/>
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